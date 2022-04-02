import React from "react";
import "../../style/Cart.css";
import CartProducts from "./CartProducts";
import { Link } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
  return (
    <div className='cart-container'>
      <div className='cart-content-container'>
        <div className='cart-header'>Cart</div>
        {Object.keys(cart).length ? (
          Object.keys(cart).length > 0 && (
            <>
              <CartProducts cart={cart} setCart={setCart}/>
            </>
          )
        ) : (
          <div className='cart-message'> Oh no! Your cart is empty.</div>
        )}
        <div className='cart-buttons-inline-container'>
          <Link to='/shopall' style={{ textDecoration: "none" }}>
            <button className='cart-secondary-button'>Continue shopping</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
