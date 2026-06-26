import React from 'react';
import './ProductCard.css'; 

const ProductCard = ({ product, onAddToCart }) => {
  const { id, title, price, image, rating } = product;

  return (
    <article className="product-card">
      <div className="product-card__image-container">
        <img 
          src={image} 
          alt={`Image of ${title}`} 
          loading="lazy" 
          className="product-card__image"
        />
      </div>
      
      <div className="product-card__details">
        <h3 className="product-card__title">{title}</h3>
        <p className="product-card__price">${price.toFixed(2)}</p>
        
        {rating && (
          <div className="product-card__rating" aria-label={`Rating: ${rating.rate} out of 5`}>
            ⭐ {rating.rate} ({rating.count} reviews)
          </div>
        )}
      </div>

      <button 
        className="product-card__btn-add"
        onClick={() => onAddToCart(product)}
        aria-label={`Add ${title} to cart`}
      >
        Add to Cart
      </button>
    </article>
  );
};

export default ProductCard;