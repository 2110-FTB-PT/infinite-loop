import React, { useState, useEffect } from "react";
import { fetchProductOrderById, fetchProductById } from "../../axios-services";

const SingleCartProduct = ({
  handleAddToCart,
  cart,
  setCart,
  cartProducts,
  setCartProducts,
}) => {
  console.log("singlecartProduct.js", cart);
  const [products, setProducts] = useState({});
  const [productQuantity, setProductQuantity] = useState(1);

  const handleCartProducts = async () => {
    const orderCartProducts = await fetchProductOrderById(cart.id);
    setCartProducts(orderCartProducts);
    console.log("orderCartProduct", orderCartProducts);
    for (let i = 0; i < orderCartProducts.length; i++) {
      const orderProductId = orderCartProducts[i].productId;
      setProductQuantity(orderCartProducts[i].quantity);
      const fetchedProduct = await fetchProductById(orderProductId);
      console.log("fetchedProduct", fetchedProduct);
      setProducts(fetchedProduct);
    }
  };

  useEffect(() => {
    handleCartProducts();
  }, []);

  return (
    <>
      <div className="productTitle"> {`${products.name}`} </div>
      <div className="productPrice"> Price ${`${products.price}`} </div>
      <div>
        <button> + </button>
        {`${productQuantity}`}
        <button> - </button>
      </div>
      <button> delete </button>
    </>
  );
};

export default SingleCartProduct;
