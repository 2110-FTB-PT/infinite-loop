import React, { useState, useEffect } from "react";
import SingleCartProduct from "./SingleCartProduct";
import { fetchProductOrderById, fetchProductById, fetchOrder } from "../../axios-services";

const CartProducts = ({ cart }) => {
  const [shippingFee, setShippingFee] = useState(5.99);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);

  const handleCartTotal = async () => {
    const cartProductOrder = await fetchProductOrderById(cart.id);
    const cartOrder = await fetchOrder(cart.id);
    console.log("cartorder", cartOrder);
    if (checkDuplicateCartProduct(cartProducts, cartProductOrder)) {
      console.log("cartProducts", cartProducts);
      setCartProducts(cartProductOrder);
    }

    let productTotalSum = 0;
    for (let i = 0; i < cartProductOrder.length; i++) {
      const productId = cartProductOrder[i].productId;
      const cartProduct = await fetchProductById(productId);
      const productTotal = cartProductOrder[i].quantity * cartProduct.price * 1;
      productTotalSum += productTotal;
    }

    setSubTotal(productTotalSum);
    setTotal(productTotalSum + shippingFee);
  };

  const checkDuplicateCartProduct = (cartProducts, cartProductOrder) => {
    // populate a data structure with the current cardIds
    let currProdOrderIds = [];
    console.log("cartProducts", cartProducts);
    for (let productOrder of cartProducts) {
      //console.log(cart) // { id: 1, blah: 2 }
      currProdOrderIds.push(productOrder.id);
    }
    //console.log(currCartIds) // [ 1 ]

    // check for duplication
    for (let productOrder of cartProductOrder) {
      if (!currProdOrderIds.includes(productOrder.id)) {
        return true; // this means cart needs to be updated
      }
    }
    return false; // cart does not need to be updated
  };

  useEffect(() => {
    handleCartTotal();
  }, [cartProducts]);

  return (
    <>
      <SingleCartProduct
        cart={cart}
        checkDuplicateCartProduct={checkDuplicateCartProduct}
      />
      <div className="title"> Subtotal ${subTotal} </div>
      <div className="title"> Shipping ${shippingFee} </div>
      <div className="title"> Total ${total} </div>
    </>
  );
};

export default CartProducts;
