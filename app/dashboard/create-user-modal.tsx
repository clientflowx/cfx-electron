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
import axios, { AxiosError, isAxiosError } from "axios";

import { AccType, Permissions } from "./types";
import AutoCompleteDD from "@/components/AutoCompleteDD";
import GeneratePasswordIcon from "@/svg/GeneratePasswordIcon";
import Alert from "@/components/Alert";
import { apiUrl } from "@/config";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type: string;
  role: string;
  locationIds: string[];
  permissions: Permissions;
}

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

const initialUserValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  type: "",
  role: "",
  locationIds: [], // Initialize as an empty array
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
};

const permissionsArrayColumn1 = permissionsArray.slice(
  0,
  Math.ceil(permissionsArray.length / 2)
);
const permissionsArrayColumn2 = permissionsArray.slice(
  Math.ceil(permissionsArray.length / 2)
);

type Props = {
  setOpenNewUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  refreshUserList: () => void;
};

const NewUserModal: React.FC<Props> = ({
  setOpenNewUserModal,
  refreshUserList,
}) => {
  const [userInfoAccordion, setUserInfoAccordion] = useState(true);
  const [userPermissionAcc, setUserPermissionAcc] = useState(false);
  const [userRolesAcc, setUserRolesAcc] = useState(false);
  const [newUserData, setNewUserData] = useState<User>(initialUserValue);

  const [agencyLocation, setAgencyLocation] = useState<AccType[]>([]);
  const [PasswordValid, setPasswordValid] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [formSubmissionLoading, setformSubmissionLoading] =
    useState<boolean>(false);
  const [formSubmitError, setFormSubmitError] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [value, setValue] = useState<AccType | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [credentialsCopied, setCredentialsCopied] = useState(false);
  const [selectAllValue, setSelectAllValue] = useState<boolean>(false);

  console.log("user data: ", newUserData);

  const handleInputChange:
    | React.ChangeEventHandler<HTMLInputElement>
    | undefined = (e) => {
      const { name, value } = e.target;
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

      // Check if the input field is for the password
      if (name === "password") {
        if (!passwordRegex.test(value)) {
          setPasswordValid(false);
        } else setPasswordValid(true);
      }

      if (name === "locationIds") {
        setNewUserData((prevData) => ({
          ...prevData,
          locationIds: [...prevData.locationIds, value],
        }));
      } else {
        setNewUserData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    };

  const handleSelectChange:
    | React.ChangeEventHandler<HTMLSelectElement>
    | undefined = (e) => {
      const { name, value } = e.target;
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

      // Check if the input field is for the password
      if (name === "password") {
        if (!passwordRegex.test(value)) {
          setPasswordValid(false);
        } else setPasswordValid(true);
      }

      if (name === "locationIds") {
        setNewUserData((prevData) => ({
          ...prevData,
          locationIds: [...prevData.locationIds, value],
        }));
      } else {
        setNewUserData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
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
          `${apiUrl}/api/internal/get-agency-subaccounts`,
          {
            headers: {
              Authorization: `Bearer ${tokenValue}`,
            },
          }
        );
        // console.log("user locations: ", response.data?.data);
        setLoading(false);
        console.log(response);

        setAgencyLocation(response.data?.data);
      } catch (error) {
        setLoading(false);
        console.log("Error getting location: ", error);
      }
    };
    getAgencyLocation();
  }, []);

  const handleToggleChange = (
    permission: keyof User["permissions"],
    value: boolean
  ) => {
    console.log(permission, value);
    setNewUserData((prevData) => ({
      ...prevData,
      permissions: {
        ...prevData.permissions,
        [permission]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setformSubmissionLoading(true);

      // Retrieve the bearer token from cookies
      const token = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("token="));
      const tokenValue = token ? token.split("=")[1] : "";

      const response = await axios.post(
        `${apiUrl}/api/internal/create-agency-user`,
        newUserData,
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      );
      // console.log(response.data.m);
      if (response.data.success) {
        console.log(response);
        setformSubmissionLoading(false);
        setOpenNewUserModal(false);
        setFormSubmitError("");
        refreshUserList();
      }
    } catch (error: unknown) {
      setformSubmissionLoading(false);
      if (isAxiosError(error)) {
        if (error.isAxiosError && error.response && error.response.data) {
          setFormSubmitError(error.message);
          console.log(error);
        } else {
          setFormSubmitError("An error occurred. Please try again later.");
        }
      }
    }
  };
  // TODO debouncing on email input
  const checkEmailExistence = async (email: string) => {
    try {
      const token = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("token="));
      const tokenValue = token ? token.split("=")[1] : "";
      const response = await axios.get(
        `https://cfx-mono-production-5ec7.up.railway.app/api/internal/check-valid-email?email=${email}`,
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      );

      return response.data.emailAlreadyExist;
    } catch (error) {
      console.error("Error checking email existence:", error);

      return false;
    }
  };

  // Inside your component
  const handleEmailChange: React.KeyboardEventHandler<
    HTMLInputElement
  > = async (e) => {
    const { value: email } = e.currentTarget;
    const emailExists = await checkEmailExistence(email);
    if (emailExists) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  const handleDeleteLocationId = (index: number) => {
    const modifiedUserData = { ...newUserData };
    modifiedUserData.locationIds.splice(index, 1);
    setNewUserData(modifiedUserData);
  };

  const addLocationId = (optionValue: string, optionId: string) => {
    setNewUserData((prevData) => ({
      ...prevData,
      locationIds: [...prevData.locationIds, optionId],
    }));
  };

  const generateRandomPassword:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = (e) => {
      e.preventDefault();
      const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
      const numbers = "0123456789";
      const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

      let password = "";

      // Ensure at least one uppercase letter
      password +=
        uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];

      // Ensure at least one lowercase letter
      password +=
        lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];

      // Ensure at least one number
      password += numbers[Math.floor(Math.random() * numbers.length)];

      // Ensure at least one special character
      password += symbols[Math.floor(Math.random() * symbols.length)];

      // Generate remaining characters
      for (let i = 0; i < 4; i++) {
        const characters =
          uppercaseLetters + lowercaseLetters + numbers + symbols;
        password += characters[Math.floor(Math.random() * characters.length)];
      }

      // Shuffle the password characters
      password = password
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");

      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

      if (passwordRegex.test(password)) {
        setPasswordValid(true);
        setNewUserData((prevData) => ({
          ...prevData,
          password: password,
        }));
        console.log(newUserData.password);
      } else setPasswordValid(false);
    };

  const copyCredentials:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = (e) => {
      e.preventDefault();
      const { email, password } = newUserData;
      navigator.clipboard.writeText(`Email:${email} , Password:${password}`);
      setCredentialsCopied(true);
      setTimeout(() => {
        setCredentialsCopied(false);
      }, 5000);
    };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleSelectAllPermissions = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    setSelectAllValue((prev) => !prev);
    setNewUserData((prevData) => {
      const updatedPermissions = { ...prevData.permissions };
      for (const key in updatedPermissions) {
        // updatedPermissions[key as keyof Permissions] = !prevData.permissions[key as keyof Permissions];
        updatedPermissions[key as keyof Permissions] = !selectAllValue;
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
            setOpenNewUserModal(false);
          }}
        >
          <CrossIcon />
        </button>
      </div>
      <div className="w-full px-2 font-semibold">Team Management</div>

      <div className="w-full">
        <form
          className="p-2 bg-white rounded flex flex-col gap-3"
          onSubmit={handleSubmit}
        >
          {/* user information */}
          <div className="border p-4 rounded-md shadow">
            <div className="justify-between items-center flex">
              <div
                className="flex items-center justify-start gap-1 cursor-pointer"
                onClick={() => setUserInfoAccordion((prev) => !prev)}
              >
                <div className="w-5">
                  {userInfoAccordion ? <DownIcon /> : <UpIcon />}
                </div>
                <div className="text-sm">User Info</div>
              </div>
              <button
                disabled={
                  newUserData?.email === "" || newUserData?.password === ""
                }
                className="disabled:opacity-60 h-full shadow border rounded-md p-1 flex items-center justify-center text-xs"
                onClick={copyCredentials}
              >
                Copy Credentials
              </button>
            </div>{" "}
            <div
              className={`${userInfoAccordion ? "" : "hidden"
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
                    value={newUserData.firstName}
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
                    value={newUserData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2 w-full">
                <div className="flex flex-col items-start justify-between gap-1 w-1/2">
                  <label htmlFor="" className="text-xs">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className={inputFieldStyle}
                    value={newUserData.email}
                    onChange={handleInputChange}
                    onKeyUp={handleEmailChange}
                    required
                  />
                </div>

                <div className="flex flex-col items-start justify-between gap-1 w-1/2">
                  <label htmlFor="" className="text-xs">
                    Password
                  </label>
                  <div className="flex items-center gap-1 w-full">
                    <div className="relative flex items-center w-full">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        className={`${inputFieldStyle} pr-10`}
                        name="password"
                        value={newUserData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-0 mr-2 text-xs font-semibold text-gray-500 focus:outline-none"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? "Hide" : "Show"}
                      </button>
                    </div>
                    <div className="h-full shadow border rounded-md p-1 flex items-center justify-center">
                      <button
                        onClick={generateRandomPassword}
                        className="w-5 opacity-65 hover:opacity-90 transition-all"
                      >
                        <GeneratePasswordIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${PasswordValid ? "hidden" : ""
                  } text-xs text-red-500`}
              >
                Password must contain at least 8 characters, including one
                uppercase letter, one lowercase letter, one number, and one
                special character.
              </div>
              <div
                className={`${emailValid ? "hidden" : ""} text-xs text-red-500`}
              >
                Email already exists.
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
                className={`w-full flex items-center justify-end gap-1 ${userPermissionAcc ? "" : "hidden"
                  }`}
                onClick={handleSelectAllPermissions}
              >
                <input type="checkbox" checked={selectAllValue} />
                <button
                  className={`${userPermissionAcc ? "" : "hidden"
                    } text-xs font-semibold`}
                >
                  {selectAllValue ? "Unselect All" : "Select All"}
                </button>
              </div>
            </div>
            <div className={`${userPermissionAcc ? "" : "hidden"}`}>
              <div className="flex justify-between">
                <div className="flex justify-between flex-col gap-1">
                  {permissionsArrayColumn1.map(
                    ({ title, permission }, index) => (
                      <div key={index}>
                        <Toggle
                          title={title}
                          permission={permission}
                          onChange={handleToggleChange}
                          value={
                            newUserData?.permissions[
                            permission as keyof Permissions
                            ]
                          }
                        />
                      </div>
                    )
                  )}
                </div>
                <div className="flex justify-between flex-col gap-1">
                  {permissionsArrayColumn2.map(
                    ({ title, permission }, index) => (
                      <div key={index}>
                        <Toggle
                          title={title}
                          permission={permission}
                          onChange={handleToggleChange}
                          value={
                            newUserData?.permissions[
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
              className={`${userRolesAcc ? "" : "hidden"
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
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">Select type</option>
                  <option value="account">Account</option>
                  {/* Add other options as needed */}
                </select>
              </div>

              <div className="flex flex-col w-full items-start justify-between gap-1 text-xs">
                <label htmlFor="role" className="text-xs">
                  User Role
                </label>
                <select
                  name="role"
                  id="role"
                  className={selectFieldStyle}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <div className="flex flex-col w-full items-start justify-between gap-1 text-xs">
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
                {newUserData?.locationIds?.map((locationId, index) => {
                  const location = agencyLocation?.find(
                    (loc) => loc.id === locationId
                  );
                  return (
                    <div
                      key={index}
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
          {/* form buttons */}
          <div className="flex items-center justify-end gap-3 ">
            <button
              type="reset"
              onClick={() => setOpenNewUserModal(false)}
              className="rounded-md text-xs border shadow bg-white-700 p-2 px-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md text-xs text-white bg-blue-700 p-2 px-4 flex w-20 items-center justify-center disabled:opacity-60 "
              disabled={!PasswordValid || newUserData?.locationIds?.length < 1}
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
            className={`text-xs text-red-500 ${formSubmitError === "" ? "hidden" : ""
              }`}
          >
            Error adding user: {formSubmitError}
          </div>
        </form>
      </div>
      {credentialsCopied && (
        <Alert type="success" message={"Credentials copied to clipboard"} />
      )}
    </div>
  );
};

const inputFieldStyle =
  "border rounded-md outline-none py-2 text-gray-500 px-2 shadow text-xs w-full";
const selectFieldStyle =
  "border text-xs p-2 shadow-sm rounded-md outline-none w-full";

export default NewUserModal;
