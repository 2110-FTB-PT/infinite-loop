import React, { useEffect } from "react";
import { fetchProductOrderById } from "../../axios-services";

const SingleCartProduct = ({
  handleAddToCart,
  cart,
  setCart,
  cartProducts,
  setCartProducts,
}) => {
  console.log("singlecartProduct.js", cart);

  const handleCartProducts = async () => {
    const orderCartProducts = await fetchProductOrderById(cart.id);
    setCartProducts(orderCartProducts);
    console.log("orderCartProduct", orderCartProducts);
    for (let i=0; i<orderCartProducts.length; i++){
      const orderProductId = orderCartProducts[i].productId
     
    }
  };

  useEffect(() => {
    handleCartProducts();
  }, []);

  return (
    <>
    
      <div className="title"> product title </div>
      <div className="title"> price </div>
      <div>
        <button> + </button>
        quantity
        <button> - </button>
      </div>
      <button> delete </button>
    </>
  );
};

export default SingleCartProduct;
