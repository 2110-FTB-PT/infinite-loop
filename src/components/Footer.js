import React from "react";
import "../style/Footer.css";

const Footer = () => {
  return (
    <>
      <div className='footer-container'>
        <div className='footer-logo'>plantarrium</div>

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
