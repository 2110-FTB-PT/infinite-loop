import React from "react";
import { useState, useEffect } from "react";
import { fetchOrdersByUser, fetchSingleUser } from "../../axios-services";

const UserOrders = ({ token, user }) => {
  const [orders, setOrders] = useState([]);

  const handleOrders = async () => {
    try {
      const singleUser = await fetchSingleUser(user.id);
      const { username } = singleUser;
      const allOrders = await fetchOrdersByUser(token, username);
      const successOrders = allOrders.filter((orders) => {
        return orders.currentStatus === "success";
      });
      setOrders(successOrders);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleOrders();
  }, [token, user]);

  return (
    <>
      {orders.length ? (
        <div className="product-details">
          <h4>{user.full_name}'s Orders</h4>
          <div className="table-wrapper">
            <table className="orders-table">
              <tr className="table-headers">
                <th>Order #</th>
                <th>Customer</th>
                <th>Status</th>
              </tr>
              {orders.map((order) => {
                const { id, first_name, last_name, currentStatus } = order;
                return (
                  <tr>
                    <td>{id}</td>
                    {first_name && last_name ? (
                      <td>
                        {first_name} {last_name}
                      </td>
                    ) : (
                      <td> Guest </td>
                    )}
                    <td>{currentStatus}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      ) : (
        <h4 className="product-details">{user.username} has 0 orders.</h4>
      )}
    </>
  );
};

export default UserOrders;
