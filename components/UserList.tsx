"use client";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { usePagination } from "@table-library/react-table-library/pagination";
import { EditPen, Dustbin } from "@/svg/index.ts";

import nodes from "@/constants/DummyData.json"; //dummy data
import { useEffect, useState } from "react";
import { Loader } from "@/components/components.ts";
import { IoSearch } from "react-icons/io5";
import { myTheme } from "@/constants/TableStyles"; // custom styling for the react-table component
import axios from "axios";
import UpdateUserModal from "@/app/dashboard/UpdateUserModal";
import NewUserModal from "@/app/dashboard/NewUserModal";
import {
  Data,
  TableNode,
} from "@table-library/react-table-library/types/table";

interface UserInterface {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string; // Optional phone property
  permissions: {
    funnelsEnabled: boolean;
    dashboardStatsEnabled: boolean;
    phoneCallEnabled: boolean;
    workflowsReadOnly: boolean;
    contactsEnabled: boolean;
    tagsEnabled: boolean;
    websitesEnabled: boolean;
    campaignsReadOnly: boolean;
    appointmentsEnabled: boolean;
    assignedDataOnly: boolean;
    onlineListingsEnabled: boolean;
    marketingEnabled: boolean;
    attributionsReportingEnabled: boolean;
    membershipEnabled: boolean;
    settingsEnabled: boolean;
    leadValueEnabled: boolean;
    opportunitiesEnabled: boolean;
    reviewsEnabled: boolean;
    facebookAdsReportingEnabled: boolean;
    workflowsEnabled: boolean;
    campaignsEnabled: boolean;
    conversationsEnabled: boolean;
    adwordsReportingEnabled: boolean;
    bulkRequestsEnabled: boolean;
    triggersEnabled: boolean;
  };
  roles: {
    type: string;
    role: string;
    locationIds: string[];
  };
}

const UserList = () => {
  const theme = useTheme(myTheme);
  const initialData: Data<TableNode> = {
    nodes: [],
  };

  const pagination = usePagination(initialData, {
    state: {
      page: 0,
      size: 10,
    },
  });

  const [pageIndex, setPageIndex] = useState(pagination.state.page);
  const [loading, setLoading] = useState(false); // New state to track loading
  const [users, setUsers] = useState([]);
  const data = { users }; // this is used to populate the table
  const [openNewUserModal, setOpenNewUserModal] = useState(false);
  const [openUpdateUserModal, setOpenUpdateUserModal] = useState(false);
  const [userFormData, setUserFormData] = useState<UserInterface>(Object);
  const [loadingMessage, setLoadingMessage] = useState('');


  const refreshUserList = async () => {
    try {
      // Retrieve the bearer token from cookies
      setLoading(true);
      setLoadingMessage('Updating the list');
      const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
      const tokenValue = token ? token.split('=')[1] : '';
      // Make the request with the bearer token
      const response = await axios.get('https://cfx-mono-production-5ec7.up.railway.app/api/internal/get-agency-user-list', {
        headers: {
          Authorization: `Bearer ${tokenValue}`
        }
      });

      setUsers(response.data?.data?.users);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };


  useEffect(() => {
    //fetch admin-users from backend
    const getUsers = async () => {
      try {
        setLoading(true);
        // Retrieve the bearer token from cookies
        setLoadingMessage('Fetching the list');
        const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
        const tokenValue = token ? token.split('=')[1] : '';
        // Make the request with the bearer token
        const response = await axios.get('https://cfx-mono-production-5ec7.up.railway.app/api/internal/get-agency-user-list', {
          headers: {
            Authorization: `Bearer ${tokenValue}`
          }
        });

        setUsers(response.data?.data?.users);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  //table columns
  const COLUMNS = [
    {
      label: "Name",
      renderCell: (user: any) => (
        <div className="text-gray-700 text-xs">{user.name}</div>
      ),
    },
    { label: "Email", renderCell: (user: any) => user.email },
    { label: "Phone", renderCell: (user: any) => user.phone },
    {
      label: "User Type",
      renderCell: (user: any) => <div>Account-{user.roles.role}</div>,
    },
    { label: "Location", renderCell: (user: any) => user.roles.locationIds },
    {
      label: "Action",
      renderCell: (user: any) => (
        <div className="flex items-center justify-start gap-3">
          <div
            className="w-3 h-3 hover:cursor-pointer"
            onClick={() => {
              setOpenUpdateUserModal(true);
              setUserFormData(user);
            }}
          >
            <EditPen />
          </div>
          <div className="w-3 h-3 hover:cursor-pointer">
            <Dustbin />
          </div>
        </div>
      ),
    },
  ];

  // pagination pages group
  const renderPageButtons = () => {
    const totalPages = pagination.state.getTotalPages(users);
    const currentPage = pagination.state.page + 1;
    const maxButtonsToShow = 7;
    const pageButtons = [];

    const startPage = Math.max(
      0,
      Math.min(
        currentPage - Math.floor(maxButtonsToShow / 2),
        totalPages - maxButtonsToShow
      )
    );

    for (
      let i = startPage;
      i < startPage + maxButtonsToShow && i < totalPages;
      i++
    ) {
      pageButtons.push(
        <button
          key={i}
          className={`${pagination.state.page === i
            ? "border-blue-400 border-1 border bg-blue-50"
            : ""
            } rounded-sm text-xs text-gray-600 w-6 h-6`}
          onClick={() => {
            setPageIndex(i);
            pagination.fns.onSetPage(i);
          }}
        >
          {i + 1}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="relative flex flex-col gap-2">
      {/* Filters and Search section */}
      <div className="flex items-center justify-end gap-1 py-2">
        <div>
          <select
            name=""
            id=""
            className="p-1 border border-1 outline-none rounded-md text-xs text-gray-400"
          >
            <option value="" defaultChecked>
              Select User Type
            </option>
            <option value="">option 1</option>
            <option value="">option 1</option>
            <option value="">option 1</option>
          </select>
        </div>
        <div>
          <select
            name=""
            id=""
            className="p-1 border border-1 outline-none rounded-md text-xs text-gray-400"
          >
            <option value="" defaultChecked>
              Select User Role
            </option>
            <option value="">option 1</option>
            <option value="">option 1</option>
            <option value="">option 1</option>
          </select>
        </div>
        <div>
          <select
            name=""
            id=""
            className="p-1 border border-1 outline-none rounded-md text-xs text-gray-400"
          >
            <option value="" defaultChecked>
              Select Sub Account
            </option>
            <option value="">option 1</option>
            <option value="">option 1</option>
            <option value="">option 1</option>
          </select>
        </div>
        <div className="flex items-center justify-between p-1 bg-white border border-1 outline-none rounded-md gap-1">
          <div className="opacity-30 h-full">
            <IoSearch />
          </div>
          <input
            type="text"
            className=" text-xs text-gray-400 outline-none"
            placeholder="Search..."
          />
        </div>
        <div className="flex items-center justify-between p-1 bg-white border border-1 outline-none rounded-md gap-1">
          <div className="opacity-30 h-full">
            <IoSearch />
          </div>
          <input
            type="text"
            className=" text-xs text-gray-400 outline-none"
            placeholder="Search..."
          />
        </div>
        <div>
          <button
            className="text-xs text-white rounded-md font-semibold px-3 p-1 bg-blue-500"
            onClick={() => setOpenNewUserModal(true)}
          >
            + Add Employee
          </button>
        </div>
      </div>

      {/* Main Table */}
      {loading ? (
        <div className="flex flex-col gap-2 items-center justify-between my-40">
          <Loader />
          <div className="text-xs font-medium" >{loadingMessage}</div>
        </div>
      ) : (
        <div>
          <CompactTable
            columns={COLUMNS}
            data={{ nodes: users }}
            theme={theme}
            pagination={pagination}
          />

          {/* Pagination */}
          <div className="flex items-start justify-between bg-white p-5 rounded-b-md">
            <span className="text-xs w-1/2 text-gray-600">
              Page {pagination.state.page + 1}
            </span>
            <span className="w-1/2 flex items-start justify-end gap-2">
              <button
                className={`text-xs px-2 py-1 text-gray-600 border border-1 border-gray-300 rounded-md font-semibold ${pagination.state.page <= 0
                  ? "pointer-events-none opacity-50"
                  : ""
                  }`}
                onClick={() => {
                  if (pagination.state.page > 0) {
                    pagination.fns.onSetPage(pageIndex - 1);
                    setPageIndex(pageIndex - 1);
                  }
                }}
              >
                Previous
              </button>
              <div className="flex flex-wrap gap-1">{renderPageButtons()}</div>
              <div className="rounded-sm text-xs text-gray-600">...</div>
              <button className="rounded-sm text-xs text-gray-600 w-6 h-6">
                {pagination.state.getTotalPages(users)}
              </button>
              <button
                className={`text-xs px-2 py-1 text-gray-600 border border-1 border-gray-300 rounded-md font-semibold ${pagination.state.page >=
                  pagination.state.getTotalPages(users) - 1
                  ? "pointer-events-none opacity-50"
                  : ""
                  }`}
                onClick={() => {
                  if (
                    pagination.state.page <
                    pagination.state.getTotalPages(users) - 1
                  ) {
                    pagination.fns.onSetPage(pageIndex + 1);
                    setPageIndex(pageIndex + 1);
                  }
                }}
              >
                Next
              </button>
            </span>
          </div>
        </div>
      )}

      {/* update user modal */}
      {openUpdateUserModal ? (
        <div className="absolute z-40 w-full bg-gray-200 bg-opacity-50 h-full rounded-md flex items-center justify-center">
          <UpdateUserModal setOpenUpdateUserModal={setOpenUpdateUserModal} userFormData={userFormData} />
        </div>
      ) : (
        ""
      )}
      {/* newUserModal */}
      {openNewUserModal ? (
        <div className="absolute z-40 w-full bg-gray-200 bg-opacity-50 h-full rounded-md flex items-center justify-center">
          <NewUserModal setOpenNewUserModal={setOpenNewUserModal} refreshUserList={refreshUserList} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserList;
