import React from "react";
import "../../style/Cart.css";
import CartProducts from "./CartProducts"

const Cart = () => {
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await fetch("/api/orders/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            { id: 1, quantity: 3 },
            { id: 2, quantity: 1 },
          ],
        }),
      });
      const { url } = await res.json();
      console.log("url", url);
      window.location = url;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h2>Cart</h2>
      <CartProducts />
      <div className="checkout">
        <button className="checkout-button" onClick={handleSubmit}>
          continue to billing
        </button>
      </div>
    </>
  );
};

export default Cart;
