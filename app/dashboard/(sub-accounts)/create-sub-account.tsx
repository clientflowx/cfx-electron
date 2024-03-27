"use client"

import React, { useState } from "react";
import { newSubAccountDataType } from "../types";
import { CrossIcon, UserIcon } from "@/svg";
import axios, { isAxiosError } from "axios";
import { apiUrl } from "@/config";
import SmallLoader from "@/svg/SmallLoader";

type Props = {
    setOpenCreateSubAccModal: React.Dispatch<React.SetStateAction<boolean>>;
    fetchSubAccountList: () => void
}

const emptySubAccountData: newSubAccountDataType = {
    businessName: "", firstName: "", lastName: "", email: "", address: ""
}

const CreateSubAccount: React.FC<Props> = ({ setOpenCreateSubAccModal, fetchSubAccountList }) => {

    //state variables
    const [formSubmitError, setFormSubmitError] = useState<string>('');
    const [formSubmissionLoading, setformSubmissionLoading] = useState<boolean>(false);
    const [newSubAccountData, setNewSubAccountData] = useState<newSubAccountDataType>(emptySubAccountData);


    //handle create-sub-acc form 
    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> | undefined = async (e) => {
        e.preventDefault();
        try {
            setformSubmissionLoading(true);
            const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
            const tokenValue = token ? token.split('=')[1] : '';
            const response = await axios.post(`${apiUrl}/api/internal/create-agency-subaccount`,
                newSubAccountData,
                {
                    headers: {
                        Authorization: `Bearer ${tokenValue}`
                    }
                })
            if (response?.data?.success) {
                setformSubmissionLoading(false);
                setOpenCreateSubAccModal(false);
                setFormSubmitError('');
                fetchSubAccountList();
                setNewSubAccountData(emptySubAccountData);
            }

        } catch (error) {
            setformSubmissionLoading(false);
            if (isAxiosError(error)) {

                if (error.isAxiosError && error.response && error.response.data) {
                    setFormSubmitError(error.message);
                } else {
                    setFormSubmitError('An error occurred. Please try again later.');
                }
            }
        }
    }

    //handle create-sub-acc input change
    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
        const { name, value } = e.target;
        setNewSubAccountData((prevData) => (
            {
                ...prevData,
                [name]: value
            }
        ))
    }

    const handleCloseModalButton = () => {
        setOpenCreateSubAccModal(false);
        setNewSubAccountData(emptySubAccountData);
    }

    return (
        <div>
            <div className='flex flex-col w-full max-h-3/4 overflow-y-auto rounded-md bg-white items-center justify-start gap-5 p-2 custom-scrollbar'>
                {/* Button to close the modal */}
                <div className='p-1 flex items-center justify-between w-full' >
                    <div className='w-10 p-2 shadow-md rounded-full'><UserIcon /></div>
                    <button
                        className='w-6'
                        onClick={handleCloseModalButton}
                        type="reset"
                    >
                        <CrossIcon />
                    </button>
                </div>
                <div className='w-full px-2 font-semibold'>Sub-Account Management</div>
                {/* create-sub-acc form */}
                <div className='w-full'>
                    <form className="p-2 bg-white rounded flex flex-col gap-3" onSubmit={handleFormSubmit}>
                        {/* user information */}
                        <div className='border p-4 rounded-md shadow gap-3 flex flex-col'>
                            <div className={`flex items-start justify-between gap-2`}>
                                <div className='flex flex-col items-start justify-between gap-1'>
                                    <label htmlFor="" className='text-xs' >First Name</label>
                                    <input
                                        type="text"
                                        className={inputFieldStyle}
                                        name='firstName'
                                        value={newSubAccountData.firstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col items-start justify-between gap-1'>
                                    <label htmlFor="" className='text-xs' >Last Name</label>
                                    <input
                                        type="text"
                                        className={inputFieldStyle}
                                        name='lastName'
                                        value={newSubAccountData.lastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col items-start justify-between gap-1'>
                                <label htmlFor="" className='text-xs'>Business Name</label>
                                <input
                                    type="text"
                                    name='businessName'
                                    className={inputFieldStyle}
                                    value={newSubAccountData.businessName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className='flex flex-col items-start justify-between gap-1'>
                                <label htmlFor="" className='text-xs'>Address</label>
                                <input
                                    type="Address"
                                    name='address'
                                    className={inputFieldStyle}
                                    value={newSubAccountData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className='flex flex-col items-start justify-between gap-1'>
                                <label htmlFor="" className='text-xs'>Email</label>
                                <input
                                    type="email"
                                    name='email'
                                    className={inputFieldStyle}
                                    value={newSubAccountData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        {/* form buttons */}
                        <div className='flex items-center justify-end gap-3 '>
                            <button type='reset' onClick={handleCloseModalButton} className='rounded-md text-xs border shadow bg-white-700 p-2 px-4'>
                                Cancel
                            </button>
                            <button type='submit' className='rounded-md text-xs text-white bg-blue-700 p-2 px-4 flex w-20 items-center justify-center '>
                                {formSubmissionLoading ? <SmallLoader /> : 'Create'}
                            </button>
                        </div>
                        <div className={`text-xs text-red-500 ${formSubmitError === '' ? 'hidden' : ''}`}>Error creating sub-account: {formSubmitError}</div>
                    </form >
                </div>
            </div >
        </div>
    )
}
const inputFieldStyle = "border rounded-md outline-none py-2 text-gray-500 px-2 shadow text-xs w-full";

export default CreateSubAccount