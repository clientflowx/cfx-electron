"use client"

import React, { useEffect, useState } from 'react';
// import { Redirect } from 'react-router-dom'; // Import Redirect
import { useRouter } from 'next/navigation'

import { Dashboard, Components, Files, Inbox, Calendar } from '@/svg/index.ts';
import { UserList,Navbar } from '@/components/components.ts'
import cfxlogo from '@/public/assets/clientflowx_logo.jpeg'
import Image from 'next/image';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarOption, setSidebarOption] = useState('');
  const router = useRouter();


  useEffect(() => {
    // Check for token in cookies
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));

    // If token is not present, redirect to /login
    if (!token) {
      router.push('/login');
    }
  }, []);

  type SidebarItem = {  
    title: string;
    icon: JSX.Element;
    titleVisible: boolean
  };

  const sidebarItems: SidebarItem[] = [
    {
      title: 'CientFlowX',
      icon: <Image className='rounded-full' src={cfxlogo} alt='CFX logo'/>,
      titleVisible: true,
    },
    {
      title: 'Manage Users',
      icon: <Dashboard />,
      titleVisible: true,
    },
    // {
    //   title: 'Components',
    //   icon: <Components />,
    //   titleVisible: true,
    // },
    {
      title: 'Aloha',
      icon: <Inbox />,
      titleVisible: true,
    },
  ];

  return (
    <div>
      <Navbar/>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-50 h-screen transition-transform ${isSidebarOpen ? 'w-64' : 'w-16'} cursor-pointer bg-gray-700 border-r border-gray-200 transition-all overflow-x-hidden`}
        aria-label="Sidebar"
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <div className="h-full pb-4 overflow-y-auto bg-gray-700">
          <ul className="space-y-2 font-medium">
            {sidebarItems.map((item, index) => (
              <li key={index} onClick={() => setSidebarOption(item.title)}>
                <div className={`flex items-center p-4 text-gray-300 hover:bg-gray-800 transition-all ${isSidebarOpen ? '' : 'justify-center'} group`}>
                  <div className='w-5 text-white'>
                    {item.icon}
                  </div>
                  <span className={`ms-3 h-5 ${isSidebarOpen || !item.titleVisible ? '' : 'hidden'}`}>
                    {item.title}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="relative flex flex-col flex-1 h-full min-h-screen p-10 bg-[#f0f4f7]">
        <div className="sm:ml-10">
          <div className={`rounded-lg mt-14`}>
            <div className={` ${sidebarOption === '' ? '' : 'hidden'}`}>
              <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
              <div className='text-sm'>Home <span className='text-gray-500'>/ Dashboard</span></div>
            </div>
            <div className={`${sidebarOption === 'Manage Users' ? '' : 'hidden'}`}>
              <h1 className='my-2 font-bold text-md'>Teams</h1>
              <UserList />
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};



export default AdminDashboard;