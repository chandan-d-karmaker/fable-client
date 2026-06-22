import Navbar from '@/components/shared/Navbar';
import React from 'react';

const Mainlayout = ({ children }) => {

    return (
        <div>
            <Navbar/>
            {children}

        </div>
    );
};

export default Mainlayout;