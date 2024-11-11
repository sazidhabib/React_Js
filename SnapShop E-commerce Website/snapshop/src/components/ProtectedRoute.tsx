import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// ProtectedRoute component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLogin } = useContext(GlobalContext);

  // Redirect to the login page if not authenticated
  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children (protected component)
  return <>{children}</>;
};

export default ProtectedRoute;
