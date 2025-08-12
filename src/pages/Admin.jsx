import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import '../styles/Admin.css';

export default function Admin() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
  }, []);

  const handleDelete = (id) => {
    const filtered = products.filter((p) => p.id !== id);
    setProducts(filtered);
  };

  return (
    <div className='admin-panel'>
      <h2>Panel de Administración</h2>
      {products.map((p) => (
        <div key={p.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
          <h4>{p.title}</h4>
          <p>S/{p.price}</p>
          <button onClick={() => handleDelete(p.id)}>Eliminar (simulado)</button>
        </div>
      ))}
    </div>
  );
}
