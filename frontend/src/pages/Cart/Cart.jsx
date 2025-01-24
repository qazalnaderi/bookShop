import React, { useContext } from 'react';
import './Cart.css';
import { StorContext } from '../../context/StorContext';
import { useNavigate } from 'react-router-dom';

const Cart = ({ url = "http://localhost:8000" }) => {
  const { bookList, cartItems, removeCart, getTotalCartAmount } = useContext(StorContext);
  const navigate = useNavigate();

  const getImageUrl = (imageName) => {
    if (!imageName) return `${url}/uploads/placeholder.png`; 
    return `${url}/uploads/${imageName}`; 
  };

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {bookList.map((item) => {
          if (cartItems[item.book_id] > 0) {  
            return (
              <div key={item.book_id}>
                <div className="cart-items-title cart-items-item">
                  <img src={getImageUrl(item.image)} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item.book_id]}</p>
                  <p>${item.price * cartItems[item.book_id]}</p>
                  <p onClick={() => removeCart(item.book_id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            );
          }
          return null; 
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 20}</p> 
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</b> 
            </div>
          </div>
          <button onClick={() => navigate('/order')}>Proceed To Checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
