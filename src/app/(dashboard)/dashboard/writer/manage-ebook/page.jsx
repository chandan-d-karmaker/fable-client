import DeleteEbook from '@/components/shared/DeleteEbook';
import { getEbookByWriter } from '@/lib/api/ebooks';
import { getUserSession } from '@/lib/core/session';
import { Button, Chip, Tooltip, Table, Modal } from '@heroui/react';
import { Edit2, Trash2, EyeOff, Eye } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const WriterEbooksPage = async () => {
    const user = await getUserSession();


    const ebooks = await getEbookByWriter(user.id) || [];

    console.log(ebooks);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'published':
                return 'success';
            case 'draft':
            case 'unpublished':
                return 'warning';
            // Add other statuses if needed
            default:
                return 'default';
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-foreground">My Ebooks</h1>
                {/* <Link href='/dashboard/writer/books/new'>
                    <Button color='primary' className="font-medium">Publish New Ebook</Button>
                </Link> */}
            </div>

            <div>
                <Table aria-label="Table of writer's ebooks">
                    {/* The structure here differs slightly from the very newest HeroUI alpha, 
                        but matches the pattern you provided in your guideline code */}
                    <Table.ScrollContainer>
                        <Table.Content className="min-w-150">
                            <Table.Header>
                                <Table.Column isRowHeader className="w-1/4">Title</Table.Column>
                                <Table.Column className="w-1/4">Price</Table.Column>
                                <Table.Column className="w-1/4">Status</Table.Column>
                                <Table.Column className="w-1/4" align='center'>Actions</Table.Column>
                            </Table.Header>
                            <Table.Body emptyContent={"You haven't published any ebooks yet."}>
                                {ebooks.map((ebook) => (
                                    <Table.Row key={ebook._id?.$oid || ebook._id || ebook.id}>
                                        <Table.Cell>
                                            <div className="font-medium text-foreground">
                                                {ebook.title || 'Untitled Ebook'}
                                            </div>
                                            {/* Optional: Add genre or category below the title if your data supports it */}
                                            {ebook.genre && (
                                                <div className="text-xs text-default-500 mt-0.5">{ebook.genre}</div>
                                            )}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="text-sm text-default-600">
                                                {/* Assuming price is a number. Add formatting if needed */}
                                                ${parseFloat(ebook.price).toFixed(2)}
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Chip
                                                color={getStatusColor(ebook.status)}
                                                size="sm"
                                                variant="flat"
                                                className="capitalize"
                                            >
                                                {ebook.status || "Unknown"}
                                            </Chip>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="relative flex items-center justify-start gap-2">
                                                <Tooltip delay={0}>
                                                    <Link href={`/dashboard/writer/edit/${ebook._id}`}>
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            variant="light"
                                                            aria-label="Edit ebook"
                                                        >
                                                            <Edit2 className="text-default-500 w-4 h-4 hover:text-primary transition-colors" />
                                                        </Button>
                                                    </Link>
                                                    <Tooltip.Content>
                                                        <p>Edit Ebook</p>
                                                    </Tooltip.Content>
                                                </Tooltip>

                                                {/* Publish/Unpublish Toggle Button */}
                                                <Tooltip content={ebook.status?.toLowerCase() === 'published' ? "Unpublish Ebook" : "Publish Ebook"}>
                                                    <Button
                                                        isIconOnly
                                                        size="sm"
                                                        variant="light"
                                                        aria-label={ebook.status?.toLowerCase() === 'published' ? "Unpublish ebook" : "Publish ebook"}
                                                    >
                                                        {ebook.status?.toLowerCase() === 'published' ? (
                                                            <EyeOff className="text-default-500 w-4 h-4 hover:text-warning transition-colors" />
                                                        ) : (
                                                            <Eye className="text-default-500 w-4 h-4 hover:text-success transition-colors" />
                                                        )}
                                                    </Button>
                                                </Tooltip>

                                                <DeleteEbook ebook={ebook}/>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div >
        </div >
    );
};

export default WriterEbooksPage;