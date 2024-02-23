import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isauth } from "../auth/auth";

const PrivateRoute: React.FC = () => {
  const isAuthenticated = isauth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
