'use client'
import React, { useState, Suspense } from 'react';
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import { Button, Card, FieldError, Form, Input, InputGroup, Label, TextField } from "@heroui/react";
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import welcome from '@/assets/Login.svg'
import Image from 'next/image';
import { BsGoogle } from 'react-icons/bs';

// 1. Move your main logic into a separate component
const LoginContent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();
    const searchParams = useSearchParams();
    // const redirectTo = searchParams.get("redirect") || '/';

    const handleGoogleSignIn = async () => {
        const { data, error } = await authClient.signIn.social({
            provider: "google",
        });
        if (error) {
            toast.error(error.message);
            return;
        } else {
            toast.success("Redirecting to google!");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            ...userData,
            // callbackURL: '/',
        });

        console.log("Login user data:", data)

        if (error) {
            setError(error.message);
            return;
        } else {
            toast.success("Logged in successfully!");
            window.location.href = '/';
            // router.push(redirectTo);
        }

        // const role = data?.user?.role;
        // Role based redirection commented out based on your snippet
    }

    return (
        <div className="flex min-h-screen items-center justify-around bg-background px-4">
            <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">

                {/* Header Container */}
                <div className="flex flex-col items-center justify-center gap-1 pb-6 border-b border-zinc-100 dark:border-zinc-800 mb-6 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                        Welcome back <br />
                        Log into your account</h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Fill in the fields below to get started</p>
                </div>

                <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {
                        error && <div className="alert alert-error rounded-lg text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    }

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
                        <Input placeholder="john@example.com" />
                        <FieldError />
                    </TextField>

                    <TextField className="w-full max-w-64" name="password">
                        <Label>Password</Label>
                        <InputGroup>
                            <InputGroup.Input
                                className="w-full max-w-64 rounded-xl"
                                type={isVisible ? "text" : "password"}
                            />
                            <InputGroup.Suffix className="pr-0">
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

                    {/* `/auth/signup?redirect=${redirectTo}` */}
                    <Link href={`/auth/signup?`}>
                        <p>Not a member? <span className='text-blue-500'>Register Now</span> </p>
                    </Link>

                    <div className="flex items-center gap-2 w-full">
                        <Button type="submit" className="w-full">
                            Login
                        </Button>

                        <div className="h-5 w-px bg-gray-700/80"></div>

                        <Button variant="secondary" onClick={handleGoogleSignIn}>
                            <BsGoogle/>
                        </Button>
                        <Button type="reset" variant="secondary">
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
};

// 2. Wrap the component in Suspense for the default export
const LoginPage = () => {
    return (
        // You can customize the fallback UI to be a spinner or skeleton loader
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
            <LoginContent />
        </Suspense>
    );
};

export default LoginPage;