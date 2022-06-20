import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sweal from 'sweetalert';
import { useUser } from "../hooks/useUser";

import "./Login.css"

const Login = () => {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const { login, isLoginLoading, hasLoginError, isLogged } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) navigate("/home");
  }, [isLogged, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      sweal("Error", "Por favor ingrese un usuario y contraseña", "error");
    } else {
      login({username, password});
    }
  }

  return (
    <div className="content">
      <h1 className="title-login">Iniciar sesion</h1>
      <div className="form-login">
        <form className="form-content" onSubmit={handleLogin}>
          <div className="form-item">
            <label htmlFor="username">Usuario</label>
            <input
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                placeholder="Ingrese usuario"
                onChange={(e) => setUsername(e.target.value)}
                required
            />
          </div>

          <div className="form-item">
            <label htmlFor="current-password">Contraseña</label>
            <input
                name="password"
                autoComplete="current-password"
                type="password"
                value={password}
                placeholder="Ingrese contraseña"
                onChange={(e) => setPassword(e.target.value)}
                required
            />
          </div>
          { isLoginLoading && <div className="loading">Cargando...</div> }
          { !isLoginLoading &&
            <button 
            type="submit"
              className="btn btn-blue"
              onClick={handleLogin}
              >
              Iniciar sesion
            </button>
          }
        </form>
      </div>
      { hasLoginError && <div className="error">Usuario o contraseña incorrectos</div> }
    </div>
  );
};

export default Login;