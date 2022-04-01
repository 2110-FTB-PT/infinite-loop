import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchOrder, cancelOrder } from "../../axios-services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/Toast.css";
import "../../style/EditProduct.css";
import "../../style/EditMyAccount.css";

const EditOrder = ({ token }) => {
  const [order, setOrder] = useState({});
  const params = useParams();
  const { id } = params;

  const handleOrder = async () => {
    const singleOrder = await fetchOrder(id);
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
    <div className='edit-product-page'>
      <div className='edit-product-container'>
        <Link style={{ textDecoration: "none" }} to='/admin/orders'>
          <div className='edit-back-to-my-account'>Back to all Orders</div>
        </Link>
        <div className='product-container'>
          <div>
            <div>
              <div className='edit-section-header'>Order: #{order.id}</div>
              <div className='edit-product-info'>
                <div className='edit-product-label'>Status:</div>
                {order.currentStatus}
              </div>
              <div className='edit-section-header'>Customer Information</div>
              {order.first_name && order.last_name ? (
                <div className='edit-product-info'>
                  <div className='edit-product-label'>Name:</div>
                  {order.first_name} {order.last_name}
                </div>
              ) : (
                <div className='edit-product-info'>
                  <div className='edit-product-label'>Customer:</div>
                  Guest
                </div>
              )}
              <div className='edit-product-info'>
                <div className='edit-product-label'>Address:</div>
                {order.address}
              </div>
            </div>
            <div className='edit-section-header'>Order Details</div>{" "}
            {order.products &&
              order.products.map((product) => {
                const { name, quantity, price } = product;
                return (
                  <div className='edit-product-info'>
                    <div className='edit-product-label'>Product:</div> {name}
                    <br></br>
                    <br></br>
                    <div className='edit-product-label'>Quantity: </div>
                    {quantity}
                    <br></br>
                    <br></br>
                    <div className='edit-product-label'>Price: </div>
                    {price}
                  </div>
                );
              })}
          </div>
          <div className='edit-section-header'>Total: $0</div>
          <br></br>
        </div>

        <form
          className='edit-product-container'
          onSubmit={() => handleCancel(id)}
        >
          {" "}
          <label htmlFor='order status' className='edit-product-label'>
            Update Order Status
          </label>
          <select className='my-account-dropdown' value={order.currentStatus}>
            <option>Select Status</option>
            <option
              value='canceled'
              onChange={(event) => {
                setOrder({ ...order, currentStatus: event.target.value });
              }}
            >
              Cancel Order
            </option>
            <option>Skip Payment</option>
          </select>
          <button className='edit-my-account-save-button'>Save</button>
          <div className='outlier-padding'></div>
        </form>
      </div>
    </div>
  );
};

export default EditOrder;
