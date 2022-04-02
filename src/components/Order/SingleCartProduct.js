import React from "react";
import "../../style/Cart.css";

import {
  updateProductOrderById,
  deleteProductOrderById,
  fetchProductById,
  fetchOrder,
} from "../../axios-services";

const SingleCartProduct = ({ cart, setCart }) => {
  const handleIncreaseQty = async (productOrderId, quantity, productId) => {
    try {
      const increasedProductQty = quantity + 1;
      const singleProduct = await fetchProductById(productId);
      if (increasedProductQty <= singleProduct.quantity * 1) {
        await updateProductOrderById(productOrderId, increasedProductQty);
        const updatedCart = await fetchOrder(cart.id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecreaseQty = async (productOrderId, quantity) => {
    try {
      const decreasedProductQty = quantity - 1;
      if (decreasedProductQty === 0) {
        await handleDeleteProductOrder(productOrderId);
      } else {
        await updateProductOrderById(productOrderId, decreasedProductQty);
      }
      const updatedCart = await fetchOrder(cart.id);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProductOrder = async (productOrderId) => {
    try {
      await deleteProductOrderById(productOrderId);
      const updatedCart = await fetchOrder(cart.id);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {cart.products
        .sort(function (a, b) {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        })
        .map((product) => {
          const { id, name, quantity, photo, price, productOrderId } = product;
          return (
            <>
              <div>
                <img className="cart-img" src={photo} />
              </div>
              <div className="cart-product-header">{name}</div>
              <div className="cart-product-price">Price ${price}</div>
              <div className="cart-product-quantity-button-container">
                <button
                  className="cart-product-quantity-minus"
                  onClick={() => {
                    handleDecreaseQty(productOrderId, quantity);
                  }}
                >
                  -
                </button>
                <div className="cart-selected-quantity">{quantity}</div>
                <button
                  className="cart-product-quantity-plus"
                  onClick={() => {
                    handleIncreaseQty(productOrderId, quantity, id);
                  }}
                >
                  +
                </button>

                <div
                  className="cart-delete-button"
                  onClick={() => {
                    handleDeleteProductOrder(productOrderId);
                  }}
                >
                  Remove
                </div>
              </div>
            </>
          );
        })}
    </>
  );
};

export default SingleCartProduct;
