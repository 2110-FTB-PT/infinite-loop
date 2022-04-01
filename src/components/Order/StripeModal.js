import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../../style/Orders.css";
import { orderPendingOrder } from "../../axios-services";

const StripeModal = ({ showDeliveryInfo, setShowDeliveryInfo, cart }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: process.env.REACT_APP_CLIENT_URL
          ? `${process.env.REACT_APP_CLIENT_URL}/order/confirm/${cart.id}`
          : `http://localhost:4001/order/confirm/${cart.id}`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }
    setIsLoading(false);
  };

  return (
    <div className='stripe-modal'>
      <div className='cart-product-total'>Payment</div>
      <form onSubmit={handleSubmit}>
        <PaymentElement id='payment-element' />
        {isLoading && (
          <div>
            Please do not refresh the page and wait while we are processing your
            payment. This can take a few minutes.
          </div>
        )}{" "}
        <div className='cart-buttons-inline-container'>
          <button
            className='cart-primary-button'
            disabled={isLoading || !stripe || !elements || showDeliveryInfo}
            id='submit'
          >
            <span id='button-text'>{"Pay now"}</span>
          </button>
          <button
            className='cart-secondary-button'
            onClick={async () => {
              setShowDeliveryInfo(!showDeliveryInfo);
              await orderPendingOrder(cart.id);
            }}
          >
            Cancel
          </button>
        </div>
        {message && <div id='payment-message'>{message}</div>}
      </form>
    </div>
  );
};

export default StripeModal;
