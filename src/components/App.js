import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Navigation from "./Navigation";
import Home from "./Home";
import Footer from "./Footer/Footer";
import About from "./Footer/About";
import Contact from "./Footer/Contact";
import Cart from "./Order/Cart";
import OrderForm from "./Order/OrderForm";
import Shipping from "./Footer/Shipping";
import CustomerService from "./Footer/CustomerService";

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
  fetchAllProducts,
  createGuestCart,
} from "../axios-services";

import ShopAll from "./Products/ShopAll";
import SmallPlants from "./Products/SmallPlants";
import MediumPlants from "./Products/MediumPlants";
import LargePlants from "./Products/LargePlants";
import MyAccount from "./MyAccount/MyAccount";
import EditMyAccount from "./MyAccount/EditMyAccount";
import SingleOrder from "./MyAccount/SingleOrder";
import SingleReview from "./MyAccount/SingleReview";
import Reviews from "./Admin/Reviews";
import ProductPage from "./Products/ProductPage";
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
import { toast } from "react-toastify";
import "../style/Toast.css";

const stripePromise = loadStripe(
  "pk_test_51KeW7BHBUwrPthfGhuHzQpbGRvWgrWD7r62nIDAZOuHFVnrZZfsMprUJdAjgOUdx6UGSjqSApjzMpBAHB8I4fpvW00BfY8Qp7O"
);

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");

  useEffect(() => {
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };

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

  const handleCart = async () => {
    if (token && Object.keys(cart).length !== 0) {
      const loggedInUser = await getUser(token);
      if (cart.userId === 1) {
        await deleteOrderById(token, cart.id);
      }
      const pendingOrder = await getCart(token, loggedInUser.username);

      if (!pendingOrder) {
        const newOrder = await createPendingOrder(token, "", "", "", "");
        setCart(newOrder);
        localStorage.setItem("cart", JSON.stringify(newOrder));
      } else {
        setCart(pendingOrder);
        localStorage.setItem("cart", JSON.stringify(pendingOrder));
      }
    } else if (!token) {
      if (localStorage.getItem("cart")) {
        const stringifiedCart = localStorage.getItem("cart");
        const parsedCart = JSON.parse(stringifiedCart);
        setCart(parsedCart);
      } else {
        const newOrder = await createGuestCart();
        setCart(newOrder);
        localStorage.setItem("cart", JSON.stringify(newOrder));
      }
    }
  };

  const handleLogOut = async () => {
    navigate("/");
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    toast("You are logged out!", {
      progressClassName: "css",
    });
  };

  const handleReviews = async () => {
    const fetchedReviews = await fetchReviews();
    setReviews(fetchedReviews);
  };

  const handleProducts = async () => {
    const fetchedProducts = await fetchAllProducts();
    setProducts(fetchedProducts);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }

    if (localStorage.getItem("cart")) {
      const stringifiedCart = localStorage.getItem("cart");
      const parsedCart = JSON.parse(stringifiedCart);
      setCart(parsedCart);
    }
  }, []);

  useEffect(() => {
    handleUser();
    handleCart();
  }, [token]);

  useEffect(() => {
    handleReviews();
    handleProducts();
  }, []);

  const handleAddToCart = async (id) => {
    try {
      let isProductFound = false;
      if (!cart.products) {
        await addProductToCart(cart.id, id, 1);
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
        await addProductToCart(cart.id, id, 1);
      }
      const updatedOrder = await fetchOrder(cart.id);
      setCart(updatedOrder);
      localStorage.setItem("cart", JSON.stringify(updatedOrder));
      toast("Added to cart!", {
        progressClassName: "css",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <Navigation
        token={token}
        user={user}
        handleLogOut={handleLogOut}
        products={products}
        cart={cart}
      />
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
            <Cart cart={cart} setCart={setCart} token={token} />
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
        <Route
          path="/order/confirm/:orderId"
          element={<Success cart={cart} setCart={setCart} />}
        />
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

      <ToastContainer
        style={{ width: "380px", fontSize: "18px", textAlign: "center" }}
        position="bottom-center"
        autoClose={1700}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="dark-toast"
      />
    </div>
  );
};

export default App;
