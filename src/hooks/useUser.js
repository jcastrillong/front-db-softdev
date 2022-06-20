import { useCallback, useContext, useState } from "react";

import Context from "../context/UserContext";
import loginService from "../services/auth.service";

export function useUser() {
  const { user, setUser } = useContext(Context);
  const [ state, setState ] = useState({
    loading: false,
    error: false,
  });

  const login = useCallback(({username, password}) => {
    setState({ isLoading: true, error: false });
      loginService({username, password})
      .then((data) => {
        window.localStorage.setItem("user", JSON.stringify(data));
        setState({ isLoading: false, error: false });
        setUser(data);
      })
      .catch((err) => {
        window.localStorage.removeItem("user");
        setState({ isLoading: false, error: true });
        console.log(err);
      })
  }, [setUser]);

  const logout = useCallback(
    () => {
      window.localStorage.removeItem("user");
      setUser(null);
    }
    , [setUser]
  );

  return { 
    isLogged: Boolean(user),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout
  };
}