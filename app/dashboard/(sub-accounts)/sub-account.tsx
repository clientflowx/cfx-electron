"use client"
import React from 'react'
import { subAccountDataType } from '../types'

type Props = {
  subAccountData: subAccountDataType,
}

const SubAccount: React.FC<Props> = ({ subAccountData }) => {
  console.log("from the subaccount:", subAccountData);
  return (
    <div className='shadow-sm rounded-md p-4 border'>
      <div className='flex'>
        <div className='w-1/2 flex flex-col gap-4'>
          <div className='flex items-start justify-start gap-5'>
            <div className='w-10 h-10 rounded-full bg-white'></div>
            <div>
              <div className='font-semibold text-md text-gray-600'>{subAccountData.name}</div>
              <div className=' text-xs text-gray-500'>{subAccountData.email}</div>
            </div>
            <div className='rounded-full border border-blue-600 font-semibold text-xs text-blue-600 bg-blue-50 p-1'>Closed ()won</div>
          </div>
          <div>
            <div className='text-xs font-semibold text-gray-500'>{subAccountData.address} {subAccountData.city} {subAccountData.state} {subAccountData.country}</div>
            <div className='text-xs font-semibold text-gray-500'>{subAccountData.phone}</div>
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
