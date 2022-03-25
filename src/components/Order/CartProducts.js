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
  const [cartProducts, setCartProducts] = useState([]);

  const handleCartTotal = async () => {
    try {
      const newOrder = await fetchOrder(cart.id);

      let productTotalSum = 0;
      for (let i = 0; i < newOrder.products[i].length; i++) {
        const productTotal =
          newOrder.products[i].quantity * newOrder.products[i].price * 1;
        productTotalSum += productTotal;
      }

      setSubTotal(productTotalSum);
      setTotal(productTotalSum + shippingFee);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleCartTotal();
  }, []);

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
