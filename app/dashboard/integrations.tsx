import { AlohaaLogo, RazorpayLogo } from '@/svg'
import React from 'react'

type Props = {
  setSidebarOption: React.Dispatch<React.SetStateAction<string>>
}

const Integrations: React.FC<Props> = ({setSidebarOption}) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='text-md w-full font-semibold text-gray-700'>Integrations</div>
      <div className='flex gap-2'>
        <div className='w-60 h-60 shadow hover:shadow-md rounded-md bg-white flex items-center justify-center cursor-pointer'
        onClick={()=>{setSidebarOption('manage-alohaa')}}
        >
          <div><AlohaaLogo /></div>
        </div>
        <div className='w-60 h-60 shadow hover:shadow-md rounded-md bg-white flex items-center justify-center cursor-pointer' 
        onClick={()=>{setSidebarOption('manage-razorpay')}}
        >
          <div><RazorpayLogo /></div>
        </div>
      </div>
    </div>
  )
}

export default Integrations;