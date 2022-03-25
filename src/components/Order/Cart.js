import React, { useEffect } from "react";
import "../../style/Cart.css";
import CartProducts from "./CartProducts";
import { updateOrder } from "../../axios-services";

const Cart = ({ cart, setCart, token, user }) => {
  console.log("cart", cart)
  const handleCartUser = async () => {
    if (token) {
      await updateOrder(token, cart.id, user.id, "", "");
    }
  };

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

  useEffect(() => {
    handleCartUser();
  }, [token]);

  return (
    <>
      <h2>Cart</h2>
      {Object.keys(cart).length ? (
        Object.keys(cart).length > 0 && (
          <>
            <CartProducts cart={cart} setCart={setCart} />
            <div className="checkout">
              <button className="checkout-button" onClick={handleSubmit}>
                continue to billing
              </button>
            </div>
          </>
        )
      ) : (
        <div> Oh no! Your cart is empty. </div>
      )}
    </>
  );
};

export default Cart;
