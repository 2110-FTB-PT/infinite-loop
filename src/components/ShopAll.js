import React from "react";
import { useState, useEffect } from "react";
import {
  fetchAllProducts,
  addProductToCart,
  createPendingOrder,
} from "../axios-services/index";

const ShopAll = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleProducts = async () => {
    const fetchedProducts = await fetchAllProducts();
    setProducts(fetchedProducts);
  };

  const handleAddToCart = async (id) => {
    if (cart.length === 0) {
      const newOrder = await createPendingOrder(email, address);
      console.log("newOrder", newOrder);
      setCart(newOrder);
      const newCartProducts = await addProductToCart(newOrder.id, id, quantity);
      console.log("newCartProducts", newCartProducts);
      setCartProducts(newCartProducts);
    }
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
            <p>{name}</p>
            <p>{photo}</p>
            <p>{price}</p>
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
