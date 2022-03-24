import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllOrders } from "../../axios-services";

const Orders = () => {
    const [ orders, setOrders ] = useState([])

    const handleOrders = async () => {
        const allOrders = await fetchAllOrders();
        setOrders(allOrders)
    }

    useEffect(() => {
        handleOrders()
    }, []);

    return (
        <div>
            <Link to="/admin"><h1>Back to Admin Dashboard</h1></Link>
            <h1>Total Orders: {orders.length}</h1>
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
                        <button>Edit Order</button>
                        <button>Cancel</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Orders;