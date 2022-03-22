import React from "react";
import "../style/Contact.css";
import contact from "./img/contact-hero.png";

const Contact = () => {
  return (
    <>
      <div className='contact-content-container'>
        <div className='contact-copy-container'>
          <div className='contact-header'>Get In Touch</div>
          <div className='contact-subhead'>
            Our team of engineers has a passion for plants and problem-solving.
            Looking for a collaborative while still holding themselves
            accountable and accountable team? We're ready to help you build
            amazing user interfaces. Through frequent and clear communication,
            this team makes project management painless. To partner or
            collaborate with our team or an individual on the team, shoot us an
            email.
          </div>
          <a href='mailto:teammid@gmail.com' style={{ textDecoration: "none" }}>
            <button className='contact-button'>Let's Connect</button>
          </a>
        </div>

        <img
          className='contact-img'
          src={contact}
          alt='code-on-desk-front-of-plants'
        />
      </div>
    </>
  );
};

export default Contact;
