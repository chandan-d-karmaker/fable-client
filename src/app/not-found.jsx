import React from 'react';
import error from '@/assets/Error404.svg';
import Image from 'next/image';
import { Button } from '@heroui/react';
import Link from 'next/link';

const notfound = () => {
    return (
        <div className='min-h-screen flex items-center justify-center'>

            <Image src={error} alt='404-animation' width={500} height={500} loading='eager'></Image>

            <h1>Page Not Found</h1>
            <Link href='/'>
                <Button variant='primary' className='rounded-none'>Go Home</Button>
            </Link>

        </div>
    );
};

export default notfound;