import React from "react";
import SingleCartProduct from "./SingleCartProduct";

const CartProducts = () => {
  return (
    <>
      <SingleCartProduct />
      <div className="title"> subtotal </div>
      <div className="title"> total </div>
    </>
  );
};

export default CartProducts;