import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import AccountForm from "./AccountForm";
import Navigation from "./Navigation";
import Home from "./Home";
import Footer from "./Footer";

// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "../axios-services";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  return (
    <div className='app-container'>
      <Navigation />
      <Home />
      {/* <AccountForm /> */}
      <Footer />
    </div>
  );
};

export default App;
