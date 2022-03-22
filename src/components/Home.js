import React from "react";
import { Link } from "react-router-dom";
import "../style/Home.css";
import heroImg from "./img/homepage-hero-img.png";
import step1 from "./img/step1.png";
import step2 from "./img/step2.png";
import step3 from "./img/step3.png";

const Home = () => {
  return (
    <>
      <div className='homepage-hero-container'>
        <img
          className='homepage-hero-img'
          src={heroImg}
          alt='plants-in-living-space'
        />

        <div className='homepage-copy-container'>
          <div className='homepage-header'>
            Enhance your space and boost your mood
          </div>
          <div className='homepage-subhead'>
            Explore a range of plant sizes and with a level of care that fits
            you and your home.
          </div>
          <Link to='/shopall' style={{ textDecoration: "none" }}>
            <button className='homepage-hero-button'>Shop plants</button>
          </Link>
        </div>
      </div>

      <div className='steps-content-container'>
        <div className='steps-header'>Small steps to big benefits</div>
        <div className='steps-body-copy'>
          From reducing stress to purifying your air - houseplants can promote a
          happy and healthy living.
        </div>

        <div className='steps-container'>
          <div className='steps-card-container'>
            <img className='steps-img' src={step1} alt='' />
            <div className='steps-label'>Step 1</div>
            <div className='steps-description'>Pick the perfect plant</div>
          </div>

          <div className='steps-card-container'>
            <img className='steps-img' src={step2} alt='' />
            <div className='steps-label'>Step 2</div>
            <div className='steps-description'>Unbox your order</div>
          </div>

          <div className='steps-card-container'>
            <img className='steps-img' src={step3} alt='' />
            <div className='steps-label'>Step 3</div>
            <div className='steps-description'>Enjoy the good vibes</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
