import React from "react";
import { fetchSingleUser, updateUserForAdmin } from "../../axios-services";
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import UserOrders from "./UserOrders";
import { FaTrashAlt } from 'react-icons/fa'
import "../../style/EditProduct.css";

const EditUser = ({ token }) => {
    const [user, setUser] = useState({})
    const params = useParams();
    const { id } = params;

    const handleUser = async () => {
        const singleUser = await fetchSingleUser(id)
        setUser(singleUser)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedUser = await updateUserForAdmin(token, user)
            setUser(updatedUser)
            window.scroll({top:0, behavior: "smooth"})
        } catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        handleUser();
    }, []);

    return (
        <div>
            <Link to="/admin/accounts"><h1>Back To All Accounts</h1></Link>
            <div className="product-container">
                        <div className="product-info">
                            <div className="product-details">
                                <h3>Name: {user.full_name}</h3>
                                <p>Username: {user.username}</p>
                                <p>Email: {user.email}</p>
                                {user.isActive && <p>Status: Active</p>}
                                {!user.isActive && <p>Status: Deactivated</p>}
                                {user.isAdmin && <p>Account Type: Admin</p>}
                            </div>
                        </div>
                        <UserOrders token={token} user={user} id={id}/>
            </div>
            <h2>Edit Account</h2>
            <form className="edit-product-container" onSubmit={handleSubmit}>
                <input
                    placeholder="Full Name"
                    value={user.full_name}
                    onChange={(event) => { setUser({ ...user, full_name: event.target.value }) }}
                />
                <input
                    placeholder="Username"
                    value={user.username}
                    onChange={(event) => { setUser({ ...user, username: event.target.value }) }}
                />
                <input
                    placeholder="Email"
                    value={user.email}
                    onChange={(event) => { setUser({ ...user, email: event.target.value }) }}
                />

                <label htmlFor="account status"> Account Status</label>
                <select
                    value={user.isActive}
                    onChange={(event) => { setUser({ ...user, isActive: event.target.value })}}>
                        <option value="true">Active</option>
                        <option value="false">Deactivated</option>
                </select>

                <label htmlFor="admin status"> Admin Settings</label>
                <select
                    value={user.isAdmin}
                    onChange={(event) => { setUser({ ...user, isAdmin: event.target.value })}}>
                        <option value="true" >Admin Account</option>
                        <option value="false">Standard Account</option>
                </select>
                <button>Save</button>
            </form>
        </div>
    )
}

export default EditUser;