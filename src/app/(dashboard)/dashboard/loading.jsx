import React from 'react';
import loader from '@/assets/Book.svg';
import Image from 'next/image';

const loading = () => {
    return (
        <div className='min-h-screen flex items-center justify-center'>

            <Image src={loader} alt='loading-animation' width={500} height={500} loading='eager'></Image>
            
        </div>
    );
};

export default loading;