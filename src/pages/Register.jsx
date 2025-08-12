import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { email, name };
    localStorage.setItem('registeredUser', JSON.stringify(newUser));
    alert('Registrado correctamente');
    navigate('/login');
  };

  return (
    <div className='auth-form'>
      <h2>Registro</h2>
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
          <i className="fa-solid fa-user-plus" aria-hidden="true"></i> Registrarse
        </button>
      </form>

    </div>
  );
}
