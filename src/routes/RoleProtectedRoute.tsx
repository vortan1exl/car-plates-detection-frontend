import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore"; // путь подставь свой

interface RoleProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/" />;
  }

  const { role } = user;

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

