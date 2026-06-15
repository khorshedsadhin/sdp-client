// Frontend-only demo auth store (replaces Firebase Authentication).
// The "logged-in" demo user is kept in localStorage so it survives reloads.
// Both AuthProvider (the React side) and setupMocks (the mock API side)
// read/write through here, so a single source of truth drives roles + data.
import { roleForEmail } from "./demoData";

const STORAGE_KEY = "demo-auth-user";
const DEFAULT_AVATAR = "https://i.ibb.co/MgsTCcv/avater.jpg";

// Shape a demo user that mirrors the Firebase user fields the app reads:
// email, displayName, photoURL, accessToken (+ a convenience role).
export const buildDemoUser = ({ email, displayName, photoURL }) => ({
  uid: `demo-${email}`,
  email,
  displayName: displayName || email?.split("@")[0] || "Demo User",
  photoURL: photoURL || DEFAULT_AVATAR,
  role: roleForEmail(email),
  accessToken: `demo-token-${email}`,
});

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
  } catch {
    return null;
  }
};

export const setStoredUser = (user) => {
  if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  else localStorage.removeItem(STORAGE_KEY);
  return user;
};

export const getStoredEmail = () => getStoredUser()?.email || "";
