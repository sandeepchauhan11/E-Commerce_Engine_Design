import React, { createContext, useReducer, useEffect } from 'react';

// 1. Define action types to avoid typos
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
};

// 2. The Reducer handles all the complex logic
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItemIndex = state.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex > -1) {
        
        const newState = [...state];
        newState[existingItemIndex].quantity += 1;
        return newState;
      }
      
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return state.filter(item => item.id !== action.payload.id);

    case CART_ACTIONS.UPDATE_QUANTITY: {
      if (action.payload.quantity < 1) return state; 
      
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    }

    case CART_ACTIONS.CLEAR_CART:
      return [];

    default:
      return state;
  }
};


export const CartContext = createContext();


export const CartProvider = ({ children }) => {
  
  const initialState = JSON.parse(localStorage.getItem('ecommerce_cart')) || [];
  
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  
  useEffect(() => {
    localStorage.setItem('ecommerce_cart', JSON.stringify(cart));
  }, [cart]);

  
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, dispatch, cartTotal, itemCount, CART_ACTIONS }}>
      {children}
    </CartContext.Provider>
  );
};