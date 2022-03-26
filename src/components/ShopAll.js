import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { fetchAllProducts } from "../axios-services/index";
import "../style/Collections.css";

const ShopAll = ({ handleAddToCart }) => {
  const [products, setProducts] = useState([]);
  const handleProducts = async () => {
    const fetchedProducts = await fetchAllProducts();
    setProducts(fetchedProducts);
  };

  useEffect(() => {
    handleProducts();
  }, []);

  return (
    <div>
      <h1>All Products</h1>
      {products.map((product) => {
        const { id, name, price, photo } = product;
        return (
          <div>
            <Link to={`/products/${id}`} style={{textDecoration: "none"}}>
                <img className="collection-img" src={photo} />
                <p>{name}</p>
            </Link>
            <p>${price}</p>
            <button
              onClick={() => {
                handleAddToCart(id);
              }}
            >
              Add To Cart
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default ShopAll;
