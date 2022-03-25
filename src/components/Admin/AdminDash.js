import React from 'react';
import { Link } from "react-router-dom";
import "../../style/Collections.css";

const AdminDash = () => {

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <Link to="/admin/products"><h2>Manage Products</h2></Link>
                <Link to="/admin/orders"><h2>Manage Orders</h2></Link>
            </div>
            <div>
                <Link to="/admin/accounts"><h2>Manage Accounts</h2></Link>
            </div>
            <div>
                <Link to="/admin/reviews"><h2>Manage Reviews</h2></Link>
            </div>
            <div>
                <Link to="/admin/adminsettings"><h2>Admin Settings</h2></Link>
            </div>
        </div>
    )
}

export default AdminDash;