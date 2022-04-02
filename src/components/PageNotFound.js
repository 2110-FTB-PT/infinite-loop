import React from "react";
import { Link } from "react-router-dom";
import "../style/Home.css";
import heroImg from "./img/homepage-hero-img.png";

const PageNotFound = () => {
  return (
    <div>
      <h1></h1>
      <div className="homepage-hero-container">
        <img
          className="homepage-hero-img"
          src={heroImg}
          alt="plants-in-living-space"
        />

        <div className="homepage-copy-container">
          <div className="homepage-header">Oops! 404 plant not found.</div>
          <div className="homepage-subhead">
            Explore a range of plant sizes and with a level of care that fits
            you and your home.
          </div>
          <Link to="/shopall" style={{ textDecoration: "none" }}>
            <button className="homepage-hero-button">Shop plants</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
