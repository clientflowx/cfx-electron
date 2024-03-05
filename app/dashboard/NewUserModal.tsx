import React, { useState } from 'react';
import { CrossIcon, UpIcon, DownIcon } from '@/svg/index.ts';

type Props = {
    setNewUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewUserModal: React.FC<Props> = ({ setNewUserModal }) => {
    const [userInfoAccordion, setUserInfoAccordion] = useState(true);
    return (
        <div className='flex flex-col w-1/2 rounded-md bg-white items-end justify-between'>
            <div className='p-1 cursor-pointer' onClick={() => setNewUserModal(prevValue => !prevValue)}>
                <button className='w-6'><CrossIcon /></button>
            </div>
            <div className=''>Team Management</div>
            <div className='w-full'>
                <form className="px-3 bg-white rounded  ">
                    <div>
                        <div className='flex items-center justify-start gap-1 w-full'>
                            <div className='w-5 cursor-pointer' onClick={() => setUserInfoAccordion(prev => !prev)}>{userInfoAccordion ? <DownIcon /> : <UpIcon />}</div>
                            <div>User Info</div>
                        </div>
                        <div className={`${userInfoAccordion ? '' : 'hidden'} w-full`}>
                            <div className='flex gap-2'>
                                <div>
                                    <label htmlFor="">First Name</label>
                                    <input type="text" className='border rounded-md outline-none p-1' />
                                </div>
                                <div>
                                    <label htmlFor="">Last Name</label>
                                    <input type="text" className='border rounded-md outline-none px-2 py-1' />
                                </div>
                            </div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div></div>
                    <div></div>
                </form>
            </div>

        </div>
    );
}

export default NewUserModal;
