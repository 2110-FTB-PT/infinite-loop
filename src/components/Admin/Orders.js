import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllOrders } from "../../axios-services";
import { FaRegEdit, FaUserAltSlash } from 'react-icons/fa'
import "../../style/Orders.css"

// TO DO:
// - add products to order
// - add edit order functionality
// - add delete order functionality

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
            <div className="table-wrapper">
                <table className="orders-table">
                    <tr className="table-headers">
                        <th>Order Number</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Address</th>
                        <th><FaRegEdit /></th>
                        <th><FaUserAltSlash /></th>
                    </tr>
                    {orders.map((order) => {
                        const { id, email, address, currentStatus } = order;
                        return (
                            <tr>
                                <td>{id}</td>
                                <td>{email}</td>
                                <td>{currentStatus}</td>
                                <td>{address}</td>
                                <td><FaRegEdit /></td>
                                <td><FaUserAltSlash /></td>
                            </tr>         
                        )
                    })}
                </table>
            </div>
        </div>
    )
}

export default Orders;