import React from "react";
import { useState, useEffect } from "react";
import SingleOrder from "./SingleOrder";
import { fetchOrdersByUser } from "../../axios-services";

//TODO: once login is set, need to pull order by userId
const MyOrders = ({ token, user }) => {
  const [myOrders, setMyOrders] = useState([]);
  const { username } = user

  const handleOrders = async () => {
    try {
      const fetchedOrders = await fetchOrdersByUser(token, username)
      setMyOrders(fetchedOrders)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleOrders();
  }, []);


  return (
    <div>
      <h2>My Orders</h2>
      <div className="table-wrapper">
                <table className="orders-table">
                    <tr className="table-headers">
                        <th>Order #</th>
                        <th>Status</th>
                    </tr>
                    {myOrders.map((order) => {
                        const { id, currentStatus } = order;
                        return (
                            <tr>
                                <td>{id}</td>
                                <td>{currentStatus}</td>
                            </tr>      
                        )
                    })}
                </table>
            </div>

      <h2>My Reviews</h2>
    </div>
  );
};

export default MyOrders;
