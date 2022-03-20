import React from "react";
import { useState, useEffect } from "react";
import { fetchAllProducts, addProductToCart, createPendingOrder } from "../axios-services/index";

const ShopAll = ({cart, setCart}) => {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  const handleProducts = async () => {
    const fetchedProducts = await fetchAllProducts();
    setProducts(fetchedProducts);
  };

  const handleAddToCart = async () => {
    if (cart.length!==0){
        
    }
    const productsToCart = await addProductToCart();
    console.log("productsToCart", productsToCart);
    setCartProducts(productsToCart);
  };

  useEffect(() => {
    handleProducts();
  }, []);

  return (
    <div>
      <h1>All Products</h1>
      {products.map((product) => {
        const { name, price, photo } = product;
        return (
          <div>
            <p>{name}</p>
            <p>{photo}</p>
            <p>{price}</p>
            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>
        );
      })}
    </div>
  );
};

export default ShopAll;
