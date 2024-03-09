import React, { useState } from 'react';
import { CrossIcon, UpIcon, DownIcon, LockIcon, UserIcon } from '@/svg/index.ts';
import { Toggle } from '@/components/components.ts';

type Props = {
    setOpenUpdateUserModal: React.Dispatch<React.SetStateAction<boolean>>;
    userFormData: User;
}

interface User {
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

const UpdateUserModal: React.FC<Props> = ({ setOpenUpdateUserModal, userFormData }) => {
    const [userInfoAccordion, setUserInfoAccordion] = useState(true);
    const [userPermissionAcc, setUserPermissionAcc] = useState(false);
    const [userRolesAcc, setUserRolesAcc] = useState(false);
    const [userDetails, setUserDetails] = useState<User>(userFormData);
    
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
                <form className="p-2 bg-white rounded flex flex-col gap-3 ">
                    {/* user information */}
                    <div className='border p-4 rounded-md shadow'>
                        <div className='flex items-center justify-start py-5 gap-1 w-full cursor-pointer' onClick={() => setUserInfoAccordion(prev => !prev)}>
                            <div className='w-5' >{userInfoAccordion ? <DownIcon /> : <UpIcon />}</div>
                            <div className='text-sm'>User Info</div>
                        </div>
                        <div className={`${userInfoAccordion ? '' : 'hidden'} flex flex-col items-start justify-between gap-3`}>
                            <div className='flex'>
                                <div>
                                    <label htmlFor="" className='text-xs' >First Name</label>
                                    <input
                                        type="text"
                                        className='border rounded-md outline-none py-1 px-2 shadow'
                                        name='name'
                                        value={userDetails.firstName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="" className='text-xs'>Last Name</label>
                                    <input
                                        type="text"
                                        className='border rounded-md outline-none py-1 px-2 text-gray-700 shadow'
                                        value={userDetails.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-shrink gap-2'>
                                <div className='w-1/3'>
                                    <label htmlFor="" className='text-xs'>Email</label>
                                    <input
                                        type="text"
                                        name='email'
                                        className='border rounded-md outline-none py-1 px-2 w-full shadow'
                                        value={userDetails.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='w-1/3'>
                                    <label htmlFor="" className='text-xs'>Phone</label>
                                    <input
                                        type="text"
                                        className='border rounded-md outline-none py-1 px-2 text-gray-700 shadow w-full'
                                        name='phone'
                                        value={userDetails.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='w-1/3'>
                                    <label htmlFor="" className='text-xs'>Extensions</label>
                                    <input type="text" className='border rounded-md outline-none py-1 px-2 text-gray-700 shadow w-full' />
                                </div>
                            </div>
                            <div></div>
                            <div>
                                <button className='rounded-md text-xs text-white bg-blue-700 p-2 flex items-center justify-between gap-2'>
                                    <div className='w-4'><LockIcon /></div>
                                    Forgot Password
                                </button>
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
                            <div className='flex justify-between'>
                                <div className='flex justify-between flex-col gap-2'>
                                    {Object.entries(userDetails.permissions).map(([permission, value]) => (
                                        <div key={permission}>
                                            <Toggle title={permission} initialValue={value} onChange={(newValue) => handleToggleChange(permission as keyof User['permissions'], newValue)} />
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
                            <div className='flex flex-col w-full items-start justify-between gap-1'>
                                <label htmlFor="" className='text-xs'>User Type</label>
                                <select name="" id="" className='border shadow-sm rounded-md outline-none w-full py-1 px-2'>
                                    <option value="account" className='py-10 px-10 '>Account</option>
                                    <option value="account" className='py-10 px-10 '>Account</option>
                                    <option value="account" className='py-10 px-10 '>Account</option>
                                    <option value="account" className='py-10 px-10 '>Account</option>
                                </select>
                            </div>
                            <div className='flex flex-col w-full items-start justify-between gap-1'>
                                <label htmlFor="" className='text-xs'>User Role</label>
                                <select name="" id="" className='border shadow-sm rounded-md outline-none w-full py-1 px-2'>
                                    <option value="account" className='py-10 px-10 '>Account</option>
                                    <option value="account" className='py-10 px-10 '>Account</option>
                                    <option value="account" className='py-10 px-10 '>Account</option>
                                    <option value="account" className='py-10 px-10 '>Account</option>
                                </select>
                            </div>
                            <div className='flex flex-col w-full items-start justify-between gap-1'>
                                <label htmlFor="" className='text-xs'>Add Sub Accounts</label>
                                <select name="" id="" className='border shadow-sm rounded-md outline-none w-full py-1 px-2'>
                                    <option value="account" className='py-10 px-10 '>Account</option>
                                    <option value="account" className='py-10 px-10 '>Account</option>
                                    <option value="account" className='py-10 px-10 '>Account</option>
                                    <option value="account" className='py-10 px-10 '>Account</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* form buttons */}
                    <div className='flex items-center justify-end gap-3 '>
                        <button onClick={() => setOpenUpdateUserModal(false)} className='rounded-md text-xs border shadow bg-white-700 p-2 px-4'>
                            Cancel
                        </button>
                        <button type='submit' className='rounded-md text-xs text-white bg-blue-700 p-2 px-4 '>
                            Save
                        </button>
                    </div>
                </form >
            </div>
        </div >
    );
}

export default UpdateUserModal;
