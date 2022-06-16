import React from "react";

import * as TbIcons from "react-icons/tb";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";

export const NavBarDataUp = [
  {
    title: "Inicio",
    path: "/Home",
    icon: <AiIcons.AiOutlineHome />,
    cName: "nav-text",
  },
  {
    title: "Inventario",
    path: "/Inventory",
    icon: <MdIcons.MdOutlineInventory />,
    cName: "nav-text",
  },
  {
    title: "Facturas",
    path: "/Bills",
    icon: <TbIcons.TbFileInvoice />,
    cName: "nav-text",
  },
];
