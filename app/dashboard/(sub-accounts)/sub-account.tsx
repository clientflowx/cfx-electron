"use client"
import React, { useState } from 'react'
import { subAccountDataType } from '../types'
import SubAccCall from '@/svg/Sub-acc-call'
import SubAccLocation from '@/svg/Sub-acc-location'
import ThreeDots from '@/svg/ThreeDots'
import UpdateSubAccount from './update-sub-account'

type Props = {
  subAccountData: subAccountDataType,
  fetchSubAccountList: () => void
}

const SubAccount: React.FC<Props> = ({ subAccountData, fetchSubAccountList }) => {

  // destructuring the sub-acc-data
  const { name, firstName, lastName, email, address, city, state, country, phone } = subAccountData;

  const [openOptionMenu, setOpenOptionMenu] = useState<boolean>(false);
  const [openUpdateSubAccModal, setOpenUpdateSubAccModal] = useState<boolean>(false);

  const handleOptionButtonClick = () => {
    setOpenOptionMenu(prev => !prev);
  }

  const handleManageClientButton = () => {
    setOpenUpdateSubAccModal(prev => !prev);
  }

  return (
    <div className='shadow-sm rounded-md border bg-white w-full'>
      <div className='flex p-4'>
        <div className='w-1/2 flex flex-col gap-4'>
          <div className='flex items-center justify-start gap-5'>
            <div className='w-10 h-10 rounded-full bg-gray-300'></div>
            <div>
              <div className='font-semibold text-md text-gray-600'>{name}</div>
            </div>
            <div className='rounded-full border border-blue-600 font-semibold text-xs text-blue-600 bg-blue-50 px-1'>Closed (Won)</div>
          </div>
          <div className='flex flex-col'>
            <div className='font-semibold text-sm text-gray-600'>{firstName} {lastName}</div>
            <div className=' text-xs text-gray-500'>{email}</div>
          </div>
          <div>
            <div className={`${subAccountData.address === "" ? "hidden" : ""} flex items-center justify-start gap-1`}>
              <div className='w-3 h-3'><SubAccLocation /></div>
              <div className={`text-xs font-semibold text-gray-500`}>{address} {city} {state} {country}</div>
            </div>
            <div className={`${'phone' in subAccountData ? "" : "hidden"} flex items-center justify-start gap-1`}>
              <div className='w-3 h-3'><SubAccCall /></div>
              <div className='text-xs font-semibold text-gray-500'>{phone}</div>
            </div>
          </div>
        </div>
      </div>

      <div className='border-t flex items-center justify-end w-full'>
        <div className='relative' onClick={handleOptionButtonClick}>
          <button className='h-full border-l p-4'>
            <div className='opacity-65'><ThreeDots /></div>
          </button>
          <button className={`${openOptionMenu ? "block" : "hidden"} absolute bg-white shadow-sm border rounded-md p-2 text-xs right-0 whitespace-nowrap font-medium`}
            onClick={handleManageClientButton}>
            Manage Client
          </button>
        </div>
      </div>

      {
        openUpdateSubAccModal ? (
          <div className="fixed top-0 pl-20 p-5 left-0 z-40 bg-white h-full w-full rounded-md flex" >
            <UpdateSubAccount
              fetchSubAccountList={fetchSubAccountList}
              setOpenUpdateSubAccModal={setOpenUpdateSubAccModal}
              subAccountData={subAccountData}
            />
          </div>
        ) : (
          ""
        )}
    </div >
  )
}

export default SubAccount
