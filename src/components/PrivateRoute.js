import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";


function PrivateRoute ({ component: Component, ...rest }) {
  const [user, setUser] = useState(true);

  useEffect(() => {
    const user = window.sessionStorage.getItem("token");
    if (user) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);

  return user ? <Component {...rest} /> : <Navigate to="/login" />
}

export default PrivateRoute;