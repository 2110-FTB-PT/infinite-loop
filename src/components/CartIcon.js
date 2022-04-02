import React from "react";

const CartIcon = ({ products }) => {
  let totalProductQty;

  for (let i = 0; i < products.length; i++) {
    totalProductQty += products[i].quantity;
  }

  return <div>{totalProductQty}</div>;
};

export default CartIcon;
