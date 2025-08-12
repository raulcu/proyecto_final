import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  FaShoppingCart,
  FaUserCircle,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaHome,
  FaBars
} from 'react-icons/fa';
import '../styles/Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false); 

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
        <FaHome size={28} style={{ marginRight: '8px' }} /> E-Shop
      </Link>

      <button className="menu-toggle" onClick={toggleMenu}>
        <FaBars />
      </button>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={closeMenu}>Inicio</Link>
        <Link to="/cart" onClick={closeMenu}>
          <FaShoppingCart style={{ marginRight: '5px' }} />
          Carrito ({cart.length})
        </Link>

        {user ? (
          <>
            <span className="user-greeting">
              <FaUserCircle style={{ marginRight: '5px' }} />
              Hola, {user.name}
            </span>
            <button className="btn-logout" onClick={() => { logout(); closeMenu(); }}>
              <FaSignOutAlt style={{ marginRight: '5px' }} />
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={closeMenu}>
              <FaSignInAlt style={{ marginRight: '5px' }} />
              Ingresar
            </Link>
            <Link to="/register" onClick={closeMenu}>
              <FaUserPlus style={{ marginRight: '5px' }} />
              Registro
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
