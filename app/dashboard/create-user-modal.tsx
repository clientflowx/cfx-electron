import React, { useEffect, useState } from 'react';
import { CrossIcon, UpIcon, DownIcon, LockIcon, UserIcon } from '@/svg/index.ts';
import Toggle from '@/components/Toggle';
import axios, { AxiosError, isAxiosError } from 'axios';
import Loader from '@/components/Loader';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    type: string;
    role: string;
    locationIds: string[];
    permissions: {
        campaignsEnabled: boolean;
        campaignsReadOnly: boolean;
        contactsEnabled: boolean;
        workflowsEnabled: boolean;
        triggersEnabled: boolean;
        funnelsEnabled: boolean;
        websitesEnabled: boolean;
        opportunitiesEnabled: boolean;
        dashboardStatsEnabled: boolean;
        bulkRequestsEnabled: boolean;
        appointmentsEnabled: boolean;
        reviewsEnabled: boolean;
        onlineListingsEnabled: boolean;
        phoneCallEnabled: boolean;
        conversationsEnabled: boolean;
        assignedDataOnly: boolean;
        adwordsReportingEnabled: boolean;
        membershipEnabled: boolean;
        facebookAdsReportingEnabled: boolean;
        attributionsReportingEnabled: boolean;
        settingsEnabled: boolean;
        tagsEnabled: boolean;
        leadValueEnabled: boolean;
        marketingEnabled: boolean;
    };
}

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

type Props = {
    setOpenNewUserModal: React.Dispatch<React.SetStateAction<boolean>>;
    refreshUserList: () => void;
}

type agencyArray = [
    {
        id: string,
        name: string,
    }
]

const NewUserModal: React.FC<Props> = ({ setOpenNewUserModal, refreshUserList }) => {
    const [userInfoAccordion, setUserInfoAccordion] = useState(true);
    const [userPermissionAcc, setUserPermissionAcc] = useState(false);
    const [userRolesAcc, setUserRolesAcc] = useState(false);
    const [newUserData, setNewUserData] = useState<User>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        type: '',
        role: '',
        locationIds: [], // Initialize as an empty array
        permissions: {
            campaignsEnabled: false,
            campaignsReadOnly: false,
            contactsEnabled: false,
            workflowsEnabled: false,
            triggersEnabled: false,
            funnelsEnabled: false,
            websitesEnabled: false,
            opportunitiesEnabled: false,
            dashboardStatsEnabled: false,
            bulkRequestsEnabled: false,
            appointmentsEnabled: false,
            reviewsEnabled: false,
            onlineListingsEnabled: false,
            phoneCallEnabled: false,
            conversationsEnabled: false,
            assignedDataOnly: false,
            adwordsReportingEnabled: false,
            membershipEnabled: false,
            facebookAdsReportingEnabled: false,
            attributionsReportingEnabled: false,
            settingsEnabled: false,
            tagsEnabled: false,
            leadValueEnabled: false,
            marketingEnabled: false,
        },
    });

    const [agencyLocation, setAgencyLocation] = useState<agencyArray>()
    const [PasswordValid, setPasswordValid] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [formSubmissionLoading, setformSubmissionLoading] = useState<boolean>(false);
    const [formSubmitError, setFormSubmitError] = useState<string>('');


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

        // Check if the input field is for the password
        if (name === 'password') {
            if (!passwordRegex.test(value)) {
                setPasswordValid(false);
            }
            else setPasswordValid(true);
        }

        if (name === 'locationIds') {
            setNewUserData(prevData => ({
                ...prevData,
                locationIds: [...prevData.locationIds, value],
            }))
        }
        else {
            setNewUserData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };


    // fetching all the location with their ids
    useEffect(() => {
        const getAgencyLocation = async () => {
            try {
                setLoading(true);
                // Retrieve the bearer token from cookies
                const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
                const tokenValue = token ? token.split('=')[1] : '';
                const response = await axios.
                    get('https://cfx-mono-production-5ec7.up.railway.app/api/internal/get-agency-subaccounts',
                        {
                            headers: {
                                Authorization: `Bearer ${tokenValue}`
                            }
                        });
                // console.log("user locations: ", response.data?.data);
                setLoading(false);
                setAgencyLocation(response.data?.data);
            } catch (error) {
                setLoading(false);
                console.log("Error getting location: ", error);
            }
        }
        getAgencyLocation();
    }, [])


    const handleToggleChange = (permission: keyof User['permissions'], value: boolean) => {
        setNewUserData(prevData => ({
            ...prevData,
            permissions: {
                ...prevData.permissions,
                [permission]: value
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setformSubmissionLoading(true);
            // Retrieve the bearer token from cookies
            const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
            const tokenValue = token ? token.split('=')[1] : '';
            const response = await axios.
                post('https://cfx-mono-production-5ec7.up.railway.app/api/internal/create-agency-user',
                    newUserData,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenValue}`
                        }
                    });
            // console.log(response.data.m);
            if (response.data.success) {
                setformSubmissionLoading(false);
                setOpenNewUserModal(false);
                setFormSubmitError('');
                refreshUserList();
            }

        } catch (error: unknown) {
            setformSubmissionLoading(false);
            if (isAxiosError(error)) {

                if (error.isAxiosError && error.response && error.response.data) {
                    setFormSubmitError(error.message);
                    console.log(error);
                    
                } else {
                    setFormSubmitError('An error occurred. Please try again later.');
                }
            }
        };
    }

    return (
        <div className='flex flex-col w-1/2  overflow-y-auto rounded-md bg-white items-center justify-start gap-5 p-2 custom-scrollbar'>
            {/* Button to close the modal */}
            <div className='p-1 flex items-center justify-between w-full' >
                <div className='w-10 p-2 shadow-md rounded-full'><UserIcon /></div>
                <button
                    className='w-6'
                    onClick={() => {
                        setOpenNewUserModal(false)
                    }}
                >
                    <CrossIcon />
                </button>
            </div>
            <div className='w-full px-2 font-semibold'>Team Management</div>

            <div className='w-full'>
                <form className="p-2 bg-white rounded flex flex-col gap-3" onSubmit={handleSubmit}>
                    {/* user information */}
                    <div className='border p-4 rounded-md shadow'>
                        <div className='flex items-center justify-start gap-1 w-full cursor-pointer' onClick={() => setUserInfoAccordion(prev => !prev)}>
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
                                        value={newUserData.firstName}
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
                                        value={newUserData.lastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex gap-2 w-full'>
                                <div className='flex flex-col items-start justify-between gap-1 w-1/2'>
                                    <label htmlFor="" className='text-xs'>Email</label>
                                    <input
                                        type="text"
                                        name='email'
                                        className={inputFieldStyle}
                                        value={newUserData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 w-full'>
                                <div className='flex flex-col items-start justify-between gap-1 w-1/2'>
                                    <label htmlFor="" className='text-xs'>Password</label>
                                    <input
                                        type="text"
                                        className={inputFieldStyle}
                                        name='password'
                                        value={newUserData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={`${PasswordValid ? 'hidden' : ''} text-xs text-red-500`}>Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* user permissions */}
                    <div className='border p-4 rounded-md shadow gap-3 flex flex-col justify-between'>
                        <div className='flex items-center cursor-pointer justify-start gap-1 w-full' onClick={() => setUserPermissionAcc(prev => !prev)}>
                            <div className='w-5 ' >{userPermissionAcc ? <DownIcon /> : <UpIcon />}</div>
                            <div className='text-sm'>User Permissions</div>
                        </div>
                        <div className={`${userPermissionAcc ? '' : 'hidden'}`}>
                            <div className='flex justify-between'>
                                <div className='flex justify-between flex-col gap-1'>
                                    {permissionsArrayColumn1.map((permission, index) => (
                                        <div key={index}>
                                            <Toggle title={permission} onChange={handleToggleChange} value={false} />
                                        </div>
                                    ))}
                                </div>
                                <div className='flex justify-between flex-col gap-1'>
                                    {permissionsArrayColumn2.map((permission, index) => (
                                        <div key={index}>
                                            <Toggle title={permission} onChange={handleToggleChange} value={false} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* user roles */}
                    <div className='border p-4 rounded-md shadow gap-3 flex flex-col justify-between'>
                        <div className='flex items-center justify-start gap-1 w-full cursor-pointer' onClick={() => setUserRolesAcc(prev => !prev)}>
                            <div className='w-5'>{userRolesAcc ? <DownIcon /> : <UpIcon />}</div>
                            <div className='text-sm'>User Roles</div>
                        </div>
                        <div className={`${userRolesAcc ? '' : 'hidden'} flex flex-col items-start justify-between gap-3`}>
                            <div className='flex flex-col w-full items-start justify-between gap-1 text-xs'>
                                <label htmlFor="" className='text-xs'>User Type</label>
                                <select name="type" id="" className={selectFieldStyle} onChange={handleInputChange} required>
                                    <option value="">Select type</option>
                                    <option value="account">Account</option>
                                    {/* Add other options as needed */}
                                </select>
                            </div>

                            <div className='flex flex-col w-full items-start justify-between gap-1 text-xs'>
                                <label htmlFor="role" className='text-xs'>User Role</label>
                                <select name="role" id="role" className={selectFieldStyle} onChange={handleInputChange} required>
                                    <option value="">Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>

                            <div className='flex flex-col w-full items-start justify-between gap-1 text-xs'>
                                <label htmlFor="" className='text-xs'>Add Sub Accounts</label>
                                <select name="locationIds" id="" className={selectFieldStyle} onChange={handleInputChange}>
                                    {loading ?
                                        <option><Loader /></option> :
                                        agencyLocation?.map((location, index) => (
                                            <option key={index} value={location.id} className='py-10 px-10'>{location.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            {/* <div>{newUserData.locationIds.map((id) => (
                                <div>{id}</div>
                            ))}
                            </div> */}
                        </div>
                    </div>
                    {/* form buttons */}
                    <div className='flex items-center justify-end gap-3 '>
                        <button type='reset' onClick={() => setOpenNewUserModal(false)} className='rounded-md text-xs border shadow bg-white-700 p-2 px-4'>
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

export default NewUserModal;
