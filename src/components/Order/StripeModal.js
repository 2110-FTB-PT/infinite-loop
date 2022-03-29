import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../../style/Orders.css";

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
        //TODO: change local
        return_url: `http://localhost:4001/order/confirm/${cart.id}`,
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
    <div className="stripe-modal">
      <div>Payment</div>
      <form onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        {isLoading && (
          <div>
            Please do not refresh the page and wait while we are processing your
            payment. This can take a few minutes.
          </div>
        )}
        <button
          disabled={isLoading || !stripe || !elements || showDeliveryInfo}
          id="submit"
        >
          <span id="button-text">{"Pay now"}</span>
        </button>
        <button
          onClick={() => {
            setShowDeliveryInfo(!showDeliveryInfo);
          }}
        >
          cancel
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
};

export default StripeModal;
