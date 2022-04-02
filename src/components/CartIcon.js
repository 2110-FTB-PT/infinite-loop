import React from "react";
import "../style/Navigation.css";

const CartIcon = ({ cart }) => {
  let totalProductQty = 0;
  if (cart && cart.products) {
    for (let i = 0; i < cart.products.length; i++) {
      totalProductQty += cart.products[i].quantity;
    }
  }

  return (
    <>
      {totalProductQty !== 0 ? (
        <div className="cart-product-qty-circle">{totalProductQty}</div>
      ) : null}
    </>
  );
};

export default CartIcon;
