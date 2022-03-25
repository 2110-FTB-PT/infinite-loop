import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Navigation from "./Navigation";
import Home from "./Home";
import Footer from "./Footer";
import About from "./About";
import Contact from "./Contact";
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
  fetchProductOrderById,
  updateProductOrderById,
  fetchOrder,
} from "../axios-services";

import ShopAll from "./ShopAll";
import SmallPlants from "./SmallPlants";
import MediumPlants from "./MediumPlants";
import LargePlants from "./LargePlants";
import MyAccount from "./MyAccount/MyAccount";
import Reviews from "./Admin/Reviews";
import ReviewsByProduct from "./ReviewsByProduct";
import ProductPage from "./ProductPage";
import AdminDash from "./Admin/AdminDash";
import Orders from "./Admin/Orders";
import Products from "./Admin/Products";
import Users from "./Admin/Users";
import EditProduct from "./Admin/EditProduct";

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
  // const [cartProduct, setCartProduct] = useState([]);
  // const [email, setEmail] = useState("");
  // const [address, setAddress] = useState("");
  // const [quantity, setQuantity] = useState(1);
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

  console.log("cart", cart);
  const handleAddToCart = async (id) => {
    try {
      if (Object.keys(cart).length === 0) {
        let newOrder = await createPendingOrder("", "");
        await addProductToCart(newOrder.id, id);
        newOrder = await fetchOrder(newOrder.id);
        setCart(newOrder);
        localStorage.setItem("cart", JSON.stringify(newOrder));
      } else {
        let isFound = false;
        for (let i = 0; i < cart.products.length; i++) {
          if (cart.products[i].id === id) {
            const updatedQuantity = cart.products[i].quantity + 1;
            await updateProductOrderById(
              cart.products[i].productOrderId,
              updatedQuantity
            );
            isFound = true;
          }
        }
        if (!isFound) {
          await addProductToCart(cart.id, id);
        }
        setCart(await fetchOrder(cart.id));
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   if (localStorage.getItem("cart")) {
  //     const stringifiedCart = localStorage.getItem("cart");
  //     const parsedCart = JSON.parse(stringifiedCart);
  //     setCart(parsedCart);
  //   }
  // }, []);

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
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route
          path="/categories/largeplants"
          element={<LargePlants handleAddToCart={handleAddToCart} />}
        />
        <Route
          path="/categories/mediumplants"
          element={<MediumPlants handleAddToCart={handleAddToCart} />}
        />
        <Route
          path="/categories/smallplants"
          element={<SmallPlants handleAddToCart={handleAddToCart} />}
        />
        <Route
          path="/products/:id"
          element={
            <ProductPage
              handleAddToCart={handleAddToCart}
              cart={cart}
              setCart={setCart}
            />
          }
        />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/customers" element={<Users />} />
        <Route
          path="/admin/reviews"
          element={
            <Reviews
              reviews={reviews}
              setReviews={setReviews}
              user={user}
              token={token}
            />
          }
        />
        <Route path="/admin" element={<AdminDash />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/products/:id" element={<EditProduct />} />
        <Route path="/reviews/:productId" element={<ReviewsByProduct />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
