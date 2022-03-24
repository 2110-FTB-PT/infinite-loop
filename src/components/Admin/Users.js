import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchUsers } from "../../axios-services/index";

const Users = () => {
    const [ users, setUsers ] = useState([])

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
            {users.map((user) => {
                const { id, full_name, email, username } = user
                return (
                    <div>
                        <ul>
                            <li>id: {id}</li>
                            <li>Full Name: {full_name}</li>
                            <li>Email: {email}</li>
                            <li>Username: {username}</li>
                            <button>Edit Customer</button>
                            <button>Deactivate</button>
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}

export default Users;