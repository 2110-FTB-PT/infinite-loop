import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "../../style/Orders.css";

const StripeModal = ({ cart, token }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="stripe-modal">
      <div>Payment</div>
      <form>
        <PaymentElement id="payment-element" />
        <button> Confirm </button>
      </form>
    </div>
  );
};

export default StripeModal;
