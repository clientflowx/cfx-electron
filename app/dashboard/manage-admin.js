"use client";
import React, { useEffect, useRef, useState } from "react";
import Loader from "@/components/Loader";
import axios from "axios";
import NewAdminModal from "./create-new-admin";
import Alert from "@/components/Alert";

const AdminUserItem = ({ item, onUpdate }) => {
  const { _id, name, email, role } = item || {};
  const [selectedRole, setSelectedRole] = useState(role);
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);
  const roleData = document.cookie.split(';').find(cookie => cookie.trim().startsWith('role='));
  const userRole = roleData ? roleData.split('=')[1] : ''
  const handleRoleChange = (newRole) => {
    if (newRole === "owner" && userRole !== "owner") { return; }
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
          className={`bg-white hover:bg-gray-100 transition-all text-gray-800 font-semibold py-2 px-4 rounded shadow w-full`}
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
            checked={selectedRole === "admin"}
            onChange={() => handleRoleChange("admin")}
            disabled={role === "owner"}
          />
          <label>Admin</label>
        </div>
        <div className="flex gap-2">
          <input
            type="radio"
            value="super-admin"
            checked={selectedRole === "super-admin"}
            onChange={() => handleRoleChange("super-admin")}
            disabled={role === "owner"}
          />
          <label>Super Admin</label>
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
        <button disabled={userRole === 'admin'} className={`w-full bg-red-500 hover:bg-red-600 text-white transition-all font-semibold py-2 px-4 rounded shadow ${userRole === 'admin' ? 'opacity-50 cursor-not-allowed' : ''}`}>
          Delete User
        </button>
        <button disabled={userRole === 'admin'} className={`w-full bg-green-500 hover:bg-green-600 text-white transition-all font-semibold py-2 px-4 rounded shadow ${userRole === 'admin' ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleUpdateClick}>
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
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const alertMsg = useRef("");

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
      setLoading(true);
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
      setLoading(false);
      alertMsg.current = "Request Successfull";
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      fetchAdminList();
    } catch (err) {
      setLoading(false);
      console.log(err);
      alertMsg.current = "Request Fails, Try Again";
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
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
      {(showError || showSuccess) && (
        <Alert
          type={showError ? "error" : "success"}
          message={alertMsg?.current}
        />
      )}
    </div>
  );
};

export default ManageAdminUser;