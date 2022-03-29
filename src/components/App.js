import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Navigation from "./Navigation";
import Home from "./Home";
import Footer from "./Footer";
import About from "./About";
import Contact from "./Contact";
import Cart from "./Order/Cart";
import OrderForm from "./Order/OrderForm";
import Shipping from "./Shipping";
import CustomerService from "./CustomerService";

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
  fetchOrder,
  deleteOrderById,
  getCart,
  createGuestCart,
  updateOrderUserId,
  getCartByOrderId,
} from "../axios-services";

import ShopAll from "./ShopAll";
import SmallPlants from "./SmallPlants";
import MediumPlants from "./MediumPlants";
import LargePlants from "./LargePlants";
import MyAccount from "./MyAccount/MyAccount";
import EditMyAccount from "./MyAccount/EditMyAccount";
import SingleOrder from "./MyAccount/SingleOrder";
import SingleReview from "./MyAccount/SingleReview";
import Reviews from "./Admin/Reviews";
import ProductPage from "./ProductPage";
import PageNotFound from "./PageNotFound";
import AdminDash from "./Admin/AdminDash";
import Orders from "./Admin/Orders";
import EditOrder from "./Admin/EditOrder";
import Products from "./Admin/Products";
import Users from "./Admin/Users";
import AddProduct from "./Admin/AddProduct";
import EditProduct from "./Admin/EditProduct";
import EditUser from "./Admin/EditUser";
import Success from "./Order/Success";

const stripePromise = loadStripe(
  "pk_test_51KeW7BHBUwrPthfGhuHzQpbGRvWgrWD7r62nIDAZOuHFVnrZZfsMprUJdAjgOUdx6UGSjqSApjzMpBAHB8I4fpvW00BfY8Qp7O"
);

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
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleUser = async () => {
    if (token) {
      const userObject = await getUser(token);
      setUser(userObject);
    } else {
      setUser({});
    }
  };

  // this is when we initially set cart
  const handleCart = async () => {
    // if a user logs in and the cart is already there from a guest session, need to clear the cart
    if (token && Object.keys(cart).length !== 0) {
      const loggedInUser = await getUser(token);
      if (cart.userId === 1) {
        await deleteOrderById(token, cart.id);
      }
      const pendingOrder = await getCart(token, loggedInUser.username);
      console.log("pendingOrder", pendingOrder);
      if (!pendingOrder) {
        const newOrder = await createPendingOrder(token, "", "", "", "");
        setCart(newOrder);
        localStorage.setItem("cart", JSON.stringify(newOrder));
      } else {
        setCart(pendingOrder);
        localStorage.setItem("cart", JSON.stringify(pendingOrder));
      }
    } else if (!token) {
      const newOrder = await createGuestCart();
      setCart(newOrder);
      localStorage.setItem("cart", JSON.stringify(newOrder));
    }
  };

  const handleLogOut = async () => {
    navigate("/");
    setToken("");
    localStorage.removeItem("token");
  };

  const handleReviews = async () => {
    const fetchedReviews = await fetchReviews();
    setReviews(fetchedReviews);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }

    if (localStorage.getItem("cart")) {
      const stringifiedCart = localStorage.getItem("cart");
      const parsedCart = JSON.parse(stringifiedCart);
      console.log("useEffect parsedCart", parsedCart);
      setCart(parsedCart);
    }
  }, []);

  useEffect(() => {
    handleUser();
    handleCart();
  }, [token]);

  useEffect(() => {
    handleReviews();
  }, []);

  // actually adding products to cart
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
        if (cart.products[i].id === id) {
          await updateProductOrderById(
            cart.products[i].productOrderId,
            cart.products[i].quantity + 1
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <Navigation token={token} user={user} handleLogOut={handleLogOut} />
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
          element={
            <ShopAll handleAddToCart={handleAddToCart} products={products} />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart cart={cart} setCart={setCart} token={token} user={user} />
          }
        />
        <Route
          path="/checkout"
          element={
            <OrderForm
              cart={cart}
              setCart={setCart}
              token={token}
              stripe={stripePromise}
            />
          }
        />
        <Route path="/order/confirm/:orderId" element={<Success cart={cart} />} />
        <Route
          path="/categories/largeplants"
          element={
            <LargePlants
              handleAddToCart={handleAddToCart}
              products={products}
            />
          }
        />
        <Route
          path="/categories/mediumplants"
          element={
            <MediumPlants
              handleAddToCart={handleAddToCart}
              products={products}
            />
          }
        />
        <Route
          path="/categories/smallplants"
          element={
            <SmallPlants
              handleAddToCart={handleAddToCart}
              products={products}
            />
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProductPage
              handleAddToCart={handleAddToCart}
              cart={cart}
              setCart={setCart}
              token={token}
              user={user}
            />
          }
        />
        <Route path="/admin" element={<AdminDash token={token} />} />
        <Route
          path="/admin/products"
          element={
            <Products
              token={token}
              products={products}
              setProducts={setProducts}
            />
          }
        />
        <Route
          path="/admin/addproduct"
          element={
            <AddProduct
              token={token}
              products={products}
              setProducts={setProducts}
            />
          }
        />
        <Route
          path="/admin/products/:id"
          element={
            <EditProduct
              token={token}
              products={products}
              setProducts={setProducts}
            />
          }
        />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/orders/:id" element={<EditOrder token={token} />} />
        <Route path="/admin/accounts" element={<Users />} />
        <Route
          path="/admin/accounts/:id"
          element={<EditUser token={token} />}
        />
        <Route
          path="/admin/reviews"
          element={<Reviews token={token} user={user} />}
        />
        <Route
          path="/myaccount"
          element={<MyAccount token={token} user={user} />}
        />
        <Route
          path="/myaccount/edit"
          element={
            <EditMyAccount token={token} user={user} setUser={setUser} />
          }
        />
        <Route
          path="/myaccount/order/:id"
          element={<SingleOrder token={token} user={user} />}
        />
        <Route
          path="/myaccount/review/:id"
          element={<SingleReview token={token} user={user} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/customer-service" element={<CustomerService />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
