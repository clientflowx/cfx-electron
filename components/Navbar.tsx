import { FaBell } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { IoIosMailOpen } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BsGrid3X3Gap } from "react-icons/bs";

const Navbar: React.FC = () => {
    return (
        <div className="w-full fixed flex z-50 bg-white items-center justify-between py-2 px-4 border-b border-gray-200">
            <div className="flex flex-row items-center justify-start gap-3">
                <div className="">
                    <input
                        className="rounded-md p-2 font-medium outline-none border-2 text-sm w-full px-4 py-2 focus:ring-4 focus:ring-blue-300"
                        type="text"
                        placeholder="Search..."
                    />
                </div>
            </div>
            <div className="flex items-center justify-between gap-5 ">
                <div className="flex gap-5">
                    <div className="relative">
                        <FaBell className="opacity-60 cursor-pointer hover:opacity-100 transition-opacity" size={20} />
                    </div>
                    <div className="relative">
                        <CiBoxList className="opacity-60 cursor-pointer hover:opacity-100 transition-opacity" size={20} />
                    </div>
                    <div className="relative">
                        <IoIosMailOpen className="opacity-60 cursor-pointer hover:opacity-100 transition-opacity" size={20} />
                    </div>
                </div>
                <div className="relative">
                    <CgProfile className="opacity-60 cursor-pointer hover:opacity-100 transition-opacity" size={20} />
                </div>
                <div className="relative">
                    <BsGrid3X3Gap className="opacity-60 cursor-pointer hover:opacity-100 transition-opacity" size={20} />
                </div>
            </div>
        </div>
    )
}

export default Navbar