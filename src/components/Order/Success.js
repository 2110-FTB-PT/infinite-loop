import React, { useState, useEffect } from "react";
import "../../style/Orders.css";
import {
  confirmOrder,
  createGuestCart,
  fetchOrder,
  updateProductQuantity,
} from "../../axios-services";
import { useParams } from "react-router-dom";
import "../../style/Cart.css";

const Success = ({ cart, setCart }) => {
  const { orderId } = useParams();
  const [confirmedOrder, setConfirmedOrder] = useState({});
  const [total, setTotal] = useState(0);

  const handleConfirmStatus = async () => {
    await confirmOrder(orderId);
  };

  const handleProductQuantityUpdate = async () => {
    const successfulOrder = await fetchOrder(orderId);
    for (let i = 0; i < successfulOrder.products.length; i++) {
      const orderedProduct = successfulOrder.products[i];
      const deductedQuantity = successfulOrder.products[i].quantity;
      await updateProductQuantity(orderedProduct.id, deductedQuantity);
    }
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

  const handleCart = async () => {
    const successfulOrder = await fetchOrder(orderId);
    if (successfulOrder.userId === 1) {
      const newCart = await createGuestCart();
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const handleDisplay = async () => {
    if (cart.id) {
      await handleConfirmStatus();
      await handleConfirmOrder();
      await handleProductQuantityUpdate();
    }
  };

  useEffect(() => {
    handleDisplay();
  }, [cart]);

  useEffect(() => {
    handleCart();
  }, []);

  return (
    <>
      <div className='cart-container'>
        <div className='cart-content-container'>
          <div className='cart-header'>Your order has been placed!</div>

          <div className='cart-order-info'>
            <div>
              Thank you, {confirmedOrder.first_name}. Once the order is ready to
              ship, you'll receive an email with tracking information.
            </div>
            <br></br>
            <div>Order Number: {confirmedOrder.id}</div>
            <div>First Name: {confirmedOrder.first_name}</div>
            <div>Last Name: {confirmedOrder.last_name}</div>
            <div>Email: {confirmedOrder.email}</div>
            <div>Address: {confirmedOrder.address}</div>
          </div>
          <div className='products'>
            {confirmedOrder.products &&
              confirmedOrder.products.map((product) => {
                const { name, photo, quantity, price } = product;
                return (
                  <>
                    <div>
                      <img className='cart-img' src={photo} />
                      <div className='cart-product-header'>{name}</div>
                      <div className='cart-product-price'>
                        Quantity: {quantity}
                      </div>
                      <div className='cart-product-price'>Price: ${price}</div>
                    </div>
                  </>
                );
              })}
          </div>
          <div className='cart-product-total'>Total: ${total}</div>
        </div>
      </div>
    </>
  );
};
export default Success;
