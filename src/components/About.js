import React from "react";
import yeonju from "./img/about-yeonju.png";
// import lindsay from "./img/about-lindsay.png";
// import mark from "./img/about-mark.png";
import kim from "./img/about-kim.png";
import "../style/About.css";

const About = () => {
  return (
    <>
      <div className='about-hero-container'>
        <div className='about-hero-header'>Meet Team Mid</div>
        <div className='about-hero-subhead'>
          Say hello to the team that can always figure it out. Are we the best?
          Nope. But we can guarantee we aren't the worst. Team Mid has been
          building web applications since October 2021. With their combined
          mediocre programming skills, they can surprisingly create exceptional
          user experiences.
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
            <img className='box' src={yeonju} alt='headshot-yeonju' />
            <div className='about-name-label'>Lindsay Nakamura</div>
            <div className='about-description'>
              Lindsay likes to spend her free time (doing this activity) or
              swimming with sharks in Hawaii, so no matter what she faces in the
              real world or in developing an app, she is always as cool as a
              cucumber.
            </div>
          </div>

          <div className='about-team-member'>
            <img className='box' src={yeonju} alt='headshot-yeonju' />
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
              Kim splits her time between Guadalajara and the Bay Area, where
              she designs by day and builds components by night. You can often
              catch her skating around the city and being a major foodie.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
