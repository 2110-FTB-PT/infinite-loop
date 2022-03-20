import React from "react";

const SingleCartProduct = ({
  handleAddToCart,
  cart,
  setCart,
  cartProduct,
  setCartProduct,
}) => {
  
  return (
    <>
      <div className="title"> product title </div>
      <div className="title"> price </div>
      <div> quantity button </div>
      <div> delete button </div>
    </>
  );
};

export default SingleCartProduct;
