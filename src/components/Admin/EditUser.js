import React from "react";
import { fetchSingleUser, updateOrder, updateUserForAdmin } from "../../axios-services";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UserOrders from "./UserOrders";
import "../../style/EditProduct.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/Toast.css";
import "../../style/EditMyAccount.css";

const EditUser = ({ token }) => {
  const [user, setUser] = useState({});
  const [editedUser, setEditedUser] = useState({});
  const params = useParams();
  const { id } = params;

  const handleUser = async () => {
    const singleUser = await fetchSingleUser(id);
    setUser(singleUser);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedUser = await updateUserForAdmin(token, editedUser);
      setUser(updatedUser);
      setEditedUser(updatedUser);
      toast("Account updated!", {
        progressClassName: "css",
      });
      window.scroll({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <div className='edit-my-account-container'>
      <div className='edit-my-account-content'>
        <Link className='back-to-my-account' to='/admin/accounts'>
          Back to all Accounts
        </Link>
        <div className='my-account-edit-header'>Edit Account</div>
        <div className='product-container'>
          <div className='product-info'>
            <div className='product-details'>
              <p>Name: {user.full_name}</p>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              {user.isActive && <p>Status: Active</p>}
              {!user.isActive && <p>Status: Deactivated</p>}
              {user.isAdmin && <p>Account Type: Admin</p>}
            </div>
          </div>
          <br></br>
          <div style={{ textTransform: "capitalize" }}>
            <UserOrders token={token} user={user} id={id} />
          </div>
        </div>

        <div className='edit-my-account-container'>
          <div className='edit-my-account-content'>
            <div className='edit-form-content'>
              <form className='edit-product-container' onSubmit={handleSubmit}>
                <label className='my-account-form-label'>Full Name</label>
                <input
                  className='my-account-form-input'
                  placeholder={user.full_name}
                  value={editedUser.full_name}
                  onChange={(event) => {
                    setEditedUser({ ...editedUser, full_name: event.target.value });
                  }}
                />
                <label className='my-account-form-label'>Username</label>
                <input
                  className='my-account-form-input'
                  placeholder={user.username}
                  value={editedUser.username}
                  onChange={(event) => {
                    setEditedUser({ ...editedUser, username: event.target.value });
                  }}
                />
                <label className='my-account-form-label'>Email</label>
                <input
                  className='my-account-form-input'
                  placeholder={user.email}
                  value={editedUser.email}
                  onChange={(event) => {
                    setEditedUser({ ...editedUser, email: event.target.value });
                  }}
                />
                <label
                  className='my-account-form-label'
                  htmlFor='account status'
                >
                  {" "}
                  Account Status
                </label>
                <select
                  className='my-account-dropdown'
                  value={editedUser.isActive}
                  onChange={(event) => {
                    setEditedUser({ ...editedUser, isActive: event.target.value });
                  }}
                >
                  <option value='true'>Active</option>
                  <option value='false'>Deactivated</option>
                </select>

                <label htmlFor='admin status' className='my-account-form-label'>
                  Admin Settings
                </label>
                <select
                  className='my-account-dropdown'
                  value={editedUser.isAdmin}
                  onChange={(event) => {
                    setEditedUser({ ...editedUser, isAdmin: event.target.value });
                  }}
                >
                  <option value='true'>Admin Account</option>
                  <option value='false'>Standard Account</option>
                </select>
                <button className='edit-my-account-save-button'>Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
