"use client"
import React, { useEffect, useRef, useState } from 'react'
import SubAccount from './sub-account'
import axios from 'axios'
import { subAccountDataType } from '../types'
import { IoSearch } from 'react-icons/io5'
import CreateSubAccIcon from '@/svg/CreateSubAccIcon'
import SubAccFeedback from '@/svg/SubAccFeedback'
import Loader from '@/components/Loader'
import { DateRangePicker } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from '@/svg'
import RightArrow from '@/svg/RightArrow'
import CreateSubAccount from './create-sub-account'
import { apiUrl } from '@/config'

const ManageSubAccounts = () => {
  const [subAccountsData, setSubAccountsData] = useState<subAccountDataType[]>([]);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showDateSelector, setShowDateSelector] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });
  const [openCreateSubAccModal, setOpenCreateSubAccModal] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("Fetching the list")



  const filteredSubAccountData = subAccountsData.filter((data: subAccountDataType) => {
    const nameMatch: boolean = nameFilter === '' || data?.name?.toLowerCase().includes(nameFilter.toLowerCase());
    return nameMatch;
  });

  //fetch all sub-account details on initial render
  useEffect(() => {
    const fetchSubAccountDetails = async () => {
      setLoading(true);
      try {
        const token = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('token='));
        const tokenValue = token ? token.split('=')[1] : '';
        const response = await axios.get(`${apiUrl}/api/internal/get-agency-subaccounts?isDetail=true`, {
          headers: {
            Authorization: `Bearer ${tokenValue}`
          }
        });
        setSubAccountsData(response?.data?.data || []);
      } catch (error) {
        console.error('Error fetching sub account details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubAccountDetails();
  }, []);


  //function to fetch the sub-account-list
  const fetchSubAccountList = async () => {
    setLoading(true);
    try {
      setLoadingMessage("Updating the list")
      const token = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('token='));
      const tokenValue = token ? token.split('=')[1] : '';
      const response = await axios.get(`${apiUrl}/api/internal/get-agency-subaccounts?isDetail=true`, {
        headers: {
          Authorization: `Bearer ${tokenValue}`
        }
      });
      setSubAccountsData(response?.data?.data || []);
    } catch (error) {
      console.error('Error fetching sub account details:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleNameFilter: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setNameFilter(value);
  };

  const handleDateSelector = () => {
    setShowDateSelector(!showDateSelector);
  };

  const handleDateChange = (ranges: any) => {
    setDateRange(ranges.selection);
  };

  const handleCreateSubAccModal = () => {
    setOpenCreateSubAccModal(prev => !prev);
  }

  return (
    <div className='flex flex-col w-full justify-between gap-4'>

      {/* Top-button-group */}
      <div className='flex w-full items-start justify-between'>
        <div className='text-md w-full font-semibold text-gray-700'>Sub-Accounts</div>
        <div className='flex items-center justify-end gap-1 w-full'>
          <button className='flex gap-1 items-center text-xs font-semibold rounded-md shadow-sm border p-2 bg-white text-gray-600'>
            <div className='w-3 h-3'><SubAccFeedback /></div>
            <div>Submit Feedback</div>
          </button>
          <button className='text-xs font-semibold rounded-md shadow-sm border p-2 bg-white text-gray-600'>View Scheduled Reports</button>
          <button onClick={handleCreateSubAccModal} className='text-xs gap-1 text-white font-semibold rounded-md shadow-sm border p-2 bg-blue-600 flex items-center'>
            <div className='w-3 h-3'><CreateSubAccIcon /></div>
            <div>Create Sub-Account</div>
          </button>
        </div>
      </div>

      {/* Calendar to pick a date range */}
      <div className='w-full flex items-center justify-between'>
        <div className="relative">
          <div className="cursor-pointer flex items-center justify-start gap-2 shadow-sm border rounded-md bg-white p-2" onClick={handleDateSelector}>
            <div className='text-sm font-semibold'>
              {JSON.stringify(dateRange.startDate.getFullYear())}-{JSON.stringify(dateRange.startDate.getMonth())}-
              {JSON.stringify(dateRange.startDate.getDate())}
            </div>
            <div className='w-3 h-3 opacity-50'>
              <RightArrow />
            </div>
            <div className='text-sm font-semibold'>
              {JSON.stringify(dateRange.endDate.getFullYear())}-{JSON.stringify(dateRange.endDate.getMonth())}-
              {JSON.stringify(dateRange.endDate.getDate())}
            </div>
            <div className=' w-5 h-5 opacity-50 mx-2 hover:opacity-75 transition-all'>
              <Calendar />
            </div>
          </div>
          {showDateSelector && (
            <DateRangePicker
              ranges={[dateRange]}
              onChange={handleDateChange}
              className='absolute shadow-sm border'
              months={1}
              direction='horizontal'
            />
          )}
        </div>
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
            <div className="text-xs font-medium">{loadingMessage}</div>
          </div> : filteredSubAccountData.map((data, index) => (
            <div key={index} className='w-full'>
              <SubAccount subAccountData={data} fetchSubAccountList={fetchSubAccountList} />
            </div>
          ))
        }

        {openCreateSubAccModal ? (
          <div className="fixed top-0 p-5 left-0 z-40 w-full bg-gray-200 h-full bg-opacity-50  rounded-md flex items-center justify-center">
            <CreateSubAccount
              setOpenCreateSubAccModal={setOpenCreateSubAccModal}
              fetchSubAccountList={fetchSubAccountList}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}


export default ManageSubAccounts