"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dashboard, AdminUser, RazorPay, Alohaa } from "@/svg/index.ts";
import UserList from "./user-list";
import Navbar from "@/components/Navbar";
import ManageAdminUser from './manage-admin.js'
import cfxlogo from "@/public/assets/clientflowx_logo.jpeg";
import Image from "next/image";
import AllohaAdmin from "./alohaa-admin";
import RazorpayAdmin from "./rzp-admin";
import HomePage from "./home-page";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarOption, setSidebarOption] = useState("clientFlowX");
  const router = useRouter();

  useEffect(() => {
    // Check for token in cookies
    const token = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));

    // If token is not present, redirect to /login
    if (!token) {
      router.push("/login");
    }
  }, []);

  type SidebarItem = {
    key: string;
    title: string;
    icon: JSX.Element;
    titleVisible: boolean;
  };

  const sidebarItems: SidebarItem[] = [
    {
      key: "clientFlowX",
      title: "ClientFlowX",
      icon: <Image className="rounded-full" src={cfxlogo} alt="CFX logo" />,
      titleVisible: true,
    },
    {
      key: "manageUsers",
      title: "Manage Users",
      icon: <Dashboard />,
      titleVisible: true,
    },
    {
      key: "manageAdminUsers",
      title: "Manage Admin Users",
      icon: <AdminUser />,
      titleVisible: true,
    },
    {
      key: "manageAlohaa",
      title: "Manage Alohaa",
      icon: <Alohaa />,
      titleVisible: true,
    },
    {
      key: "manageRazorpay",
      title: "Manage Razorpay",
      icon: <RazorPay />,
      titleVisible: true,
    },
  ];

  const returnUserData = () => {
    // if (window === undefined) return {};
    if (process.browser) {
      return JSON.parse(
        localStorage?.getItem("loginUserDetails") || "{}"
      )?.data?.userData;
    }
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
              const userData = returnUserData();
              const role = userData?.role;
              const shouldRenderItem =
                item.key === "manageUsers"
                  ? ["owner", "admin"].includes(role)
                  : true;

              return (
                shouldRenderItem && (
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
                )
              );
            })}
          </ul>
        </div>
      </aside>

      <div className="relative flex flex-col flex-1 h-full min-h-screen p-10 bg-[#f0f4f7]">
        <div className="sm:ml-10">
          <div className={`rounded-lg mt-14`}>
            <div className={` ${sidebarOption === "clientFlowX" ? "" : "hidden"}`}>
              {/* <h1 className="text-2xl font-bold text-gray-700 my-6">Dashboard</h1> */}
              <HomePage setSidebarOption={setSidebarOption} />
            </div>
            <div
              className={`${sidebarOption === "manageUsers" ? "" : "hidden"}`}
            >
              <h1 className="my-2 font-bold text-md">Teams</h1>
              <UserList />
            </div>
            <div
              className={`${sidebarOption === "manageAdminUsers" ? "" : "hidden"
                }`}
            >
              <h1 className="my-2 font-bold text-md">Manage Admins</h1>
              <ManageAdminUser />
            </div>
            <div
              className={`${sidebarOption === "manageAlohaa" ? "" : "hidden"}`}
            >
              <h1 className="my-2 font-bold text-md">Manage Admins</h1>
              <AllohaAdmin />
            </div>
            {sidebarOption === "manageRazorpay" && (
              <div>
                <h1 className="my-2 font-bold text-md">Manage Admins</h1>
                <RazorpayAdmin />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
