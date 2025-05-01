import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../services/authService";

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <NavigateaddDish to="/login" />;
};

export default ProtectedRoute;
