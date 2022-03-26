import React from "react";
import {
  updateProductOrderById,
  deleteProductOrderById,
  fetchOrder,
} from "../../axios-services";

const SingleCartProduct = ({ cart, setCart }) => {
  const handleIncreaseQty = async (productOrderId, quantity) => {
    try {
      const increasedProductQty = quantity + 1;
      await updateProductOrderById(productOrderId, increasedProductQty);
      const updatedCart = await fetchOrder(cart.id);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
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
      {cart.products.map((product) => {
        const { name, quantity, photo, price, productOrderId } = product;
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
