import React from "react";
import "../../style/Support.css";

const CustomerSerivce = () => {
  return (
    <>
      <div className='support-hero-container'>
        <div className='support-hero-header'>Customer Support</div>
        <div className='support-hero-subhead'>We're here for you</div>

        <div className='support-body-content-container'>
          <div className='support-content'>
            <div className='support-label'>
              Have a question about your order?
            </div>
            <div className='support-description'>
              Send us an email, but before you do, we want to help our team
              facilitate your inquiry to the right person and ensure that it is
              addressed in a timely matter. Include in your email your full
              name, the order number your referring to, and a description of
              what you need support with. For any questions regarding shipping,
              see the shipping page for more information.
            </div>
            <br></br>
            <br></br>
            <a
              href='mailto:plantarriumprogramming@gmail.com'
              style={{ textDecoration: "none" }}
            >
              <button className='contact-button'>Email Support</button>
            </a>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerSerivce;
