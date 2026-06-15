import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../components/Shared/ErrorPage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import Tuitions from "../pages/Tuitions/Tuitions";
import Tutors from "../pages/Tutors/Tutors";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import MyTuitions from "../pages/Dashboard/Student/MyTuitions";
import RoleRedirect from "../components/Dashboard/RoleRedirect";
import PostTuition from "../pages/Dashboard/Student/PostTuition";
import AppliedTutors from "../pages/Dashboard/Student/AppliedTutors";
import Payments from "../pages/Dashboard/Student/Payments";
import MyApplications from "../pages/Dashboard/Tutor/MyApplications";
import OngoingTuituions from "../pages/Dashboard/Tutor/OngoingTuituions";
import Revenue from "../pages/Dashboard/Tutor/Revenue";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageTuitions from "../pages/Dashboard/Admin/ManageTuitions";
import Reports from "../pages/Dashboard/Admin/Reports";
import ProfileSettings from "../pages/Dashboard/common/ProfileSettings";
import TuitionDetails from "../pages/TuitionDetails/TuitionDetails";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/tuitions',
        element: <Tuitions />
      },
      {
        path: '/tuition/:id',
        element: <TuitionDetails />
      },
      {
        path: '/tutors',
        element: <Tutors />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      }
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <PrivateRoute><RoleRedirect /></PrivateRoute>
      },
      {
        path: 'profile',
        element: <PrivateRoute><ProfileSettings /></PrivateRoute>
      },
      {
        path: 'student/my-tuitions',
        element: <PrivateRoute><MyTuitions /></PrivateRoute>
      },
      {
        path: 'student/post-tuition',
        element: <PrivateRoute><PostTuition /></PrivateRoute>
      },
      {
        path: 'student/applied-tutors',
        element: <PrivateRoute><AppliedTutors /></PrivateRoute>
      },
      {
        path: 'student/payments',
        element: <PrivateRoute><Payments /></PrivateRoute>
      },
      {
        path: 'tutor/my-applications',
        element: <PrivateRoute><MyApplications /></PrivateRoute>
      },
      {
        path: 'tutor/ongoing-tuitions',
        element: <PrivateRoute><OngoingTuituions /></PrivateRoute>
      },
      {
        path: 'tutor/revenue',
        element: <PrivateRoute><Revenue /></PrivateRoute>
      },
      {
        path: 'admin/users',
        element: <PrivateRoute><ManageUsers /></PrivateRoute>
      },
      {
        path: 'admin/manage-tuitions',
        element: <PrivateRoute><ManageTuitions /></PrivateRoute>
      },
      {
        path: 'admin/reports',
        element: <PrivateRoute><Reports /></PrivateRoute>
      },
    ]
  }
])