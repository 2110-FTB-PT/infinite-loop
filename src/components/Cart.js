import React from "react";

const Cart = () => {
  const handleSubmit = async (event) => {
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
    const fetchObj = await res.json();
    console.log("fetchObj", fetchObj);
  };
  return (
    <>
      <button className="checkout-button" onClick={handleSubmit}>
        checkout
      </button>
    </>
  );
};

export default Cart;
