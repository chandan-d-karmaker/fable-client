'use client';

import React, { useState, useMemo } from 'react';
import { Table, Chip, Button, Tooltip, Pagination, EmptyState, Modal } from '@heroui/react';
import { FaInbox } from 'react-icons/fa6';
import DeleteEbook from '@/components/shared/DeleteEbook';
import { toggleStatus } from '@/lib/actions/ebooks';
import toast from 'react-hot-toast';

const ROWS_PER_PAGE = 8;

const ManageEbookTable = ({ ebooks = [] }) => {
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(ebooks.length / ROWS_PER_PAGE) || 1;
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const paginatedItems = useMemo(() => {
        const start = (page - 1) * ROWS_PER_PAGE;
        return ebooks.slice(start, start + ROWS_PER_PAGE);
    }, [page, ebooks]);

    const start = ebooks.length === 0 ? 0 : (page - 1) * ROWS_PER_PAGE + 1;
    const end = Math.min(page * ROWS_PER_PAGE, ebooks.length);

    const getStatusColor = (status) => (status?.toLowerCase() === 'published' ? 'success' : 'warning');

    const StatusUpdateModal = ({ ebook, targetStatus }) => {
        const [isUpdating, setIsUpdating] = useState(false);

        const handleStatusChange = async () => {
            setIsUpdating(true);
            try {
                await toggleStatus(ebook._id, { status: targetStatus });
                toast.success(`Status updated to ${targetStatus} successfully!`);
            } catch (error) {
                toast.error("Failed to update Status");
            } finally {
                setIsUpdating(false);
            }
        };

        return (
            <Modal>
                <Button size="sm" variant="outline" className="rounded-none bg-background">
                    Make {targetStatus.charAt(0).toUpperCase() + targetStatus.slice(1)}
                </Button>
                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-90">
                            <Modal.Header>
                                <Modal.Heading>Confirm {targetStatus}</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Are you sure you want to change {ebook.title}&apos;s status to {targetStatus}?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button slot="close" variant="secondary">Cancel</Button>

                                <Button
                                    slot="close"
                                    onClick={handleStatusChange}
                                    isLoading={isUpdating}
                                >
                                    Confirm
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        );
    };

    return (
        <Table aria-label="Admin ebook management table">
            <Table.ScrollContainer>
                <Table.Content className="min-w-150">
                    <Table.Header>
                        <Table.Column isRowHeader className="w-[30%]">Title</Table.Column>
                        <Table.Column className="w-[20%]">Writer Name</Table.Column>
                        <Table.Column className="w-[15%]">Price</Table.Column>
                        <Table.Column className="w-[15%]">Status</Table.Column>
                        <Table.Column className="w-[20%]" align='center'>Actions</Table.Column>
                    </Table.Header>

                    <Table.Body renderEmptyState={() => (
                        <EmptyState className="flex flex-col items-center justify-center gap-4 my-8">
                            <FaInbox size={40} className="text-muted" />
                            <span className="text-sm text-muted">No ebooks found in the database.</span>
                        </EmptyState>
                    )}>
                        {paginatedItems.map((ebook) => (

                            <Table.Row key={ebook._id}>
                                <Table.Cell>
                                    <div className="font-medium text-foreground">{ebook.title}</div>
                                </Table.Cell>
                                <Table.Cell>{ebook.writerName || 'Deleted Writer'}</Table.Cell>
                                <Table.Cell>${parseFloat(ebook.price).toFixed(2)}</Table.Cell>
                                <Table.Cell>
                                    <Chip color={getStatusColor(ebook.status)} size="sm" variant="flat" className="capitalize">
                                        {ebook.status}
                                    </Chip>
                                </Table.Cell>

                                <Table.Cell>
                                    <div className="flex items-center justify-start gap-2">
                                        {ebook.status !== 'published' && <StatusUpdateModal ebook={ebook} targetStatus="published" />}

                                        {ebook.status !== 'unpublished' && <StatusUpdateModal ebook={ebook} targetStatus="unpublished" />}

                                        <DeleteEbook ebook={ebook} />

                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>

            {ebooks.length > 0 && (
                <Table.Footer>
                    <Pagination size="sm">
                        <Pagination.Summary>{start} to {end} of {ebooks.length} results</Pagination.Summary>
                        <Pagination.Content>
                            <Pagination.Item>
                                <Pagination.Previous isDisabled={page === 1} onPress={() => setPage(p => Math.max(1, p - 1))}>
                                    <Pagination.PreviousIcon /> Prev
                                </Pagination.Previous>
                            </Pagination.Item>
                            {pages.map((p) => (
                                <Pagination.Item key={p}>
                                    <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>{p}</Pagination.Link>
                                </Pagination.Item>
                            ))}
                            <Pagination.Item>
                                <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage(p => Math.min(totalPages, p + 1))}>
                                    Next <Pagination.NextIcon />
                                </Pagination.Next>
                            </Pagination.Item>
                        </Pagination.Content>
                    </Pagination>
                </Table.Footer>
            )}
        </Table>
    );
};

export default ManageEbookTable;