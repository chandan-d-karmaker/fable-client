"use client";

import React from 'react';
import { authClient } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, Card, FieldError, Form, Input, InputGroup, Label, Spinner, TextField } from "@heroui/react";
import { useState, Suspense } from "react";
import { Description, Radio, RadioGroup } from "@heroui/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from 'next/image';
import welcome from '@/assets/Login.svg'


function SignupContent() {
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState('');
    const [role, setRole] = useState("reader");
    const router = useRouter();
    const searchParams = useSearchParams();
    // const redirectTo = searchParams.get("redirect") || "/"

    const handleGoogleSignIn = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/onboarding",
        });
        if (error) {
            toast.error(error.message);
            return;
        } else {
            toast.success("Redirecting to google!");
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());

        console.log(userData);

        // userData.role = role;
        
        const { data, error } = await authClient.signUp.email({
            ...userData,
        });
        
        console.log("signup data", { data, error });
        const role = data?.user?.role;

        if (error) {
            toast.error(error.message)
        } else {
            toast.success("Signup Successfull!");
            if(role === 'admin'){
                window.location.href = '/dashboard/admin';
            } else if(role === 'writer'){
                window.location.href = '/dashboard/writer';
            } else {
                window.location.href = '/';
            }
        }

        // const role = data?.user?.role;
        // Role based redirection commented out based on your snippet
    };

    return (
        <div className="flex min-h-screen items-center justify-around bg-background px-4 text-foreground">
            <Card className="w-full max-w-md p-6 rounded-none shadow-sm border border-default">

                {/* Header Container */}
                <div className="flex flex-col items-center justify-center gap-1 pb-4 border-b border-foreground/70 mb-6 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">Create an Fable account</h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Fill in the fields below to get started</p>
                </div>

                <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                    {
                        error && <div className="alert alert-error text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    }

                    <TextField isRequired className="w-full max-w-64" name="name" type="text">
                        <Label>Name</Label>
                        <Input className='rounded-none border border-foreground/20' placeholder="Enter your name" />
                    </TextField>

                    <TextField
                        className='max-w-64 w-full'
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input className='rounded-none' placeholder="john@example.com" />
                        <FieldError />
                    </TextField>

                    <TextField isRequired className="w-full max-w-64" name="password">
                        <Label>Password</Label>
                        <InputGroup>
                            <InputGroup.Input
                                className="w-full max-w-64 border border-foreground/20"
                                type={isVisible ? "text" : "password"}
                            />
                            <InputGroup.Suffix className="pr-0 rounded-none">
                                <Button
                                    isIconOnly
                                    aria-label={isVisible ? "Hide password" : "Show password"}
                                    size="sm"
                                    variant="ghost"
                                    onPress={() => setIsVisible(!isVisible)}
                                >
                                    {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                                </Button>
                            </InputGroup.Suffix>
                        </InputGroup>
                    </TextField>


                    <Label>What you want to do?</Label>
                    <RadioGroup
                        onValueChange={setRole}
                        defaultValue={role} name="role" orientation="horizontal">
                        <Radio value="reader">
                            <Radio.Content>
                                <Radio.Control>
                                    <Radio.Indicator />
                                </Radio.Control>
                                Reader
                            </Radio.Content>
                            <Description>To read books</Description>
                        </Radio>
                        <Radio value="writer">
                            <Radio.Content>
                                <Radio.Control>
                                    <Radio.Indicator />
                                </Radio.Control>
                                Writer
                            </Radio.Content>
                            <Description>For publishing ebooks</Description>
                        </Radio>
                    </RadioGroup>

                    {/* {`/auth/login?redirect=${redirectTo}`} */}
                    <Link href={`/auth/login`}>
                        <p>Already a member? <span className='text-blue-500'>Login now!</span> </p>
                    </Link>

                    <div className="flex gap-2 w-full">
                        <Button type="submit" className="w-full rounded-none">
                            Sign Up
                        </Button>


                        <Button variant="secondary" className="w-full rounded-none" onClick={handleGoogleSignIn}>
                            Sign up with google
                        </Button>

                        <Button type="reset" className="rounded-none" variant="secondary">
                            Reset
                        </Button>
                    </div>
                </Form>
            </Card>
            <div className='hidden md:block'>
                <Image src={welcome} alt='signup-img' width={500} height={500}></Image>
            </div>
        </div>
    );
}

// 2. Wrap the component in Suspense for the default export
export default function Signup() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><Spinner /></div>}>
            <SignupContent />
        </Suspense>
    );
}