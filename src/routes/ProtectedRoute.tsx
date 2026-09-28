import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authRepository } from "../repositories/authRepository";

function ProtectedRoute() {
  const location = useLocation();

  if (!authRepository.isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
