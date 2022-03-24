import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/AccountForm.css";
import { login, register } from "../axios-services"; 

const RegisterForm = ({ setToken }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await register(username, password);
      const [token] = await login(username.toLowerCase(), password);
      setToken(token);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      setUserName("");
      setPassword("");
      console.dir("error at submit register", error)
    }
  };

  return (
    <div className='account-form-container'>
      <form className='account-form-content-container' onSubmit={handleSubmit}>
        <div className='account-form-header'>Register</div>
        <div className='account-form-content'>
          <label className='account-form-label'>Username:</label>
          <input
            className='account-form-input'
            required
            value={username}
            placeholder="username"
            onChange={(event) => {
              setUserName(event.target.value);
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
            placeholder="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <button className='account-form-button'>Submit</button>
        <div className='account-form-additional'>
          <Link className='account-form-additional-path' to={"/login"}>
            Already a member? Login Here!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
