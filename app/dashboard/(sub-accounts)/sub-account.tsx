"use client"
import React from 'react'
import { subAccountDataType } from '../types'
import { Alohaa } from '@/svg'
import SubAccCall from '@/svg/Sub-acc-call'
import SubAccLocation from '@/svg/Sub-acc-location'

type Props = {
  subAccountData: subAccountDataType,
}

const SubAccount: React.FC<Props> = ({ subAccountData }) => {
  // console.log("from the subaccount:", subAccountData);
  return (
    <div className='shadow-sm rounded-md p-4 border bg-white'>
      <div className='flex'>
        <div className='w-1/2 flex flex-col gap-4'>
          <div className='flex items-center justify-start gap-5'>
            <div className='w-10 h-10 rounded-full bg-gray-300'></div>
            <div>
              <div className='font-semibold text-md text-gray-600'>{subAccountData.name}</div>
              {/* <div className=' text-xs text-gray-500'>{subAccountData.email}</div> */}
            </div>
            <div className='rounded-full border border-blue-600 font-semibold text-xs text-blue-600 bg-blue-50 px-1'>Closed (Won)</div>
          </div>
          <div className='flex flex-col'>
            <div className='font-semibold text-sm text-gray-600'>{subAccountData.firstName} {subAccountData.lastName}</div>
            <div className=' text-xs text-gray-500'>{subAccountData.email}</div>
          </div>
          <div>
            <div className={`${subAccountData.address === "" ? "hidden" : ""} flex items-center justify-start gap-1`}>
              <div className='w-3 h-3'><SubAccLocation /></div>
              <div className={`text-xs font-semibold text-gray-500`}>{subAccountData.address} {subAccountData.city} {subAccountData.state} {subAccountData.country}</div>
            </div>
            <div className={`${'phone' in subAccountData ? "" : "hidden"} flex items-center justify-start gap-1`}>
              <div className='w-3 h-3'><SubAccCall /></div>
              <div className='text-xs font-semibold text-gray-500'>{subAccountData.phone}</div>
            </div>
          </div>
        </div>
        <div className='flex items-start justify-start flex-wrap gap-5'>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default SubAccount
