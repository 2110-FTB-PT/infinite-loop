import React from "react";
import { Link } from "react-router-dom";
import "../style/Navigation.css";
import account from "./img/account.png";
import cart from "./img/cart.png";

const Navigation = ({ token }) => {
  return (
    <>
      <div className="nav-container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="logo">plantarrium</div>
        </Link>
        <div className="plant-categories-container">
          <Link to="/shopall" style={{textDecoration: "none"}}>
          <div className="plant-categories-link">Shop All Plants</div>
          </Link>
          <Link to="/categories/largeplants" style={{ textDecoration: "none"}}>
          <div className="plant-categories-link">Large Plants</div>
          </Link>
          <Link to="/categories/mediumplants" style={{ textDecoration: "none"}}>
          <div className="plant-categories-link">Medium Plants</div>
          </Link>
          <Link to="/categories/smallplants" style={{ textDecoration: "none"}}>
          <div className="plant-categories-link">Small Plants</div>
          </Link>
          <Link to="/login" style={{ textDecoration: "none"}}>
          <div className="plant-categories-link">Login</div>
          </Link>
          <Link to="/register" style={{ textDecoration: "none"}}>
          <div className="plant-categories-link">Register</div>
          </Link>
          {token && <Link to="/admin" style={{ textDecoration: "none"}}>
          <div className="plant-categories-link">Admin</div>
          </Link>}
        </div>
        <div className="account">
          <a href="/myaccount">
            <img className="nav-icon" src={account} alt="avatar-account-icon" />
          </a>
          <a href="/cart">
            <img className="nav-icon" src={cart} alt="shopping-cart-icon" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
