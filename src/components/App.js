import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Navigation from "./Navigation";
import Home from "./Home";
import Footer from "./Footer";
import Cart from "./Order/Cart";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import {
  getAPIHealth,
  getUser,
  createPendingOrder,
  addProductToCart,
} from "../axios-services";
import ShopAll from "./ShopAll";
import SmallPlants from "./SmallPlants";
import MediumPlants from "./MediumPlants";
import LargePlants from "./LargePlants";
import MyAccount from "./MyAccount/MyAccount";

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
  const [cart, setCart] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleUser = async () => {
    if (token) {
      const userObject = await getUser(token);
      setUser(userObject);
    } else {
      setUser({});
    }
  };

  useEffect(() => {
    handleUser();
  }, [token]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

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
            />
          }
        />
        <Route path="/categories/largeplants" element={<LargePlants />} />
        <Route path="/categories/mediumplants" element={<MediumPlants />} />
        <Route path="/categories/smallplants" element={<SmallPlants />} />
        <Route path="/myaccount" element={<MyAccount />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
