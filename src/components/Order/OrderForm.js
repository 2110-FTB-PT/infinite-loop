import React, { useState, useEffect } from "react";
import "../../style/Cart.css";
import { Elements } from "@stripe/react-stripe-js";
import { updateOrder, createPaymentIntent, checkoutOrder } from "../../axios-services";
import { useNavigate } from "react-router-dom";
import StripeModal from "./StripeModal";

const OrderForm = ({ cart, setCart, token, stripe }) => {
  const navigate = useNavigate();
  const [orderFormInfo, setOrderFormInfo] = useState({});
  const [clientSecret, setClientSecret] = useState("");
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(true);

  const appearance = { theme: "stripe" };
  const options = { clientSecret, appearance };

  const handlePaymentIntent = async () => {
    if (cart.products) {
      const clientSecret = await createPaymentIntent(cart);
      console.log("clientSecret", clientSecret);
      setClientSecret(clientSecret);
    } else {
      const clientSecret = await createPaymentIntent({
        products: [{ price: 39, quantity: 1 }],
      });
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
      setShowDeliveryInfo(false);

      //set orderstatus as payment pending
      await checkoutOrder(cart.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="order-form">
        {showDeliveryInfo && (
          <>
            <div> Checkout </div>
            <form>
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
                  setOrderFormInfo({
                    ...orderFormInfo,
                    email: event.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                placeholder="address*"
                onChange={(event) =>
                  setOrderFormInfo({
                    ...orderFormInfo,
                    address: event.target.value,
                  })
                }
                required
              />
              <button type="click" onClick={handleCreateOrder}>
                Continue to payment
              </button>
              <button
                onClick={() => {
                  navigate("/cart");
                }}
              >
                Cancel
              </button>
            </form>
          </>
        )}
      </div>
      {!showDeliveryInfo && clientSecret && (
        <Elements options={options} stripe={stripe}>
          <StripeModal
            showDeliveryInfo={showDeliveryInfo}
            setShowDeliveryInfo={setShowDeliveryInfo}
            cart={cart}
          />
        </Elements>
      )}
    </>
  );
};

export default OrderForm;
