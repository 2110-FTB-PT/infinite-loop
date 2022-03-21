import React from "react";
import { fetchProductOrderById } from "../../axios-services";

const SingleCartProduct = ({
  handleAddToCart,
  cart,
  setCart,
  cartProduct,
  setCartProduct,
}) => {
  console.log("singlecartProduct.js", cart);
  // const cartProduct = await fetchProductOrderById(cart.id);
  return (
    <>
      <div className="title"> product title </div>
      <div className="title"> price </div>
      <div>
        <button> + </button>
        quantity
        <button> - </button>
      </div>
      <button> delete </button>
    </>
  );
};

export default SingleCartProduct;
