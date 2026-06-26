'use client';

import React, { useState, useMemo } from 'react';
import { Table, Chip, Button, EmptyState, Pagination, Modal } from '@heroui/react';
import { FaInbox } from 'react-icons/fa6';
import DeleteUser from '@/components/shared/DeleteUser';
import toast from 'react-hot-toast';
import { updateUserRole } from '@/lib/actions/user';

const ROWS_PER_PAGE = 6;

const AdminUserTable = ({ users = [] }) => {
    const [page, setPage] = useState(1);

    // Pagination logic
    const totalPages = Math.ceil(users.length / ROWS_PER_PAGE) || 1;
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const paginatedItems = useMemo(() => {
        const start = (page - 1) * ROWS_PER_PAGE;
        return users.slice(start, start + ROWS_PER_PAGE);
    }, [page, users]);

    const start = users.length === 0 ? 0 : (page - 1) * ROWS_PER_PAGE + 1;
    const end = Math.min(page * ROWS_PER_PAGE, users.length);

    const getStatusColor = (role) => {
        switch (role?.toLowerCase()) {
            case 'reader': return 'success';
            case 'admin': return 'warning';
            case 'writer': return 'primary';
            default: return 'default';
        }
    };

    const RoleUpdateModal = ({ user, targetRole }) => {
        const [isUpdating, setIsUpdating] = useState(false);

        const handleRoleChange = async () => {
            setIsUpdating(true);
            try {
                await updateUserRole(user._id, targetRole);
                toast.success(`Role updated to ${targetRole} successfully!`);
            } catch (error) {
                toast.error("Failed to update role");
            } finally {
                setIsUpdating(false);
            }
        };

        return (
            <Modal>
                <Button size="sm" variant="outline" className="rounded-none bg-background">
                    Make {targetRole.charAt(0).toUpperCase() + targetRole.slice(1)}
                </Button>
                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-90">
                            <Modal.Header>
                                <Modal.Heading>Confirm Role Change</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Are you sure you want to change {user.name}&apos;s role to {targetRole}?</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button slot="close" variant="secondary">Cancel</Button>
                               
                                <Button
                                    slot="close"
                                    onClick={handleRoleChange}
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
        <Table aria-label="Table of users">
            <Table.ScrollContainer>
                <Table.Content className="min-w-150">
                    <Table.Header>
                        <Table.Column isRowHeader className="w-[30%]">Name</Table.Column>
                        <Table.Column className="w-[30%]">Email</Table.Column>
                        <Table.Column className="w-[15%]">Role</Table.Column>
                        <Table.Column className="w-[25%]" align='center'>Actions</Table.Column>
                    </Table.Header>

                    <Table.Body renderEmptyState={() => (
                        <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 my-4 text-center">
                            <FaInbox />
                            <span className="text-sm text-muted">No users found</span>
                        </EmptyState>
                    )}>
                        
                        {paginatedItems.map((user) => (
                            <Table.Row key={user._id?.$oid || user._id}>
                                <Table.Cell>
                                    <div className="font-medium text-foreground">
                                        {user.name || 'Untitled User'}
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="text-sm text-default-600">
                                        {user.email}
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <Chip
                                        color={getStatusColor(user.role)}
                                        size="sm"
                                        variant="flat"
                                        className="capitalize"
                                    >
                                        {user.role || "Unknown"}
                                    </Chip>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex items-center justify-start gap-2">
                                        {user.role !== 'reader' && <RoleUpdateModal user={user} targetRole="reader" />}
                                        {user.role !== 'writer' && <RoleUpdateModal user={user} targetRole="writer" />}
                                        {user.role !== 'admin' && <RoleUpdateModal user={user} targetRole="admin" />}
                                        <DeleteUser user={user} />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>

            {users.length > 0 && (
                <Table.Footer>
                    <Pagination size="sm">
                        <Pagination.Summary>{start} to {end} of {users.length} results</Pagination.Summary>
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

export default AdminUserTable;