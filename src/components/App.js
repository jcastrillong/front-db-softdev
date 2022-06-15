import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

import "./styles/App.css";

import NavBar from "./NavBar";
import FooterBar from "./FooterBar";

import AddProduct from "../pages/AddProduct";
import Bills from "../pages/Bills";
import Contact from "../pages/Contact";
import Help from "../pages/Help";
import Home from "../pages/Home";
import Inventory from "../pages/Inventory";
import Login from "../pages/Login";
import Pag404 from "../pages/Pag404";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />

        <Routes>
          <Route exact path="/AddProduct" element={<AddProduct />} />
          <Route exact path="Bills" element={<Bills />} />
          <Route exact path="/Contact" element={<Contact />} />
          <Route exact path="/Help" element={<Help />} />
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/Inventory" element={<Inventory />} />
          <Route exact path="/" element={<Login />} />
          <Route path="*" element={<Pag404 />} />
        </Routes>

        <FooterBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
