"use client"
import React, { useEffect, useState } from 'react'
import SubAccount from './sub-account'
import axios from 'axios'
import { subAccountDataType } from '../types'

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

  useEffect(() => {

    try {
      const fetchSubAccountDetails = async () => {
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
        setSubAccountsData(response?.data?.subAccountsData || [])
      }
      fetchSubAccountDetails();

    } catch (error) {
      console.log(error);
    }
  }, [])


  return (
    <div>
      <div className='text-md w-full font-semibold text-gray-700'>Sub-Accounts</div>
      <div className='flex flex-col items-start justify-between gap-3'>
        {
          subAccountsData.map((data, index) => (
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