import React from "react";
import { Link } from "react-router-dom";
import "../style/Navigation.css";

import account from "./img/account.png";
import cart from "./img/cart.png";

const Navigation = () => {
  return (
    <>
      <div className="nav-container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="logo">plantarrium</div>
        </Link>
        <div className="plant-categories-container">
          <div className="plant-categories-link">Shop All Plants</div>
          <div className="plant-categories-link">Large Plants</div>
          <div className="plant-categories-link">Medium Plants</div>
          <div className="plant-categories-link">Small Plants</div>
        </div>
        <div className="account">
          <img className="nav-icon" src={account} alt="avatar-account-icon" />
          <a href="/cart">
            <img className="nav-icon" src={cart} alt="shopping-cart-icon" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
