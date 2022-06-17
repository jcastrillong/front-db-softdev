import { useState } from 'react';
import { Link } from 'react-router-dom'
import './styles/Header.css'

function Header({ title }) {
  const [ auth, setAuth ] = useState(false)

  const handleLogout = () => {
    window.sessionStorage.removeItem("token");
    setAuth(false);
  }

  return (
    <header className="header">
      <h1>
        <Link to="/home">{`${title}`}</Link>
      </h1>
      <h2>
        <Link to="/facturas">Facturación</Link>
      </h2>
        {
          auth 
          ? (
            <button>
              <Link to="/" onClick={handleLogout}>Cerrar Sesión</Link>
            </button>
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