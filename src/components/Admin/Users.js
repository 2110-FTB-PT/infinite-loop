import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchUsers } from "../../axios-services/index";
import UserOrders from "./UserOrders";
import { FaRegEdit, FaEye } from 'react-icons/fa'
import "../../style/Users.css"
 
const Users = () => {
    const [ users, setUsers ] = useState([])
    const navigate = useNavigate()

    const handleUsers = async () => {
        const allUsers = await fetchUsers();
        setUsers(allUsers)
    }

    useEffect(() => {
        handleUsers()
    }, []);


    return (
        <div>
            <Link to="/admin"><h1>Back to Admin Dashboard</h1></Link>
            <h1>Accounts</h1>
            <div className="table-wrapper">
                <table className="users-table">
                    <tr className="table-headers">
                        <th>Account #</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Account Status</th>
                        <th>Admin</th>
                        <th><FaEye /></th>
                    </tr>
                    {users.map((user) => {
                        const { id, full_name, email, username, isActive, isAdmin } = user;
                        return (
                            <tr>
                                <td>{id}</td>
                                <td>{username}</td>
                                <td>{full_name}</td>
                                <td>{email}</td>
                                <td>{isActive === true ? "active" : "deactivated"}</td>
                                <td>{isAdmin === true ? "admin" : null}</td>
                                <td><FaEye 
                                    role="button"
                                    onClick={() => navigate(`/admin/accounts/${id}`)}    
                                /></td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}

export default Users;