import React from "react";
import { useAuth } from "../services/authContext";
import Login from "./login/Login";
import { Home } from "../page/dashbaord/Home";

const ProtectRoutes = () => {
  const { user } = useAuth();
  return <div>{!user ? <Login /> : <Home />}</div>;
};

export default ProtectRoutes;
