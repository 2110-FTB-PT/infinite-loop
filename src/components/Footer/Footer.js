import React from "react";
import { Link } from "react-router-dom";
import "../../style/Footer.css";

const Footer = () => {
  return (
    <>
      <div className='footer-container'>
        <div className='footer-links-container'>
          <div className='footer-section-container'>
            <div className='footer-label'>Company</div>
            <Link to='/' style={{ textDecoration: "none" }}>
              <div className='footer-link'>Plantarrium</div>
            </Link>
            <Link to='/about' style={{ textDecoration: "none" }}>
              <div className='footer-link'>About</div>
            </Link>
            <Link to='/contact' style={{ textDecoration: "none" }}>
              <div className='footer-link'>Contact</div>
            </Link>
          </div>

          <div className='footer-section-container'>
            <div className='footer-label'>Shop</div>
            <Link to='/shopall' style={{ textDecoration: "none" }}>
              <div className='footer-link'>Shop All Plants</div>
            </Link>
            <Link to='/categories/largeplants' style={{ textDecoration: "none" }}>
              <div className='footer-link'>Large Plants</div>
            </Link>
            <Link to='/categories/mediumplants' style={{ textDecoration: "none" }}>
              <div className='footer-link'>Medium Plants</div>
            </Link>
            <Link to='/categories/smallplants' style={{ textDecoration: "none" }}>
              <div className='footer-link'>Small Plants</div>
            </Link>
          </div>

          <div className='footer-section-container'>
            <div className='footer-label'>Support</div>
            <Link to='/shipping' style={{ textDecoration: "none" }}>
              <div className='footer-link'>Shipping</div>
            </Link>
            <Link to='/customer-service' style={{ textDecoration: "none" }}>
              <div className='footer-link'>Customer Service</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
