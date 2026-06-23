"use client";

import React, { useState } from "react";
import {
    Button,
    Input,
    Label,
    TextField,
    TextArea,
    Form,
    Select,
    ListBox,
    Spinner
} from "@heroui/react";
import { ChevronDown } from "@gravity-ui/icons";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowUpToLine } from "lucide-react";
import { publishEbook } from "@/lib/actions/ebooks";

export default function AddEbook() {
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [logoUrl, setLogoUrl] = useState('');
    const [errors, setErrors] = useState({});
    const { data: session } = useSession();
    const user = session?.user;
    const router = useRouter();

    const statuses = [
        { id: "available", label: "Available" },
        { id: "draft", label: "Draft" },
    ];

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Simple Validation
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const ebookData = {
            ...data,
            image: logoUrl,
            addedBy: user?.id,
            approved: 'Pending'
        };

        console.log("Submitting Ebook:", ebookData);

        const res = await publishEbook(ebookData);

        if (res.insertedId) {
            toast.success("Ebook published successfully! Wait for admin's approval.");
            e.target.reset();
            setIsLoading(false);
            redirect("/dashboard/writer");
        } else {
            toast.error("Something went wrong!");
            setIsLoading(false);
        }


        // Simulate API Call
        // setTimeout(() => {
        //     toast.success("Ebook published successfully!");
        //     setIsLoading(false);
        //     e.target.reset();
        //     router.push("/dashboard/writer/books");
        // }, 1500);
    };

    // Refactored to use semantic theme colors that adapt to Light/Dark mode
    const baseInputClass = "bg-default-100 border border-default-200 hover:border-default-300 focus-within:border-default-400 rounded-xl px-4 py-2.5 text-foreground shadow-none focus-visible:ring-0 placeholder:text-default-500 w-full transition-colors";
    const labelClass = "text-foreground font-medium pb-2 text-sm";

    return (
        <div className="w-full max-w-4xl mx-auto py-8 text-foreground">
            {/* Form Container */}
            <div className="bg-background border border-divider rounded-nome p-8 sm:p-10 shadow-sm">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
                        Publish a New Ebook
                    </h1>
                    <p className="text-default-500 text-sm">
                        Share your stories with readers around the world.
                    </p>
                </div>

                {/* Form */}
                <Form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">

                    {/* Book Title */}
                    <TextField isRequired name="title" className="w-full">
                        <Label className={labelClass}>Book Title</Label>
                        <Input placeholder="e.g. To Kill A Mockingbird" className={baseInputClass} />
                    </TextField>

                    {/* Genre & Price Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <TextField isRequired name="genre" className="w-full">
                            <Label className={labelClass}>Genre</Label>
                            <Input placeholder="Fantasy" className={baseInputClass} />
                        </TextField>

                        <TextField isRequired name="price" className="w-full">
                            <Label className={labelClass}>Price ($)</Label>
                            <Input type="number" step="0.01" placeholder="9.99" className={baseInputClass} />
                        </TextField>
                    </div>

                    {/* Cover Image URL */}
                    <div className="flex flex-col gap-1 w-full">
                        <span className="text-foreground font-medium text-sm">Cover Image</span>
                        <div className="flex items-center gap-4 mt-1">
                            <label className="w-14 h-14 border border-dashed border-foreground/90 hover:border-foreground bg-background/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={handleLogoUpload}
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

                    {/* Short Description */}
                    <TextField isRequired name="description" className="w-full">
                        <Label className={labelClass}>Short Description</Label>
                        <TextArea
                            rows={4}
                            placeholder="Write a compelling summary of your ebook..."
                            className={baseInputClass}
                        />
                    </TextField>


                    {/* Publishing Status */}
                    <div className="flex flex-col w-full">
                        <Label className={labelClass}>Publishing Status</Label>
                        <Select name="status" defaultSelectedKey="published" isRequired>
                            <Select.Trigger className={`${baseInputClass} min-h-11 flex items-center justify-between`}>
                                <Select.Value />
                                <Select.Indicator>
                                    <ChevronDown className="w-4 h-4 text-default-500" />
                                </Select.Indicator>
                            </Select.Trigger>
                            <Select.Popover className="bg-content1 border border-divider rounded-xl">
                                <ListBox items={statuses}>
                                    {(item) => (
                                        <ListBox.Item key={item.id} id={item.id} textValue={item.label} className="text-foreground hover:bg-default-100 rounded-lg px-3 py-2 cursor-pointer">
                                            {item.label}
                                        </ListBox.Item>
                                    )}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* Publishing As (Static Display) */}
                    <div className="flex flex-col mt-2">
                        <span className="text-sm text-default-500 mb-1">Publishing as</span>
                        <span className="text-sm font-semibold text-foreground">
                            {user?.name}
                        </span>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-end pt-4 mt-4 border-t border-divider">
                        <Button
                            type="submit"
                            isLoading={isLoading}
                            className="bg-foreground text-background font-medium hover:opacity-90 transition-opacity px-6 py-2.5 rounded-lg"
                        >
                            {isLoading ? <Spinner size="sm" color="current" /> : "Publish Ebook"}
                        </Button>
                    </div>

                </Form>
            </div>
        </div>
    );
}