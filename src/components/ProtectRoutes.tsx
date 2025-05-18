import { useAuth } from "../services/authContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoutes = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectRoutes;
