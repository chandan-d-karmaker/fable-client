import { getTopWriters, getWriters } from '@/lib/api/users';
import { Avatar, Card } from '@heroui/react';
import { motion } from "motion/react"
import Image from 'next/image';
import React from 'react';

const TopWriter = async () => {

    const writers = await getTopWriters();
    // console.log(writers);
    return (

        <section className='py-12 max-w-7xl mx-auto w-full'>
            <div className="mb-8 space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Top Writes</h2>
                <p className="text-foreground-400 text-sm md:text-base">
                    Read from our best writers.
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>

                {
                    writers.map((writer) => (
                        <Card
                            key={writer._id}
                            ishoverable='true'
                            className="bg-content1 border border-default rounded-none flex flex-col gap-4 hover:border-primary/50 transition-all duration-300 hover:shadow-[8px_8px_0px_0px_#555] hover:-translate-y-1 hover:-translate-x-1 shadow-sm w-full"
                        >
                            {/* 1. Header */}
                            <Card.Header className="flex justify-center items-center">
                                <Avatar>
                                    <Avatar.Image
                                        src={writer.image}
                                        name={writer.name}
                                        radius="lg"
                                        className="w-20 h-20 text-large bg-default-200" />
                                    <Avatar.Fallback>{writer.name[0]}</Avatar.Fallback>
                                </Avatar>
                            </Card.Header>

                            {/* 2. Content (Title & Description) */}
                            < Card.Content className="flex flex-col items-center py-2" >
                                <Card.Title className="text-lg font-semibold text-foreground m-0">
                                    {writer.name}
                                </Card.Title>
                                <Card.Description className="text-sm text-foreground-400 mt-1">
                                    {writer.sales}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    ))
                }
            </div >
        </section >
    );
};

export default TopWriter;