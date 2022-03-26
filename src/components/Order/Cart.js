import React from "react";
import "../../style/Cart.css";
import CartProducts from "./CartProducts";

const Cart = ({ cart, setCart, token, user }) => {
  return (
    <>
      <h2>Cart</h2>
      {Object.keys(cart).length ? (
        Object.keys(cart).length > 0 && (
          <>
            <CartProducts cart={cart} setCart={setCart} />
          </>
        )
      ) : (
        <div> Oh no! Your cart is empty. </div>
      )}
    </>
  );
};

export default Cart;
