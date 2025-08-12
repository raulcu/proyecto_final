import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login({ email, name });
    if (success) {
      navigate('/');
    } else {
      alert('Usuario o correo incorrectos, por favor regístrate primero.');
    }
  };

  return (
    <div className='auth-form'>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <i className="fa-solid fa-user" aria-hidden="true"></i>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <i className="fa-solid fa-envelope" aria-hidden="true"></i>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          <i className="fa-solid fa-right-to-bracket" aria-hidden="true"></i> Ingresar
        </button>
      </form>
    </div>
  );
}
