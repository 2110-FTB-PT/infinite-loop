import React, { useState, useEffect } from "react";
import SingleCartProduct from "./SingleCartProduct";
import { useNavigate } from "react-router-dom";
import "../../style/Cart.css";

const CartProducts = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);

  const handleCartTotal = async () => {
    let productTotalSum = 0;
    let _shippingFee = 0;
    for (let i = 0; i < cart.products.length; i++) {
      const productTotal =
        cart.products[i].quantity * cart.products[i].price * 1;
      productTotalSum += productTotal;
      if (productTotalSum < 10) {
        setShippingFee(5.0);
        _shippingFee = 5.0;
      } else if (productTotalSum >= 10 && productTotalSum <= 100) {
        setShippingFee(10.0);
        _shippingFee = 10.0;
      } else if (productTotalSum > 100) {
        setShippingFee(25.0);
        _shippingFee = 25.0;
      }
    }
    setSubTotal(productTotalSum);
    setTotal(productTotalSum + _shippingFee);
  };

  useEffect(() => {
    if (cart.products && cart.products.length) {
      handleCartTotal();
    }
  }, [cart]);

  return (
    <>
      {cart.products && cart.products.length ? (
        <>
          <SingleCartProduct cart={cart} setCart={setCart} />
          <div className="cart-product-price"> Subtotal ${subTotal} </div>
          <div className="cart-product-price"> Shipping ${shippingFee} </div>
          <div className="cart-product-total"> Total ${total} </div>
          <div className="cart-buttons-inline-container">

            <button
              className="cart-primary-button"
              onClick={() => {
                navigate("/checkout");
              }}
            >
              Continue to checkout
            </button>
          </div>
        </>
      ) : (
        <div className="cart-message"> Oh no! Your cart is empty. </div>
      )}
    </>
  );
};

export default CartProducts;
