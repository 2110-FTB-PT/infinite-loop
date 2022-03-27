import React, { useEffect } from "react"
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchOrder, cancelOrder } from "../../axios-services";

const EditOrder = ({ token }) => {
    const [order, setOrder] = useState({})
    const params = useParams();
    const { id } = params;

    const handleOrder = async () => {
        const singleOrder = await fetchOrder(id)
        console.log('single order ', singleOrder)
        setOrder(singleOrder)
        window.scroll({top:0, behavior: "smooth"})
    }

    const handleCancel = async (id) => {
        try {
            const updatedOrder = await cancelOrder(token, id)
            setOrder(updatedOrder)
            window.scroll({top:0, behavior: "smooth"})
        } catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        handleOrder();
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
                        {order.first_name && order.last_name ? <p>Customer: {order.first_name} {order.last_name}</p> : <p>Customer: Guest </p>}
                        <p>Address: {order.address}</p>
                    </div>
                    <h3>Order Details</h3>
                    {order.products && order.products.map((product) => {
                        const { name, quantity, price } = product;
                        return (
                            <div>
                            <p>Product: {name}</p>
                            <p>Quantity: {quantity}</p>
                            <p>Price: {price}</p>
                        </div>
                        )
                    })}
                    <h4>Total: $0</h4>
                </div>
            </div>
                <form className="edit-product-container" onSubmit={() => handleCancel(id)}>
                <label htmlFor="order status"> Update Order Status</label>
                <select name="cancel">
                    <option value="select status"> select status </option>
                    <option 
                     value='canceled'
                     onChange={(event) => { setOrder({ ...order, currentStatus: event.target.value})}}
                    >canceled</option>
                    <option value="success"> Skip Payment </option>
                </select>
                <button>Save</button>
            </form>
        </div>
    )
}

export default EditOrder;