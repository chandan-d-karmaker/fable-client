"use client";

import Link from "next/link";
import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";
import { Button } from "@heroui/react";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md w-full space-y-8 border p-6">

        {/* Icon & Error Code */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="rounded-full border border-black/10 dark:border-white/10 p-5">
            <ShieldAlert className="h-10 w-10 text-black dark:text-white" strokeWidth={1.5} />
          </div>

          <div className="space-y-1">
            <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white">
              401
            </h1>
            <h2 className="text-xl font-medium text-black/80 dark:text-white/80">
              Unauthorized Access
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground/6 leading-relaxed px-4">
          You don&apos;t have permission to access this page. Please sign in with an authorized account or return home.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/auth/login">
            <Button
              variant="primary"
              className="w-full sm:w-auto"
            >
              <LogIn className="h-4 w-4" /> Sign In
            </Button>
          </Link>

          <Link href='/'>
            <Button
              variant="bordered"
              className="w-full sm:w-auto border-foreground/50 text-foreground hover:bg-foreground/50"
            >
              <ArrowLeft className="h-4 w-4" /> Go Back Home
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}