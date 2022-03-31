import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchOrder, cancelOrder } from "../../axios-services";

const SingleOrder = ({ token, user }) => {
  const [myOrder, setMyOrder] = useState({});
  const [orderTotal, setOrderTotal] = useState(0);
  const params = useParams();
  const { id } = params;

  const handleOrder = async () => {
    const singleOrder = await fetchOrder(id);
    setMyOrder(singleOrder);

    let singleOrderTotal  = 0;
    for (let i = 0; i < singleOrder.products.length; i++) {
      singleOrderTotal +=
        singleOrder.products[i].quantity * singleOrder.products[i].price * 1;
        console.log("orderTotal", singleOrderTotal)
      if (singleOrderTotal < 10) {
        singleOrderTotal += 5.0;
        setOrderTotal(singleOrderTotal);
      } else if (singleOrderTotal >= 10 && singleOrderTotal <= 100) {
        singleOrderTotal += 10.0;
        setOrderTotal(singleOrderTotal);
      } else if (singleOrderTotal > 100) {
        singleOrderTotal += 25.0;
        setOrderTotal(singleOrderTotal);
      }
    }
    window.scroll({ top: 0, behavior: "smooth" });
  };

  const handleCancel = async (id) => {
    try {
      const updatedOrder = await cancelOrder(token, id);
      setMyOrder(updatedOrder);
      window.scroll({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleOrder();
  }, [token, user]);

  return (
    <div>
      <h2>Order Details</h2>
      <Link to="/myaccount">
        <h1>Back To My Account</h1>
      </Link>
      <div className="product-container">
        <div>
          <div>
            <h3>Order: #{myOrder.id}</h3>
            <p>Status: {myOrder.currentStatus}</p>
            <h3>Customer Information</h3>
            {myOrder.first_name && myOrder.last_name ? (
              <p>
                Customer: {myOrder.first_name} {myOrder.last_name}
              </p>
            ) : (
              <p>Customer: Guest </p>
            )}
            <p>Address: {myOrder.address}</p>
          </div>
          <h3>Order Details</h3>
          {myOrder.products &&
            myOrder.products.map((product) => {
              const { name, quantity, price } = product;
              return (
                <>
                  <div>
                    <p>Product: {name}</p>
                    <p>Quantity: {quantity}</p>
                    <p>Price: {price}</p>
                  </div>
                </>
              );
            })}
          <h4>Total: ${orderTotal}</h4>
        </div>
      </div>
      <form
        className="edit-product-container"
        onSubmit={() => handleCancel(id)}
      >
        <label htmlFor="order status">Update Order Status</label>
        <select value={myOrder.currentStatus}>
          <option>Select Status</option>
          <option
            value="canceled"
            onChange={(event) => {
              setMyOrder({ ...myOrder, currentStatus: event.target.value });
            }}
          >
            Cancel Order
          </option>
        </select>
        <button>Save</button>
      </form>
    </div>
  );
};

export default SingleOrder;
