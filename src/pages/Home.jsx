import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FaMobileAlt, FaGem, FaMale, FaFemale, FaCartPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/Home.css';

const categories = [
  { id: 'electronics', name: 'Electrónica', icon: <FaMobileAlt size={48} color="#2980b9" /> },
  { id: 'jewelery', name: 'Joyería', icon: <FaGem size={48} color="#2980b9" /> },
  { id: "men's clothing", name: 'Ropa Hombre', icon: <FaMale size={48} color="#2980b9" /> },
  { id: "women's clothing", name: 'Ropa Mujer', icon: <FaFemale size={48} color="#2980b9" /> },
];

const carouselImages = [
  'https://static.vecteezy.com/system/resources/previews/003/776/458/non_2x/super-sale-blue-banner-offer-template-marketing-poster-for-magazine-advertising-discount-sales-shops-email-newsletters-free-vector.jpg',
  'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/WZTAFSHPXZCIBAMTAE4BLXL3S4.jpg',
  'https://minisitios.ripley.com.pe/minisitios/promociones-y-ofertas-ripley/images/descuentos/v2/5.jpg',
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const filteredProducts = filteredCategory
    ? products.filter(product => product.category === filteredCategory)
    : products;

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando productos...</p>;

  return (
    <div className="home-container">
      {/* Carrusel */}
      <div className="carousel-container">
        <Slider {...sliderSettings}>
          {carouselImages.map((url, idx) => (
            <div key={idx}>
              <img src={url} alt={`Promo ${idx + 1}`} className="carousel-image" />
            </div>
          ))}
        </Slider>
      </div>

      {/* Categorías clickeables */}
      <h2>Categorías</h2>
      <div className="categories">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setFilteredCategory(null)}
          onKeyDown={(e) => { if (e.key === 'Enter') setFilteredCategory(null); }}
          className={`category-card ${!filteredCategory ? 'active' : ''}`}
          aria-pressed={!filteredCategory}
        >
          <div className="category-icon" style={{ fontSize: 48, color: '#2980b9' }}>🛒</div>
          <p>Todas</p>
        </div>

        {categories.map(cat => (
          <div
            key={cat.id}
            role="button"
            tabIndex={0}
            onClick={() => setFilteredCategory(cat.id)}
            onKeyDown={(e) => { if (e.key === 'Enter') setFilteredCategory(cat.id); }}
            className={`category-card ${filteredCategory === cat.id ? 'active' : ''}`}
            aria-pressed={filteredCategory === cat.id}
          >
            <div className="category-icon">{cat.icon}</div>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>

      {/* Productos */}
      <h2>Productos</h2>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>S/{product.price.toFixed(2)}</p>
              <div className="btn-container">
                <Link to={`/product/${product.id}`} className="btn">Ver detalle</Link>
                <button
                  className="btn-add"
                  onClick={() => addToCart(product)}
                  aria-label={`Agregar ${product.title} al carrito`}
                >
                  <FaCartPlus style={{ marginRight: 6 }} /> + Agregar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos en esta categoría.</p>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 E-Shop. Todos los derechos reservados.</p>
          <nav className="footer-nav">
            <Link to="/about">Nosotros</Link>
            <Link to="/contact">Contacto</Link>
            <Link to="/terms">Términos y condiciones</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
