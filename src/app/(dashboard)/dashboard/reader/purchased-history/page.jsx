import { getEbookById } from '@/lib/api/ebooks';
import { getPurchaseHistory } from '@/lib/api/payments';
import { getUserSession } from '@/lib/core/session';
import { Table } from '@heroui/react';
import { format } from 'date-fns';
import React from 'react';

const page = async () => {

    const user = await getUserSession();
    console.log(user);

    const sales = await getPurchaseHistory(user.id);
    console.log(sales);

    // const purchasedBooks = await Promise.all(
    //     sales.map(async (purchase) => {
    //         const bookDetails = await getEbookById(purchase.ebookId);
    //         return bookDetails;
    //     })
    // );

    // 3. Filter out any null values (just in case an author deleted a book)
    // const validBooks = purchasedBooks.filter((book) => book !== null);
    return (
        <div>
            <div>
                <h1 className='text-2xl font-bold text-foreground mb-10'>Ebook purchase history</h1>
            </div>
            <Table aria-label="Table of writer's sales">
                <Table.ScrollContainer>
                    <Table.Content className="min-w-150">
                        <Table.Header>
                            <Table.Column isRowHeader className="w-1/4">Title</Table.Column>
                            <Table.Column className="w-1/4">Writer Name</Table.Column>
                            <Table.Column className="w-1/4">Purchase Date</Table.Column>
                            <Table.Column className="w-1/4" align='center'>Amount</Table.Column>
                        </Table.Header>
                        <Table.Body emptyContent={"You haven't published any ebooks yet."}>
                            {sales.map((ebook) => (
                                <Table.Row key={ebook._id?.$oid || ebook._id || ebook.id}>
                                    <Table.Cell>
                                        <div className="font-medium text-foreground">
                                            {ebook.ebookTitle || 'Untitled Ebook'}
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="text-xs text-default-500 mt-0.5">{ebook.writerName}</div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        ${ebook.ebookPrice}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {format(new Date(ebook.createdAt), 'd MMM yyyy').toUpperCase()}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default page;