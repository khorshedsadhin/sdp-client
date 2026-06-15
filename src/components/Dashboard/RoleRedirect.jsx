import { Navigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../Shared/LoadingSpinner";

const RoleRedirect = () => {
  const { user} = useAuth();
  const [role, isRoleLoading] = useRole();

  if(isRoleLoading) return <LoadingSpinner />

  if (!user || !role) {
    return <Navigate to="/login" replace />;
  }

  switch (role) {
    case "student":
      return <Navigate to="/dashboard/student/my-tuitions" replace />;

    case "tutor":
      return <Navigate to="/dashboard/tutor/my-applications" replace />;

    case "admin":
      return <Navigate to="/dashboard/admin/users" replace />;

    default:
      return <Navigate to="/" replace />;
  }
};

export default RoleRedirect;
