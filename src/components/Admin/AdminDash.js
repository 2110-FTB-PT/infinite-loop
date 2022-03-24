import React from 'react';
import { Link } from "react-router-dom";
import "../../style/Collections.css";

const AdminDash = () => {

    return (
        <div>
            <h1>Admin Dashboard</h1>
            
            <div>
                <Link to="/orders"><h2>Manage Orders</h2></Link>
            </div>
            <div>
                <Link to="/customers"><h2>Manage Customers</h2></Link>
            </div>
            <div>
                <Link to="/reviews"><h2>Manage Reviews</h2></Link>
            </div>
            <div>
                <Link to="/reviews"><h2>Admin Settings</h2></Link>
            </div>
        </div>
    )
}

export default AdminDash;