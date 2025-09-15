import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn"); 
  // Or call an API like /api/me to check session

  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
