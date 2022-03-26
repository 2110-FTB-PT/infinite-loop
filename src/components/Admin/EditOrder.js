import React, { useEffect } from "react"
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchOrder } from "../../axios-services";


const EditOrder = ({ token }) => {
    const [order, setOrder] = useState({})
    const navigate = useNavigate()
    const params = useParams();
    const { id } = params;

    const handleOrder = async () => {
        const singleOrder = await fetchOrder(id)
        console.log('single order ', singleOrder)
        console.log('products', singleOrder.products)
        setOrder(singleOrder)
    }

    useEffect(() => {
        handleOrder()
    }, []);


    return (
        <div>
            <Link to="/admin/orders"><h1>Back To All Orders</h1></Link>
            <div className="product-container">
                <div>
                    <div>
                        <h3>Order: #{order.id}</h3>
                        <p>Status: {order.currentStatus}</p>
                        <h3>Customer Information</h3>
                        <p>Customer: {order.email}</p>
                    </div>
                    {order.products && order.products.map((product) => {
                        const { name, quantity, price } = product;
                        return (
                            <div>
                            <h3>Order Details</h3>
                            <p>Product: {name}</p>
                            <p>Quantity: {quantity}</p>
                            <p>Price: {price}</p>
                            <p>Total: ${quantity * price}</p>
                        </div>
                        )
                    })}
                </div>
            </div>
            <h2>Edit Order</h2>
        </div>
    )
}

export default EditOrder;