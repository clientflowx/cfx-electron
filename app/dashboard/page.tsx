"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dashboard, AdminUser, RazorPay, Alohaa } from "@/svg/index.ts";
import UserList from "./user-list";
import Navbar from "@/components/Navbar";
import ManageAdminUser from "./manage-admin.js";
import cfxlogo from "@/public/assets/clientflowx_logo.jpeg";
import Image from "next/image";
import AllohaAdmin from "./alohaa-admin";
import RazorpayAdmin from "./rzp-admin";
import ManageSubAccounts from './(sub-accounts)/manange-sub-acc'
import IntegrationsIcon from "@/svg/IntegrationsIcon";
import SubAccounts from "@/svg/SubAccounts";
import Integrations from "./integrations";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarOption, setSidebarOption] = useState("clientflowx");
  const router = useRouter();
  let roleData;

  if (process.browser) {
    roleData = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("role="));
  }
  const userRole = roleData ? roleData.split("=")[1] : "";
  useEffect(() => {
    // Check for token in cookies
    let token;
    if (process.browser) {
      token = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("token="));
    }

    // If token is not present, redirect to /login
    if (!token) {
      router.push("/login");
    }
  }, []);

  type SidebarItem = {
    key: string,
    title: string;
    icon: JSX.Element;
    titleVisible: boolean;
  };

  let sidebarItems: SidebarItem[] = [
    {
      key: "clientflowx",
      title: "ClientFlowX",
      icon: <Image className="rounded-full" src={cfxlogo} alt="CFX logo" />,
      titleVisible: true,
    },
    {
      key: "integrations",
      title: "Integrations",
      icon: <IntegrationsIcon />,
      titleVisible: true,
    },
    {
      key: "manage-sub-accounts",
      title: "Manage Sub Accounts",
      icon: <SubAccounts />,
      titleVisible: true,
    },
    {
      key: "manage-users",
      title: "Manage Users",
      icon: <Dashboard />,
      titleVisible: true,
    },
    {
      key: "manage-admin-users",
      title: "Manage Admin Users",
      icon: <AdminUser />,
      titleVisible: true,
    },
    {

      key: "manage-alohaa",
      title: "Manage Alohaa",
      icon: <Alohaa />,
      titleVisible: true,
    },
    {
      key: "manage-razorpay",
      title: "Manage Razorpay",
      icon: <RazorPay />,
      titleVisible: true,
    },

  ];

  const userData = process.browser ? JSON.parse(localStorage?.getItem("loginUserDetails") || "{}")?.data?.userData : null;
  const role = userData?.role;

  if (role === "admin") {
    sidebarItems = sidebarItems.filter(
      (item) =>
        item.title !== "Manage Users" && item.title !== "Manage Admin Users"
    );
  }
  return (
    <div>
      <Navbar />
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-50 h-screen transition-transform ${isSidebarOpen ? "w-64" : "w-16"
          } cursor-pointer bg-gray-700 border-r border-gray-200 transition-all overflow-x-hidden`}
        aria-label="Sidebar"
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <div className="h-full pb-4 overflow-y-auto bg-gray-700">
          <ul className="space-y-2 font-medium">
            {sidebarItems.map((item, index) => {
              return (
                <li key={index} onClick={() => setSidebarOption(item.key)}>
                  <div
                    className={`flex items-center p-4 text-gray-300 hover:bg-gray-800 transition-all ${isSidebarOpen ? "" : "justify-center"
                      } group`}
                  >
                    <div className="w-5 text-white">{item.icon}</div>
                    <span
                      className={`ms-3 h-5 ${isSidebarOpen || !item.titleVisible ? "" : "hidden"
                        }`}
                    >
                      {item.title}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      <div
        className={`relative flex flex-col flex-1 h-full min-h-screen p-10 bg-[#f0f4f7]`}
      >
        <div className="sm:ml-10">
          <div className="rounded-lg mt-14">
            {/* ClientFlowX */}
            <div className={sidebarOption === 'clientflowx' || sidebarOption === 'manage-sub-accounts' ? '' : 'hidden'}>
              <ManageSubAccounts />
            </div>

            {/* Integrations */}
            <div className={sidebarOption === 'integrations' ? '' : 'hidden'}>
              <Integrations setSidebarOption={setSidebarOption} />
            </div>

            {/* Manage Users */}
            <div className={sidebarOption === 'manage-users' ? '' : 'hidden'}>
              <h1 className="my-2 font-bold text-md">Teams</h1>
              <UserList />
            </div>

            {/* Manage Admin Users */}
            <div className={sidebarOption === 'manage-admin-users' ? '' : 'hidden'}>
              <h1 className="my-2 font-bold text-md">Manage Admins</h1>
              <ManageAdminUser />
            </div>

            {/* Manage Alohaa */}
            <div className={sidebarOption === 'manage-alohaa' ? '' : 'hidden'}>
              <h1 className="my-2 font-bold text-md">Manage Alohaa</h1>
              <AllohaAdmin />
            </div>

            {/* Manage Razorpay */}
            {sidebarOption === 'manage-razorpay' && (
              <div>
                <h1 className="my-2 font-bold text-md">Manage Razorpay</h1>
                <RazorpayAdmin />
              </div>
            )}
          </div>
        </div>

      </div>;
    </div>
  );
};

export default AdminDashboard;