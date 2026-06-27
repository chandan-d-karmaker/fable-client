'use client';

import React, { useState, useMemo } from 'react';
import { EmptyState, Pagination, Table } from '@heroui/react';
import { format } from 'date-fns';
import { FaInbox } from 'react-icons/fa6';

const ROWS_PER_PAGE = 10;

const TransactionHistoryTable = ({ sales }) => {
    const [page, setPage] = useState(1);
    
    const totalPages = Math.ceil(sales?.length / ROWS_PER_PAGE) || 1; 
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    
    const paginatedItems = useMemo(() => {
        const start = (page - 1) * ROWS_PER_PAGE;
        return sales?.slice(start, start + ROWS_PER_PAGE) || [];
    }, [page, sales]);

    const start = sales?.length === 0 ? 0 : (page - 1) * ROWS_PER_PAGE + 1;
    const end = Math.min(page * ROWS_PER_PAGE, sales?.length || 0);

    return (
        <Table aria-label="Table of writer's sales">
            <Table.ScrollContainer>
                <Table.Content className="min-w-150">
                    <Table.Header>
                        <Table.Column isRowHeader className="w-[28%]">Transaction ID</Table.Column>
                        <Table.Column className="w-[12%]">Type</Table.Column>
                        <Table.Column className="w-[25%]">Buyer Email</Table.Column>
                        <Table.Column className="w-[15%]" align='center'>Amount</Table.Column>
                        <Table.Column className="w-[20%]">Purchase Date</Table.Column>
                    </Table.Header>
                    
                    <Table.Body renderEmptyState={() => (
                        <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 my-4 text-center">
                            <FaInbox />
                            <span className="text-sm text-muted">No sales history found</span>
                        </EmptyState>
                    )}>
                        {paginatedItems.map((ebook) => (
                            <Table.Row key={ebook._id?.$oid || ebook._id || ebook.id}>
                                <Table.Cell>
                                    <div className="font-medium text-foreground">
                                        {ebook._id || 'Untitled Ebook'}
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="text-xs text-default-500 mt-0.5">Purchase</div>
                                </Table.Cell>
                                <Table.Cell>
                                    {ebook.email}
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
            
            {sales?.length > 0 && (
                <Table.Footer>
                    <Pagination size="sm">
                        <Pagination.Summary>
                            {start} to {end} of {sales.length} results
                        </Pagination.Summary>
                        <Pagination.Content>
                            <Pagination.Item>
                                <Pagination.Previous
                                    isDisabled={page === 1}
                                    onPress={() => setPage((p) => Math.max(1, p - 1))}
                                >
                                    <Pagination.PreviousIcon />
                                    Prev
                                </Pagination.Previous>
                            </Pagination.Item>
                            
                            {pages.map((p) => (
                                <Pagination.Item key={p}>
                                    <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                                        {p}
                                    </Pagination.Link>
                                </Pagination.Item>
                            ))}
                            
                            <Pagination.Item>
                                <Pagination.Next
                                    isDisabled={page === totalPages}
                                    onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                                >
                                    Next
                                    <Pagination.NextIcon />
                                </Pagination.Next>
                            </Pagination.Item>
                        </Pagination.Content>
                    </Pagination>
                </Table.Footer>
            )}
        </Table>
    );
};

export default TransactionHistoryTable;