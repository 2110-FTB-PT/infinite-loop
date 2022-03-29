import React from "react";
import { useState, useEffect } from 'react';
import { fetchOrdersByUser, fetchSingleUser } from "../../axios-services";

const UserOrders = ({ token, user }) => {
    const [orders, setOrders] = useState([])
    console.log('token ', token)

    const handleOrders = async () => {
        const singleUser = await fetchSingleUser(user.id)
        const { username } = singleUser;
        console.log('username: ', username)
        const allOrders = await fetchOrdersByUser(token, username)
        console.log('all orders: ', allOrders)
        setOrders(allOrders)
    }

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
                                {first_name && last_name ? <td>{first_name} {last_name}</td> : <td> Guest </td>}
                                <td>{currentStatus}</td>
                            </tr>      
                        )
                    })}
                </table>
            </div>
        </div>
        ) : <p>No orders associated with {user.full_name}'s account.</p>}
        </>
    )
}

export default UserOrders;