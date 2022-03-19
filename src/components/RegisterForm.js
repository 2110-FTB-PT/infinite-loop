import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/AccountForm.css";

const RegisterForm = ({ setToken }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const token = await login(username.toLowerCase(), password);
    //   localStorage.setItem("token", token);
    //   setToken(token);
    //   navigate("/");
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
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <button className='account-form-button'>Submit</button>
        <div className='account-form-additional'>
          Already a member?
          <Link className='account-form-additional-path' to={"/login"}>
            {" "}
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
