import React from "react";
import MyOrders from "./MyOrders";
import MyReviews from "./MyReviews";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/MyAccount.css";

const MyAccount = ({ token, user }) => {
  const navigate = useNavigate();

  return (
    <div className="my-account-container">
      <div className="my-account-content">
        <div className="my-account-header">My Account</div>
        <div className="my-account-subheader">My Information</div>
        <div className="my-account-info">Name: {user.full_name}</div>
        <div className="my-account-info">Username: {user.username}</div>
        <div className="my-account-info">Email: {user.email}</div>
        <button
          className="my-account-edit-button"
          onClick={() => navigate("/myaccount/edit")}
        >
          Edit Account Info
        </button>
        <div className="my-account-subheader">My Orders</div>
        <MyOrders token={token} user={user} />
        <div className="my-account-subheader">My Reviews</div>
        <MyReviews token={token} user={user} />
      </div>
    </div>
  );
};

export default MyAccount;
