import React from "react";

import { 
  BrowserRouter as Router,
  Route, 
  Routes
} from "react-router-dom";

import NavBar from "./NavBar";
import PrivateRoute from "./PrivateRoute";
import AddProduct from "../pages/AddProduct";
import Bills from "../pages/Bills"
import AddBills from "../pages/AddBills";
import Contact from "../pages/Contact"
import Help from "../pages/Help"
import Home from "../pages/Home";
import Inventory from "../pages/Inventory";
import Login from "../pages/Login";
import Pag404 from "../pages/Pag404";
import { UserContextProvider } from './../context/UserContext'

import "./styles/App.css";

function App(props) {
  return (
    <UserContextProvider>
      <Router>
        <div className="App">
          <div className="circle-background"></div>
          <NavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* Routes Protected */}
            <Route path="/home" element={<PrivateRoute component={Home} />} />
            <Route path="/bills" element={<PrivateRoute component={Bills} />} />
            <Route path="/home" element={<PrivateRoute component={Home} />} />
            <Route path="/inventory" element={<PrivateRoute component={Inventory} />} />
            <Route path="/add-product" element={<PrivateRoute component={AddProduct} />} />
            <Route path="/add-bills" element={<PrivateRoute component={AddBills} />} />

            {/* <Route exact path="/" element={<Home />} /> */}
            <Route exact path="/contact" element={<Contact/>}/>
            <Route exact path="/help" element={<Help/>}/>
            <Route path="*" element={<Pag404/>} />
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
