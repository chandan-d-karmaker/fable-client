'use client'

import { deleteUser } from '@/lib/actions/user';
import { Button, Modal, Tooltip } from '@heroui/react';
import { redirect } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const DeleteUser = ({ user }) => {

    const handleDelete = async () => {

        const res = await deleteUser(user._id);
        if (res.deletedCount > 0) {
            toast.success(`${user.name} deleted successfully!`);
            redirect('/dashboard/writer/manage-user');

        } else {
            toast.error("Failed to delete user!")
        }

    }

    return (
            <Modal>
                <Button
                    size="sm"
                    variant="outline"
                    aria-label="Delete user"
                    className="rounded-none bg-background"
                >
                    Delete User
                </Button>
                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-90">
                            <Modal.Header>
                                <Modal.Heading>
                                    {`Are you sure to delete user ${user.name}`}
                                </Modal.Heading>
                            </Modal.Header>
                            <Modal.Body>
                                <p>
                                    This action can not be undone
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button slot="close" variant="secondary">
                                    Cancel
                                </Button>
                                <Button onClick={handleDelete} slot="close">Confirm</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
    );
};

export default DeleteUser;