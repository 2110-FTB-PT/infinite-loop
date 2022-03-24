import React, { useState, useEffect } from "react";
import {
  updateProductOrderById,
  deleteProductOrderById,
  fetchOrder,
} from "../../axios-services";

const SingleCartProduct = ({ cart }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [products, setProducts] = useState([]);

  const handleCartProducts = async () => {
    const cartOrder = await fetchOrder(cart.id);
    setProducts(cartOrder.products);
  };

  const handleIncreaseQty = async (productOrderId, quantity) => {
    const increasedProductQty = quantity + 1;
    const increasedProductOrder = await updateProductOrderById(
      productOrderId,
      increasedProductQty
    );
    setCartProducts(increasedProductOrder);
  };

  const handleDecreaseQty = async (productOrderId, quantity) => {
    const decreasedProductQty = quantity - 1;
    const decreasedProductOrder = await updateProductOrderById(
      productOrderId,
      decreasedProductQty
    );
    setCartProducts(decreasedProductOrder);
  };

  const handleDeleteProductOrder = async (productOrderId) => {
    const deletedProductOrder = await deleteProductOrderById(productOrderId);
    setCartProducts(deletedProductOrder);
  };

  useEffect(() => {
    handleCartProducts();
  }, [cartProducts]);

  return (
    <>
      {products.map((product) => {
        const { name, quantity, photo, price, productOrderId } =
          product;
        return (
          <>
            <div>
              <img className="cart-img" src={photo} />
            </div>
            <div>{name}</div>
            <div>Price ${price}</div>
            <div>
              <button
                onClick={() => {
                  handleDecreaseQty(productOrderId, quantity);
                }}
              >
                -
              </button>
              {quantity}
              <button
                onClick={() => {
                  handleIncreaseQty(productOrderId, quantity);
                }}
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                handleDeleteProductOrder(productOrderId);
              }}
            >
              delete
            </button>
          </>
        );
      })}
    </>
  );
};

export default SingleCartProduct;