import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllOrders } from "../../axios-services";
import { FaRegEdit } from "react-icons/fa";
import OrdersChart from "./OrdersChart";
import "../../style/Orders.css";
import "../../style/Admin.css";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

    const handleOrders = async () => {
      try { const allOrders = await fetchAllOrders();
        const successsOrders = allOrders.filter((orders) => {
            return orders.currentStatus === "success"
          })
          setOrders(successsOrders)
      } catch(error) {
        console.error(error)
      }
    }

  useEffect(() => {
    handleOrders();
  }, []);

  return (
    <div className='general-dashboard-container'>
      <div className='general-dashboard-content'>
        <Link to='/admin' className='general-dashboard-back-link'>
          Back to Dashboard
        </Link>
        <div className='general-dashboard-header'>Orders</div>
        <div className='general-dashboard-subheader'>
          Total Orders: {orders.length}
        </div>
        < OrdersChart orders={orders} />
        {orders.length ?
        <div className='table-wrapper'>
          <table className='orders-table'>
            <tr className='table-headers'>
              <th>Order #</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Edit</th>
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
                  <td>
                    <FaRegEdit
                      role='button'
                      onClick={() => navigate(`/admin/orders/${id}`)}
                    />
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      : <h3>There are no orders yet.</h3>}
      </div>
    </div>
  );
};

export default Orders;