import React from "react";
import yeonju from "../img/about-yeonju.png";
import lindsay from "../img/about-lindsay.png";
import mark from "../img/about-mark.png";
import kim from "../img/about-kim.png";
import "../../style/About.css";

const About = () => {
  return (
    <>
      <div className='about-hero-container'>
        <div className='about-hero-header'>Meet The Team</div>
        <div className='about-hero-subhead'>
          Say hello to the business owners and our very own programmers. With
          their combined love for plants and programming, Plantarrium was
          developed to give you easy access to awesome plants. Get to know the
          team!
        </div>

        <div className='about-body-content-container'>
          <div className='about-team-member'>
            <img className='box' src={yeonju} alt='headshot-yeonju' />
            <div className='about-name-label'>Yeonju Park</div>
            <div className='about-description'>
              If Yeonju isn't intensely programming, she's doing high intensity
              interval training. She also enjoys creating content, you can catch
              some of her work on YouTube.
            </div>
          </div>
          <div className='about-team-member'>
            <img className='box' src={lindsay} alt='headshot-lindsay' />
            <div className='about-name-label'>Lindsay Nakamura</div>
            <div className='about-description'>
              Lindsay likes to spend her free time hiking and traveling. She
              even swims with sharks in Hawaii, so no matter what she faces in
              the real world or in developing an app, she is always as cool as a
              cucumber.
            </div>
          </div>

          <div className='about-team-member'>
            <img className='box' src={mark} alt='headshot-mark' />
            <div className='about-name-label'>Mark Angelo Dabu</div>
            <div className='about-description'>
              When Mark isn't serving up blocks of code, he's serving up some
              moves on the basketball court. You can also find him exploring or
              providing guidance to his youth ministry community.
            </div>
          </div>

          <div className='about-team-member'>
            <img className='box' src={kim} alt='headshot-kim' />
            <div className='about-name-label'>Kim Lê</div>
            <div className='about-description'>
              Kim resides in both Guadalajara and the Bay Area, where she
              designs user experiences by day and builds components by night.
              You can catch her skating around the city and being a major
              foodie.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
