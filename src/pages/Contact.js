import React from "react";
import { Link } from "react-router-dom";

import * as TbIcons from "react-icons/tb";
import * as SiIcons from "react-icons/si";

import "../components/styles/Contact.css";

const Contact = () => {
  return (
    <div>
      <Link to="/home" className="back-button">
        <TbIcons.TbArrowBackUp />
      </Link>
      <body className="cuerpo">
        Contacto <br />
        tecnocomputo@****mail.com <br />
        +57 *** *******
      </body>

      <div className="botones">
        {/* Agreagar un enlace a whatsapp y a maps */}
        <Link to="#">
          <TbIcons.TbBrandWhatsapp />
        </Link>
        <Link to="#">
          <SiIcons.SiGooglemaps />
        </Link>
      </div>
    </div>
  );
};

export default Contact;
