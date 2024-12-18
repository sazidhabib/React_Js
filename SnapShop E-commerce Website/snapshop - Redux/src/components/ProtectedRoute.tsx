import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store"; // Update the path as needed

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// ProtectedRoute component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLogin = useSelector((state: RootState) => state.auth.isLoggedIn); // Adjust the selector as per your auth slice

  // Redirect to the login page if not authenticated
  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children (protected component)
  return <>{children}</>;
};

export default ProtectedRoute;
