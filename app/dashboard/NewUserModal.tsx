import React, { useState } from 'react';
import { CrossIcon, UpIcon, DownIcon, LockIcon } from '@/svg/index.ts';

type Props = {
    setNewUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewUserModal: React.FC<Props> = ({ setNewUserModal }) => {
    const [userInfoAccordion, setUserInfoAccordion] = useState(true);
    const [userPermissionAcc, setUserPermissionAcc] = useState(false);
    const [userRolesAcc, setUserRolesAcc] = useState(false);
    return (
        <div className='flex flex-col w-1/2 rounded-md bg-white items-center justify-between gap-2 p-2'>
            {/* Button to close the modal */}
            <div className='p-1 cursor-pointer flex items-center justify-end w-full' onClick={() => setNewUserModal(prevValue => !prevValue)}>
                <button className='w-6'><CrossIcon /></button>
            </div>
            <div className='w-full px-2 font-semibold'>Team Management</div>
            <div className='w-full'>
                <form className="p-2 bg-white rounded  ">
                    <div className='border p-4 rounded-md shadow'>
                        <div className='flex items-center justify-start py-5 gap-1 w-full'>
                            <div className='w-5 cursor-pointer' onClick={() => setUserInfoAccordion(prev => !prev)}>{userInfoAccordion ? <DownIcon /> : <UpIcon />}</div>
                            <div className='text-sm'>User Info</div>
                        </div>
                        <div className={`${userInfoAccordion ? '' : 'hidden'} flex flex-col items-start justify-between gap-3`}>
                            <div className='flex'>
                                <div>
                                    <label htmlFor="" className='text-xs'>First Name</label>
                                    <input type="text" className='border rounded-md outline-none py-1 px-2 shadow' />
                                </div>
                                <div>
                                    <label htmlFor="" className='text-xs'>Last Name</label>
                                    <input type="text" className='border rounded-md outline-none py-1 px-2 text-gray-700 shadow' />
                                </div>
                            </div>
                            <div className='flex flex-shrink gap-2'>
                                <div className='w-1/3'>
                                    <label htmlFor="" className='text-xs'>Email</label>
                                    <input type="text" className='border rounded-md outline-none py-1 px-2 w-full shadow' />
                                </div>
                                <div className='w-1/3'>
                                    <label htmlFor="" className='text-xs'>Phone</label>
                                    <input type="text" className='border rounded-md outline-none py-1 px-2 text-gray-700 shadow w-full' />
                                </div>
                                <div className='w-1/3'>
                                    <label htmlFor="" className='text-xs'>Extensions</label>
                                    <input type="text" className='border rounded-md outline-none py-1 px-2 text-gray-700 shadow w-full' />
                                </div>
                            </div>
                            <div></div>
                            <div>
                                <button className='rounded-md text-xs text-white bg-blue-700 p-2 flex items-center justify-between gap-2'>
                                    <div className='w-4'><LockIcon /></div>
                                    Forgot Password
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='border p-4 rounded-md shadow'>
                        <div className='flex items-center justify-start py-5 gap-1 w-full'>
                            <div className='w-5 cursor-pointer' onClick={() => setUserInfoAccordion(prev => !prev)}>{userInfoAccordion ? <DownIcon /> : <UpIcon />}</div>
                            <div className='text-sm'>User Info</div>
                        </div>
                        <div className={`${userInfoAccordion ? '' : 'hidden'} flex flex-col items-start justify-between gap-3`}>
                            <div className='flex'>
                                <div>
                                    <label htmlFor="" className='text-xs'>First Name</label>
                                    <input type="text" className='border rounded-md outline-none py-1 px-2 shadow' />
                                </div>
                                <div>
                                    <label htmlFor="" className='text-xs'>Last Name</label>
                                    <input type="text" className='border rounded-md outline-none py-1 px-2 text-gray-700 shadow' />
                                </div>
                            </div>
                            <div className='flex flex-shrink gap-2'>
                                <div className='w-1/3'>
                                    <label htmlFor="" className='text-xs'>Email</label>
                                    <input type="text" className='border rounded-md outline-none py-1 px-2 w-full shadow' />
                                </div>
                                <div className='w-1/3'>
                                    <label htmlFor="" className='text-xs'>Phone</label>
                                    <input type="text" className='border rounded-md outline-none py-1 px-2 text-gray-700 shadow w-full' />
                                </div>
                                <div className='w-1/3'>
                                    <label htmlFor="" className='text-xs'>Extensions</label>
                                    <input type="text" className='border rounded-md outline-none py-1 px-2 text-gray-700 shadow w-full' />
                                </div>
                            </div>
                            <div></div>
                            <div>
                                <button className='rounded-md text-xs text-white bg-blue-700 p-2 flex items-center justify-between gap-2'>
                                    <div className='w-4'><LockIcon /></div>
                                    Forgot Password
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewUserModal;
