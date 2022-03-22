import React, { useState, useEffect } from "react";
import { fetchProductOrderById, fetchProductById } from "../../axios-services";

const SingleCartProduct = ({
  handleAddToCart,
  cart,
  setCart,
  cartProducts,
  setCartProducts,
  quantity,
  setQuantity,
}) => {
  console.log("singlecartProduct.js", cart);
  const [products, setProducts] = useState([]);
  const [productQuantity, setProductQuantity] = useState(1);

  const handleCartProducts = async () => {
    // based on the orderId, grabbing all the products in an array!
    const orderCartProducts = await fetchProductOrderById(cart.id);
    setCartProducts(orderCartProducts);
    console.log("orderCartProduct", orderCartProducts);
    for (let i = 0; i < orderCartProducts.length; i++) {
      const orderProductId = orderCartProducts[i].productId;
      setProductQuantity(orderCartProducts[i].quantity);
      const fetchedProduct = await fetchProductById(orderProductId);
      console.log("fetchedProduct", fetchedProduct);
      setProducts([fetchedProduct]);
    }
  };

  useEffect(() => {
    handleCartProducts();
  }, []);

  return (
    <>
      {products.map((product) => {
        const { name, price } = product;
        return (
          <>
            <div>{name}</div>
            <div>Price ${price}</div>
          </>
        );
      })}
      <div>
        <button> + </button>
        {/* {cartProducts.map((cartProduct)=>{
          const {quantity} = cartProduct;
          return (
            <>
              <div>{quantity}</div>
            </>
          )
        })} */}
        {/* {`${productQuantity}`} */}
        <button> - </button>
      </div>
      <button> delete </button>
    </>
  );
};

export default SingleCartProduct;
