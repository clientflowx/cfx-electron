import React, { useState } from 'react';
import { CrossIcon, UpIcon, DownIcon, LockIcon, UserIcon } from '@/svg/index.ts';
import { Toggle } from '@/components/components.ts';
import axios, { isAxiosError } from 'axios';

type Props = {
    setOpenUpdateUserModal: React.Dispatch<React.SetStateAction<boolean>>;
    userFormData: User;
    refreshUserList: () => void;
}

interface Permissions {
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
}

interface User {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string; // Optional phone property
    permissions: Permissions
    roles: {
        type: string;
        role: string;
        locationIds: string[];
    };
}

const toggleButtonHeaders: string[] = [
    "Dashboard Stats",
    "Appointments",
    "Campaigns",
    "Bulk Requests",
    "Triggers",
    "Funnels",
    "Opportunities",
    "Conversations",
    "Contacts",
    "Reviews",
    "Online Listings",
    "Membership",
    "Communities",
    "Settings",
    "Only Assigned Data",
    "Tags",
    "Lead Value",
    "Marketing",
    "Websites",
    "Adwords Reporting",
    "Facebook Ads",
    "Call Reporting",
    "Reporting",
    "Attribution Reporting",
    "Agent Reporting",
    "Social Planner",
    "Workflows",
    "Blogging",
    "Affiliate Manager",
    "Content Al",
    "Payments",
    "Invoicing",
    "Record Payment",
    "Payment Refund",
    "Cancel Subscription",
];

const permissionsArray: string[] = [
    'campaignsEnabled',
    'campaignsReadOnly',
    'contactsEnabled',
    'workflowsEnabled',
    'triggersEnabled',
    'funnelsEnabled',
    'websitesEnabled',
    'opportunitiesEnabled',
    'dashboardStatsEnabled',
    'bulkRequestsEnabled',
    'appointmentsEnabled',
    'reviewsEnabled',
    'onlineListingsEnabled',
    'phoneCallEnabled',
    'conversationsEnabled',
    'assignedDataOnly',
    'adwordsReportingEnabled',
    'membershipEnabled',
    'facebookAdsReportingEnabled',
    'attributionsReportingEnabled',
    'settingsEnabled',
    'tagsEnabled',
    'leadValueEnabled',
    'marketingEnabled',
];
const permissionsArrayColumn1 = permissionsArray.slice(0, Math.ceil(permissionsArray.length / 2));
const permissionsArrayColumn2 = permissionsArray.slice(Math.ceil(permissionsArray.length / 2));

const UpdateUserModal: React.FC<Props> = ({ setOpenUpdateUserModal, userFormData, refreshUserList }) => {
    const [userInfoAccordion, setUserInfoAccordion] = useState(true);
    const [userPermissionAcc, setUserPermissionAcc] = useState(false);
    const [userRolesAcc, setUserRolesAcc] = useState(false);
    const [userDetails, setUserDetails] = useState<User>(userFormData);
    const [formSubmitError, setFormSubmitError] = useState<string>('');
    const [formSubmissionLoading, setformSubmissionLoading] = useState<boolean>(false);


    console.log("user details:", userDetails);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setUserDetails(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleToggleChange = (permission: keyof User['permissions'], value: boolean) => {
        setUserDetails(prevState => ({
            ...prevState,
            permissions: {
                ...prevState.permissions,
                [permission]: value
            }
        }));
    };

    const handleEditFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setformSubmissionLoading(true);
            const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
            const tokenValue = token ? token.split('=')[1] : '';
            const response = await axios.post('https://cfx-mono-production-5ec7.up.railway.app/api/internal/update-user/1CNd5evx0owacOwIeAdk', userDetails, {
                headers: {
                    Authorization: `Bearer ${tokenValue}`
                }
            });
            // if (response.data.success) {
                // setformSubmissionLoading(false);
                // setOpenUpdateUserModal(false);
                // setFormSubmitError('');
                // refreshUserList();
                // console.log("createdd");
                console.log(response);
                
            // }
        } catch (error) {
            // setformSubmissionLoading(false);
            console.log("arey baba:", error);

            if (isAxiosError(error)) {
                setformSubmissionLoading(false);
                if (error.isAxiosError && error.response && error.response.data) {
                    // setFormSubmitError(error.message);
                    console.log(error);

                } else {
                    setFormSubmitError('An error occurred. Please try again later.');
                    console.log(error);
                }
            }
        }
    }

    return (
        <div className='flex flex-col w-1/2 h-3/4 overflow-y-auto rounded-md bg-white items-center justify-between gap-2 p-2 custom-scrollbar'>
            {/* Button to close the modal */}
            <div className='p-1 flex items-center justify-between w-full' >
                <div className='w-10 p-2 shadow-md rounded-full'><UserIcon /></div>
                <button
                    className='w-6'
                    onClick={() => {
                        setOpenUpdateUserModal(false)
                    }}
                >
                    <CrossIcon />
                </button>
            </div>

            <div className='w-full px-2 font-semibold'>Team Management</div>

            <div className='w-full'>
                <form className="p-2 bg-white rounded flex flex-col gap-3" onSubmit={handleEditFormSubmit}>
                    {/* user information */}
                    <div className='border p-4 rounded-md shadow'>
                        <div className='flex items-center justify-start py-5 gap-1 w-full cursor-pointer' onClick={() => setUserInfoAccordion(prev => !prev)}>
                            <div className='w-5' >{userInfoAccordion ? <DownIcon /> : <UpIcon />}</div>
                            <div className='text-sm'>User Info</div>
                        </div>
                        <div className={`${userInfoAccordion ? '' : 'hidden'} flex flex-col items-start justify-between gap-3`}>
                            <div className='flex gap-2 w-full'>
                                <div className='flex flex-col items-start justify-between gap-1 w-1/2'>
                                    <label htmlFor="" className='text-xs' >First Name</label>
                                    <input
                                        type="text"
                                        className={inputFieldStyle}
                                        name='firstName'
                                        value={userDetails.firstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col items-start justify-between gap-1 w-1/2'>
                                    <label htmlFor="" className='text-xs'>Last Name</label>
                                    <input
                                        type="text"
                                        className={inputFieldStyle}
                                        name='lastName'
                                        value={userDetails.lastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex w-full gap-2'>
                                <div className='flex flex-col items-start justify-between gap-1 w-1/2'>
                                    <label htmlFor="" className='text-xs'>Email</label>
                                    <input
                                        type="text"
                                        name='email'
                                        className={`${inputFieldStyle} text-gray-300`}
                                        value={userDetails.email}
                                        onChange={handleInputChange}
                                        disabled
                                    />
                                </div>
                                <div className='flex flex-col items-start justify-between gap-1 w-1/2'>
                                    <label htmlFor="" className='text-xs'>Phone</label>
                                    <input
                                        type="text"
                                        className={inputFieldStyle}
                                        name='phone'
                                        value={userDetails.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* user permissions */}
                    <div className='border p-4 rounded-md shadow gap-3 flex flex-col justify-between'>
                        <div className='flex items-center cursor-pointer justify-start py-5 gap-1 w-full' onClick={() => setUserPermissionAcc(prev => !prev)}>
                            <div className='w-5 ' >{userPermissionAcc ? <DownIcon /> : <UpIcon />}</div>
                            <div className='text-sm'>User Permissions</div>
                        </div>
                        <div className={`${userPermissionAcc ? '' : 'hidden'} flex flex-col items-start justify-end gap-3`}>
                            <div className='flex justify-between gap-10'>
                                <div className='flex justify-between flex-col gap-1'>
                                    {permissionsArrayColumn1.map((permission, index) => (
                                        <div key={index}>
                                            <Toggle title={permission} onChange={handleToggleChange} value={userDetails.permissions[permission as keyof Permissions]} />
                                        </div>
                                    ))}
                                </div>
                                <div className='flex justify-between flex-col gap-1'>
                                    {permissionsArrayColumn2.map((permission, index) => (
                                        <div key={index}>
                                            <Toggle title={permission} onChange={handleToggleChange} value={userDetails.permissions[permission as keyof Permissions]} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* user roles */}
                    <div className='border p-4 rounded-md shadow gap-3 flex flex-col justify-between'>
                        <div className='flex items-center justify-start py-5 gap-1 w-full cursor-pointer' onClick={() => setUserRolesAcc(prev => !prev)}>
                            <div className='w-5'>{userRolesAcc ? <DownIcon /> : <UpIcon />}</div>
                            <div className='text-sm'>User Roles</div>
                        </div>
                        <div className={`${userRolesAcc ? '' : 'hidden'} flex flex-col items-start justify-between gap-3`}>
                            <div className='flex flex-col w-full items-start justify-between gap-1 text-xs'>
                                <label htmlFor="" className='text-xs'>User Type</label>
                                <select name="type" id="" className={selectFieldStyle} required defaultValue={userFormData.roles.type}>
                                    <option value="">Select type</option>
                                    <option value="account">Account</option>
                                </select>
                            </div>
                            <div className='flex flex-col w-full items-start justify-between gap-1'>
                                <label htmlFor="" className='text-xs'>User Role</label>
                                <select name="" id="" className={selectFieldStyle} required defaultValue={userFormData.roles.role}>
                                    <option value="">Select Role</option>
                                    <option value="admin" className='py-10 px-10 '>Admin</option>
                                    <option value="user" className='py-10 px-10 '>User</option>
                                </select>
                            </div>
                            {/* <div className='flex flex-col w-full items-start justify-between gap-1'>
                                <label htmlFor="" className='text-xs'>Add Sub Accounts</label>
                                <select name="" id="" className={selectFieldStyle}>
                                    <option value="account" className='py-10 px-10 '>Account</option>
                                    <option value="account" className='py-10 px-10 '>Account</option>
                                    <option value="account" className='py-10 px-10 '>Account</option>
                                    <option value="account" className='py-10 px-10 '>Account</option>
                                </select>
                            </div> */}
                        </div>
                    </div>
                    {/* form buttons */}
                    <div className='flex items-center justify-end gap-3 '>
                        <button onClick={() => setOpenUpdateUserModal(false)} className='rounded-md text-xs border shadow bg-white-700 p-2 px-4'>
                            Cancel
                        </button>
                        <button type='submit' className='rounded-md text-xs text-white bg-blue-700 p-2 px-4 flex w-20 items-center justify-center '>
                            {formSubmissionLoading ?
                                <svg aria-hidden="true" role="status" className="inline w-6 h-6 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg> : 'Save'}
                        </button>
                    </div>
                    <div className={`text-xs text-red-500 ${formSubmitError === '' ? 'hidden' : ''}`}>Error adding user: {formSubmitError}</div>
                </form >
            </div>
        </div >
    );
}


const inputFieldStyle = "border rounded-md outline-none py-2 text-gray-500 px-2 shadow text-xs w-full";
const selectFieldStyle = "border text-xs p-2 shadow-sm rounded-md outline-none w-full";


export default UpdateUserModal;
