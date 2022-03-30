import React, { useState, useEffect } from "react";
import "../../style/Orders.css";
import { confirmOrder, fetchOrder } from "../../axios-services";
import { useParams } from "react-router-dom";

const Success = ({ cart }) => {
  const { orderId } = useParams();
  const [confirmedOrder, setConfirmedOrder] = useState({});
  const [total, setTotal] = useState(0);

  const handleConfirmStatus = async () => {
    await confirmOrder(orderId);
  };

  const handleConfirmOrder = async () => {
    const successfulOrder = await fetchOrder(orderId);
    setConfirmedOrder(successfulOrder);
    let totalSum = 0;
    for (let i = 0; i < successfulOrder.products.length; i++) {
      totalSum +=
        successfulOrder.products[i].price *
        successfulOrder.products[i].quantity;
      if (totalSum < 10) {
        totalSum += 5;
      } else if (totalSum >= 10 && totalSum <= 100) {
        totalSum += 10;
      } else if (totalSum > 100) {
        totalSum += 25;
      }
    }
    setTotal(totalSum);
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
      <div>We've received your order!</div>
      <div>Your order number is {confirmedOrder.id} </div>
      <div>
        <div>First Name: {confirmedOrder.first_name} </div>
        <div>Last Name: {confirmedOrder.last_name} </div>
        <div>Email:{confirmedOrder.email} </div>
        <div>Address: {confirmedOrder.address} </div>
      </div>
      <div className="products">
        {confirmedOrder.products &&
          confirmedOrder.products.map((product) => {
            const { name, photo, quantity, price } = product;
            return (
              <>
                <div>
                  <div> Product: {name} </div>
                  <div>
                    <img src={photo} />
                  </div>
                  <div> Quantity: {quantity} </div>
                  <div> Price: ${price} </div>
                </div>
              </>
            );
          })}
      </div>
      <div>Total: ${total}</div>
    </>
  );
};
export default Success;
