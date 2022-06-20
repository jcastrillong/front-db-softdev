import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { NavBarDataUp } from "./NavBarDataUp";
import { NavBarDataDown } from "./NavBarDataDown";
import { IconContext } from "react-icons/lib";
import Context from "../context/UserContext";
import { useUser } from "../hooks/useUser";

import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";

import "./styles/NavBar.css";

export default function NavBar() {
  const { user } = useContext(Context);
  const { logout } = useUser(); 
  const [title, setTitle] = useState("Inicio");
  const [SideBar, SetSidebar] = useState(false);

  const ShowSideBar = () => SetSidebar(!SideBar);

  return (
    <>
      <IconContext.Provider value={{ color: "#F3E2C2" }}>
        {
          user ? (
          <>
            <div className="navbar">
              <Link to="#" className="menu-bars">
                <FaIcons.FaBars onClick={ShowSideBar} />
              </Link>
              <h1 id="title-navbar">{title.toUpperCase()}</h1>
              <div className="user-bar">
                <FaIcons.FaUserCircle />
                <p>{user.user.firstName + " " + user.user.lastName}</p>
                <Link to="#" onClick={logout}><IoIcons.IoIosLogOut /></Link>  
              </div>
            </div>
            <nav className={SideBar ? "nav-menu active" : "nav-menu"}>
              <ul className="nav-menu-items" onClick={ShowSideBar}>
                <li className="navbar-toggle">
                  <Link to="#" className="menu-bars">
                    <IoIcons.IoMdCloseCircleOutline />
                  </Link>
                  <h2 id="title-sidebar">{title.toUpperCase()}</h2>
                </li>

                {NavBarDataUp.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path} onClick={() => {setTitle(item.title)}}>
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
                        <Link to={item.path} onClick={() => {setTitle(item.title)}}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </li>
              </ul>
            </nav>
          </>
          ) : (null)
        }
      </IconContext.Provider>
    </>
  );
}
