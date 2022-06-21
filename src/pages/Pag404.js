import React from "react";
import error404 from "../images/500.png";

const Pag500 = () => {
  return (
    <div>
      <img src = {error404} width = "200" alt = ""/>
      <h1>Pagina no encontrada.</h1>
      <h1>Error 404</h1>
    </div>
  );
};

export default Pag500;
