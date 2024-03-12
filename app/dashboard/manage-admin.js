"use client";
import React, { useEffect, useState } from "react";
import { Loader } from "@/components/components.ts";
import axios from "axios";
const AdminUserItem = ({ item, onUpdate }) => {
  const { _id, name, email, role } = item || {};
  const [selectedRole, setSelectedRole] = useState(role);
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);

  const handleRoleChange = (newRole) => {
    setSelectedRole(newRole);
  };

  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEditedEmail(event.target.value);
  };

  const handleUpdateClick = () => {
    // Prepare the updated user data
    const updatedUser = {
      id: _id,
      name: editedName,
      email: editedEmail,
      role: selectedRole,
    };

    // Call the onUpdate function with the updated user data
    onUpdate(updatedUser);
  };

  return (
    <div className="flex items-center" style={{ margin: "10px 5px" }}>
      <input
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded shadow mr-2"
        id="name"
        type="text"
        value={editedName}
        onChange={handleNameChange}
        style={{ width: "28%" }}
      />
      <input
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded shadow mr-2"
        id="email"
        type="text"
        value={editedEmail}
        onChange={handleEmailChange}
        style={{ width: "28%" }}
      />
      <div
        className="mr-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded shadow"
        style={{ display: "flex" }}
      >
        <span style={{ margin: "0px 5px" }}>
          <input
            type="radio"
            value="admin"
            checked={selectedRole === "admin"}
            onChange={() => handleRoleChange("admin")}
          />
          <label style={{ marginLeft: "5px" }}>Admin</label>
        </span>
        <span style={{ margin: "0px 5px" }}>
          <input
            type="radio"
            value="super-admin"
            checked={selectedRole === "super-admin"}
            onChange={() => handleRoleChange("super-admin")}
          />
          <label style={{ marginLeft: "5px" }}>Super Admin</label>
        </span>
        <span style={{ margin: "0px 5px" }}>
          <input
            type="radio"
            value="owner"
            checked={selectedRole === "owner"}
            onChange={() => handleRoleChange("owner")}
          />
          <label style={{ marginLeft: "5px" }}>Owner</label>
        </span>
      </div>
      <button className="mr-2 bg-red-500 hover:bg-gray-100 text-white hover:text-gray-800 font-semibold py-2 px-4 rounded shadow">
        Delete User
      </button>
      <button
        className="mr-2 bg-green-500 hover:bg-gray-100 text-white hover:text-gray-800 font-semibold py-2 px-4 rounded shadow"
        onClick={handleUpdateClick}
      >
        Update User
      </button>
    </div>
  );
};
const ManageAdminUser = () => {
  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState(true); // New state to track loading
  const fetchAdminList = async () => {
    try {
      const token = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("token="));
      const tokenValue = token ? token.split("=")[1] : "";
      // Make the request with the bearer token
      setLoading(true);
      const response = await axios.get(
        `https://cfx-mono-production-5ec7.up.railway.app/api/internal/get-admin-users`,
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      );
      setAdminData(response?.data?.adminUserList);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async (payload) => {
    try {
      const { id, name, email, role } = payload;
      const token = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("token="));
      const tokenValue = token ? token.split("=")[1] : "";
      const config = {
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
      };

      const { data } = await axios.post(
        `https://cfx-mono-production-5ec7.up.railway.app/api/internal/update-admin-user`,
        {
          id,
          name,
          email,
          role,
        },
        config
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAdminList();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div
            className="flex justify-end"
            style={{ marginBottom: "30px", marginTop: "-30px" }}
          >
            <button className="bg-blue-500 text-white py-2 px-10 rounded flex items-center">
              Add Admin User
            </button>
          </div>
          {adminData &&
            adminData.map((item) => (
              <AdminUserItem key={item.id} item={item} onUpdate={onUpdate} />
            ))}
        </div>
      )}
    </div>
  );
};

export default ManageAdminUser;
