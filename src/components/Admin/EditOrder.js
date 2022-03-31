import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchOrder, cancelOrder } from "../../axios-services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/Toast.css";

const EditOrder = ({ token }) => {
  const [order, setOrder] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const params = useParams();
  const { id } = params;

  const handleOrder = async () => {
    const singleOrder = await fetchOrder(id);

    let singleOrderSubTotal = 0;
    let _shippingFee = 0;
    for (let i = 0; i < singleOrder.products.length; i++) {
      singleOrderSubTotal +=
        singleOrder.products[i].quantity * singleOrder.products[i].price * 1;

      if (singleOrderSubTotal < 10) {
        _shippingFee = 5.0;
        setShippingFee(5.0);
      } else if (singleOrderSubTotal >= 10 && singleOrderSubTotal <= 100) {
        _shippingFee = 10.0;
        setShippingFee(10.0);
      } else if (singleOrderSubTotal > 100) {
        _shippingFee = 25.0;
        setShippingFee(25.0);
      }
    }
    setSubTotal(singleOrderSubTotal);
    setOrderTotal(singleOrderSubTotal + _shippingFee);
    window.scroll({ top: 0, behavior: "smooth" });
    setOrder(singleOrder);
    window.scroll({ top: 0, behavior: "smooth" });
  };

  const handleCancel = async (id) => {
    try {
      const updatedOrder = await cancelOrder(token, id);
      setOrder(updatedOrder);
      toast("Order is canceled!", {
        progressClassName: "css",
      });
      window.scroll({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleOrder();
  }, []);

  return (
    <div>
      <Link to="/admin/orders">
        <h1>Back To All Orders</h1>
      </Link>
      <div className="product-container">
        <div>
          <div>
            <h3>Order: #{order.id}</h3>
            <p>Status: {order.currentStatus}</p>
            <h3>Customer Information</h3>
            {order.first_name && order.last_name ? (
              <p>
                Customer: {order.first_name} {order.last_name}
              </p>
            ) : (
              <p>Customer: Guest </p>
            )}
            <p>Address: {order.address}</p>
          </div>
          <h3>Order Details</h3>
          {order.products &&
            order.products.map((product) => {
              const { name, quantity, price } = product;
              return (
                <div>
                  <p>Product: {name}</p>
                  <p>Quantity: {quantity}</p>
                  <p>Price: {price}</p>
                </div>
              );
            })}
          <h4>Subtotal: ${subTotal}</h4>
          <h4>Shipping: ${shippingFee}</h4>
          <h4>Total: ${orderTotal}</h4>
        </div>
      </div>
      <form
        className="edit-product-container"
        onSubmit={() => handleCancel(id)}
      >
        <label htmlFor="order status">Update Order Status</label>
        <select value={order.currentStatus}>
          <option>Select Status</option>
          <option
            value="canceled"
            onChange={(event) => {
              setOrder({ ...order, currentStatus: event.target.value });
            }}
          >
            Cancel Order
          </option>
          <option>Skip Payment</option>
        </select>
        <button>Save</button>
      </form>
    </div>
  );
};

export default EditOrder;
