import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

import "./styles/App.css";

import NavBar from "./NavBar";

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
          <Route exact path="/addProduct" element={<AddProduct />} />
          <Route exact path="bills" element={<Bills />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/help" element={<Help />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/inventory" element={<Inventory />} />
          <Route exact path="/" element={<Login />} />
          <Route path="*" element={<Pag404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
