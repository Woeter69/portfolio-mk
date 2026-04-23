"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "../data/portfolio";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/publications", label: "Publications" },
    { href: "/research-group", label: "Research Group" },
    { href: "/projects", label: "Projects" },
    { href: "/gallery", label: "Gallery" },
    { href: "/administrative", label: "Administrative" },
    { href: "/teaching", label: "Teaching" },
] as const;

interface NavigationProps {
    currentPage?: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
    const pathname = usePathname();
    const activePage = currentPage || pathname;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F19] border-b border-[#1E2A3A]">
            <nav className="mx-auto max-w-5xl px-6 flex h-20 items-center justify-between">
                <Link href="/" className="font-display text-2xl font-bold text-white hover:text-[#E8C547] transition-colors duration-200">
                    {profile.name}
                </Link>
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm transition-colors duration-200 ${
                                activePage === link.href
                                    ? "text-[#E8C547] font-medium"
                                    : "text-slate-400 hover:text-[#E8C547]"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
}