import React, { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const StripeModal = ({ cart, token }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <PaymentElement id="payment-element" />
    </>
  );
};

export default StripeModal;
