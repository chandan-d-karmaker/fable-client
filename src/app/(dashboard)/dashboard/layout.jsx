import { SideBar } from '@/components/dashboard/SideBar';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

const DashBoardLayout = ({ children }) => {
    return (
        <div>
            <Navbar/>
            <div className='flex min-h-screen'>
                <SideBar />
                <div className='flex-1 flex flex-col max-h-screen overflow-hidden overflow-y-auto'>
                    <div className='flex-1 p-8'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;