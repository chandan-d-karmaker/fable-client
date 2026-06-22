import React from 'react';
import error from '@/assets/Error404.svg';
import Image from 'next/image';

const notfound = () => {
    return (
        <div className='min-h-screen flex items-center justify-center'>

            <Image src={error} alt='404-animation' width={500} height={500} loading='eager'></Image>

        </div>
    );
};

export default notfound;