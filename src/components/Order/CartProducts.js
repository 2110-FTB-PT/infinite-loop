import React, { useState, useEffect } from "react";
import SingleCartProduct from "./SingleCartProduct";

const CartProducts = ({ cart, setCart, user}) => {
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);

  const handleCartTotal = async () => {
    let productTotalSum = 0;
    for (let i = 0; i < cart.products.length; i++) {
      const productTotal =
        cart.products[i].quantity * cart.products[i].price * 1;
      productTotalSum += productTotal;
      if (productTotalSum < 10) {
        setShippingFee(5.00);
      } else if (productTotalSum > 10 && productTotalSum < 100) {
        setShippingFee(10.00);
      } else if (productTotalSum > 100) {
       setShippingFee(25.00);
      }
    }
    setSubTotal(productTotalSum);
    setTotal(productTotalSum + shippingFee);
  };

  useEffect(() => {
    handleCartTotal();
  }, [cart]);

  return (
    <>
      {cart.products.length ? (
        cart.products.length > 0 && (
          <>
            <SingleCartProduct cart={cart} setCart={setCart} />
            <div className="title"> Subtotal ${subTotal} </div>
            <div className="title"> Shipping ${shippingFee} </div>
            <div className="title"> Total ${total} </div>
          </>
        )
      ) : (
        <div> Oh no! Your cart is empty. </div>
      )}
    </>
  );
};

export default CartProducts;
