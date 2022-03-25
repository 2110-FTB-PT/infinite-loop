import React, { useState, useEffect } from "react";
import SingleCartProduct from "./SingleCartProduct";
import {
  fetchProductOrderById,
  fetchProductById,
  fetchOrder,
} from "../../axios-services";

const CartProducts = ({ cart, setCart }) => {
  const [shippingFee, setShippingFee] = useState(5.99);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const handleCartTotal = async () => {
    console.log("something");
    console.log("cart", cart);
    let productTotalSum = 0;
    for (let i = 0; i < cart.products.length; i++) {
      const productTotal =
        cart.products[i].quantity * cart.products[i].price * 1;
      console.log("productTotal", productTotal);
      productTotalSum += productTotal;
    }
    setSubTotal(productTotalSum);
    setTotal(productTotalSum + shippingFee);
  };

  useEffect(() => {
    handleCartTotal();
  }, [cart]);

  return (
    <>
      <SingleCartProduct cart={cart} setCart={setCart} />
      <div className="title"> Subtotal ${subTotal} </div>
      <div className="title"> Shipping ${shippingFee} </div>
      <div className="title"> Total ${total} </div>
    </>
  );
};

export default CartProducts;
