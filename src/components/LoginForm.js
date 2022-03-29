import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../axios-services";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../style/AccountForm.css";
import '../style/Toast.css';
import { FaBlackberry } from "react-icons/fa";

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const [newToken, message] = await login(username.toLowerCase(), password);
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setMessage(message);
      navigate("/");
      toast("You are logged in!", {
        progressClassName: "css"
      });
    } catch (error) {
      console.log(error.response.data);
      setMessage(error.response.data.message);
      setPassword("");
      console.dir("error at submit login", error);
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
            placeholder='username'
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>{" "}
        <div className='account-form-content'>
          <label className='account-form-label'>Password:</label>
          <input
            className='account-form-input'
            required
            type='password'
            value={password}
            placeholder='password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {message && <div className='err-message'>{message}</div>}
        <button className='account-form-button'>Submit</button>
        <div className='account-form-additional'>
          Not a member yet? &nbsp;
          <Link className='account-form-additional-path' to={"/register"}>
            Register Now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
