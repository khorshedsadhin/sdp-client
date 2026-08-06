# eTuitionBD

eTuitionBD is a web platform that connects students with tutors. Students can post tuition jobs and hire tutors; tutors can browse and apply for tuitions. The platform also includes an admin panel for managing users, tuitions, subscriptions, and posting credits.

This repository contains the frontend client. It authenticates against Firebase Authentication and communicates with a live backend API.

## Key Features

- **Authentication:** Email/password login and registration via Firebase Authentication, with role-based access (student, tutor, admin).
- **Student Dashboard:** Post tuition jobs, review tutor applications, manage tuitions, and track payments.
- **Tutor Dashboard:** Browse and apply for tuitions, manage ongoing tuitions, and view revenue.
- **Admin Dashboard:** Manage users and roles, tuitions, subscription plans, subscriptions, posting credits, and site reports.
- **Subscriptions & Posting Credits:** Plan-based subscriptions and credit bundles for posting tuitions, with payment and history tracking.
- **Profile & Security Settings:** Update profile details and account security from the dashboard.
- **Notifications:** Toast and alert-based feedback for user actions.
- **Responsive Design:** Optimized for both mobile and desktop.

## Tech Stack

- **Frontend:** React 19, React Router 7
- **Build Tool:** Vite
- **Styling:** Tailwind CSS, DaisyUI
- **Data Fetching:** TanStack Query, Axios
- **Authentication:** Firebase Authentication
- **Forms:** React Hook Form
- **Animations:** Framer Motion
- **Alerts & Notifications:** SweetAlert2, React Hot Toast

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root with the following variables:

```
VITE_apiKey=
VITE_authDomain=
VITE_projectId=
VITE_storageBucket=
VITE_messagingSenderId=
VITE_appId=
VITE_API_URL=
```

The `VITE_*` Firebase variables come from your Firebase project configuration. `VITE_API_URL` should point to the backend API base URL.

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

The build output is generated in the `dist` directory.

### Linting

```bash
npm run lint
```

## Deployment

This project is configured for Firebase Hosting.

```bash
npm run build
npx firebase-tools deploy --only hosting
```

This requires being authenticated with the Firebase CLI (`npx firebase-tools login`) and access to the target Firebase project.
