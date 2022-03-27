import React, { useState } from "react";
import "../../style/Cart.css";
import { updateOrder, postPayment } from "../../axios-services";
import { useNavigate } from "react-router-dom";

const OrderForm = ({ cart, setCart, token }) => {
  const navigate = useNavigate();
  const [orderFormInfo, setOrderFormInfo] = useState({});

  const handleCreateOrder = async (event) => {
    try {
      event.preventDefault();
      const newUpdatedOrder = await updateOrder(token, cart.id, orderFormInfo);
      setCart(newUpdatedOrder);
      console.log("newUpdatedOrder", newUpdatedOrder);
      console.log("orderformcart", cart);
      navigate("/payment");
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
          placeholder="first name*"
          onChange={(event) =>
            setOrderFormInfo({
              ...orderFormInfo,
              first_name: event.target.value,
            })
          }
          required
        />
        <input
          type="text"
          placeholder="last name*"
          onChange={(event) =>
            setOrderFormInfo({
              ...orderFormInfo,
              last_name: event.target.value,
            })
          }
          required
        />
        <input
          type="text"
          placeholder="email*"
          onChange={(event) =>
            setOrderFormInfo({ ...orderFormInfo, email: event.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="address*"
          onChange={(event) =>
            setOrderFormInfo({ ...orderFormInfo, address: event.target.value })
          }
          required
        />
        <button type="submit">Save and Continue</button>
        <button
          onClick={() => {
            navigate("/cart");
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
