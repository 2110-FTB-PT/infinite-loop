import React from "react";
import { Link } from "react-router-dom";
import "../style/Footer.css";

const Footer = () => {
  return (
    <>
      <div className='footer-container'>
        <Link to='/' style={{ textDecoration: "none" }}>
          <div className='footer-logo'>plantarrium</div>
        </Link>

        <div className='footer-categories-container'>
          <div className='footer-categories-link'>Shop All Plants</div>
          <div className='footer-categories-link'>Large Plants</div>
          <div className='footer-categories-link'>Medium Plants</div>
          <div className='footer-categories-link'>Small Plants</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
