import { useState } from "react";
import { useNavigate } from "react-router-dom";

import authService from "../services/auth.service";

import "./Login.css"

const Login = ({ userSession }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(userSession);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "username") {
      setUsername(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("handleLogin");
    try {
      const user = await authService.login({
        username,
        password
      })

      if (user) {
        window.sessionStorage.setItem("token", JSON.stringify(user));
        setUser(user);
        setUsername("");
        setPassword("");
        setError("");
        navigate("/facturas");
      } 
    } catch (error) {
      alert("Usuario o Contraseña Incorrectos");
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
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                placeholder="Ingrese usuario"
                onChange={handleChange}
                required
            />
          </div>

          <div className="form-item">
            <label htmlFor="current-password">Contraseña</label>
            <input
                id="password"
                autoComplete="current-password"
                type="password"
                value={password}
                placeholder="Ingrese contraseña"
                onChange={handleChange}
                required
            />
          </div>

            <button 
              type="submit"
              className="btn btn-blue"
              onClick={handleLogin}
            >
              Iniciar sesion
            </button>
          <div className="form-login-btns">
          </div>
        </form>
        <button className="btn btn-red">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default Login;