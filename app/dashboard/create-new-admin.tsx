"use client"
import { CrossIcon, UserIcon } from '@/svg';
import React, { useState } from 'react'
import { AdminUser } from './types';
import axios, { isAxiosError } from 'axios';

type Props = {
  setOpenAddAdminModal: React.Dispatch<React.SetStateAction<boolean>>;
  fetchAdminList: () => void;
}

const handleSubmit = () => {

}
const NewAdminModal: React.FC<Props> = ({ setOpenAddAdminModal, fetchAdminList }) => {
  const roles = [
    { key: "admin", title: "Admin" },
    { key: "super-admin", title: "Super Admin" },
    { key: "owner", title: "Owner" }
  ];
  const [formSubmitError, setFormSubmitError] = useState<string>('');
  const [formSubmissionLoading, setformSubmissionLoading] = useState<boolean>(false);
  const [adminData, setAdminData] = useState<AdminUser>({ name: '', email: '', role: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminData((prevData: AdminUser) => ({
      ...prevData,
      [name]: value
    }))
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setformSubmissionLoading(true);
      const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
      const tokenValue = token ? token.split('=')[1] : '';
      const response = await axios.
        post('https://cfx-mono-production-5ec7.up.railway.app/api/internal/create-admin-user',
          adminData,
          {
            headers: {
              Authorization: `Bearer ${tokenValue}`
            }
          });

      if (response.data.success) {
        setformSubmissionLoading(false);
        setOpenAddAdminModal(false);
        setFormSubmitError('');
        console.log(response);
        fetchAdminList();
        setAdminData({ name: '', email: '', role: '' });
      }

    } catch (error) {
      setformSubmissionLoading(false);
      if (isAxiosError(error)) {

        if (error.isAxiosError && error.response && error.response.data) {
          setFormSubmitError(error.message);
          console.log(error);
        } else {
          setFormSubmitError('An error occurred. Please try again later.');
        }
      }

    }
  }

  return (
    <div>
      <div className='flex flex-col w-full max-h-3/4 overflow-y-auto rounded-md bg-white items-center justify-start gap-5 p-2 custom-scrollbar'>
        {/* Button to close the modal */}
        <div className='p-1 flex items-center justify-between w-full' >
          <div className='w-10 p-2 shadow-md rounded-full'><UserIcon /></div>
          <button
            className='w-6'
            onClick={() => { setOpenAddAdminModal(false); setAdminData({ name: '', email: '', role: '' }) }}
          >
            <CrossIcon />
          </button>
        </div>
        <div className='w-full px-2 font-semibold'>Admin Management</div>
        <div className='w-full'>
          <form className="p-2 bg-white rounded flex flex-col gap-3" onSubmit={handleFormSubmit}>
            {/* user information */}
            <div className='border p-4 rounded-md shadow gap-3 flex flex-col'>
              <div className={`flex items-start justify-between gap-2`}>
                <div className='flex flex-col items-start justify-between gap-1'>
                  <label htmlFor="" className='text-xs' >Full Name</label>
                  <input
                    type="text"
                    className={inputFieldStyle}
                    name='name'
                    value={adminData.name}
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
                    value={adminData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className='flex flex-col w-full items-start justify-between gap-1'>
                <label htmlFor="role" className='text-xs py-1'>Role</label>
                <div className='flex items-center justify-start gap-2 w-full'>
                  {roles.map(({ key, title }, index) => (
                    <label key={index} className='text-xs font-medium'>
                      <input
                        type="radio"
                        name="role"
                        value={key}
                        className='mr-1'
                        onChange={handleInputChange}
                        required
                      />
                      {title}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {/* form buttons */}
            <div className='flex items-center justify-end gap-3 '>
              <button type='reset' onClick={() => { setOpenAddAdminModal(false); setAdminData({ name: '', email: '', role: '' }) }} className='rounded-md text-xs border shadow bg-white-700 p-2 px-4'>
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
            <div className={`text-xs text-red-500 ${formSubmitError === '' ? 'hidden' : ''}`}>Error adding admin: {formSubmitError}</div>
          </form >
        </div>
      </div >
    </div>
  )
}

const inputFieldStyle = "border rounded-md outline-none py-2 text-gray-500 px-2 shadow text-xs w-full";
const selectFieldStyle = "border text-xs p-2 shadow-sm rounded-md outline-none w-full";
export default NewAdminModal