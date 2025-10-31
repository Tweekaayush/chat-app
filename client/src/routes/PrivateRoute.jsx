import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const {
    data: { user },
  } = useSelector((state) => state.auth);
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
