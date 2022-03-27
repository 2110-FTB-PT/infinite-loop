import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import { getStripe } from "../../axios-services";

const StripeModal = ({ cart, token }) => {
  const navigate = useNavigate();
  const onToken = (stripeToken) => {
    const stripe = async () => {
      try {
        if (stripeToken) {
          await getStripe(stripeToken, cart.id);
          //where you will set the order to successful
          navigate("/"); //navigate to order success page once that's ready
        }
      } catch (error) {
        console.error(error);
      }
    };
    stripe();
  };

  return (
    <>
      <StripeCheckout
        token={onToken}
        stripeKey={
          "pk_test_51KeW7BHBUwrPthfGhuHzQpbGRvWgrWD7r62nIDAZOuHFVnrZZfsMprUJdAjgOUdx6UGSjqSApjzMpBAHB8I4fpvW00BfY8Qp7O"
        }
        billingAddress
      />
    </>
  );
};

export default StripeModal;
