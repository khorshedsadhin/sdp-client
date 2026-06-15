/* ============================================================================
 * DEMO DATA — the fake "database" for the demo
 * ----------------------------------------------------------------------------
 * This file is just plain lists of made-up data (tutors, tuitions, payments…).
 * setupMocks.js hands these lists back whenever the app asks the backend for
 * something. There is no real server — editing the arrays below instantly
 * changes what shows up on screen.
 *
 * Each `export const ...` is one collection the app can ask for.
 * ========================================================================== */

// Helper: builds a random profile-photo URL (1–70). e.g. img(47).
const img = (n) => `https://i.pravatar.cc/150?img=${n}`;

// The tutors shown on the home page and the "Tutors" browse page.
export const tutors = [
  { _id: "t1", name: "Sadia Rahman", email: "sadia.rahman@demo.com", image: img(47), qualification: "BSc in Mathematics, DU" },
  { _id: "t2", name: "Tanvir Ahmed", email: "tanvir.ahmed@demo.com", image: img(12), qualification: "BSc in CSE, BUET" },
  { _id: "t3", name: "Nusrat Jahan", email: "nusrat.jahan@demo.com", image: img(45), qualification: "MA in English, DU" },
  { _id: "t4", name: "Rafiul Islam", email: "rafiul.islam@demo.com", image: img(33), qualification: "BSc in Physics, JU" },
  { _id: "t5", name: "Mehjabin Karim", email: "mehjabin.karim@demo.com", image: img(20), qualification: "BBA in Finance, NSU" },
  { _id: "t6", name: "Arif Hossain", email: "arif.hossain@demo.com", image: img(15), qualification: "BSc in Chemistry, RU" },
  { _id: "t7", name: "Farhana Akter", email: "farhana.akter@demo.com", image: img(32), qualification: "MSc in Biology, DU" },
  { _id: "t8", name: "Imran Chowdhury", email: "imran.chowdhury@demo.com", image: img(51), qualification: "BSc in EEE, BUET" },
];

// Tuition posts (a student looking for a tutor). `status` is approved / pending
// / rejected. These drive the home page, the browse page, and details pages.
export const tuitions = [
  { _id: "tu1", subject: "Mathematics", class: "SSC", location: "Dhanmondi, Dhaka", salary: 6000, days: 4, status: "approved", studentEmail: "rahim.student@demo.com", postedAt: "2026-06-10T10:00:00Z", description: "Looking for an experienced Math tutor for an SSC examinee. Preferred medium: Bangla. Must be strong in Algebra and Geometry." },
  { _id: "tu2", subject: "Physics", class: "HSC", location: "Uttara, Dhaka", salary: 8000, days: 3, status: "approved", studentEmail: "karim.student@demo.com", postedAt: "2026-06-11T09:30:00Z", description: "HSC Physics tutor needed. English version student. Focus on mechanics and electromagnetism." },
  { _id: "tu3", subject: "English", class: "Class 6-8", location: "Mirpur, Dhaka", salary: 4500, days: 5, status: "approved", studentEmail: "sumi.student@demo.com", postedAt: "2026-06-12T14:00:00Z", description: "Need a friendly English tutor for grammar and spoken practice. Female tutor preferred." },
  { _id: "tu4", subject: "Chemistry", class: "HSC", location: "Bashundhara, Dhaka", salary: 7500, days: 3, status: "approved", studentEmail: "rahim.student@demo.com", postedAt: "2026-06-12T18:20:00Z", description: "Organic chemistry focus for HSC. Tutor from BUET/DU preferred." },
  { _id: "tu5", subject: "Higher Math", class: "SSC", location: "Mohammadpur, Dhaka", salary: 6500, days: 4, status: "approved", studentEmail: "karim.student@demo.com", postedAt: "2026-06-13T11:10:00Z", description: "Higher Math for SSC. Need help with trigonometry and calculus basics." },
  { _id: "tu6", subject: "Biology", class: "HSC", location: "Banani, Dhaka", salary: 7000, days: 3, status: "approved", studentEmail: "sumi.student@demo.com", postedAt: "2026-06-13T16:45:00Z", description: "Botany and Zoology coaching for HSC second year." },
  { _id: "tu7", subject: "ICT", class: "HSC", location: "Gulshan, Dhaka", salary: 5500, days: 2, status: "approved", studentEmail: "rahim.student@demo.com", postedAt: "2026-06-14T08:00:00Z", description: "ICT board exam preparation. Programming chapter focus." },
  { _id: "tu8", subject: "General Science", class: "Class 1-5", location: "Shyamoli, Dhaka", salary: 3500, days: 5, status: "approved", studentEmail: "sumi.student@demo.com", postedAt: "2026-06-14T13:30:00Z", description: "Primary level all subjects, special focus on science and math." },
  { _id: "tu9", subject: "Accounting", class: "HSC", location: "Motijheel, Dhaka", salary: 7200, days: 3, status: "approved", studentEmail: "karim.student@demo.com", postedAt: "2026-06-15T10:15:00Z", description: "Commerce group, Accounting principles for HSC." },
  { _id: "tu10", subject: "Mathematics", class: "Class 6-8", location: "Badda, Dhaka", salary: 4000, days: 4, status: "pending", studentEmail: "rahim.student@demo.com", postedAt: "2026-06-16T09:00:00Z", description: "Class 7 Math, needs help building fundamentals." },
  { _id: "tu11", subject: "English", class: "SSC", location: "Khilgaon, Dhaka", salary: 5000, days: 3, status: "pending", studentEmail: "sumi.student@demo.com", postedAt: "2026-06-17T12:40:00Z", description: "SSC English first and second paper. Composition writing help needed." },
  { _id: "tu12", subject: "Physics", class: "SSC", location: "Rampura, Dhaka", salary: 5500, days: 4, status: "rejected", studentEmail: "karim.student@demo.com", postedAt: "2026-06-17T15:00:00Z", description: "SSC Physics, weekly model tests required." },
  { _id: "tu13", subject: "Economics", class: "HSC", location: "Lalmatia, Dhaka", salary: 6800, days: 3, status: "approved", studentEmail: "rahim.student@demo.com", postedAt: "2026-06-18T11:25:00Z", description: "HSC Economics, both papers. Concept clearing and MCQ practice." },
  { _id: "tu14", subject: "Bangla", class: "Class 6-8", location: "Tejgaon, Dhaka", salary: 3800, days: 5, status: "approved", studentEmail: "sumi.student@demo.com", postedAt: "2026-06-18T17:50:00Z", description: "Bangla grammar and literature for class 8." },
];

// Student dashboard: tuitions posted by the logged-in student
export const myTuitions = tuitions.filter((t) =>
  ["tu1", "tu4", "tu7", "tu10", "tu13"].includes(t._id)
);

// Student dashboard: applications received on the student's posts
export const applicationsReceived = [
  { _id: "ar1", tutorName: "Tanvir Ahmed", tutorEmail: "tanvir.ahmed@demo.com", tutorImage: img(12), subject: "Mathematics", expectedSalary: 6000, status: "pending", qualifications: "BSc in CSE, BUET", experience: "3 years of teaching SSC and HSC math at a reputed coaching center. Specialized in problem-solving techniques." },
  { _id: "ar2", tutorName: "Sadia Rahman", tutorEmail: "sadia.rahman@demo.com", tutorImage: img(47), subject: "Mathematics", expectedSalary: 5500, status: "pending", qualifications: "BSc in Mathematics, DU", experience: "2 years of home tutoring. Patient and result-oriented approach." },
  { _id: "ar3", tutorName: "Arif Hossain", tutorEmail: "arif.hossain@demo.com", tutorImage: img(15), subject: "Chemistry", expectedSalary: 7500, status: "approved", qualifications: "BSc in Chemistry, RU", experience: "5 years experience with HSC chemistry. Strong track record of A+ students." },
  { _id: "ar4", tutorName: "Imran Chowdhury", tutorEmail: "imran.chowdhury@demo.com", tutorImage: img(51), subject: "ICT", expectedSalary: 5500, status: "rejected", qualifications: "BSc in EEE, BUET", experience: "Taught ICT programming chapters for 2 years." },
];

// Tutor dashboard: the logged-in tutor's submitted applications
export const tutorApplications = [
  { _id: "ta1", subject: "Mathematics", studentEmail: "rahim.student@demo.com", appliedAt: "2026-06-14T10:00:00Z", status: "approved" },
  { _id: "ta2", subject: "Higher Math", studentEmail: "karim.student@demo.com", appliedAt: "2026-06-15T12:00:00Z", status: "pending" },
  { _id: "ta3", subject: "Physics", studentEmail: "karim.student@demo.com", appliedAt: "2026-06-16T09:30:00Z", status: "pending" },
  { _id: "ta4", subject: "ICT", studentEmail: "rahim.student@demo.com", appliedAt: "2026-06-12T15:00:00Z", status: "rejected" },
];

// Tutor dashboard: ongoing (hired) tuitions
export const ongoingTuitions = [
  { _id: "og1", subject: "Mathematics", studentEmail: "rahim.student@demo.com" },
  { _id: "og2", subject: "Chemistry", studentEmail: "sumi.student@demo.com" },
];

// Tutor dashboard: revenue (payments received by the tutor)
export const tutorRevenue = [
  { _id: "rv1", studentName: "Rahim Uddin", studentEmail: "rahim.student@demo.com", subject: "Mathematics", date: "2026-05-01T10:00:00Z", transactionId: "TXN10025481", amount: 6000 },
  { _id: "rv2", studentName: "Sumi Akter", studentEmail: "sumi.student@demo.com", subject: "Chemistry", date: "2026-05-15T10:00:00Z", transactionId: "TXN10025712", amount: 7500 },
  { _id: "rv3", studentName: "Rahim Uddin", studentEmail: "rahim.student@demo.com", subject: "Mathematics", date: "2026-06-01T10:00:00Z", transactionId: "TXN10025993", amount: 6000 },
];

// Student dashboard: payment history (payments made by the student)
export const studentPayments = [
  { _id: "pm1", tutorName: "Tanvir Ahmed", tutorEmail: "tanvir.ahmed@demo.com", subject: "Mathematics", transactionId: "TXN10025481", date: "2026-05-01T10:00:00Z", amount: 6000 },
  { _id: "pm2", tutorName: "Arif Hossain", tutorEmail: "arif.hossain@demo.com", subject: "Chemistry", transactionId: "TXN10025712", date: "2026-05-15T10:00:00Z", amount: 7500 },
  { _id: "pm3", tutorName: "Imran Chowdhury", tutorEmail: "imran.chowdhury@demo.com", subject: "ICT", transactionId: "TXN10026104", date: "2026-06-05T10:00:00Z", amount: 5500 },
];

// Admin dashboard: all users
export const users = [
  { _id: "u1", name: "Rahim Uddin", email: "rahim.student@demo.com", image: img(60), role: "student", created_at: "2026-01-12T10:00:00Z" },
  { _id: "u2", name: "Karim Mia", email: "karim.student@demo.com", image: img(68), role: "student", created_at: "2026-02-03T10:00:00Z" },
  { _id: "u3", name: "Sumi Akter", email: "sumi.student@demo.com", image: img(49), role: "student", created_at: "2026-02-20T10:00:00Z" },
  { _id: "u4", name: "Sadia Rahman", email: "sadia.rahman@demo.com", image: img(47), role: "tutor", created_at: "2026-01-18T10:00:00Z" },
  { _id: "u5", name: "Tanvir Ahmed", email: "tanvir.ahmed@demo.com", image: img(12), role: "tutor", created_at: "2026-01-25T10:00:00Z" },
  { _id: "u6", name: "Nusrat Jahan", email: "nusrat.jahan@demo.com", image: img(45), role: "tutor", created_at: "2026-03-01T10:00:00Z" },
  { _id: "u7", name: "Arif Hossain", email: "arif.hossain@demo.com", image: img(15), role: "tutor", created_at: "2026-03-10T10:00:00Z" },
  { _id: "u8", name: "Admin User", email: "admin@demo.com", image: img(8), role: "admin", created_at: "2026-01-01T10:00:00Z" },
];

// Admin dashboard: all tuitions (includes student email + every status)
export const allTuitions = tuitions;

// Admin dashboard: platform-wide payments
export const adminPayments = [
  { _id: "ap1", date: "2026-05-01T10:00:00Z", studentName: "Rahim Uddin", studentEmail: "rahim.student@demo.com", subject: "Mathematics", transactionId: "TXN10025481", amount: 6000 },
  { _id: "ap2", date: "2026-05-15T10:00:00Z", studentName: "Sumi Akter", studentEmail: "sumi.student@demo.com", subject: "Chemistry", transactionId: "TXN10025712", amount: 7500 },
  { _id: "ap3", date: "2026-06-05T10:00:00Z", studentName: "Karim Mia", studentEmail: "karim.student@demo.com", subject: "ICT", transactionId: "TXN10026104", amount: 5500 },
  { _id: "ap4", date: "2026-06-10T10:00:00Z", studentName: "Rahim Uddin", studentEmail: "rahim.student@demo.com", subject: "Posting Fee", transactionId: "TXN10026220", amount: 200 },
];

export const adminStats = {
  totalRevenue: adminPayments.reduce((acc, p) => acc + p.amount, 0),
  totalUsers: users.length,
  totalTuitions: tuitions.length,
  totalTutors: users.filter((u) => u.role === "tutor").length,
};

// Decide a user's role from their email — this is what picks which dashboard
// they see after logging in. Any password works in the demo; only the email
// matters. Quick logins:
//   admin@demo.com  -> admin
//   tutor@demo.com  -> tutor  (also any email containing "tutor")
//   anything else   -> student
export const roleForEmail = (email = "") => {
  const e = email.toLowerCase();
  const explicit = {
    "admin@demo.com": "admin",
    "tutor@demo.com": "tutor",
    "student@demo.com": "student",
  };
  if (explicit[e]) return explicit[e];
  if (e.includes("admin")) return "admin";
  if (e.includes("tutor")) return "tutor";
  return "student";
};
