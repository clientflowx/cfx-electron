"use client";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { usePagination } from "@table-library/react-table-library/pagination";
import { EditPen, Dustbin } from "@/svg/index.ts";
import { useEffect, useRef, useState } from "react";
import Loader from "@/components/Loader";
import { IoSearch } from "react-icons/io5";
import { myTheme } from "@/constants/TableStyles"; // custom styling for the react-table component
import axios from "axios";
import UpdateUserModal from "@/app/dashboard/update-user-modal";
import NewUserModal from "@/app/dashboard/create-user-modal";
import {
  Data,
  TableNode,
} from "@table-library/react-table-library/types/table";
import Alert from "@/components/Alert";
import { User } from "./types";

type LocationIdsArray = [
  {
    id: string;
    name: string;
  }
];

const UserList = () => {
  const theme = useTheme(myTheme);
  const initialData: Data<TableNode> = { nodes: [] };
  const pagination = usePagination(initialData, {
    state: { page: 0, size: 10 },
  });
  const [pageIndex, setPageIndex] = useState(pagination.state.page);
  const [loading, setLoading] = useState(false); // New state to track loading
  const [users, setUsers] = useState([]);
  const [openNewUserModal, setOpenNewUserModal] = useState(false);
  const [openUpdateUserModal, setOpenUpdateUserModal] = useState(false);
  const [userFormData, setUserFormData] = useState<User>({
    id: "",
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: undefined,
    permissions: {
      adwordsReportingEnabled: false,
      affiliateManagerEnabled: false,
      agentReportingEnabled: false,
      appointmentsEnabled: false,
      assignedDataOnly: false,
      attributionsReportingEnabled: false,
      bloggingEnabled: false,
      botService: false,
      bulkRequestsEnabled: false,
      campaignsEnabled: false,
      campaignsReadOnly: false,
      cancelSubscriptionEnabled: false,
      communitiesEnabled: false,
      contactsEnabled: false,
      contentAiEnabled: false,
      conversationsEnabled: false,
      dashboardStatsEnabled: false,
      exportPaymentsEnabled: false,
      facebookAdsReportingEnabled: false,
      funnelsEnabled: false,
      invoiceEnabled: false,
      leadValueEnabled: false,
      marketingEnabled: false,
      membershipEnabled: false,
      onlineListingsEnabled: false,
      opportunitiesEnabled: false,
      paymentsEnabled: false,
      phoneCallEnabled: false,
      recordPaymentEnabled: false,
      refundsEnabled: false,
      reviewsEnabled: false,
      settingsEnabled: false,
      socialPlanner: false,
      tagsEnabled: false,
      triggersEnabled: false,
      websitesEnabled: false,
      workflowsEnabled: false,
      workflowsReadOnly: false,
    },
    roles: {
      type: "",
      role: "",
      locationIds: [],
    },
  });
  const [loadingMessage, setLoadingMessage] = useState("");
  const [locationIds, setLocationIds] = useState<LocationIdsArray>([
    { id: "", name: "" },
  ]);
  // const [filteredUsers, setFilteredUsers] = useState([]);
  const [userRoleFilter, setUserRoleFilter] = useState<string>("all");
  const [userTypeFilter, setUserTypeFilter] = useState<string>("all");
  const [subAccountFilter, setSubAccountFilter] = useState<string>("all");
  const [noRecordFound, setNoRecordFound] = useState<boolean>(false);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const alertMsg = useRef<string>("");

  const filteredUsers = users.filter((user: User) => {
    const subAccountMatch =
      subAccountFilter === "all" ||
      user.roles.locationIds.includes(subAccountFilter);
    const userTypeMatch =
      userTypeFilter === "all" || user.roles.type === userTypeFilter;
    const userRoleMatch =
      userRoleFilter === "all" || user.roles.role === userRoleFilter;
    const nameMatch =
      nameFilter === "" ||
      user.name.toLowerCase().includes(nameFilter.toLowerCase());

    console.log(nameFilter, nameMatch);
    // console.log(nameMatch);

    // Return true if all filters match, otherwise false
    return subAccountMatch && userTypeMatch && userRoleMatch && nameMatch;
  });

  //refresh the list and fetch the updated list
  const refreshUserList = async () => {
    try {
      setLoading(true);
      setLoadingMessage("Updating the list");
      const token = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("token="));
      const tokenValue = token ? token.split("=")[1] : "";
      const response = await axios.get(
        "https://cfx-mono-production-5ec7.up.railway.app/api/internal/get-agency-user-list",
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      );
      setUsers(response.data?.data?.users);
      setLoading(false);
      alertMsg.current = "Request Successfull";
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
      alertMsg.current = "Request Fails, Try Again";
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  };

  // fetch the list of sub-accounts
  useEffect(() => {
    const getAgencyLocation = async () => {
      try {
        const token = document.cookie
          .split(";")
          .find((cookie) => cookie.trim().startsWith("token="));
        const tokenValue = token ? token.split("=")[1] : "";
        const response = await axios.get(
          "https://cfx-mono-production-5ec7.up.railway.app/api/internal/get-agency-subaccounts",
          {
            headers: {
              Authorization: `Bearer ${tokenValue}`,
            },
          }
        );
        // console.log("user locations: ", response.data?.data);
        setLocationIds(response.data?.data || [{ id: "", name: "" }]);
      } catch (error) {
        console.log("Error getting location: ", error);
      }
    };
    getAgencyLocation();
  }, []);

  //fethch the list of all agency users
  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        setLoadingMessage("Fetching the list");
        const token = document.cookie
          .split(";")
          .find((cookie) => cookie.trim().startsWith("token="));
        const tokenValue = token ? token.split("=")[1] : "";
        // Make the request with the bearer token
        const response = await axios.get(
          "https://cfx-mono-production-5ec7.up.railway.app/api/internal/get-agency-user-list",
          {
            headers: {
              Authorization: `Bearer ${tokenValue}`,
            },
          }
        );
        setUsers(response.data?.data?.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
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
      renderCell: (user: any) => (
        <div className="uppercase">
          {user.roles.type}-{user.roles.role}
        </div>
      ),
    },
    {
      label: "Location",
      renderCell: (user: any) => {
        const location = locationIds.find((location) =>
          user.roles.locationIds.includes(location.id)
        );
        return location ? (
          <div className="text-blue-500 break-words flex items-center justify-start font-medium text-xs">
            <div className="bg-sky-50 rounded-full p-1 px-2">
              {location.name}
            </div>
          </div>
        ) : (
          ""
        );
      },
    },
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
          <div
            className="w-3 h-3 hover:cursor-pointer"
            onClick={async () => {
              try {
                const token = document.cookie
                  .split(";")
                  .find((cookie) => cookie.trim().startsWith("token="));
                const tokenValue = token ? token.split("=")[1] : "";
                await axios
                  .delete(
                    `https://cfx-mono-production-5ec7.up.railway.app/api/internal/delete-agency-user/${user.id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${tokenValue}`,
                      },
                    }
                  )
                  .then((response) => {
                    console.log("Deleted successfully:", response.data);
                  })
                  .catch((error) => {
                    console.error(
                      "Error deleting resource:",
                      error.response.data
                    );
                  });
                refreshUserList();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <Dustbin />
          </div>
        </div>
      ),
    },
  ];

  // pagination pages group segment
  const renderPageButtons = () => {
    const totalPages = pagination.state.getTotalPages(
      filteredUsers.length > 0 ? filteredUsers : users
    );
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

  // const handleSearchByName = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   const searchedUsers = users.filter((user: User) =>
  //     user.name.toLowerCase().includes(value.toLowerCase())
  //   );
  //   setFilteredUsers(searchedUsers);
  // };

  //users filtering on the basis of the filters value
  // useEffect(() => {

  //   // Update state with the filtered users
  //   if (filteredUsers.length == 0) {
  //     setNoRecordFound(true);
  //   }
  //   setFilteredUsers(filteredUsers);
  // }, [subAccountFilter, userTypeFilter, userRoleFilter, UserList]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "subAccount") setSubAccountFilter(value);
    else if (name === "userType") setUserTypeFilter(value);
    else if (name === "userRole") setUserRoleFilter(value);
  };

  const handleNameFilter:
    | React.ChangeEventHandler<HTMLInputElement>
    | undefined = (e) => {
      const { value } = e.target;
      // console.log(value);
      setNameFilter(value);
    };

  return (
    <div className="relative flex flex-col gap-2">
      {/* Filters and Search section */}
      <div className="flex items-center justify-end gap-1 py-2">
        <div>
          <select
            name="userType"
            id=""
            className="p-1 border border-1 outline-none rounded-md text-xs text-gray-400"
            onChange={handleFilterChange}
          >
            <option value="all" defaultChecked>
              Select User Type
            </option>
            <option value="account">Account</option>
          </select>
        </div>
        <div>
          <select
            name="userRole"
            id=""
            className="p-1 border border-1 outline-none rounded-md text-xs text-gray-400"
            onChange={handleFilterChange}
          >
            <option value="all" defaultChecked>
              Select User Role
            </option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div>
          <select
            name="subAccount"
            id=""
            className="p-1 border border-1 outline-none rounded-md text-xs text-gray-400"
            onChange={handleFilterChange}
          >
            <option value="all" defaultChecked>
              Select Sub Account
            </option>
            {locationIds.map(({ id, name }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between p-1 bg-white border border-1 outline-none rounded-md gap-1">
          <div className="opacity-30 h-full">
            <IoSearch />
          </div>
          <input
            type="text"
            className=" text-xs text-gray-400 outline-none"
            placeholder="Search by name"
            onChange={handleNameFilter}
            value={nameFilter}
          />
        </div>
        {/* <div className="flex items-center justify-between p-1 bg-white border border-1 outline-none rounded-md gap-1">
          <div className="opacity-30 h-full">
            <IoSearch />
          </div>
          <input
            type="text"
            className=" text-xs text-gray-400 outline-none"
            placeholder="Search by Location Id"
          />
        </div> */}
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
          <div className="text-xs font-medium">{loadingMessage}</div>
        </div>
      ) : (
        <div>
          <CompactTable
            columns={COLUMNS}
            data={{ nodes: filteredUsers }}
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
                {pagination.state.getTotalPages(
                  filteredUsers.length > 0 ? filteredUsers : users
                )}
              </button>
              <button
                className={`text-xs px-2 py-1 text-gray-600 border border-1 border-gray-300 rounded-md font-semibold ${pagination.state.page >=
                    pagination.state.getTotalPages(
                      filteredUsers.length > 0 ? filteredUsers : users
                    ) -
                    1
                    ? "pointer-events-none opacity-50"
                    : ""
                  }`}
                onClick={() => {
                  if (
                    pagination.state.page <
                    pagination.state.getTotalPages(
                      filteredUsers.length > 0 ? filteredUsers : users
                    ) -
                    1
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
        <div className="fixed top-0 p-5 left-0 z-40 w-full bg-gray-200 h-full bg-opacity-50  rounded-md flex items-center justify-center">
          <UpdateUserModal
            setOpenUpdateUserModal={setOpenUpdateUserModal}
            userFormData={userFormData}
            refreshUserList={refreshUserList}
          />
        </div>
      ) : (
        ""
      )}
      {/* newUserModal */}
      {openNewUserModal ? (
        <div className="fixed top-0 p-5 left-0 z-40 w-full bg-gray-200 h-full bg-opacity-50  rounded-md flex items-center justify-center">
          <NewUserModal
            setOpenNewUserModal={setOpenNewUserModal}
            refreshUserList={refreshUserList}
          />
        </div>
      ) : (
        ""
      )}
      {(showError || showSuccess) && (
        <Alert
          type={showError ? "error" : "success"}
          message={alertMsg?.current}
        />
      )}
    </div>
  );
};

export default UserList;
