"use client"
import { IoSearch } from "react-icons/io5";
import { Avatar, Hamburger, Notification } from '@/svg/index.ts'
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';

const Navbar: React.FC = () => {
    const [hovered, setHovered] = useState<boolean>(false);
    const router = useRouter();

    const navIcons: JSX.Element[] = [
        <Notification key="notifications" />,
        <Avatar key="avatar" />,
    ]

    const handleLogout = () => {
        router.push('/login');
        Cookies.remove('token');
    }

    const handleMouseHover = (event: boolean) => {
        setHovered(event);
    }

    return (
        <div className="w-full fixed flex  bg-white z-20 items-center justify-between gap-3 sm:gap-0 py-3 pl-20 px-10 shadow-sm">
            <div className="flex flex-row items-center justify-start gap-3">
                <div className="flex items-center justify-between bg-[#f0f4f7] rounded-md">
                    <div className="opacity-30 h-full p-3">
                        <IoSearch />
                    </div>
                    <input
                        className="rounded-r-md font-normal outline-none bg-[#f0f4f7] p-3 text-sm focus:ring-4 focus:ring-blue-300"
                        type="text"
                        placeholder="Search..."
                    />
                </div>
            </div>
            <div className="flex items-center justify-between gap-5 ">
                <div className="w-6 sm:hidden opacity-60 hover:opacity-100"><Hamburger /></div>
                {navIcons.map((navItem, index) => (
                    <div className="relative hidden sm:flex" key={index}>
                        <div className="absolute -right-1 -top-1 bg-green-600 opacity-95 rounded-full w-2 h-2"></div>
                        <div className="relative font w-6 opacity-40 hover:opacity-90 transition-all cursor-pointer"
                            onMouseEnter={() => index === 1 ? handleMouseHover(true) : null}
                            onMouseLeave={() => index === 1 ? handleMouseHover(false) : null}
                        >
                            {navItem}
                        </div>
                        <div
                            className={`${index === 1 && hovered ? '' : 'hidden'}`}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                        >
                            <div className="absolute top-0 right-0 mt-6 rounded-md border bg-white p-3">
                                <button className="px-5 text-sm" onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Navbar