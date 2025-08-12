import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = ({ email, name }) => {
    // Obtener usuario registrado
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));

    if (
      registeredUser &&
      registeredUser.email === email &&
      registeredUser.name === name
    ) {
      // Usuario válido: hacer login
      setUser(registeredUser);
      localStorage.setItem('user', JSON.stringify(registeredUser));
      return true; // login exitoso
    } else {
      return false; // login fallido
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
