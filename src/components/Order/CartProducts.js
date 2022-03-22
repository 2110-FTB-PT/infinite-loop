import React from "react";
import SingleCartProduct from "./SingleCartProduct";

const CartProducts = ({
  cart,
  setCart,
  handleAddToCart,
  cartProducts,
  setCartProducts,
  quantity,
  setQuantity,
}) => {
  return (
    <>
      <SingleCartProduct cart={cart} />
      <div className="title"> subtotal </div>
      <div className="title"> total </div>
    </>
  );
};

export default CartProducts;
