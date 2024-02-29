import { IoSearch } from "react-icons/io5";
import { Avatar, Grid, Hamburger, List, Mail, Notification } from '@/svg/index.ts'


const Navbar: React.FC = () => {
    const navIcons: JSX.Element[] = [
        <Notification />,
        <List />,
        <Mail />,
        <Avatar />,
        <Grid />,
    ]
        
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
                {navIcons.map(navItem => (
                    <div className="relative hidden sm:flex">

                        <div className="absolute -right-1 -top-1 bg-green-600 opacity-95 rounded-full w-2 h-2"></div>
                        <div className="relative font w-6 opacity-40 hover:opacity-90 transition-all cursor-pointer">
                            {navItem}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Navbar