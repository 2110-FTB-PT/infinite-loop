import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllOrders } from "../../axios-services";
import { FaRegEdit } from 'react-icons/fa'
import "../../style/Orders.css"

const Orders = () => {
    const navigate = useNavigate();
    const [ orders, setOrders ] = useState([])

    const handleOrders = async () => {
        const allOrders = await fetchAllOrders();
        const successsOrders = allOrders.filter((orders) => {
            return orders.currentStatus === "success"
          })
          setOrders(successsOrders)
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
                        <th>Order #</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th><FaRegEdit /></th>
                    </tr>
                    {orders.map((order) => {
                        const { id, first_name, last_name, currentStatus } = order;
                        return (
                            <tr>
                                <td>{id}</td>
                                {first_name && last_name ? <td>{first_name} {last_name}</td> : <td> Guest </td>}
                                <td>{currentStatus}</td>
                                <td><FaRegEdit 
                                    role="button"
                                    onClick={() => navigate(`/admin/orders/${id}`)}
                                /></td>
                            </tr>      
                        )
                    })}
                </table>
            </div>
        </div>
    )
}

export default Orders;