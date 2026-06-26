'use client';

import React from 'react';
import { Table, Chip, Tooltip, Button, EmptyState } from '@heroui/react';
import { Edit2, Eye } from 'lucide-react';
import Link from 'next/link';
import DeleteEbook from '@/components/shared/DeleteEbook';
import { FaInbox } from 'react-icons/fa6';

const WriterEbooksTable = ({ ebooks }) => {
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'published':
                return 'success';
            case 'unpublished':
                return 'warning';
            default:
                return 'default';
        }
    };

    return (
        <Table aria-label="Table of writer's ebooks">
            <Table.ScrollContainer>
                <Table.Content className="min-w-150">
                    <Table.Header>
                        <Table.Column isRowHeader className="w-1/4">Title</Table.Column>
                        <Table.Column className="w-1/4">Price</Table.Column>
                        <Table.Column className="w-1/4">Status</Table.Column>
                        <Table.Column className="w-1/4" align='center'>Actions</Table.Column>
                    </Table.Header>
                    <Table.Body renderEmptyState={() => (
                        <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 my-4 text-center">
                            <FaInbox />
                            <span className="text-sm text-muted">No Purchase history</span>
                        </EmptyState>
                    )}>
                        {ebooks.map((ebook) => (
                            <Table.Row key={ebook._id?.$oid || ebook._id}>
                                <Table.Cell>
                                    <div className="font-medium text-foreground">
                                        {ebook.title || 'Untitled Ebook'}
                                    </div>
                                    {ebook.genre && (
                                        <div className="text-xs text-default-500 mt-0.5">{ebook.genre}</div>
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="text-sm text-default-600">
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
                                            <Tooltip.Content showArrow placement="left">
                                                <p>Edit Ebook</p>
                                            </Tooltip.Content>
                                        </Tooltip>

                                        <Tooltip delay={0}>
                                            <Link href={`/ebooks/${ebook._id}`}>
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    aria-label={ebook.status?.toLowerCase() === 'published' ? "Unpublish ebook" : "Publish ebook"}
                                                >
                                                    <Eye className="text-default-500 w-4 h-4 hover:text-success transition-colors" />
                                                </Button>
                                                <Tooltip.Content showArrow placement="top">
                                                    View Details
                                                </Tooltip.Content>
                                            </Link>
                                        </Tooltip>

                                        <DeleteEbook ebook={ebook} />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
};

export default WriterEbooksTable;