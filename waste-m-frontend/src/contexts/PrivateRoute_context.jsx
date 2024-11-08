import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const usertoken = localStorage.getItem("token");
  // If no user is logged in, redirect to the login page
  if (!usertoken) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the children components (dashboard pages)
  return children;
};

export default PrivateRoute;
