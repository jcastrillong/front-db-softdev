import React from "react";
import './../components/styles/Home.css';
import desarrollo from './../img/desarrollo.png';
import { Link } from "react-router-dom";

const Home = () => {

  const login = () => {
    window.location.href = "http://localhost:3000/";
  }

  const help = () => {
    window.location.href = "http://localhost:3000/help";
  }

  return (
    <div>
      <div className="container">
        <div className="texto">
        <h1 className="titulo"> <u>Tecnocomputo</u></h1>
        <br />
          <p className="descripcion">La empresa Tecnocomputo disponible para usted</p>
        <br />
          <div className="botones">
            <button className="btnIniciar" onClick={()=>login()}>Iniciar Sesion </button>
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
