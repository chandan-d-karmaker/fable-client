import Image from "next/image";
import Link from "next/link";

import { FaFacebook } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Logo from "@/assets/logo.png";

export default function Footer() {
    const footerLinks = {
        product: [
            { name: "Admins", href: "#" },
            { name: "Developer", href: "#" },
            { name: "Company", href: "#" },
        ],
        navigations: [
            { name: "About", href: "#" },
            { name: "Privacy Policy", href: "#" },
            { name: "Contact", href: "#" },
        ]
    };

    return (
        <footer className="w-full bg-background py-10 border-t border-backgroud/50">
            <div className="">
                {/* Top Section: Branding & Links */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 mb-16">

                    {/* Left Column: Logo & Tagline */}
                    <div className="lg:col-span-2 lg:mx-0 mx-auto flex items-center gap-5 p-4 md:border lg:border-l-0">
                        <Image src={Logo} alt='logo' height={50} width={50} className="md:w-25"></Image>
                        <p className="text-[#a2a1a1] text-sm leading-relaxed max-w-xs pr-4">
                            Fable is a digital platform that connects ebook lovers, readers, and collectors with talented writers. The platform allows users to browse, discover, and read original ebooks. Writers can upload and manage their creations after a one-time verification payment, while an admin oversees the entire system.
                        </p>
                    </div>

                    {/* Right Columns: Links */}
                    <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 border-y">
                        {/* Product Column */}
                        <div className="flex flex-col gap-4 md:border-r lg:border-l p-6">
                            <h3 className="text-[#4F46E5] font-medium mb-2">Product</h3>
                            <ul className="flex flex-col gap-3">
                                {footerLinks.product.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-[#908f8f] hover:text-foreground/80  transition-colors text-sm">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Navigations Column */}
                        <div className="flex flex-col gap-4 md:border-r p-6">
                            <h3 className="text-[#4F46E5] font-medium mb-2">Navigations</h3>
                            <ul className="flex flex-col gap-3">
                                {footerLinks.navigations.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-[#908f8f] hover:text-foreground/80 transition-colors text-sm">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* newslatter section */}
                        <div className="flex flex-col gap-4 col-span-3 md:col-span-1 p-6">
                            <h3 className="text-[#4F46E5] font-medium mb-2">Newsletter</h3>
                            <p className="text-[#908f8f] text-sm leading-relaxed">
                                Subscribe to get the latest updates and new ebook releases.
                            </p>
                            <form className="flex flex-col gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    className="w-full bg-background border border-foreground/10 text-foreground text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-[#4F46E5] transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-[#4F46E5] hover:bg-[#4338ca] text-white text-sm font-medium py-2.5 rounded-md transition-colors"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Socials & Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-4 border-y">

                    {/* Social Icons (Gravity UI) */}
                    <div className="flex items-center gap-3 md:pl-5">
                        {/* Facebook */}
                        <a href="#" className="flex items-center justify-center w-9 h-9 rounded-md border border-foreground/50 bg-backgroud text-foreground hover:text-background hover:bg-gray-800 transition-colors" aria-label="Facebook">
                            <FaFacebook />
                        </a>

                        {/* Pinterest */}
                        <a href="#" className="flex items-center justify-center w-9 h-9 rounded-md border border-foreground/50 bg-backgroud text-foreground hover:text-background hover:bg-gray-800 transition-colors" aria-label="Pinterest">
                            <FaPinterest />
                        </a>

                        {/* LinkedIn */}
                        <a href="#" className="flex items-center justify-center w-9 h-9 rounded-md border border-foreground/50 bg-backgroud text-foreground hover:text-background hover:bg-gray-800 transition-colors" aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                    </div>

                    {/* Copyright Text */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-sm text-[#525252] md:pr-5">
                        <p>Copyright 2026 — Fable</p>
                        <p className="hidden sm:block">|</p>
                        <div className="flex gap-1">
                            <Link href="#" className="hover:text-white transition-colors">Terms & Policy</Link>
                            <span>-</span>
                            <Link href="#" className="hover:text-white transition-colors">Privacy Guideline</Link>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}