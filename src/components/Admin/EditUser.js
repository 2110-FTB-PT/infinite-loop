import React from "react";
import { fetchSingleUser, updateUser } from "../../axios-services";
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaTrashAlt } from 'react-icons/fa'
import "../../style/EditProduct.css";

const EditUser = ({ token }) => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const params = useParams();
    const { id } = params;

    const handleUser = async () => {
        const singleUser = await fetchSingleUser(id)
        console.log('single user', singleUser)
        setUser(singleUser)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedUser = await updateUser(token, user)
            setUser(updatedUser)
            window.scroll({top:0, behavior: "smooth"})
        } catch(error){
            console.error(error)
        }
    }

    const handleDelete = async () => {
        try { 

        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleUser();
    }, []);

    return (
        <div>
            <Link to="/admin/customers"><h1>Back To All Customers</h1></Link>
            <div className="product-container">
                        <div className="product-info">
                            <div className="product-details">
                                <h3>{user.full_name}</h3>
                                <p>{user.username}</p>
                                <p>{user.email}</p>
                                <p>{user.isActive}</p>
                                <p>{user.isAdmin}</p>
                            </div>
                        </div>
            </div>
            <h2>Edit Customer</h2>
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
                <input
                    placeholder="Account Status"
                    value={user.isActive}
                    onChange={(event) => { setUser({ ...user, isActive: event.target.value }) }}
                />
                <input
                    placeholder="Admin Status"
                    value={user.isAdmin}
                    onChange={(event) => { setUser({ ...user, isAdmin: event.target.value }) }}
                />
                <button>Save</button>
                {<FaTrashAlt 
                    role="button"
                    onClick={() => handleDelete(id)}
                />}
            </form>
        </div>
    )
}

export default EditUser;