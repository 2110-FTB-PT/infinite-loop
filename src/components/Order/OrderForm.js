import React, { useState } from "react";
import "../../style/Cart.css";
import { updateOrder } from "../../axios-services";

const OrderForm = ({ cart }) => {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleCreateOrder = async (event) => {
    try {
      event.preventDefault();
      const newUpdatedOrder = await updateOrder(cart.id, email, address);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="order-form">
      <div> Checkout </div>
      <form onSubmit={handleCreateOrder}>
        <input
          type="text"
          placeholder="email*"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          type="text"
          placeholder="address*"
          onChange={(event) => setAddress(event.target.value)}
          required
        />
        <button>Save and Continue</button>
        <button>Cancel</button>
      </form>
    </div>
  );
};

export default OrderForm;
