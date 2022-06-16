import React, { Component } from 'react';
import '../components/styles/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends Component {
 
    render() {
        return (

     
    <div className="containerPrincipal">
        <div className="containerSecundario">
              
          <div className="form-group">
            <h2>Iniciar sesion</h2>
            <label>Usuario: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="username"
            />

            <br />  
            <label>Contraseña: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password"
            />
            <br />
            <button className="btn btn-primary" >Iniciar Sesión</button>
          </div>
        </div>
      </div>
        );
    }
}

export default Login;