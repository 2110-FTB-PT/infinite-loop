import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../axios-services/index";
import "../style/ProductPage.css";
import ReviewsByProduct from "./ReviewsByProduct";

const ProductPage = ({
  cart,
  setCart,
  handleAddToCart,
  quantity,
  setQuantity,
}) => {
  const [product, setProduct] = useState({});
  const params = useParams();
  const { id } = params;

  const handleProduct = async () => {
    const singleProduct = await fetchSingleProduct(id);
    setProduct(singleProduct);
  };

  useEffect(() => {
    handleProduct();
  }, []);

  // TODO: set up quantity buttons
  // update/patch order

  return (
    <div className='selected-product-container'>
      <div className='selected-product-content-container'>
        <img className='selected-product-img' src={product.photo} />

        <div className='selected-product-copy-container'>
          <div className='selected-product-header'>{product.name}</div>
          <div className='selected-product-price'>${product.price}</div>
          <div className='selected-product-description'>
            {product.description}
          </div>
          <div className='selected-product-quantity-button-container'>
            <button className='selected-product-quantity-minus'>-</button>
            <div className='selected-quantity'>1</div>
            <button className='selected-product-quantity-plus'>+</button>

            <button
              className='selected-product-add-button'
              onClick={() => {
                handleAddToCart(id);
              }}
            >
              Add To Cart
            </button>
          </div>

          <div className='selected-product-review'>
            {" "}
            <ReviewsByProduct id={id} />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
