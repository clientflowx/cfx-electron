"use client"
import React, { useEffect, useState } from 'react'
import SubAccount from './sub-account'
import axios from 'axios'
import { subAccountDataType } from '../types'
import { IoSearch } from 'react-icons/io5'
import CreateSubAccIcon from '@/svg/CreateSubAccIcon'
import SubAccFeedback from '@/svg/SubAccFeedback'
import Loader from '@/components/Loader'

const initialSubAccountData: subAccountDataType[] = [{
  id: "",
  name: "",
  address: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
  timezone: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  business: {
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    timezone: ""
  },
  social: {
    facebookUrl: "",
    googlePlus: "",
    linkedIn: "",
    foursquare: "",
    twitter: "",
    yelp: "",
    instagram: "",
    youtube: "",
    pinterest: "",
    blogRss: "",
    googlePlaceId: ""
  },
  settings: {
    allowDuplicateContact: false,
    allowDuplicateOpportunity: false,
    allowFacebookNameMerge: false,
    disableContactTimezone: false
  }
}]

const ManageSubAccounts = () => {
  const [subAccountsData, setSubAccountsData] = useState<subAccountDataType[]>([]);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [loading, setLoading] = useState(false); // New state to track loading

  const filteredSubAccountData = subAccountsData.filter((data: subAccountDataType) => {
    const nameMatch: boolean = nameFilter === "" || data?.name?.toLowerCase().includes(nameFilter.toLowerCase());
    return nameMatch;
  });

  useEffect(() => {
    try {
      const fetchSubAccountDetails = async () => {
        setLoading(true);
        const token = document.cookie
          .split(";")
          .find((cookie) => cookie.trim().startsWith("token="));
        const tokenValue = token ? token.split("=")[1] : "";
        const response = await axios.get("https://cfx-mono-production-5ec7.up.railway.app/api/internal/get-agency-subaccounts?isDetail=true",
          {
            headers: {
              Authorization: `Bearer ${tokenValue}`,
            },
          })

        console.log("resposnse from api: ", response?.data?.data);
        setLoading(false);
        setSubAccountsData(response?.data?.data || [])
      }
      fetchSubAccountDetails();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [])

  const handleNameFilter: React.ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
    const { name, value } = e.target;
    setNameFilter(value);
  }

  return (
    <div className='flex flex-col w-full justify-between gap-4'>
      <div className='flex w-full items-start justify-between'>
        <div className='text-md w-full font-semibold text-gray-700'>Sub-Accounts</div>
        <div className='flex items-center justify-end gap-1 w-full'>
          <button className='flex gap-1 items-center text-xs font-semibold rounded-md shadow-sm border p-2 bg-white text-gray-600'>
            <div className='w-3 h-3'><SubAccFeedback /></div>
            <div>Submit Feedback</div>
          </button>
          <button className='text-xs font-semibold rounded-md shadow-sm border p-2 bg-white text-gray-600'>View Scheduled Reports</button>
          <button className='text-xs gap-1 text-white font-semibold rounded-md shadow-sm border p-2 bg-blue-600 flex items-center'>
            <div className='w-3 h-3'><CreateSubAccIcon /></div>
            <div>Create Sub-Account</div>
          </button>
        </div>
      </div>

      {/* sub accounts filter */}
      <div className='w-full flex items-center justify-between'>
        <div></div>
        <div className='flex items-center justify-between'>
          <div className="flex items-center justify-between p-2 bg-white border border-1 outline-none rounded-md gap-1">
            <div className="opacity-30 h-full">
              <IoSearch />
            </div>
            <input
              type="text"
              className=" text-xs font-semibold text-gray-500 bg-white outline-none"
              placeholder="Search by sub-account"
              name='name'
              onChange={handleNameFilter}
              value={nameFilter}
            />
          </div>
        </div>
      </div>

      {/* Sub accounts listing */}
      <div className='flex flex-col items-center justify-center gap-3'>
        {
          loading ? <div className="flex flex-col gap-2 items-center justify-center my-40">
            <Loader />
            <div className="text-xs font-medium">Fetching the list</div>
          </div> : filteredSubAccountData.map((data, index) => (
            <div key={index} className='w-full'>
              <SubAccount subAccountData={data} />
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default ManageSubAccounts