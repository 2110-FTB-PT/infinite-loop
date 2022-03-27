import React from "react";
import { useState, useEffect } from "react";
import { fetchOrdersByUser } from "../../axios-services";
import { FaRegEdit } from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";

//TODO: once login is set, need to pull order by userId
const MyOrders = ({ token, user }) => {
  const navigate = useNavigate()
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
  }, [token, user]);


  return (
    <div>
      <h2>My Orders</h2>
      <div className="table-wrapper">
                <table className="orders-table">
                    <tr className="table-headers">
                        <th>Order #</th>
                        <th>Status</th>
                        <th>Preview</th>
                    </tr>
                    {myOrders.map((order) => {
                        const { id, currentStatus } = order;
                        return (
                            <tr>
                                <td>{id}</td>
                                <td>{currentStatus}</td>
                                {<td><FaRegEdit 
                                  role="button"
                                  onClick={() => navigate(`/myaccount/order/${id}`)}
                                /></td>}
                            </tr>      
                        )
                    })}
                </table>
            </div>
    </div>
  );
};

export default MyOrders;
