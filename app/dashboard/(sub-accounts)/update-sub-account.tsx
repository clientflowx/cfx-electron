"use client"
import React, { useState } from "react"
import { subAccountDataType, updatedSubAccountDataType } from "../types"
import { CrossIcon, UserIcon } from "@/svg"
import { apiUrl } from "@/config"
import { Country } from 'country-state-city';
import axios, { isAxiosError } from "axios"

type Props = {
  fetchSubAccountList: () => void,
  setOpenUpdateSubAccModal: React.Dispatch<React.SetStateAction<boolean>>,
  subAccountData: subAccountDataType
}

const UpdateSubAccount: React.FC<Props> = ({ fetchSubAccountList, setOpenUpdateSubAccModal, subAccountData }) => {

  const InitialUpdatedSubAccData: updatedSubAccountDataType = {
    firstName: subAccountData.firstName,
    lastName: subAccountData.lastName,
    email: subAccountData.email,
    phone: subAccountData.phone,
    businessName: subAccountData.name,
    // timezone: subAccountData.timezone,
    address: subAccountData.address,
    city: subAccountData.city,
    country: subAccountData.country,
    state: subAccountData.state,
    postalCode: subAccountData.postalCode,
    website: subAccountData.website,
    social: subAccountData.social,
    settings: subAccountData.settings
  }

  //get all the country list
  const country = Country.getAllCountries()
  const namesAndIsoCodes = country.map(country => ({ name: country.name, isoCode: country.isoCode }));

  //state variables
  const [formSubmitError, setFormSubmitError] = useState<string>('');
  const [formSubmissionLoading, setformSubmissionLoading] = useState<boolean>(false);
  const [updatedSubAccount, setUpdatedSubAccount] = useState<updatedSubAccountDataType>(InitialUpdatedSubAccData);
  console.log(updatedSubAccount);
  

  //handle form submit
  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> | undefined = async (e) => {
    e.preventDefault();
    try {
      setformSubmissionLoading(true);
      const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
      const tokenValue = token ? token.split('=')[1] : '';
      const response = await axios.post(`${apiUrl}/api/internal/update-agency-subaccount/${subAccountData.id}`,
        updatedSubAccount,
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`
          }
        })
      if (response?.data?.success) {
        setformSubmissionLoading(false);
        setOpenUpdateSubAccModal(false);
        setFormSubmitError('');
        fetchSubAccountList();
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

  //handle form input change
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setUpdatedSubAccount(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCountryChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { name, value } = e.target;
    setUpdatedSubAccount(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const inputFieldStyle = "border rounded-md outline-none py-2 text-gray-500 px-2 shadow-sm text-xs w-full"; //styles for input field
  const selectFieldStyle = "border text-xs p-2 shadow-sm rounded-md outline-none w-full";

  const handleUpdateSubAccModal = () => {
    setOpenUpdateSubAccModal(false);
  }

  return (
    <div className="w-4/5 overflow-y-auto custom-scrollbar">
      <div>
        <div className='flex flex-col w-full  rounded-md bg-white gap-5 p-2 custom-scrollbar '>
          {/* Button to close the modal */}
          <div className='p-1 flex items-center justify-between w-full' >
            <button
              type="reset"
              className='w-6'
              onClick={handleUpdateSubAccModal}
            >
              <CrossIcon />
            </button>
          </div>
          <div className='w-full px-2 font-semibold'>Update Sub-Account</div>
          <div className='w-full'>
            <form className="p-2 bg-white rounded flex flex-col gap-3" onSubmit={handleFormSubmit}>
              {/* Account Info */}
              <div className="font-semibold text-xs px-4">Account Info</div>
              <div className=' p-4 rounded-md shadow gap-3 flex flex-col'>
                <div className='flex flex-col items-start justify-between gap-1'>
                  <label htmlFor="" className='text-xs font-medium'>First Name *</label>
                  <input
                    type="text"
                    name='firstName'
                    className={inputFieldStyle}
                    value={updatedSubAccount.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='flex flex-col items-start justify-between gap-1'>
                  <label htmlFor="" className='text-xs font-medium'>Last Name *</label>
                  <input
                    type="test"
                    name='lastName'
                    className={inputFieldStyle}
                    value={updatedSubAccount.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='flex flex-col items-start justify-between gap-1'>
                  <label htmlFor="" className='text-xs font-medium'>Email Address *</label>
                  <input
                    type="email"
                    name='email'
                    className={inputFieldStyle}
                    value={updatedSubAccount.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* General Info */}
              <div className="font-semibold text-xs px-4">General Info</div>
              <div className='p-4 rounded-md shadow gap-3 flex flex-col'>
                <div className='flex flex-col items-start justify-between gap-1'>
                  <label htmlFor="" className='text-xs font-medium'>Business Name *</label>
                  <input
                    type="text"
                    name='businessName'
                    className={inputFieldStyle}
                    value={updatedSubAccount.businessName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='flex flex-col items-start justify-between gap-1'>
                  <label htmlFor="" className='text-xs font-medium'>Street Address *</label>
                  <input
                    type="text"
                    name='address'
                    className={inputFieldStyle}
                    value={updatedSubAccount.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='flex flex-col items-start justify-between gap-1'>
                  <label htmlFor="" className='text-xs font-medium'>City *</label>
                  <input
                    type="text"
                    name='city'
                    className={inputFieldStyle}
                    value={updatedSubAccount.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='flex flex-col items-start justify-between gap-1'>
                  <label htmlFor="" className='text-xs font-medium'>Country *</label>
                  <select
                    name="country"
                    className={selectFieldStyle}
                    value={updatedSubAccount.country}
                    onChange={handleCountryChange}
                    required
                  >
                    <option value="">Select Country</option>
                    {namesAndIsoCodes.map((country, index) => (
                      <option key={index} value={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* <div className='flex flex-col items-start justify-between gap-1'>
                  <label htmlFor="" className='text-xs font-medium'>Business Niche</label>
                  <input
                    type="text"
                    name='businessNiche'
                    className={inputFieldStyle}
                    // value={newSubAccountData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div> */}
                <div className='flex flex-col items-start justify-between gap-1'>
                  <label htmlFor="" className='text-xs font-medium'>State/Prov/Region *</label>
                  <input
                    type="text"
                    name='state'
                    className={inputFieldStyle}
                    value={updatedSubAccount.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='flex flex-col items-start justify-between gap-1'>
                  <label htmlFor="" className='text-xs font-medium'>Zip/Postal Code *</label>
                  <input
                    type="text"
                    name='postalCode'
                    className={inputFieldStyle}
                    value={updatedSubAccount.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='flex flex-col items-start justify-between gap-1'>
                  <label htmlFor="" className='text-xs font-medium'>Phone number *</label>
                  <input
                    type="text"
                    name='phone'
                    className={inputFieldStyle}
                    value={updatedSubAccount.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='flex flex-col items-start justify-between gap-1'>
                  <label htmlFor="" className='text-xs font-medium'>Website</label>
                  <input
                    type="text"
                    name='website'
                    className={inputFieldStyle}
                    value={updatedSubAccount.website}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* <div className='flex flex-col items-start justify-between gap-1'>
                  <label htmlFor="" className='text-xs font-medium'>Time Zone *</label>
                  <input
                    type="text"
                    name='timezone'
                    className={inputFieldStyle}
                    value={updatedSubAccount.timezone}
                    onChange={handleInputChange}
                    required
                  />
                </div> */}
              </div>
              {/* form buttons */}
              <div className='flex items-center justify-end gap-3 '>
                <button type='reset' onClick={handleUpdateSubAccModal} className='rounded-md text-xs border shadow bg-white-700 p-2 px-4'>
                  Cancel
                </button>
                <button type='submit' className='rounded-md text-xs text-white bg-blue-700 p-2 px-4 flex w-20 items-center justify-center '>
                  {formSubmissionLoading ?
                    <svg aria-hidden="true" role="status" className="inline w-6 h-6 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg> : 'Update'}
                </button>
              </div>
              <div className={`text-xs text-red-500 ${formSubmitError === '' ? 'hidden' : ''}`}>Error creating sub-account: {formSubmitError}</div>
            </form >
          </div>
        </div >
      </div>
    </div>
  )
}

export default UpdateSubAccount