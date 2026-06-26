'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const SideNavLink = ({ href, children, className }) => {
    const pathname = usePathname();

    const isActive = pathname === href;

    return <Link href={href} className={`${isActive? 'font-semibold bg-default border-b-2 border-gray-500' : ''} ${className}`}>{children}</Link>
};

export default SideNavLink;