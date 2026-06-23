import React from 'react';
import { useCart } from '../hooks/useCart';
import './Cart.css'; // Your styling file

const Cart = () => {
  const { cart, dispatch, cartTotal, CART_ACTIONS } = useCart();

  if (cart.length === 0) {
    return <div className="cart-empty">Your cart is currently empty.</div>;
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item__img" />
            
            <div className="cart-item__details">
              <h4>{item.title}</h4>
              <p>${item.price.toFixed(2)}</p>
            </div>

            <div className="cart-item__actions">
              <button 
                aria-label="Decrease quantity"
                onClick={() => dispatch({ 
                  type: CART_ACTIONS.UPDATE_QUANTITY, 
                  payload: { id: item.id, quantity: item.quantity - 1 } 
                })}
              >
                -
              </button>
              
              <span className="cart-item__quantity">{item.quantity}</span>
              
              <button 
                aria-label="Increase quantity"
                onClick={() => dispatch({ 
                  type: CART_ACTIONS.UPDATE_QUANTITY, 
                  payload: { id: item.id, quantity: item.quantity + 1 } 
                })}
              >
                +
              </button>
            </div>

            <button 
              className="cart-item__remove"
              aria-label={`Remove ${item.title} from cart`}
              onClick={() => dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { id: item.id } })}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <h3>Total: ${cartTotal.toFixed(2)}</h3>
        <button 
          className="cart-checkout-btn"
          onClick={() => alert("Proceeding to checkout!")}
        >
          Checkout
        </button>
        <button 
          className="cart-clear-btn"
          onClick={() => dispatch({ type: CART_ACTIONS.CLEAR_CART })}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;