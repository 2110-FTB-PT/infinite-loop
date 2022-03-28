import React from "react";
import MyOrders from "./MyOrders";
import MyReviews from "./MyReviews";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MyAccount = ({ token, user }) => {
  const [myOrders, setMyOrders] = useState([]);
  const navigate = useNavigate()


  return (
    <div>
      <h1>My Account</h1>
      <h2>My Information</h2>
      <p>Name: {user.full_name}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <button onClick={() => navigate('/myaccount/edit')}>Edit My Account</button>
      <MyOrders token={token} user={user} />
      <MyReviews token={token} user={user} />
    </div>
  );
};

export default MyAccount;
