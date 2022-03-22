import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Navigation from "./Navigation";
import Home from "./Home";
import Footer from "./Footer";
import About from "./About";
import Cart from "./Order/Cart";

// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route

import {
  getAPIHealth,
  getUser,
  createPendingOrder,
  addProductToCart,
  fetchReviews,
  updateProductOrderById,
} from "../axios-services";

import ShopAll from "./ShopAll";
import SmallPlants from "./SmallPlants";
import MediumPlants from "./MediumPlants";
import LargePlants from "./LargePlants";
import MyAccount from "./MyAccount/MyAccount";
import Reviews from "./Reviews";
import ReviewsByProduct from "./ReviewsByProduct";
import ProductPage from "./ProductPage";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);

  const handleUser = async () => {
    if (token) {
      const userObject = await getUser(token);
      setUser(userObject);
    } else {
      setUser({});
    }
  };

  const handleReviews = async () => {
    const fetchedReviews = await fetchReviews();
    setReviews(fetchedReviews);
  };

  useEffect(() => {
    handleUser();
  }, [token]);

  useEffect(() => {
    handleReviews();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const handleAddToCart = async (id) => {
    if (Object.keys(cart).length === 0) {
      const newOrder = await createPendingOrder(email, address);
      console.log("newOrder", newOrder);
      setCart(newOrder);

      const newCartProducts = await addProductToCart(newOrder.id, id, quantity);
      console.log("newCartProducts", newCartProducts);
      setCartProducts(newCartProducts);

      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      console.log("exisitng cart", cart);
      localStorage.setItem("cart", JSON.stringify(cart));

      console.log("cart.id", cart.id);
      console.log("id", id);
      console.log("exisiting cartProducts", cartProducts);

      // If the cart already has the same product, then just update the quantity of the product
      if (cartProducts.productId === id) {
        const updatedQuantity = quantity + 1;
        const updatedCartProducts = await updateProductOrderById(
          cartProducts.id,
          updatedQuantity
        );
        setQuantity(updatedQuantity);
        console.log("updatedCartProducts", updatedCartProducts);
        setCartProducts(updatedCartProducts);
        // if the cart doesn't have the same product, then just add a new product
      } else {
        const newCartProducts = await addProductToCart(cart.id, id, quantity);
        setCartProducts(newCartProducts);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      const stringifiedCart = localStorage.getItem("cart");
      const parsedCart = JSON.parse(stringifiedCart);
      setCart(parsedCart);
    }
  }, []);

  return (
    <div className="app-container">
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        <Route
          path="/register"
          element={<RegisterForm token={token} setToken={setToken} />}
        />
        <Route
          path="/shopall"
          element={<ShopAll handleAddToCart={handleAddToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              handleAddToCart={handleAddToCart}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          }
        />
        <Route path="/categories/largeplants" element={<LargePlants handleAddToCart={handleAddToCart}/>} />
        <Route path="/categories/mediumplants" element={<MediumPlants handleAddToCart={handleAddToCart}/>} />
        <Route path="/categories/smallplants" element={<SmallPlants handleAddToCart={handleAddToCart}/>} />
        <Route path="/products/:id" element={<ProductPage 
          handleAddToCart={handleAddToCart} 
          quantity={quantity} 
          setQuantity={setQuantity} />} />
        <Route
          path="/reviews"
          element={
            <Reviews
              reviews={reviews}
              setReviews={setReviews}
              user={user}
              token={token}
            />
          }
        />
        <Route path="/reviews/:productId" element={<ReviewsByProduct />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
