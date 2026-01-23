"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500 ease-in-out ${isScrolled ? 'top-6' : 'top-0'
                }`}
        >
            <nav className={`flex items-center gap-6 px-6 py-3 transition-all duration-500 ${isScrolled
                    ? 'glass rounded-full shadow-2xl ring-1 ring-white/10'
                    : 'bg-transparent rounded-none shadow-none'
                }`}>
                <Link href="/" className="font-display text-lg font-bold tracking-wide gradient-gold hover:opacity-80 transition-opacity">
                    {profile.name}
                </Link>
                <div className="hidden h-4 w-px bg-white/10 md:block" />
                <div className="hidden items-center gap-6 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors ${pathname === link.href
                                    ? 'text-teal-400'
                                    : 'text-slate-400 hover:text-teal-300'
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
