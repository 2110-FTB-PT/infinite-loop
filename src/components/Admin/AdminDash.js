import React from "react";
import { Link } from "react-router-dom";
import "../../style/Admin.css";
import products from "../../components/img/manage-products.png";
import orders from "../../components/img/manage-orders.png";
import accounts from "../../components/img/manage-accounts.png";
import reviews from "../../components/img/manage-reviews.png";

const AdminDash = () => {
  return (
    <div className='admin-dashboard-container '>
      <div className='admin-dashboard-content'>
        <div className='admin-dashboard-header'>Dashboard</div>

        <div className='admin-dashboard'>
          <div className='admin-dashboard-option'>
            <Link to='/admin/products'>
              <img
                className='admin-dashboard-img'
                src={products}
                alt='person-working-on-laptop-spot-illo'
              />
            </Link>
            <Link to='/admin/products' className='admin-dashboard-links'>
              Manage Products
            </Link>
          </div>

          <div className='admin-dashboard-option'>
            <Link to='/admin/orders'>
              <img
                className='admin-dashboard-img'
                src={orders}
                alt='hand-search-doc-spot-illo'
              />
            </Link>
            <Link to='/admin/orders' className='admin-dashboard-links'>
              Manage Orders
            </Link>
          </div>

          <div className='admin-dashboard-option'>
            <Link to='/admin/accounts'>
              <img
                className='admin-dashboard-img'
                src={accounts}
                alt='customer-holding-avatar-spot-illo'
              />
            </Link>
            <Link to='/admin/accounts' className='admin-dashboard-links'>
              Manage Accounts
            </Link>
          </div>

          <div className='admin-dashboard-option'>
            <Link to='/admin/reviews'>
              <img
                className='admin-dashboard-img'
                src={reviews}
                alt='happy-customers-spot-illo'
              />
            </Link>
            <Link to='/admin/reviews' className='admin-dashboard-links'>
              Manage Reviews
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
