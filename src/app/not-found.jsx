import React from 'react';
import error from '@/assets/Error404.svg';
import Image from 'next/image';
import { Button } from '@heroui/react';
import Link from 'next/link';

const notfound = () => {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center'>

            <div className='border flex flex-col items-center p-4'>
                <Image src={error} alt='404-animation' width={500} height={500} loading='eager'></Image>

                <h1 className='text-foreground text-2xl font-mono text-center mb-4 border border-foreground py-1 px-2'>Page Not Found</h1>
                <Link href='/'>
                    <Button variant='primary' className='rounded-none'>Go Home</Button>
                </Link>
            </div>

        </div>
    );
};

export default notfound;