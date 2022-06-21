import React from "react";
import error500 from "../images/500.png";

const Pag500 = () => {
  return (
    <div>
      <img src = {error500} width = "200" alt = ""/>
      <h1>Error interno del servidor.</h1>
      <h1>Error 500</h1>
    </div>
  );
};

export default Pag500;
