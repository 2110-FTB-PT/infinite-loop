import React, { useState } from "react";

const SoldOut = () => {
  const [productQty, setProductQty] = useState(1);
  return (
    <>
      <div> Hurry! Only 1 left in stock! </div>
    </>
  );
};

export default SoldOut;
