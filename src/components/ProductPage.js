import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchOrder,
  fetchSingleProduct,
  updateProductOrderById,
  deleteProductOrderById,
  addProductToCart
} from "../axios-services/index";
import "../style/ProductPage.css";
import ReviewsByProduct from "./ReviewsByProduct";
import { toast } from "react-toastify";
import "../style/Toast.css";
import "react-toastify/dist/ReactToastify.css";

const ProductPage = ({ cart, setCart, token, user }) => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const { id } = params;

  const handleProduct = async () => {
    const singleProduct = await fetchSingleProduct(id);
    setProduct(singleProduct);
  };

  const handleIncreaseQty = async (productOrderId, quantity) => {
    try {
      const increasedProductQty = quantity + 1;
      setQuantity(increasedProductQty);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecreaseQty = async (productOrderId, quantity) => {
    try {
      const decreasedProductQty = quantity - 1;
      setQuantity(decreasedProductQty);
      if (decreasedProductQty <= 1) {
        setQuantity(1);
        return;
      } else {
        await updateProductOrderById(productOrderId, decreasedProductQty);
      };
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = async (id) => {
    try {
      let isProductFound = false;
      if (!cart.products) {
        await addProductToCart(cart.id, id);
        const updatedOrder = await fetchOrder(cart.id);
        setCart(updatedOrder);
        localStorage.setItem("cart", JSON.stringify(updatedOrder));
        return;
      }
      for (let i = 0; i < cart.products.length; i++) {
        console.log("currentQuantity", quantity);
        if (cart.products[i].id === id) {
          await updateProductOrderById(
            cart.products[i].productOrderId,
            cart.products[i].quantity + quantity
          );
          isProductFound = true;
        }
      }
      if (!isProductFound) {
        await addProductToCart(cart.id, id);
      }
      const updatedOrder = await fetchOrder(cart.id);
      setCart(updatedOrder);
      localStorage.setItem("cart", JSON.stringify(updatedOrder));
      toast("Added to cart!", {
        progressClassName: "css"
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleProduct();
  }, []);

  return (
    <div className="selected-product-container">
      <div className="selected-product-content-container">
        <img className="selected-product-img" src={product.photo} />

        <div className="selected-product-copy-container">
          <div className="selected-product-header">{product.name}</div>
          <div className="selected-product-price">${product.price}</div>
          <div className="selected-product-description">
            {product.description}
          </div>
          <div className="selected-product-quantity-button-container">
            <button
              className="selected-product-quantity-minus"
              onClick={() => {
                handleDecreaseQty(product.productOrderId, quantity);
              }}
            >
              -
            </button>
            <div className="selected-quantity">{quantity}</div>
            <button
              className="selected-product-quantity-plus"
              onClick={() => {
                handleIncreaseQty(product.productOrderId, quantity);
              }}
            >
              +
            </button>

            <button
              className="selected-product-add-button"
              onClick={() => {
                handleAddToCart(id);
              }}
            >
              Add To Cart
            </button>
          </div>
          <div>
            <ReviewsByProduct id={id} token={token} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
