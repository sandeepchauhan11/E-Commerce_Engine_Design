import React from 'react';
import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList.jsx';
import Cart from './components/Cart.jsx';
import './App.css'; 

const App = () => {
  return (
    <CartProvider>
      {/* 1. Sleek Navigation Bar */}
      <header className="app-header">
        <div className="header-container">
          <h1><span className="brand-icon">🛍️</span> Elite Cart</h1>
          <p className="header-tagline">Premium E-Commerce Engine</p>
        </div>
      </header>

      {/* 2. New Hero Banner with Background Image */}
      <section className="hero-banner">
        <div className="hero-overlay">
          <div className="hero-content">
            <h2>Elevate Your Style.</h2>
            <p>Discover our exclusive collection of premium clothing, jewelry, and electronics.</p>
            <a href="#shop" className="hero-btn">Shop Now</a>
          </div>
        </div>
      </section>

      {/* 3. Main Content Area */}
      <div className="app-container" id="shop">
        <main className="app-main">
          <div className="catalog-section">
            <ProductList />
          </div>
          
          <aside className="sidebar-section">
            <Cart />
          </aside>
        </main>
      </div>
    </CartProvider>
  );
};

export default App;