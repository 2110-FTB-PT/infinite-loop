import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/AccountForm.css";
import { login, register } from "../axios-services";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/Toast.css';

const RegisterForm = ({ setToken }) => {
  const [full_name, setFull_Name] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await register(full_name, email, username, password);
      const [newToken, message] = await login(username.toLowerCase(), password);
      setToken(newToken);
      setMessage(message);
      navigate("/");
      toast("Thank you for registering!", {
        progressClassName: "css"
      });
    } catch (error) {
      console.log(error.response.data);
      setMessage(error.response.data.message);
      setFull_Name("");
      setEmail("");
      setUserName("");
      setPassword("");
      console.dir("error at submit register", error);
    }
  };

  return (
    <div className='account-form-container'>
      <form className='account-form-content-container' onSubmit={handleSubmit}>
        <div className='account-form-header'>Register</div>
        <div className='account-form-content'>
          <label className='account-form-label'>Full Name:</label>
          <input
            className='account-form-input'
            required
            value={full_name}
            placeholder='full name'
            onChange={(event) => {
              setFull_Name(event.target.value);
            }}
          />
        </div>

        <div className='account-form-content'>
          <label className='account-form-label'>Email:</label>
          <input
            className='account-form-input'
            required
            value={email}
            placeholder='email'
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>

        <div className='account-form-content'>
          <label className='account-form-label'>Username:</label>
          <input
            className='account-form-input'
            required
            value={username}
            placeholder='username'
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
            placeholder='password'
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        {message && <div className='err-message'>{message}</div>}
        <button className='account-form-button'>Submit</button>
        <div className='account-form-additional'>
          Already a member?
          <Link className='account-form-additional-path' to={"/login"}>
            &nbsp;Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
