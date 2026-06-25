'use client'
import { Button, Tooltip } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoArrowBack } from 'react-icons/io5';

const BackButton = () => {
    const router = useRouter();
    return (
        <div>
            <Tooltip delay={0}>
                <Button variant='ghost' className='mb-5 rounded-none border' onClick={() => router.back()}>
                    <IoArrowBack />
                </Button>
                <Tooltip.Content>
                    Go Back
                </Tooltip.Content>
            </Tooltip>

        </div>
    );
};

export default BackButton;