import React, { useState, useEffect } from "react";
import {
  fetchProductOrderById,
  fetchProductById,
  updateProductOrderById,
} from "../../axios-services";

const SingleCartProduct = ({ cart }) => {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  const handleCartProducts = async () => {
    // based on the orderId, grabbing all the products in an array
    const cartProductOrder = await fetchProductOrderById(cart.id);
    setCartProducts(cartProductOrder);

    let productsInfo = [];
    // for each product in Product Order, need to bring name and price by Product Id from Products Table and quantity from Product Order Table
    for (let i = 0; i < cartProductOrder.length; i++) {
      const productId = cartProductOrder[i].productId;
      const productOrderId = cartProductOrder[i].id;
      const cartProduct = await fetchProductById(productId);
      const productQty = cartProductOrder[i].quantity;
      productsInfo[i] = { productOrderId, cartProduct, productQty };
    }
    console.log("productsinfo", productsInfo);
    setProducts(productsInfo);
  };

  const handleIncreaseQty = async (productOrderId, cartProduct, productQty) => {
    const increasedProductQty = productQty + 1;
    const increasedProductOrder = await updateProductOrderById(
      productOrderId,
      increasedProductQty
    );
    setCartProducts(increasedProductOrder);
  };

  useEffect(() => {
    handleCartProducts();
  }, []);

  return (
    <>
      {products.map((productInfo) => {
        const { productOrderId, cartProduct, productQty } = productInfo;
        return (
          <>
            <div>
              <img className="cart-img" src={cartProduct.photo} />
            </div>
            <div>{cartProduct.name}</div>
            <div>Price ${cartProduct.price}</div>
            <div>
              <button>-</button>
              {productQty}
              <button
                onClick={() => {
                  handleIncreaseQty(productOrderId, cartProduct, productQty);
                }}
              >
                {" "}
                +{" "}
              </button>
            </div>
            <button> delete </button>
          </>
        );
      })}
    </>
  );
};

export default SingleCartProduct;
