import React from "react";
import { useState, useEffect } from 'react';
import { fetchSingleUser, updateUser } from "../../axios-services";
import { Link, useNavigate } from "react-router-dom";

const EditMyAccount = ({ token, user, setUser }) => {
    const [myAccount, setMyAccount] = useState({});

    const navigate = useNavigate()
    const { id } = user;

    const handleMyAccount = async () => {
        const fetchedAccount = await fetchSingleUser(id)
        setMyAccount(fetchedAccount)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedAccount = await updateUser(token, myAccount)
            console.log('updateduser: ', updatedAccount)
            setMyAccount(updatedAccount)
            setUser(updatedAccount)
            navigate('/myaccount')
        } catch(error){
            console.error(error)
        }
    } 

    useEffect(() => {
        handleMyAccount();
    }, [token, user]);

    return (
        <div>
            <Link to="/myaccount"><h1>Back To My Account</h1></Link>
            <h2>Edit Account</h2>
            <form className="edit-product-container" onSubmit={handleSubmit}>
                <label htmlFor="name">Name </label>
                <input
                    placeholder="Full Name"
                    value={myAccount.full_name}
                    onChange={(event) => { setMyAccount({ ...myAccount, full_name: event.target.value }) }}
                />
                <label htmlFor="name">Username </label>
                <input
                    placeholder="Username"
                    value={myAccount.username}
                    onChange={(event) => { setMyAccount({ ...myAccount, username: event.target.value }) }}
                />
                <label htmlFor="name">Email </label>
                <input
                    placeholder="Email"
                    value={myAccount.email}
                    onChange={(event) => { setMyAccount({ ...myAccount, email: event.target.value }) }}
                />
                <label htmlFor="name">Password </label>
                <input
                    placeholder="password"
                    onChange={(event) => { setMyAccount({ ...myAccount, password: event.target.value }) }}
                />

                <label htmlFor="account status"> Account Status</label>
                <select
                    value={myAccount.isActive}
                    onChange={(event) => { setMyAccount({ ...myAccount, isActive: event.target.value })}}>
                        <option value="true">Active</option>
                        <option value="false">Deactivated</option>
                </select>
                <button>Save</button>
            </form>
        </div>
    )
}

export default EditMyAccount; 