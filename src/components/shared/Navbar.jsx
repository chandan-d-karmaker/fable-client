'use client'
import { useState } from "react";
import { Button } from "@heroui/react";
import NavLink from "./Navlink";
import logo from "@/assets/logo.png"
import Image from "next/image";
import Link from "next/link";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { name: "Home", href: "/" },
        { name: "Ebooks", href: "/ebooks" }
    ];

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
            <header className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className="sr-only">Menu</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                    <Link href="/">
                        <div className="flex gap-1 items-center">
                            <Image src={logo} alt="fable-icon" width={40} height={40}>
                            </Image>
                            <p className="font-mono tracking-wider font-semibold">Fable</p>
                        </div>
                    </Link>
                </div>

                {/* desktop menu */}
                <div className="border p-2 rounded-2xl flex items-center justify-between">
                    <div>
                        <ul className="hidden items-center gap-4 md:flex">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        className="text-sm font-medium text-foreground/80 hover:text-white transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Button variant="outline">
                                    <Link href='/auth/login'>
                                        Log in
                                    </Link>
                                </Button>
                            </li>
                            <li>
                                <Button variant="primary">
                                    <Link href='/auth/signup'>
                                        Get Started
                                    </Link>
                                </Button>
                            </li>
                        </ul>
                    </div>
                    {/* <div className="h-5 w-px bg-gray-700/80"></div> */}

                </div>
            </header>


            {/* responsive mobile menu */}
            {isMenuOpen && (
                <div className="border-t border-separator md:hidden">
                    <ul className="flex flex-col gap-2 p-4">
                        <li>
                            <NavLink href="#" className="block py-2">
                                Features
                            </NavLink>
                        </li>
                        <li>
                            <NavLink href="#" className="block py-2">
                                Pricing
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;