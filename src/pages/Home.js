import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [ bills, setBills ] = useState([]);
  const token = JSON.parse(window.sessionStorage.getItem("token"));

  const handleProducts = () => {
    fetch("http://localhost:3001/api/bills", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.token}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setBills(data);
      }
      ).catch((err) => {
        window.sessionStorage.removeItem("token");
      }
      );
  }

  return (
    <div>
      <h1>Inicio</h1>
      <button>
        <Link to="/login">Iniciar Sesion</Link>
      </button>
      <button>
        <Link to="/facturas" onClick={handleProducts}>Products</Link>
      </button>
      <div>
        {
          bills.map((bills) => {
            return (
              <div>
                <h1>{bills.name}</h1>
                <h2>{bills.description}</h2>
                <h3>{bills.price}</h3>
              </div>
            )
        }
        )}
      </div>
    </div>
  );
};

export default Home;
