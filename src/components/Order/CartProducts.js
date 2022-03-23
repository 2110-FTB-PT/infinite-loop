import React, { useState, useEffect } from "react";
import SingleCartProduct from "./SingleCartProduct";
import { fetchProductOrderById, fetchProductById } from "../../axios-services";

const CartProducts = ({ cart }) => {
  const [shippingFee, setShippingFee] = useState(5.99);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const handleCartTotal = async () => {
    const cartProductOrder = await fetchProductOrderById(cart.id);

    let productTotalSum = 0;
    for (let i = 0; i < cartProductOrder.length; i++) {
      const productId = cartProductOrder[i].productId;
      const cartProduct = await fetchProductById(productId);
      const productTotal = cartProductOrder[i].quantity * cartProduct.price * 1;
      productTotalSum += productTotal;
    }

    setSubTotal(productTotalSum);
    setTotal(productTotalSum + shippingFee);
  };

  useEffect(() => {
    handleCartTotal();
  }, []);

  return (
    <>
      <SingleCartProduct cart={cart} />
      <div className="title"> Subtotal ${subTotal} </div>
      <div className="title"> Shipping ${shippingFee} </div>
      <div className="title"> Total ${total} </div>
    </>
  );
};

export default CartProducts;