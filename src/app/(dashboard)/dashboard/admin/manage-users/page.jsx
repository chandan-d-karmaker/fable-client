import { getEbookByWriter } from '@/lib/api/ebooks';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import AdminUserTable from './ManageUserTable';
import { getUsers } from '@/lib/api/users';

const AdminUserPage = async () => {
    const users = await getUsers();
    console.log(users);


    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-foreground">All Users</h1>
            </div>

            <div>
                {users && Array.isArray(users) &&
                    <AdminUserTable users={users} />
                }
            </div>
        </div>
    );
};

export default AdminUserPage;