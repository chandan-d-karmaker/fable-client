import Image from "next/image";
import Link from "next/link";

import { FaFacebook } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Logo from "@/assets/logo.png";

export default function Footer() {
    const footerLinks = {
        product: [
            { name: "Job discovery", href: "#" },
            { name: "Worker AI", href: "#" },
            { name: "Companies", href: "#" },
            { name: "Salary data", href: "#" },
        ],
        navigations: [
            { name: "About", href: "#" },
            { name: "Privacy Policy", href: "#" },
            { name: "Contact", href: "#" },
        ]
    };

    return (
        <footer className="w-full bg-background pt-16 pb-8 px-5 sm:px-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                {/* Top Section: Branding & Links */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">

                    {/* Left Column: Logo & Tagline */}
                    <div className="lg:col-span-2 flex items-center gap-5">
                        <Image src={Logo} alt='logo' height={50} width={50}></Image>
                        <p className="text-[#a2a1a1] text-sm leading-relaxed max-w-xs pr-4">
                            Ebook Sharing Platform
                        </p>
                    </div>

                    {/* Right Columns: Links */}
                    <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {/* Product Column */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[#4F46E5] font-medium mb-2">Product</h3>
                            <ul className="flex flex-col gap-3">
                                {footerLinks.product.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-[#908f8f] hover:text-white transition-colors text-sm">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Navigations Column */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[#4F46E5] font-medium mb-2">Navigations</h3>
                            <ul className="flex flex-col gap-3">
                                {footerLinks.navigations.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-[#908f8f] hover:text-white transition-colors text-sm">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* newslatter section */}
                        <div className="flex flex-col gap-4 col-span-3 md:col-span-1">
                            <h3 className="text-[#4F46E5] font-medium mb-2">Newsletter</h3>
                            <p className="text-[#908f8f] text-sm leading-relaxed">
                                Subscribe to get the latest updates and new ebook releases.
                            </p>
                            <form className="flex flex-col gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    className="w-full bg-[#111111] border border-white/10 text-white text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-[#4F46E5] transition-colors"
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
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4">

                    {/* Social Icons (Gravity UI) */}
                    <div className="flex items-center gap-3">
                        {/* Facebook */}
                        <a href="#" className="flex items-center justify-center w-9 h-9 rounded-md bg-[#111111] text-[#737373] hover:text-white hover:bg-gray-800 transition-colors" aria-label="Facebook">
                            <FaFacebook />
                        </a>

                        {/* Pinterest */}
                        <a href="#" className="flex items-center justify-center w-9 h-9 rounded-md bg-[#111111] text-white hover:bg-[#4338ca] transition-colors" aria-label="Pinterest">
                            <FaPinterest />
                        </a>

                        {/* LinkedIn */}
                        <a href="#" className="flex items-center justify-center w-9 h-9 rounded-md bg-[#111111] text-[#737373] hover:text-white hover:bg-gray-800 transition-colors" aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                    </div>

                    {/* Copyright Text */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-sm text-[#525252]">
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