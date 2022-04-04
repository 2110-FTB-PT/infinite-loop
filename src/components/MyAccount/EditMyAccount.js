import React from "react";
import { useState, useEffect } from "react";
import { fetchSingleUser, updateUser } from "../../axios-services";
import { Link, useNavigate } from "react-router-dom";
import "../../style/EditMyAccount.css";

const EditMyAccount = ({ token, user, setUser }) => {
  const [myAccount, setMyAccount] = useState({});

  const navigate = useNavigate();
  const { id } = user;

  const handleMyAccount = async () => {
    const fetchedAccount = await fetchSingleUser(id);
    setMyAccount(fetchedAccount);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedAccount = await updateUser(token, myAccount);
      setMyAccount(updatedAccount);
      setUser(updatedAccount);
      navigate("/myaccount");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleMyAccount();
  }, [token, user]);

  return (
    <div className="edit-my-account-container">
      <div className="edit-my-account-content">
        <form className="edit-product-container" onSubmit={handleSubmit}>
          <div className="edit-form-content">
            <Link style={{ textDecoration: "none" }} to="/myaccount">
              <div className="back-to-my-account">Back to My Account</div>
            </Link>
            <div className="my-account-edit-header">Edit Account</div>
            <label htmlFor="name" className="my-account-form-label">
              Name{" "}
            </label>
            <input
              className="my-account-form-input"
              placeholder="Full Name"
              value={myAccount.full_name}
              onChange={(event) => {
                setMyAccount({ ...myAccount, full_name: event.target.value });
              }}
            />
            <label htmlFor="name" className="my-account-form-label">
              Username{" "}
            </label>
            <input
              className="my-account-form-input"
              placeholder="Username"
              value={myAccount.username}
              onChange={(event) => {
                setMyAccount({ ...myAccount, username: event.target.value });
              }}
            />
            <label htmlFor="name" className="my-account-form-label">
              Email{" "}
            </label>
            <input
              className="my-account-form-input"
              placeholder="Email"
              value={myAccount.email}
              onChange={(event) => {
                setMyAccount({ ...myAccount, email: event.target.value });
              }}
            />
            <label htmlFor="name" className="my-account-form-label">
              Password{" "}
            </label>
            <input
              className="my-account-form-input"
              placeholder="password"
              type="password"
              onChange={(event) => {
                setMyAccount({ ...myAccount, password: event.target.value });
              }}
            />
            <label htmlFor="account status" className="account-form-label">
              {" "}
              Account Status
            </label>
            <select
              className="my-account-dropdown"
              value={myAccount.isActive}
              onChange={(event) => {
                setMyAccount({ ...myAccount, isActive: event.target.value });
              }}
            >
              <option value="true">Active</option>
              <option value="false">Deactivated</option>
            </select>
            <button className="edit-my-account-save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMyAccount;
