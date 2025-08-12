# Proyecto Final Ecommerce

## 📖 Descripción del Proyecto

Este proyecto es una **aplicación de ecommerce** construida con **React**, que permite a los usuarios:

- Visualizar productos.
- Ver el detalle de cada producto.
- Agregar productos al carrito con cantidades dinámicas.
- Registrarse e iniciar sesión.
- Administrar el carrito desde cualquier parte de la app.
- Ver una página de administración (básica).

El objetivo fue aprender a manejar **React con Router, Context API, localStorage, despliegue en GitHub Pages y diseño responsivo** con CSS moderno.

---

## 🛠️ Funcionalidades Desarrolladas

### 🔐 Autenticación (Login / Registro)
- Se creó un contexto de autenticación con `AuthContext`.
- El **registro** guarda nombre y correo en `localStorage`.
- El **login** verifica si el usuario existe comparando los datos con `localStorage`.
- Si el usuario no existe, muestra una alerta.

### 🛒 Carrito de compras
- Se implementó el `CartContext` usando Context API.
- El carrito permite agregar productos con una cantidad personalizada.
- Si se agrega un producto que ya está en el carrito, se **incrementa la cantidad** correctamente.
- El carrito es accesible desde cualquier parte de la aplicación gracias al uso de contextos.

### 🧾 Detalles del producto
- Página que muestra información completa de un producto.
- Permite seleccionar la cantidad antes de agregarlo al carrito.

---

## 🎨 Estilos y UI

- Se utilizaron **formularios modernos y centrados**, con bordes redondeados, sombras y fuentes legibles.
- Cada campo de entrada tiene **íconos de FontAwesome** (ej: usuario, correo, etc.).
- Estilos personalizados para login y registro (`Login.css`, `Register.css`).
- Diseño centrado y adaptable a diferentes tamaños de pantalla.

---

## 🚀 Despliegue en GitHub Pages

1. Se instaló la dependencia:
   ```bash
   npm install gh-pages --save-dev
