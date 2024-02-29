"use client"
import React, { useState } from 'react';
import { Dashboard, Components, Files, Inbox, Calendar } from '@/svg/index.ts';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarOption, setSidebarOption] = useState('');

  type SidebarItem = {
    title: string;
    icon: JSX.Element;
    titleVisible: boolean
  };

  const sidebarItems: SidebarItem[] = [
    {
      title: 'CientFlowX',
      icon: <div className='text-2xl font-bold text-whitew'>C</div>,
      titleVisible: true,
    },
    {
      title: 'Manage Users',
      icon: <Dashboard />,
      titleVisible: true,
    },
    {
      title: 'Components',
      icon: <Components />,
      titleVisible: true,
    },
    {
      title: 'Inbox',
      icon: <Inbox />,
      titleVisible: true,
    },
    {
      title: 'Calendar',
      icon: <Calendar />,
      titleVisible: true,
    },
    {
      title: 'Files',
      icon: <Files />,
      titleVisible: true,
    },
  ];

  return (
    <div>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${isSidebarOpen ? 'w-64' : 'w-16'} cursor-pointer bg-gray-700 border-r border-gray-200 transition-all overflow-x-hidden`}
        aria-label="Sidebar"
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <div className="h-full pb-4 overflow-y-auto bg-gray-700">
          <ul className="space-y-2 font-medium">
            {sidebarItems.map((item, id) => (
              <li key={id} onClick={() => setSidebarOption(item.title)}>
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
          <div className={`p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14`}>
            <div className={` ${sidebarOption === '' ? '' : 'hidden'}`}>
              <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
              <div className='text-sm'>Home <span className='text-gray-500'>/ Dashboard</span></div>
            </div>
            <div className={`${sidebarOption === 'Manage Users' ? '' : 'hidden'}`}>
              <section >
                <div className="flex flex-col items-start justify-start mx-auto h-screen w-full ">
                  <div className="sm:w-1/2">
                    <div className="sm:p-6 space-y-4 md:space-y-6 sm:p-8">
                      <form className="space-y-4 md:space-y-6">
                        <div>
                          <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Input Field</label>
                          <input
                            type="text"
                            name="text"
                            id="text"
                            className={inputStyles}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Input Field</label>
                          <input
                            type="text"
                            name="text"
                            id="text"
                            className={inputStyles}
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className={buttonStyles}
                        >
                          Save
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};



// Repeated styles
const inputStyles = "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5";
const buttonStyles = "mt-4 border border-transparent focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-40 px-4 py-2 text-center mr-2 bg-[#38A0DB] text-white";

export default AdminDashboard;
