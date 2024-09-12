import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const { email } = useContext(AuthContext);

  const location = useLocation();

  console.log("Locat: ", location);
  if (email.length !== 0) {
    return children;
  }

  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
}

export default PrivateRoute;
