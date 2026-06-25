import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

const Mainlayout = ({ children }) => {

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 lg:px-0 my-10'>
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Mainlayout;