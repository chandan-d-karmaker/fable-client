"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Card, RadioGroup, Radio, Spinner, Description } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Onboarding() {
    const [role, setRole] = useState("reader");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSaveRole = async () => {
        setIsLoading(true);

        // Update the user's role in Better Auth
        const { data, error } = await authClient.updateUser({
            role: role
        });

        if (error) {
            toast.error(error.message);
            setIsLoading(false);
            return;
        }

        toast.success("Profile updated!");
        router.push("/"); // Or wherever they should go next
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Card className="max-w-md p-6 w-full text-center">
                <h1 className="text-2xl font-bold mb-2">Welcome to Fable!</h1>
                <p className="text-zinc-500 mb-6">How do you want to use the platform?</p>

                <RadioGroup
                    onChange={setRole}
                    defaultValue={role} name="role" orientation="horizontal" className='flex items-center justify-center mb-4'>
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

                <Button
                    onClick={handleSaveRole}
                    isLoading={isLoading}
                    className="w-full bg-blue-600 text-white"
                >
                    {isLoading ? <Spinner /> : 'Continue'}
                </Button>
            </Card>
        </div>
    );
}