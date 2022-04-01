import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategory } from "../../axios-services/index";
import "../../style/Collections.css";

const SmallPlants = ({ handleAddToCart }) => {
  const [products, setProducts] = useState([]);

  const handleProducts = async () => {
    const fetchedProducts = await fetchCategory("smallplants");
    setProducts(fetchedProducts);
  };

  useEffect(() => {
    handleProducts();
  }, []);

  return (
    <div>
      <div className='shop-products-header'>Small Plants</div>
      <div className='shop-products-container'>
        {products.map((product) => {
          const { id, name, price, photo } = product;
          return (
            <div className='shop-products-content-container'>
              <Link to={`/products/${id}`} style={{ textDecoration: "none" }}>
                <img className='shop-products-img' src={photo} />
                <div className='shop-products-link'>{name}</div>
              </Link>
              <div className='shop-products-price'>${price}</div>
              <button
                className='shop-products-button'
                onClick={() => {
                  handleAddToCart(id);
                }}
              >
                <div className='shop-products-button-copy'> Add To Cart</div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SmallPlants;
