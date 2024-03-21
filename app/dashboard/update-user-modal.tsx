"use client";
import React, { useEffect, useState } from "react";
import {
  CrossIcon,
  UpIcon,
  DownIcon,
  LockIcon,
  UserIcon,
} from "@/svg/index.ts";
import Toggle from "@/components/Toggle";
import axios, { isAxiosError } from "axios";
import { AccType, Permissions, User } from "./types";
import AutoCompleteDD from "@/components/AutoCompleteDD";

type Props = {
  setOpenUpdateUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  userFormData: User;
  refreshUserList: () => void;
};

const permissionsArray: { title: string; permission: keyof Permissions }[] = [
  { title: "Adwords Reporting", permission: "adwordsReportingEnabled" },
  { title: "Affiliate Manager", permission: "affiliateManagerEnabled" },
  { title: "Agent Reporting", permission: "agentReportingEnabled" },
  { title: "Appointments", permission: "appointmentsEnabled" },
  { title: "Assigned Data Only", permission: "assignedDataOnly" },
  {
    title: "Attributions Reporting",
    permission: "attributionsReportingEnabled",
  },
  { title: "Blogging", permission: "bloggingEnabled" },
  { title: "Bot Service", permission: "botService" },
  { title: "Bulk Requests", permission: "bulkRequestsEnabled" },
  { title: "Campaigns", permission: "campaignsEnabled" },
  { title: "Campaigns", permission: "campaignsReadOnly" },
  { title: "Cancel Subscription", permission: "cancelSubscriptionEnabled" },
  { title: "Communities", permission: "communitiesEnabled" },
  { title: "Contacts", permission: "contactsEnabled" },
  { title: "Content AI", permission: "contentAiEnabled" },
  { title: "Conversations", permission: "conversationsEnabled" },
  { title: "Dashboard Stats", permission: "dashboardStatsEnabled" },
  { title: "Export Payments", permission: "exportPaymentsEnabled" },
  {
    title: "Facebook Ads Reporting",
    permission: "facebookAdsReportingEnabled",
  },
  { title: "Funnels", permission: "funnelsEnabled" },
  { title: "Invoice", permission: "invoiceEnabled" },
  { title: "Lead Value", permission: "leadValueEnabled" },
  { title: "Marketing", permission: "marketingEnabled" },
  { title: "Membership", permission: "membershipEnabled" },
  { title: "Online Listings", permission: "onlineListingsEnabled" },
  { title: "Opportunities", permission: "opportunitiesEnabled" },
  { title: "Payments", permission: "paymentsEnabled" },
  { title: "Phone Call", permission: "phoneCallEnabled" },
  { title: "Record Payment", permission: "recordPaymentEnabled" },
  { title: "Refunds", permission: "refundsEnabled" },
  { title: "Reviews", permission: "reviewsEnabled" },
  { title: "Settings", permission: "settingsEnabled" },
  { title: "Social Planner", permission: "socialPlanner" },
  { title: "Tags", permission: "tagsEnabled" },
  { title: "Triggers", permission: "triggersEnabled" },
  { title: "Websites", permission: "websitesEnabled" },
  { title: "Workflows", permission: "workflowsEnabled" },
  { title: "Workflows", permission: "workflowsReadOnly" },
];

const permissionsArrayColumn1 = permissionsArray.slice(
  0,
  Math.ceil(permissionsArray.length / 2)
);
const permissionsArrayColumn2 = permissionsArray.slice(
  Math.ceil(permissionsArray.length / 2)
);

const UpdateUserModal: React.FC<Props> = ({
  setOpenUpdateUserModal,
  userFormData,
  refreshUserList,
}) => {
  // console.log("from the list: ",userFormData);

  const [userInfoAccordion, setUserInfoAccordion] = useState(true);
  const [userPermissionAcc, setUserPermissionAcc] = useState(false);
  const [userRolesAcc, setUserRolesAcc] = useState(false);
  const [userDetails, setUserDetails] = useState<User>(userFormData);
  const [formSubmitError, setFormSubmitError] = useState<string>("");
  const [formSubmissionLoading, setformSubmissionLoading] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [agencyLocation, setAgencyLocation] = useState<AccType[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [value, setValue] = useState<AccType | null>(null);
  const [selectedLocationIds, setSelectedLocationIds] = useState(
    userDetails?.roles?.locationIds || []
  );

  // To check if all values are selected or not
  let isAllSelected = true;
  Object.keys(userDetails.permissions).forEach((permission) => {
    if (!userDetails.permissions[permission as keyof Permissions]) {
      isAllSelected = false;
      return;
    }
  });
  isAllSelected =
    Object.keys(userDetails.permissions).length === 38 ? isAllSelected : false;

  const [selectAllValue, setSelectAllValue] = useState<boolean>(isAllSelected);

  console.log("user details before the api call:", userDetails);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggleChange = (
    permission: keyof Permissions,
    value: boolean
  ) => {
    setUserDetails((prevState) => ({
      ...prevState,
      permissions: {
        ...prevState.permissions,
        [permission]: value,
      },
    }));
  };

  // fetching all the location with their ids
  useEffect(() => {
    const getAgencyLocation = async () => {
      try {
        setLoading(true);
        // Retrieve the bearer token from cookies
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
        setLoading(false);
        setAgencyLocation(response.data?.data);
      } catch (error) {
        setLoading(false);
        console.log("Error getting location: ", error);
      }
    };
    getAgencyLocation();
  }, []);

  const handleSelectChange:
    | React.ChangeEventHandler<HTMLSelectElement>
    | undefined = (e) => {
    const { name, value } = e.target;

    if (name === "locationIds") {
      setUserDetails((prevData) => ({
        ...prevData,
        roles: {
          ...prevData.roles,
          locationIds: [...prevData.roles.locationIds, value],
        },
      }));
    } else {
      setUserDetails((prevData) => ({
        ...prevData,
        roles: {
          ...prevData.roles,
          [name]: value,
        },
      }));
    }
  };

  const handleEditFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("into the handle form submission");
    e.preventDefault();

    try {
      setformSubmissionLoading(true);

      const token = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("token="));
      const tokenValue = token ? token.split("=")[1] : "";
      const modifiedUserDetails = {
        ...userDetails,
        locationIds: [...selectedLocationIds],
      };
      const response = await axios.post(
        `https://cfx-mono-production-5ec7.up.railway.app/api/internal/update-user/${userDetails?.id}`,
        modifiedUserDetails,
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      );
      if (response.data.success) {
        setformSubmissionLoading(false);
        setOpenUpdateUserModal(false);
        setFormSubmitError("");
        refreshUserList();
        console.log("handlesubmit response: ", response);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setformSubmissionLoading(false);
        if (error.isAxiosError && error.response && error.response.data) {
          console.log(error);
        } else {
          setFormSubmitError("An error occurred. Please try again later.");
          console.log(error);
        }
      }
    }
  };

  const handleDeleteLocationId = (index: number) => {
    const modifiedLocationIds = [...selectedLocationIds];
    modifiedLocationIds.splice(index, 1);
    setSelectedLocationIds(modifiedLocationIds);
  };

  const addLocationId = (optionValue: string, optionId: string) => {
    const modifiedLocationIds = [...selectedLocationIds, optionId];
    setSelectedLocationIds(modifiedLocationIds);
  };

  const handleSelectAllPermissions:
    | React.ChangeEventHandler<HTMLInputElement>
    | undefined = (e) => {
    console.log(isAllSelected, selectAllValue);

    setSelectAllValue((prev) => !prev);
    // Use the inverse of the current state directly in the setState callback
    setUserDetails((prevData) => {
      // const updatedPermissions: Permissions = {...userDetails.permissions};
      const updatedPermissions: Permissions = {
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
      };
      const permissionsArr = Object.keys(updatedPermissions);
      for (const key in permissionsArr) {
        let permission = permissionsArr[key];
        // console.log(updatedPermissions[key]);
        updatedPermissions[permission as keyof Permissions] = isAllSelected
          ? false
          : true;
      }

      return {
        ...prevData,
        permissions: updatedPermissions,
      };
    });
  };

  return (
    <div className="flex flex-col w-1/2 max-h-[90vh] my-10 overflow-y-auto rounded-md bg-white items-top justify-start gap-5 p-2 custom-scrollbar">
      {/* Button to close the modal */}
      <div className="p-1 flex items-center justify-between w-full">
        <div className="w-10 p-2 shadow-md rounded-full">
          <UserIcon />
        </div>
        <button
          className="w-6"
          onClick={() => {
            setOpenUpdateUserModal(false);
          }}
        >
          <CrossIcon />
        </button>
      </div>

      <div className="w-full px-2 font-semibold">Team Management</div>

      <div className="w-full">
        <form
          className="p-2 bg-white rounded flex flex-col gap-3"
          onSubmit={handleEditFormSubmit}
        >
          {/* user information */}
          <div className="border p-4 rounded-md shadow">
            <div
              className="flex items-center justify-start gap-1 w-full cursor-pointer"
              onClick={() => setUserInfoAccordion((prev) => !prev)}
            >
              <div className="w-5">
                {userInfoAccordion ? <DownIcon /> : <UpIcon />}
              </div>
              <div className="text-sm">User Info</div>
            </div>
            <div
              className={`${
                userInfoAccordion ? "" : "hidden"
              } flex flex-col items-start justify-between gap-3`}
            >
              <div className="flex gap-2 w-full">
                <div className="flex flex-col items-start justify-between gap-1 w-1/2">
                  <label htmlFor="" className="text-xs">
                    First Name
                  </label>
                  <input
                    type="text"
                    className={inputFieldStyle}
                    name="firstName"
                    value={userDetails?.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-col items-start justify-between gap-1 w-1/2">
                  <label htmlFor="" className="text-xs">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className={inputFieldStyle}
                    name="lastName"
                    value={userDetails?.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="flex w-full gap-2">
                <div className="flex flex-col items-start justify-between gap-1 w-1/2">
                  <label htmlFor="" className="text-xs">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    className={`${inputFieldStyle} text-gray-300`}
                    value={userDetails?.email}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
                <div className="flex flex-col items-start justify-between gap-1 w-1/2">
                  <label htmlFor="" className="text-xs">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className={`${inputFieldStyle} text-gray-300`}
                    value={userDetails.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* user permissions */}
          <div className="border p-4 rounded-md shadow gap-3 flex flex-col justify-between">
            <div className="flex items-center cursor-pointer justify-between gap-1 w-full">
              <div
                onClick={() => setUserPermissionAcc((prev) => !prev)}
                className="flex items-center cursor-pointer justify-start gap-1 w-full"
              >
                <div className="w-5 ">
                  {userPermissionAcc ? <DownIcon /> : <UpIcon />}
                </div>
                <div className="text-sm">User Permissions</div>
              </div>
              <div
                className={`w-full cursor-pointer flex items-center justify-end gap-1 ${
                  userPermissionAcc ? "" : "hidden"
                }`}
              >
                <input
                  // key={selectAllValue}
                  id="select-all-checkbox"
                  onChange={handleSelectAllPermissions}
                  type="checkbox"
                  checked={selectAllValue}
                />

                <label
                  htmlFor="select-all-checkbox"
                  className={`${
                    userPermissionAcc ? "" : "hidden"
                  } text-xs font-semibold cursor-pointer`}
                >
                  {selectAllValue ? "Unselect All" : "Select All"}
                </label>
              </div>
            </div>
            <div className={`${userPermissionAcc ? "" : "hidden"} `}>
              <div className="flex justify-between">
                <div className="flex justify-between flex-col gap-1">
                  {permissionsArrayColumn1.map(
                    ({ title, permission }, index) => {
                      return (
                        <div key={index}>
                          <Toggle
                            permission={permission}
                            title={title}
                            onChange={handleToggleChange}
                            value={
                              userDetails?.permissions[
                                permission as keyof Permissions
                              ]
                            }
                          />
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="flex justify-between flex-col gap-1">
                  {permissionsArrayColumn2.map(
                    ({ title, permission }, index) => (
                      <div key={index}>
                        <Toggle
                          permission={permission}
                          title={title}
                          onChange={handleToggleChange}
                          value={
                            userDetails?.permissions[
                              permission as keyof Permissions
                            ]
                          }
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* user roles */}
          <div className="border p-4 rounded-md shadow gap-3 flex flex-col justify-between">
            <div
              className="flex items-center justify-start gap-1 w-full cursor-pointer"
              onClick={() => setUserRolesAcc((prev) => !prev)}
            >
              <div className="w-5">
                {userRolesAcc ? <DownIcon /> : <UpIcon />}
              </div>
              <div className="text-sm">User Roles</div>
            </div>
            <div
              className={`${
                userRolesAcc ? "" : "hidden"
              } flex flex-col items-start justify-between gap-3`}
            >
              <div className="flex flex-col w-full items-start justify-between gap-1 text-xs">
                <label htmlFor="" className="text-xs">
                  User Type
                </label>
                <select
                  name="type"
                  id=""
                  className={selectFieldStyle}
                  required
                  onChange={handleSelectChange}
                  defaultValue={userDetails?.roles?.type}
                >
                  <option value="">Select type</option>
                  <option value="account">Account</option>
                </select>
              </div>
              <div className="flex flex-col w-full items-start justify-between gap-1">
                <label htmlFor="" className="text-xs">
                  User Role
                </label>
                <select
                  name="role"
                  id=""
                  className={selectFieldStyle}
                  required
                  defaultValue={userDetails?.roles?.role}
                  onChange={handleSelectChange}
                >
                  <option value="">Select Role</option>
                  <option value="admin" className="py-10 px-10 ">
                    Admin
                  </option>
                  <option value="user" className="py-10 px-10 ">
                    User
                  </option>
                </select>
              </div>
              {/* <div>{userDetails.roles.locationIds}</div> */}
              <div className="flex flex-col w-full items-start justify-between gap-1 text-xs">
                <div className="flex items-center justify-between w-full flex-wrap">
                  <label htmlFor="" className="text-xs">
                    Add Sub Accounts
                  </label>
                </div>
                <AutoCompleteDD
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  setCurrentOption={setValue}
                  dataList={agencyLocation}
                  name="locationIds"
                  onOptionClick={addLocationId}
                />
                <div className="flex flex-wrap gap-1">
                  {selectedLocationIds?.map((locationId, index) => {
                    const location = agencyLocation?.find(
                      (loc) => loc.id === locationId
                    );
                    console.log(selectedLocationIds, "inside");
                    return (
                      <div
                        key={`${locationId}-${index}`}
                        className="bg-green-300 text-xs font-semibold p-1 rounded-md flex items-center"
                      >
                        {location ? location.name : "Unknown Location"}
                        <span
                          className="cursor-pointer ml-1"
                          onClick={() => handleDeleteLocationId(index)}
                        >
                          X
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* form buttons */}
          <div className="flex items-center justify-end gap-3 ">
            <button
              onClick={() => setOpenUpdateUserModal(false)}
              className="rounded-md text-xs border shadow bg-white-700 p-2 px-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={selectedLocationIds.length < 1}
              className="disabled:opacity-60 rounded-md text-xs text-white bg-blue-700 p-2 px-4 flex w-20 items-center justify-center "
            >
              {formSubmissionLoading ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-6 h-6 animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                "Save"
              )}
            </button>
          </div>
          <div
            className={`text-xs text-red-500 ${
              formSubmitError === "" ? "hidden" : ""
            }`}
          >
            Error adding user: {formSubmitError}
          </div>
        </form>
      </div>
    </div>
  );
};

const inputFieldStyle =
  "border rounded-md outline-none py-2 text-gray-500 px-2 shadow text-xs w-full";
const selectFieldStyle =
  "border text-xs p-2 shadow-sm rounded-md outline-none w-full";

export default UpdateUserModal;
