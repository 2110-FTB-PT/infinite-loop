import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchUsers } from "../../axios-services/index";
import { FaRegEdit, FaUserAltSlash } from 'react-icons/fa'
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
            <h1>Customers</h1>
            <div className="table-wrapper">
                <table className="users-table">
                    <tr className="table-headers">
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th><FaRegEdit /></th>
                        <th><FaUserAltSlash /></th>
                    </tr>
                    {users.map((user) => {
                        const { id, full_name, email, username } = user;
                        return (
                            <tr>
                                <td>{username}</td>
                                <td>{full_name}</td>
                                <td>{email}</td>
                                <td><FaRegEdit 
                                    role="button"
                                    onClick={() => navigate(`/admin/customers/${id}`)}    
                                /></td>
                                <td><FaUserAltSlash /></td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}

export default Users;