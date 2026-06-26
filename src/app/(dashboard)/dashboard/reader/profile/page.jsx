import UpdateProfileModal from '@/components/shared/EditProfile';
import { auth } from '@/lib/auth';
import { getUserSession } from '@/lib/core/session';
import { Avatar, Spinner } from '@heroui/react';
import { headers } from 'next/headers';
import React from 'react';

export async function generateMetadata() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const userName = session?.user?.name || "User";

    return {
        title: `${userName}'s Profile`,
        description: `View and edit profile settings for ${userName}`,
    };
}

const ProfilePage = async () => {

    const user = await getUserSession();

    if (!user) {
        return <div className='flex justify-center items-center'>
            <Spinner/>
        </div>;
    }
    return (
        <div className='flex items-center justify-center md:my-20'>
            <div className='p-6 space-y-4 border flex flex-col items-center justify-center'>
                <Avatar>
                    <Avatar.Image
                        src={user?.image}
                        alt={user.name}
                        radius="lg"
                        className="w-20 h-20 text-large bg-default-200" />
                    <Avatar.Fallback>{user.name[0]}</Avatar.Fallback>
                </Avatar>
                <h1>Name: {user.name}</h1>
                <h1>Name: {user.email}</h1>

                <UpdateProfileModal/>
            </div>
        </div>
    );
};

export default ProfilePage;