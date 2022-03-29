import React from "react";
import { useState, useEffect } from "react";
import { fetchOrdersByUser } from "../../axios-services";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyOrders = ({ token, user }) => {
  const navigate = useNavigate();
  const [myOrders, setMyOrders] = useState([]);
  const { username } = user;

  const handleOrders = async () => {
    try {
      const fetchedOrders = await fetchOrdersByUser(token, username);
      setMyOrders(fetchedOrders);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleOrders();
  }, [token, user]);

  console.log('my orders: ', myOrders.length)

  return (
    <div>
      {myOrders.length ? ( 
      <div className='table-wrapper'>
        <table className='orders-table'>
          <tr className='table-headers'>
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
                {
                  <td> Edit 
                    <FaRegEdit
                      role='button'
                      onClick={() => navigate(`/myaccount/order/${id}`)}
                    />
                  </td>
                }
              </tr>
            );
          })}
        </table>
      </div>
      ) : <p>Shop now to place your first order!</p>}
    </div>
  );
};

export default MyOrders;
