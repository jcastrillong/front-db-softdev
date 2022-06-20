import React from 'react';
import { Link } from 'react-router-dom'

import { useUser } from '../hooks/useUser';

import './styles/Header.css'

function Header({ title }) {
  const { isLogged, logout } = useUser();

  return (
    <header className="header">
        {
          isLogged 
          ? (
            <>
              <h1>
                <Link to="/home">{`${title}`}</Link>
              </h1>
              <h2>
                <Link to="/bills">Facturación</Link>
              </h2>
              <button>
                <Link to="#" onClick={logout}>Cerrar Sesión</Link>
              </button>
            </>
          ) 
          : (
            <button>
              <Link to="/login">Iniciar Sesión</Link>
            </button>
          )
        }
      
    </header>
  )
}

export default Header;