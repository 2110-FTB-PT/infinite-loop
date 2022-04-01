import React from "react";

const SoldOut = ({ product }) => {
  return (
    <>
      <div>
        {product.quantity < 5 && product.quantity > 0 ? (
          <div> Hurry! Only {product.quantity} left in stock! </div>
        ) : null}
        {product.quantity <= 0 ? (
          <div> Sorry, this item is unavailable. </div>
        ) : null}
      </div>
    </>
  );
};

export default SoldOut;
