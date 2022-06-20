import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import Context from "../context/UserContext";


function PrivateRoute ({ component: Component, ...rest }) {
  const { user } = useContext(Context);
  
  return user ? <Component {...rest} /> : <Navigate to="/login" />
}

export default PrivateRoute;