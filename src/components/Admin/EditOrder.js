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
                        <p>Customer: {order.email}</p>
                    </div>
                    {order.products && order.products.map((product) => {
                        const { name, quantity, price } = product;
                        return (
                            <div>
                            <h3>Products</h3>
                            <p>{name}</p>
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default EditOrder;