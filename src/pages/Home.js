import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Context from "../context/UserContext";

const Home = () => {
  const [ bills, setBills ] = useState([]);
  const { user } = useContext(Context);
  const userJSON = JSON.parse(user);

  const navigate = useNavigate();

  const handleProducts = () => {

    if(userJSON) {
      fetch("http://localhost:3001/api/bills", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userJSON.token}`,
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setBills(data);
          console.log("data", data);
        }
        ).catch((err) => {
          setBills([]);
        }
        );
    } else {
      setBills([]);
      navigate("/login");
    }
  }

  useEffect(() => {
    handleProducts();
  }
  , []);

  return (
    <div>
      <h1>Inicio</h1>
      <br/>
      <div>
        {
          bills.map((bills) => {
            return (
              <div key={bills.idBill}>
                <h1>{bills.idEmployee}</h1>
                <h2>{bills.employee.firstName}</h2>
                <h3>{bills.employee.lastName}</h3>
              </div>
            )
        }
        )}
      </div>
    </div>
  );
};

export default Home;
