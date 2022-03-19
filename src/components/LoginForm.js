import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../axios-services";
import "../style/AccountForm.css";

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await login(username.toLowerCase(), password);
      localStorage.setItem("token", token);
      setToken(token);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='account-form-container'>
      <form className='account-form-content-container' onSubmit={handleSubmit}>
        <div className='account-form-header'>Log In</div>
        <div className='account-form-content'>
          <label className='account-form-label'>Username:</label>
          <input
            className='account-form-input'
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className='account-form-content'>
          <label className='account-form-label'>Password:</label>
          <input
            className='account-form-input'
            required
            type='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className='account-form-button'>Submit</button>
        <div className='account-form-additional'>
          Not a member yet?
          <Link className='account-form-additional-path' to={"/register"}>
            {" "}
            Register Now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
