"use client"
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { usePagination } from "@table-library/react-table-library/pagination";
import { EditPen, Dustbin } from '@/svg/index.ts'

import nodes from '@/constants/DummyData.json';  //dummy data
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';

const UserList = () => {
    const data = { nodes };
    const theme = useTheme(getTheme());
    const pagination = usePagination(data, {
        state: {
            page: 0,
            size: 10,
        },
    });
    const [pageIndex, setPageIndex] = useState(pagination.state.page);

    const COLUMNS = [
        { label: 'Name', renderCell: (item: any) => item.name },
        { label: 'Email', renderCell: (item: any) => item.email },
        { label: 'Phone', renderCell: (item: any) => item.phone },
        { label: 'User Type', renderCell: (item: any) => item.usertype },
        { label: 'Location', renderCell: (item: any) => item.location },
        {
            label: 'Action', renderCell: (item: any) => <div className='flex items-center justify-start gap-3'>
                <div className='w-3 h-3 hover:cursor-pointer'><EditPen /></div>
                <div className='w-3 h-3 hover:cursor-pointer'><Dustbin /></div>
            </div>
        },
    ];

    const renderPageButtons = () => {
        const totalPages = pagination.state.getTotalPages(data.nodes);
        const currentPage = pagination.state.page + 1;
        const maxButtonsToShow = 7;
        const pageButtons = [];

        const startPage = Math.max(
            0,
            Math.min(
                currentPage - Math.floor(maxButtonsToShow / 2),
                totalPages - maxButtonsToShow
            )
        );

        for (let i = startPage; i < startPage + maxButtonsToShow && i < totalPages; i++) {
            pageButtons.push(
                <button
                    key={i}
                    className={`${pagination.state.page === i ? 'border-blue-400 border-1 border bg-blue-50' : ''} rounded-sm text-xs text-gray-600 w-6 h-6`}
                    onClick={() => {
                        setPageIndex(i);
                        pagination.fns.onSetPage(i);
                    }}
                >
                    {i + 1}
                </button>
            );
        }

        return pageButtons;
    };

    return <div className='flex flex-col gap-2'>
        {/* Filters and Search section */}
        <div className='flex items-center justify-end gap-1 py-2'>
            <div>
                <select name="" id="" className='p-1 border border-1 outline-none rounded-md text-xs text-gray-400'>
                    <option value="" defaultChecked>
                        Select User Type
                    </option>
                    <option value="">option 1</option>
                    <option value="">option 1</option>
                    <option value="">option 1</option>
                </select>
            </div>
            <div>
                <select name="" id="" className='p-1 border border-1 outline-none rounded-md text-xs text-gray-400'>
                    <option value="" defaultChecked>
                        Select User Type
                    </option>
                    <option value="">option 1</option>
                    <option value="">option 1</option>
                    <option value="">option 1</option>
                </select>
            </div>
            <div>
                <select name="" id="" className='p-1 border border-1 outline-none rounded-md text-xs text-gray-400'>
                    <option value="" defaultChecked>
                        Select User Type
                    </option>
                    <option value="">option 1</option>
                    <option value="">option 1</option>
                    <option value="">option 1</option>
                </select>
            </div>
            <div className='flex items-center justify-between p-1 bg-white border border-1 outline-none rounded-md gap-1'>
                <div className="opacity-30 h-full">
                    <IoSearch />
                </div>
                <input
                    type="text"
                    className=' text-xs text-gray-400 outline-none'
                    placeholder="Search..."
                />
            </div>
            <div className='flex items-center justify-between p-1 bg-white border border-1 outline-none rounded-md gap-1'>
                <div className="opacity-30 h-full">
                    <IoSearch />
                </div>
                <input
                    type="text"
                    className=' text-xs text-gray-400 outline-none'
                    placeholder="Search..."
                />
            </div>
            <div>
                <button className='text-xs text-white rounded-md px-3 p-1 bg-blue-500'>+ Add Employee</button>
            </div>
        </div>

        {/* Main Table */}
        <CompactTable
            columns={COLUMNS}   
            data={data}
            theme={theme}
            pagination={pagination}
            className="!w-10"
        />

        {/* Pagination */}
        <div className='flex items-start justify-between'>
            <span className='text-xs w-1/2 text-gray-600'>Page {pagination.state.page + 1}</span>
            <span className='w-1/2 flex items-start justify-end gap-2'>
                <button
                    className={`text-xs px-2 py-1 text-gray-600 border border-1 border-gray-300 rounded-md font-semibold ${pagination.state.page <= 0 ? 'pointer-events-none opacity-50' : ''}`}
                    onClick={() => {
                        if (pagination.state.page > 0) {
                            pagination.fns.onSetPage(pageIndex - 1)
                            setPageIndex(pageIndex - 1);
                        }
                    }}
                >Previous</button>
                <div className='flex flex-wrap gap-1'>{renderPageButtons()}</div>
                <div className='rounded-sm text-xs text-gray-600'>...</div>
                <button className='rounded-sm text-xs text-gray-600 w-6 h-6'
                >
                    {pagination.state.getTotalPages(data.nodes)}</button>
                <button
                    className={`text-xs px-2 py-1 text-gray-600 border border-1 border-gray-300 rounded-md font-semibold ${pagination.state.page >= pagination.state.getTotalPages(data.nodes) - 1 ? 'pointer-events-none opacity-50' : ''}`}
                    onClick={() => {
                        if (pagination.state.page < pagination.state.getTotalPages(data.nodes) - 1) {
                            pagination.fns.onSetPage(pageIndex + 1)
                            setPageIndex(pageIndex + 1);
                        }
                    }}
                >Next</button>
            </span>
        </div>
    </div>
};

export default UserList
