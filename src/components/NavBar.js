import React, { useState } from "react";
import { Link } from "react-router-dom";

import { NavBarDataUp } from "./NavBarDataUp";
import { NavBarDataDown } from "./NavBarDataDown";
import { IconContext } from "react-icons/lib";

import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";

import "./styles/NavBar.css";

export default function NavBar() {
  const [SideBar, SetSidebar] = useState(false);

  const ShowSideBar = () => SetSidebar(!SideBar);

  return (
    <>
      <IconContext.Provider value={{ color: "#F3E2C2" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={ShowSideBar} />
          </Link>
        </div>
        <nav className={SideBar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={ShowSideBar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <IoIcons.IoMdCloseCircleOutline />
              </Link>
            </li>

            {NavBarDataUp.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li className="menu-items-down">
              {NavBarDataDown.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
