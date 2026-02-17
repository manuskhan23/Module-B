import React from "react";
import { Navigate, Outlet } from "react-router-dom";               

const Auth_Route2 = () => {
  return localStorage.getItem("Auth_id") ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Auth_Route2;
