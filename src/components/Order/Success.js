import React, { useState, useEffect } from "react";
import "../../style/Orders.css";
import { confirmOrder, fetchOrder } from "../../axios-services";

const Success = ({ cart }) => {
  const [confirmedOrder, setConfirmedOrder] = useState({});
  const handleConfirmStatus = async () => {
    await confirmOrder(cart.id);
  };

  const handleConfirmOrder = async () => {
    const successfulOrder = await fetchOrder(cart.id);
    setConfirmedOrder(successfulOrder);
  };

  const handleDisplay = async () => {
    if (cart.id) {
      await handleConfirmStatus();
      await handleConfirmOrder();
    }
  };

  useEffect(() => {
    handleDisplay();
  }, [cart]);

  return (
    <>
      <div className="success">Thanks {confirmedOrder.first_name}!</div>
      <div>We've got your order!</div>
      <div>Order number #{confirmedOrder.id} </div>
      <div>
        <div>First Name: {confirmedOrder.first_name} </div>
        <div>Last Name: {confirmedOrder.last_name} </div>
        <div>Address: {confirmedOrder.address} </div>
        <div>Email:{confirmedOrder.email} </div>
      </div>
    </>
  );
};
export default Success;
