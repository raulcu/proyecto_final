import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import '../styles/ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
  const qty = Math.max(1, Math.floor(quantity));
  console.log('Agregando producto:', product.title, 'Cantidad:', qty);
  addToCart({ ...product, quantity: qty });
};


  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} className="product-detail-image" />
      <div className="product-detail-info">
        <h2>{product.title}</h2>
        <p className="product-detail-description">{product.description}</p>
        <p className="product-detail-price"><strong>Precio:</strong> S/{product.price.toFixed(2)}</p>

        <div className="product-detail-quantity">
          <label htmlFor="quantity">Cantidad:</label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          />
        </div>

        <button className="btn btn-add" onClick={handleAddToCart}>Agregar al carrito</button>
      </div>
    </div>
  );
}
