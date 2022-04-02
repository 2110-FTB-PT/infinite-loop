import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchOrder, cancelOrder } from "../../axios-services";

const SingleOrder = ({ token, user }) => {
  const [myOrder, setMyOrder] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const params = useParams();
  const { id } = params;

  const handleOrder = async () => {
    const singleOrder = await fetchOrder(id);
    setMyOrder(singleOrder);

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
    <div className="edit-my-account-container">
      <div className="edit-my-account-content">
        <div className="edit-form-content">
          <Link style={{ textDecoration: "none" }} to="/myaccount">
            <div className="back-to-my-account">Back to My Account</div>
          </Link>
          <div>
            <div>
              <div className="my-account-edit-header">Edit Order Status</div>
              <h3>Order Details</h3>
              <p>Order: #{myOrder.id}</p>
              <p>Status: {myOrder.currentStatus}</p>

              {myOrder.first_name && myOrder.last_name ? (
                <p>
                  Full Name: {myOrder.first_name} {myOrder.last_name}
                </p>
              ) : (
                <p>Account: Guest </p>
              )}
              <p>Address: {myOrder.address}</p>
            </div>

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
            <h4>Subtotal: ${subTotal}</h4>
            <h4>Shipping: ${shippingFee}</h4>
            <h4>Total: ${orderTotal}</h4>
          </div>
          <br></br>

          <form
            className="edit-product-container"
            onSubmit={() => handleCancel(id)}
          >
            <label className="account-form-label" htmlFor="order status">
              Update Order Status
            </label>
            <select
              className="my-account-dropdown"
              value={myOrder.currentStatus}
            >
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
            <button className="edit-my-account-save-button">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
