'use client'
import { useState } from "react";
import { Avatar, Button } from "@heroui/react";
import NavLink from "./Navlink";
import logo from "@/assets/logo.png"
import Image from "next/image";
import Link from "next/link";
import ThemeSwitcher from "./theme-toggle";
import { authClient, signOut, useSession } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const router = useRouter();

    const { data } = useSession();
    const user = data?.user;

    const menuItems = [
        { name: "Home", href: "/" },
        { name: "Ebooks", href: "/ebooks" }
    ];

    const dashboardLinks = {
        reader: '/dashboard/reader',
        writer: '/dashboard/writer',
        admin: '/dashboard/admin'
    }

    if (user?.email) {
        menuItems.push(
            {
                name: 'Dashboard',
                href: dashboardLinks[user?.role || 'reader']
            }
        )
    }

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/');
                    window.location.href='/';
                }
            }
        });
    }

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
            <header className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center h-16 border-x px-4 gap-4">
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
                <div className="hidden border-x h-16 p-2 md:flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <ul className="hidden items-center gap-1 md:flex">
                            {menuItems.map((item, index) => (
                                <li key={index} className="px-1">
                                    <Button variant="ghost">
                                        <Link
                                            href={item.href}
                                            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    </Button>
                                </li>
                            ))}
                            {user ? <li>
                                <Button variant="outline" className='rounded-none' onClick={handleLogout}>
                                    Log out
                                </Button>
                            </li> : <li>
                                <Button variant="outline" className='rounded-none'>
                                    <Link href='/auth/login'>
                                        Log in
                                    </Link>
                                </Button>
                            </li>}
                            {!user && <li>
                                <Button variant="primary" className='rounded-none'>
                                    <Link href='/auth/signup'>
                                        Get Started
                                    </Link>
                                </Button>
                            </li>}
                        </ul>
                        {
                            user && <div>
                                <Avatar>
                                    <Avatar.Image alt={user?.name} src={user?.image} />
                                    <Avatar.Fallback>{user.name[0]}</Avatar.Fallback>
                                </Avatar>
                            </div>
                        }

                        <ThemeSwitcher />
                    </div>

                    {/* <div className="h-5 w-px bg-gray-700/80"></div> */}
                </div>
            </header>


            {/* responsive mobile menu */}
            {isMenuOpen && (
                <div className="border-t border-separator md:hidden">
                    <ul className="flex flex-col gap-2 p-4">
                        {menuItems.map((item, index) => (
                            <li key={index} className="px-1">
                                <Link
                                    href={item.href}
                                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        {user ? <li>
                            <Button variant="outline" className='rounded-none' onClick={() => signOut()}>
                                Log out
                            </Button>
                        </li> : <li>
                            <Button variant="outline" className='rounded-none'>
                                <Link href='/auth/login'>
                                    Log in
                                </Link>
                            </Button>
                        </li>}
                        {!user && <li>
                            <Button variant="primary" className='rounded-none'>
                                <Link href='/auth/signup'>
                                    Get Started
                                </Link>
                            </Button>
                        </li>}
                        {
                            <div className="flex items-center gap-2">
                                {user && <div>
                                    <Avatar>
                                        <Avatar.Image alt={user?.name} src={user?.image} />
                                        <Avatar.Fallback>{user.name[0]}</Avatar.Fallback>
                                    </Avatar>
                                </div>}

                                <ThemeSwitcher />
                            </div>

                        }
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;