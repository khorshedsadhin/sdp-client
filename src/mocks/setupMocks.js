/* ============================================================================
 * DEMO MODE — fake backend (no real server)
 * ----------------------------------------------------------------------------
 * The app normally talks to a backend using axios (e.g. axios.get("/tuitions")).
 * In this demo there is NO backend, so instead of letting those requests go out
 * to the internet, we "intercept" them here and hand back ready-made demo data
 * from demoData.js.
 *
 * The tool that does the intercepting is `axios-mock-adapter`. You give it a
 * URL pattern and what to return, like:
 *
 *     mock.onGet("/tutors").reply(200, listOfTutors);
 *     //         ^ when the app GETs this URL
 *     //                        ^ reply with HTTP 200 and this data
 *
 * The patterns below are written as regular expressions (the /.../ things) so
 * one rule can match a URL no matter what comes before or after it. For example
 * /\/home\/tutors/ just means "any URL containing /home/tutors".
 *
 * Import this file once at app startup (see src/main.jsx) and every axios call
 * in the whole app gets served demo data automatically.
 * ========================================================================== */
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { axiosInstance } from "../hooks/useAxiosSecure";
import { getStoredEmail } from "./demoAuth";
import * as db from "./demoData"; // db = our fake database (the demo data)

const DEFAULT_AVATAR = "https://i.ibb.co/MgsTCcv/avater.jpg";

// --- Two tiny helpers for reading the request URL ------------------------- //

// Turn "...?page=2&search=math" into { page: "2", search: "math" }.
const getQuery = (url = "") => {
  const queryString = url.split("?")[1] || "";
  return Object.fromEntries(new URLSearchParams(queryString));
};

// Get the last part of a path, e.g. "/tuition/tu5" -> "tu5".
const lastSegment = (url = "") =>
  url.split("?")[0].split("/").filter(Boolean).pop();

// Register every fake endpoint on one mock adapter.
const registerHandlers = (mock) => {
  /* ---- Home page + public browsing ------------------------------------- */

  // Home page shows only the first few items.
  mock.onGet(/\/home\/tuitions/).reply(200, db.tuitions.slice(0, 6));
  mock.onGet(/\/home\/tutors/).reply(200, db.tutors.slice(0, 4));

  // Admin's "all tuitions" list. This MUST come before the /tuitions rule
  // below, otherwise that more general rule would catch this URL first.
  mock.onGet(/\/tuitions\/all/).reply(200, db.allTuitions);

  // Public "Browse Tuitions" page — supports search + pagination.
  // We read page/limit/search from the URL, filter the list, then return
  // just the slice for the requested page plus how many pages exist.
  mock.onGet(/\/tuitions(\?|$)/).reply((config) => {
    const { page = 1, limit = 9, search = "" } = getQuery(config.url);
    const term = String(search).toLowerCase();

    const matches = db.tuitions.filter(
      (t) =>
        !term ||
        t.subject.toLowerCase().includes(term) ||
        t.location.toLowerCase().includes(term)
    );

    const perPage = Number(limit) || 9;
    const currentPage = Number(page) || 1;
    const totalPages = Math.max(1, Math.ceil(matches.length / perPage));
    const pageItems = matches.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );

    return [200, { tuitions: pageItems, totalPages, total: matches.length }];
  });

  // Full tutor list (the "Tutors" page).
  mock.onGet(/\/tutors$/).reply(200, db.tutors);

  // Single tuition details page: /tuition/:id — find that one by its id.
  mock.onGet(/\/tuition\/[^/?]+$/).reply((config) => {
    const id = lastSegment(config.url);
    const tuition = db.tuitions.find((t) => t._id === id) || db.tuitions[0];
    return [200, tuition];
  });

  // "Have I already applied to this tuition?" — always say no in the demo.
  mock.onGet(/\/application\/check\//).reply(200, { applied: false });

  /* ---- Who am I? (role lookup) ----------------------------------------- */

  // Look at the currently "logged-in" demo email and return their role
  // (admin / tutor / student). This is what decides which dashboard shows.
  mock.onGet(/\/user\/role/).reply(() => {
    const email = getStoredEmail();
    return [200, { role: db.roleForEmail(email) }];
  });

  /* ---- Student dashboard ----------------------------------------------- */
  mock.onGet(/\/my-tuitions/).reply(200, db.myTuitions);
  mock.onGet(/\/applications\/received/).reply(200, db.applicationsReceived);
  mock.onGet(/\/payments\//).reply(200, db.studentPayments);

  /* ---- Tutor dashboard ------------------------------------------------- */
  mock.onGet(/\/tutor\/applications/).reply(200, db.tutorApplications);
  mock.onGet(/\/tutor\/ongoing-tuitions/).reply(200, db.ongoingTuitions);
  mock.onGet(/\/tutor\/revenue\//).reply(200, db.tutorRevenue);

  /* ---- Admin dashboard ------------------------------------------------- */
  mock.onGet(/\/users(\?|$)/).reply(200, db.users);
  mock.onGet(/\/admin\/stats/).reply(200, db.adminStats);
  mock.onGet(/\/admin\/payments/).reply(200, db.adminPayments);

  /* ---- Image upload (imgbb) -------------------------------------------- */
  // Pretend the upload worked and return a default avatar URL.
  mock.onPost(/api\.imgbb\.com/).reply(200, {
    data: { display_url: DEFAULT_AVATAR, url: DEFAULT_AVATAR },
  });

  /* ---- Everything else ------------------------------------------------- */
  // Any request we didn't list above (creating, updating, deleting, etc.)
  // just "succeeds". We return all the little fields different success
  // handlers in the app look for, so every button feels like it worked.
  // Important: we never reply 401/403, which would log the demo user out.
  mock.onAny().reply(200, {
    success: true,
    insertedId: "demo-inserted-id",
    modifiedCount: 1,
    deletedCount: 1,
    acknowledged: true,
  });
};

// The app uses two axios clients: the plain `axios` (public calls) and
// `axiosInstance` (logged-in calls). We attach the same fake endpoints to both.
// `delayResponse: 300` waits 300ms before replying so loading spinners show
// briefly and it feels like a real network.
registerHandlers(new MockAdapter(axios, { delayResponse: 300 }));
registerHandlers(new MockAdapter(axiosInstance, { delayResponse: 300 }));

// eslint-disable-next-line no-console
console.info(
  "%c[DEMO MODE] Backend API is mocked — no real server is used.",
  "color:#2F9E44;font-weight:bold"
);
