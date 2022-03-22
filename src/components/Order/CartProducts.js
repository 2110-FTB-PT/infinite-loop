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
      <SingleCartProduct
        cart={cart}
        setCart={setCart}
        handleAddToCart={handleAddToCart}
        cartProducts={cartProducts}
        setCartProducts={setCartProducts}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <div className="title"> subtotal </div>
      <div className="title"> total </div>
    </>
  );
};

export default CartProducts;
