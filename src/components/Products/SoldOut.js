import React from "react";

const SoldOut = ({ product }) => {
  return (
    <>
      <div>
        {product.quantity < 5 ? (
          <div> Hurry! Only {product.quantity} left in stock! </div>
        ) : null}
      </div>
    </>
  );
};

export default SoldOut;
