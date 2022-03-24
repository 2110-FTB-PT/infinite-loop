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
import EditProduct from './Admin/EditProduct';


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
  const [cartProduct, setCartProduct] = useState([]);
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
    // check if there is an existing cart, and add the product
    if (Object.keys(cart).length === 0) {
      const newOrder = await createPendingOrder(email, address);
      setCart(newOrder);
      const newCartProduct = await addProductToCart(newOrder.id, id, quantity);
      setCartProduct(newCartProduct);
      localStorage.setItem("cart", JSON.stringify(newOrder));
    } else {
      // if a cart already exist, then check the products in cart
      const currentCartProducts = await fetchProductOrderById(cart.id);
      for (let i = 0; i < currentCartProducts.length; i++) {
        // if the product already exists in cart, it needs to update the quantity
        if (currentCartProducts[i].productId === id) {
          const updatedQuantity = currentCartProducts[i].quantity + 1;
          const updatedCartProduct = await updateProductOrderById(
            currentCartProducts[i].id,
            updatedQuantity
          );
          setCartProduct(updatedCartProduct);
        } else {
          // if the product does not exist in cart, then it needs to add the product to cart
          const newCartProduct = await addProductToCart(cart.id, id, quantity);
          setCartProduct(newCartProduct);
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));
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
      <Navigation token={token}/>
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
              quantity={quantity}
              setQuantity={setQuantity}
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
        <Route path="/admin" element={<AdminDash token={token}/>} />
        <Route path="/admin/products" element={<Products token={token}/>} />
            <Route path="/admin/products/:id" element={<EditProduct token={token}/>} />
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
