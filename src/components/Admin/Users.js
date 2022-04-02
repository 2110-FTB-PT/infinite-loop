import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchUsers } from "../../axios-services/index";
import { FaRegEye } from "react-icons/fa";
import "../../style/Users.css";
import "../../style/Admin.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleUsers = async () => {
    const allUsers = await fetchUsers();
    setUsers(allUsers);
  };

  useEffect(() => {
    handleUsers();
  }, []);

  return (
    <div className="general-dashboard-container">
      <div className="general-dashboard-content">
        <Link to="/admin" className="general-dashboard-back-link">
          Back to Dashboard
        </Link>
        <div className="general-dashboard-header">Accounts</div>
        <div className="table-wrapper">
          <table className="users-table">
            <tr className="table-headers">
              <th>Account #</th>
              <th>Username</th>
              <th>Name</th>
              <th>Email Address</th>
              <th>Account Status</th>
              <th>Admin</th>
              <th>View/Edit</th>
            </tr>
            {users.map((user) => {
              const { id, full_name, email, username, isActive, isAdmin } =
                user;
              return (
                <tr>
                  <td>{id}</td>
                  <td>{username}</td>
                  <td>{full_name}</td>
                  <td>{email}</td>
                  <td>{isActive === true ? "active" : "deactivated"}</td>
                  <td>{isAdmin === true ? "admin" : null}</td>
                  <td>
                    <FaRegEye
                      role="button"
                      onClick={() => navigate(`/admin/accounts/${id}`)}
                    />
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
