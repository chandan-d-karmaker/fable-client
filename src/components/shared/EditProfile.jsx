'use client';

import React, { useState } from 'react';
import { authClient } from "@/lib/auth-client";
import toast from 'react-hot-toast';
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { ArrowUpToLine } from 'lucide-react';
import Image from 'next/image';

const UpdateProfileModal = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [logoUrl, setLogoUrl] = useState('');
    const [errors, setErrors] = useState({});

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, logo: "File size exceeds 5MB limit" }));
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMG_API;
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                setLogoUrl(data.data.url);
                setErrors(prev => ({ ...prev, logo: null }));
            } else {
                setErrors(prev => ({ ...prev, logo: "Upload failed. Try again." }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, logo: "Network error during logo upload" }));
        } finally {
            setIsUploading(false);
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsUpdating(true);

        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData.entries());

        try {
            const { error } = await authClient.updateUser({
                ...userData,
                image: logoUrl
            });

            const duration = 1000;

            if (!error) {
                // Fixed lowercase 'duration' for react-hot-toast API
                toast.success("Profile updated successfully!", {
                    duration: duration,
                });

                setTimeout(() => {
                    window.location.reload();
                }, duration);
            } else {
                toast.error(error.message || "Failed to update profile");
                setIsUpdating(false);
            }
        } catch (err) {
            toast.error("An unexpected error occurred.");
            setIsUpdating(false);
        }
    };

    return (
        <Modal>
            <Button variant="outline" className='rounded-none'>Edit Profile</Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />

                        {/* Header Section */}
                        <Modal.Header>
                            <Modal.Heading>Update Information</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Update your profile details below. Changes will be reflected immediately across the platform.
                            </p>
                        </Modal.Header>

                        {/* Body Section */}
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                               
                                <form id="update-profile-form" onSubmit={handleUpdate} className="flex flex-col gap-4">
                                    <TextField className="w-full" name="name" type="text" variant="secondary">
                                        <Label>Name</Label>
                                        <Input placeholder="Enter your name" required />
                                    </TextField>

                                    <div className="flex flex-col gap-1 w-full">
                                        <span className="text-foreground font-medium text-sm">Cover Image</span>
                                        <div className="flex items-center gap-4 mt-1">
                                            <label className="w-14 h-14 border border-dashed border-foreground/90 hover:border-foreground bg-background/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
                                                <input
                                                    type="file"
                                                    accept="image/png, image/jpeg"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                />
                                                {logoUrl ? (
                                                    <Image src={logoUrl} alt="Logo Preview" className="w-full h-full object-cover" width={100} height={100} />
                                                ) : (
                                                    <ArrowUpToLine size={18} className="text-zinc-400 group-hover:text-foreground transition-colors" />
                                                )}
                                            </label>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-foreground/80">
                                                    {isUploading ? 'Uploading file...' : 'Upload image'}
                                                </span>
                                                <span className="text-xs text-zinc-600 mt-0.5">PNG, JPG up to 5MB</span>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </Surface>
                        </Modal.Body>

                        <Modal.Footer>
                           
                            <Button slot="close" variant="secondary" isDisabled={isUpdating}>
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                form="update-profile-form"
                                color="primary"
                                isLoading={isUpdating}
                            >
                                Update info
                            </Button>
                        </Modal.Footer>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default UpdateProfileModal;