import { getWriters } from '@/lib/api/users';
import { Avatar, Card } from '@heroui/react';
import Image from 'next/image';
import React from 'react';

const TopWriter = async () => {

    const writers = await getWriters();
    console.log(writers);
    return (
        <div className='flex justify-between'>
            {
                writers.map((writer) => (
                    <Card key={writer._id} className="flex flex-row gap-3 p-10" variant="tertiary">
                        <Avatar variant='letter'>
                            <Avatar.Image alt="John Doe" src={writer.image} />
                            <Avatar.Fallback>{writer.name[0]}</Avatar.Fallback>
                        </Avatar>
                        <div className="flex flex-1 flex-col justify-center gap-1">
                            <Card.Title className="text-sm">{writer.name}</Card.Title>
                            <Card.Description className="text-xs">10k+ sales</Card.Description>
                        </div>
                    </Card>
                ))
            }
        </div>
    );
};

export default TopWriter;