import React from "react";
import MyOrders from "./MyOrders";
import MyReviews from "./MyReviews";
import { useState, useEffect } from "react";
import { fetchOrdersByUser } from "../../axios-services";


//TODO: once token is done
const MyAccount = ({ token, user }) => {
  const [myOrders, setMyOrders] = useState([]);

  return (
    <div>
      <h1>My Account</h1>
      <h2>My Information</h2>
      <p>Name: {user.full_name}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <MyOrders token={token} user={user} />
      <MyReviews token={token} user={user} />
    </div>
  );
};

export default MyAccount;
