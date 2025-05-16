import { useAuth } from "../services/authContext";
import Login from "./login/Login";
import { Outlet } from "react-router-dom";

const ProtectRoutes = () => {
  const { user } = useAuth();

  if (!user) return <Login />;
  return <Outlet />;
};

export default ProtectRoutes;
