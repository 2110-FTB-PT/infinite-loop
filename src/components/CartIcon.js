import React from "react";

const CartIcon = ({ cart }) => {
  let totalProductQty = 0;
  if (cart && cart.products) {
    for (let i = 0; i < cart.products.length; i++) {
      totalProductQty += cart.products[i].quantity;
    }
    console.log("totalProductQty", totalProductQty);
  }

  return <> {totalProductQty !== 0 ? <div>{totalProductQty}</div> : null}</>;
};

export default CartIcon;
