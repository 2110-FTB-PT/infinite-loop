import React, { useState, useEffect } from "react";
import { fetchProductOrderById, fetchProductById } from "../../axios-services";

const SingleCartProduct = ({ cart }) => {
  console.log("singlecartProduct.js", cart);
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  const handleCartProducts = async () => {
    // based on the orderId, grabbing all the products in an array!
    const cartProductOrder = await fetchProductOrderById(cart.id);
    setCartProducts(cartProductOrder);
    console.log("cartProductOrder", cartProductOrder);
    let productsInfo = [];

    // for each product in Product Order, need to bring name and price by Product Id from Products Table and quantity from Product Order Table
    for (let i = 0; i < cartProductOrder.length; i++) {
      const productId = cartProductOrder[i].productId;
      const cartProduct = await fetchProductById(productId);
      const productQty = cartProductOrder[i].quantity;
      productsInfo[i] = { cartProduct, productQty };
      console.log("cartProduct", cartProduct);
    }
    console.log("productsInfo", productsInfo);
    setProducts(productsInfo);
  };

  useEffect(() => {
    handleCartProducts();
  }, []);

  return (
    <>
      {products.map((productInfo) => {
        const { cartProduct, productQty } = productInfo;
        return (
          <>
            <div>{cartProduct.name}</div>
            <div>Price ${cartProduct.price}</div>
            <div>
              <button> + </button>
              {productQty}
              <button> - </button>
            </div>
          </>
        );
      })}
      <button> delete </button>
    </>
  );
};

export default SingleCartProduct;
