// CartItem.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      // Remove the '$' symbol and convert to number
      const cost = parseFloat(item.cost.replace('$', ''));
      return total + (cost * item.quantity);
    }, 0).toFixed(2);
  };

  const handleContinueShopping = () => {
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-cost">Cost: {item.cost}</p>
              <p className="cart-item-subtotal">
                Subtotal: ${(parseFloat(item.cost.replace('$', '')) * item.quantity).toFixed(2)}
              </p>
              <div className="cart-item-quantity">
                <button className="cart-item-button" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h2>Total Amount: ${calculateTotalAmount()}</h2>
      </div>
    </div>
  );
};

export default CartItem;