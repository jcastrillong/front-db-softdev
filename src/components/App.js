import { 
  BrowserRouter as Router,
  Route, 
  Routes
} from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Header from "./Header";
import AddProduct from "../pages/AddProduct";
import Bills from "../pages/Bills"
import Contact from "../pages/Contact"
import Help from "../pages/Help"
import Home from "../pages/Home";
import Inventory from "../pages/Inventory"
import Login from "../pages/Login";
import Pag404 from "../pages/Pag404";

import "./styles/App.css";
import { useEffect, useState } from "react";

function App(props) {
  return (
    <Router>
      <div className="App">
        <div className="circle-background"></div>
        <Header title={`Permisa`}/>
        <Routes>
          {/* Routes Protected */}
          {/* <Route path="/" element={<PrivateRoute component={Home} />} /> */}
          <Route path="/facturas" element={<PrivateRoute component={Bills} />} />
          <Route path="/inicio" element={<PrivateRoute component={Home} />} />
          <Route path="/inventario" element={<PrivateRoute component={Inventory} />} />
          <Route path="/add-producto" element={<PrivateRoute component={AddProduct} />} />

          <Route exact path="/" element={<Home />} />
          <Route exact path="/contacto" element={<Contact/>}/>
          <Route exact path="/ayuda" element={<Help/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Pag404/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
