import { getEbooks } from '@/lib/api/ebooks';
import ManageEbookTable from './ManageEbookTable';
import { getUsers } from '@/lib/api/users';

export const metadata = {
  title: "Manage Users",
};


const ManageEbookPage = async () => {
    const [{ ebooks }, users] = await Promise.all([
        getEbooks(),
        getUsers()
    ]);


    const userMap = users.reduce((acc, user) => {
        acc[user._id] = user.name;
        return acc;
    }, {});

    // Attach the writer name to each ebook
    const detailedEbooks = ebooks.map(ebook => ({
        ...ebook,
        writerName: userMap[ebook.addedBy] || "Deleted Writer"
    }));
    console.log(detailedEbooks);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Manage Ebooks</h1>
            {detailedEbooks && Array.isArray(detailedEbooks) &&
                <ManageEbookTable ebooks={detailedEbooks} />
            }
        </div>
    );
};

export default ManageEbookPage;