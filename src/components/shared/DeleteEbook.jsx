'use client'
import { deleteEbook } from '@/lib/actions/ebooks';
import { Button, Modal, Tooltip } from '@heroui/react';
import { Trash2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const DeleteEbook = ({ ebook }) => {

    const handleDelete = async () => {

        const res = await deleteEbook(ebook._id);
        if (res.deletedCount > 0) {
            toast.success(`${ebook.title} deleted successfully!`);
            redirect('/dashboard/admin/manage-ebook');

        } else {
            toast.error("Failed to delete ebook!")
        }
        // if (res.insertedId) {
        //     return { success: true, message: `${ebook.title} deleted successfully!` };
        // } else {
        //     return { success: false, message: "Something went wrong!" };
        // }

    }

    return (
            <Modal>
                <Button size="sm" variant="outline" className="rounded-none bg-background">
                    Delete
                </Button>
                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-90">
                            <Modal.Header>
                                <Modal.Heading>
                                    {`Are you sure to delete your book ${ebook.title}`}
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

export default DeleteEbook;