import React from "react";
import "../style/AccountForm.css";

const AccountForm = () => {
  return (
    <div className='account-form-container'>
      <form>
        <label htmlFor='username' className='account-form-username-label'>
          Username:
        </label>
        <input />

        <label htmlFor='password' className='account-form-password-label'>
          Password:
        </label>
        <input />
      </form>
    </div>
  );
};

export default AccountForm;
