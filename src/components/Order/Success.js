import React, { useState, useEffect } from "react";
import "../../style/Orders.css";
import { confirmOrder, fetchOrder } from "../../axios-services";

const Success = ({ cart }) => {
  const handleConfirmOrder = async () => {
    await confirmOrder(cart.id);
  };

  useEffect(() => {
    handleConfirmOrder();
  });

  return (
    <>
      <div className="success"> We've got your order!</div>
      <div>Order number #{cart.id} </div>
      <div> {} </div>
      <div></div>
    </>
  );
};
export default Success;
