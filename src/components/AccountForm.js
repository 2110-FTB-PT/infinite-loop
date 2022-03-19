import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import "../style/AccountForm.css";

const AccountForm = () => {
  const params = useParams();
  let { method } = params;
  const title = method === "login" ? "Log In" : "Register";
  const userRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    userRef.current.focus();
    setUsername("");
    setPassword("");
  }, [method]);

  return (
    <div className='account-form-container'>
      <form className='account-form-content-container'>
        <div className='account-form-header'>{title}</div>
        <div className='account-form-content'>
          <label htmlFor='username' className='account-form-label'>
            Username:
          </label>
          <input
            className='account-form-input'
            required
            ref={userRef}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className='account-form-content'>
          <label htmlFor='password' className='account-form-label'>
            Password:
          </label>
          <input
            className='account-form-input'
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className='account-form-button'>Submit</button>
        <div className='account-form-additional'>
          {method === "login" ? (
            <div>
              Not a member yet?
              <Link className='account-form-additional-path' to={"/register"}>
                {" "}
                Register Now
              </Link>
            </div>
          ) : (
            <div>
              Already have an account?{" "}
              <Link className='account-form-additional-path' to={"/login"}>
                {" "}
                Log in
              </Link>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AccountForm;
