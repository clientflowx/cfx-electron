"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import axios from "axios";
import NewAdminModal from "./create-new-admin";

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
    <div className="flex items-center justify-between w-full gap-2">
      <div className="flex w-full gap-2">
        <input
          className="bg-white hover:bg-gray-100 transition-all text-gray-800 font-semibold py-2 px-4 rounded shadow w-full"
          id="name"
          type="text"
          value={editedName}
          onChange={handleNameChange}
        />
        <input
          className="bg-white hover:bg-gray-100 transition-all text-gray-800 font-semibold py-2 px-4 rounded shadow w-full"
          id="email"
          type="text"
          value={editedEmail}
          onChange={handleEmailChange}
        />
      </div>
      <div className="bg-white hover:bg-gray-100 text-gray-800 transition-all font-semibold py-2 px-4 rounded shadow w-full flex items-center justify-between">
        <div className="flex gap-2">
          <input
            type="radio"
            value="admin"
            checked={item.role === "admin"}
            onChange={() => handleRoleChange("admin")}
            disabled={item.role === "owner"}
            />
          <label className={`${item.role === "owner"?'text-gray-400':'' }`}>Admin</label>
        </div>
        <div className="flex gap-2">
          <input
            type="radio"
            value="super-admin"
            checked={item.role === "super-admin"}
            onChange={() => handleRoleChange("super-admin")}
            disabled={item.role === "owner"}
          />
          <label className={`${item.role === "owner"?'text-gray-400':'' }`}>Super Admin</label>
        </div>
        <div className="flex gap-2">
          <input
            type="radio"
            value="owner"
            checked={selectedRole === "owner"}
            onChange={() => handleRoleChange("owner")}
          />
          <label>Owner</label>
        </div>
      </div>
      <div className="flex w-full gap-2">
        <button disabled={item.role === 'admin'} className={`w-full bg-red-500 hover:bg-red-600 text-white transition-all font-semibold py-2 px-4 rounded shadow ${item.role === 'admin' ? 'opacity-50 cursor-not-allowed' : ''}`}>
          Delete User
        </button>
        <button disabled={item.role === 'admin'} className={`w-full bg-green-500 hover:bg-green-600 text-white transition-all font-semibold py-2 px-4 rounded shadow ${item.role === 'admin' ? 'opacity-50 cursor-not-allowed' : ''}`}>
          Update User
        </button>
      </div>
    </div>
  );
};

const ManageAdminUser = () => {
  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState(true); // New state to track loading
  const [openAddAdminModal, setOpenAddAdminModal] = useState(false);

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
    <div className="flex flex-col w-full relative">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex justify-end mb-8 ">
            <button className="bg-blue-500 text-white py-2 px-10 rounded flex items-center" onClick={() => setOpenAddAdminModal(true)}>
              Add Admin User
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {adminData &&
              adminData.map((item) => (
                <AdminUserItem key={item.id} item={item} onUpdate={onUpdate} />
              ))}
          </div>
        </div>
      )}
      <div className={`${openAddAdminModal ? "" : "hidden"} absolute z-40 w-full bg-gray-200 bg-opacity-50 h-full rounded-md flex items-center justify-center`}>
        <NewAdminModal setOpenAddAdminModal={setOpenAddAdminModal} fetchAdminList={fetchAdminList} />
      </div>
    </div>
  );
};

export default ManageAdminUser;
