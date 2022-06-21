import React, { useEffect } from "react";
import './../components/styles/Home.css';
import desarrollo from './../img/desarrollo.png';
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const Home = () => {
  const navigate = useNavigate();
  const { isLogged } = useUser();
  const login = () => {
    window.location.href = "http://localhost:3000/";
  }

  const help = () => {
    window.location.href = "http://localhost:3000/help";
  }

  useEffect(() => {
    if (isLogged) navigate("/home");
  }, [isLogged, navigate]);

  return (
    <div>
      <div className="container">
        <div className="texto">
        <h1 className="titulo"> <u>Tecnocomputo</u></h1>
        <br />
          <p className="descripcion">La empresa Tecnocomputo disponible para usted</p>
        <br />
          <div className="botones">
            {
              !isLogged 
              ? <button className="btnIniciar" onClick={()=>login()}>Iniciar Sesion </button>
              : null
            }
            <button className="btnIniciar" onClick={()=>help()}>Ayuda</button>
          </div>
        </div>
        <div className="img">
          <img src={desarrollo} alt="desarrollo" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default Home;
