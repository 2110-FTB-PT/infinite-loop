import React, { useState, useEffect } from "react";
import "../../style/Cart.css";
import { Elements } from "@stripe/react-stripe-js";
import { updateOrder, createPaymentIntent } from "../../axios-services";
import { useNavigate } from "react-router-dom";
import StripeModal from "./StripeModal";

const OrderForm = ({ cart, setCart, token, stripe }) => {
  const navigate = useNavigate();
  const [orderFormInfo, setOrderFormInfo] = useState({});
  const [clientSecret, setClientSecret] = useState("");

  const appearance = { theme: "stripe" };
  const options = { clientSecret, appearance };

  const handlePaymentIntent = async () => {
    const clientSecret = await createPaymentIntent({
      products: [{ price: 39, quantity: 1 }],
    });
    console.log("clientSecret", clientSecret);
    setClientSecret(clientSecret);
    if (cart.products) {
      const clientSecret = await createPaymentIntent(cart);
      console.log("clientSecret", clientSecret);
      setClientSecret(clientSecret);
    }
  };

  useEffect(() => {
    handlePaymentIntent();
  }, [cart]);

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

  // return (
  //   <div className="order-form">
  //     <div> Checkout </div>
  //     <form onSubmit={handleCreateOrder}>
  //       <input
  //         type="text"
  //         placeholder="first name*"
  //         onChange={(event) =>
  //           setOrderFormInfo({
  //             ...orderFormInfo,
  //             first_name: event.target.value,
  //           })
  //         }
  //         required
  //       />
  //       <input
  //         type="text"
  //         placeholder="last name*"
  //         onChange={(event) =>
  //           setOrderFormInfo({
  //             ...orderFormInfo,
  //             last_name: event.target.value,
  //           })
  //         }
  //         required
  //       />
  //       <input
  //         type="text"
  //         placeholder="email*"
  //         onChange={(event) =>
  //           setOrderFormInfo({ ...orderFormInfo, email: event.target.value })
  //         }
  //         required
  //       />
  //       <input
  //         type="text"
  //         placeholder="address*"
  //         onChange={(event) =>
  //           setOrderFormInfo({ ...orderFormInfo, address: event.target.value })
  //         }
  //         required
  //       />
  //       <button type="submit">Save and Continue</button>
  //       <button
  //         onClick={() => {
  //           navigate("/cart");
  //         }}
  //       >
  //         Cancel
  //       </button>
  //     </form>
  //   </div>
  // );
  return (
    <>
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
      {clientSecret && (
        <Elements options={options} stripe={stripe}>
          <StripeModal />
        </Elements>
      )}
    </>
  );
};

export default OrderForm;
