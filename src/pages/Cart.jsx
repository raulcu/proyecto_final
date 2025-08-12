import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart
    .reduce((sum, item) => sum + item.price * item.qty, 0)
    .toFixed(2);

  const handleDecrease = (id, qty) => {
    if (qty > 1) {
      updateQuantity(id, qty - 1);
    } else {
      removeFromCart(id);
    }
  };

  const handleIncrease = (id, qty) => {
    updateQuantity(id, qty + 1);
  };

  return (
    <div className="cart-container">
      <h2>🛒 Tu Carrito</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-card">
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                  <h4>{item.title}</h4>
                  <div className="qty-controls">
                    <button onClick={() => handleDecrease(item.id, item.qty)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => handleIncrease(item.id, item.qty)}>+</button>
                  </div>
                  <p>Precio unitario: S/{item.price.toFixed(2)}</p>
                  <p>Total: S/{(item.price * item.qty).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total a pagar: S/{total}</h3>
          </div>
        </>
      )}
    </div>
  );
}
