import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllOrders } from "../../axios-services";

const Orders = () => {
    const [ orders, setOrders ] = useState([])

    const handleOrders = async () => {
        const allOrders = await fetchAllOrders();
        console.log('all orders: ', allOrders)
        setOrders(allOrders)
    }

    useEffect(() => {
        handleOrders()
    }, []);

    return (
        <div>
            <Link to="/admin"><h2>Back to Admin Dashboard</h2></Link>
            <h1>All Orders</h1>
            {orders.map((order) => {
                const { id, email, address, currentStatus } = order;
                return (
                    <div>
                        <h4>Order Number: {id}</h4>
                        <ul>
                            <li>Status: {currentStatus}</li>
                            <li>Email: {email}</li>
                            <li>Address: {address}</li>
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}

export default Orders;