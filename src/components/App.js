import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../db";
import LoginForm from "./LoginForm";
// import RegisterForm from "./RegisterForm";
import Navigation from "./Navigation";
import Home from "./Home";
import Footer from "./Footer";

// // getAPIHealth is defined in our axios-services directory index.js
// // you can think of that directory as a collection of api adapters
// // where each adapter fetches specific info from our express server's /api route
// import { getAPIHealth } from "../axios-services";

const App = () => {
  //   const [APIHealth, setAPIHealth] = useState("");

  //   useEffect(() => {
  //     // follow this pattern inside your useEffect calls:
  //     // first, create an async function that will wrap your axios service adapter
  //     // invoke the adapter, await the response, and set the data
  //     const getAPIStatus = async () => {
  //       const { healthy } = await getAPIHealth();
  //       setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
  //     };

  //     // second, after you've defined your getter above
  //     // invoke it immediately after its declaration, inside the useEffect callback
  //     getAPIStatus();
  //   }, []);

  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const handleUser = async () => {
    if (token) {
      const userObject = await getUser(token);
      setUser(userObject);
    } else {
      setUser({});
    }
  };

  useEffect(() => {
    handleUser();
  }, [token]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <div className='app-container'>
      <Navigation token={token} setToken={setToken} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm setToken={setToken} />} />
        {/* <Route
          path='/register'
          element={<RegisterForm token={token} setToken={setToken} />}
        /> */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
