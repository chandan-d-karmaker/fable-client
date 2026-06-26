'use client'; // This tells Next.js it's safe to use functions and interactivity here

import React from 'react';
import { Table, EmptyState } from '@heroui/react';
import { format } from 'date-fns';
import { FaInbox } from "react-icons/fa6";

const PurchaseHistoryTable = ({ sales }) => {
    return (
        <Table aria-label="Table of writer's sales">
            <Table.ScrollContainer>
                <Table.Content className="min-w-150">
                    <Table.Header>
                        <Table.Column isRowHeader className="w-1/4">Title</Table.Column>
                        <Table.Column className="w-1/4">Writer Name</Table.Column>
                        <Table.Column className="w-1/4">Purchase Date</Table.Column>
                        <Table.Column className="w-1/4" align='center'>Amount</Table.Column>
                    </Table.Header>
                    
                    {/* Because we are in 'use client', passing this function works perfectly */}
                    <Table.Body renderEmptyState={() => (
                        <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 my-4 text-center">
                            <FaInbox />
                            <span className="text-sm text-muted">No Purchase history</span>
                        </EmptyState>
                    )}>
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
                                    {format(new Date(ebook.createdAt), 'd MMM yyyy').toUpperCase()}
                                </Table.Cell>
                                <Table.Cell>
                                    ${ebook.ebookPrice}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
};

export default PurchaseHistoryTable;