import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import ProductCard from './ProductCard.jsx';
import './ProductList.css'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // NEW: State for our category filter
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { dispatch, CART_ACTIONS } = useCart();

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://fakestoreapi.com/products', {
          signal: controller.signal
        });

        if (!response.ok) throw new Error('HTTP error!');

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err.name !== 'AbortError') setError('Failed to load products.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort(); 
  }, []);

  const handleAddToCart = (product) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { id: product.id, title: product.title, price: product.price, image: product.image },
    });
  };

  // NEW: Dynamically generate categories from the API data
  const categories = ['all', ...new Set(products.map(item => item.category))];

  // NEW: Filter the products before we map over them
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  if (isLoading) return <div className="loader">Loading fresh products...</div>;
  if (error) return <div className="error-state">{error}</div>;

  return (
    <section className="product-listing">
      <div className="product-listing__header">
        <h2>Featured Collection</h2>
        
        {/* NEW: The Category Dropdown UI */}
        <div className="category-filter">
          <label htmlFor="category-select">Filter by: </label>
          <select 
            id="category-select" 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;