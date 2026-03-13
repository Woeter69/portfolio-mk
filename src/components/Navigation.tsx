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

interface NavigationProps {
    currentPage?: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    // Use currentPage prop if provided, otherwise use pathname
    const activePage = currentPage || pathname;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500 ease-in-out ${isScrolled ? 'top-6' : 'top-4'
                }`}
        >
            <nav className={`flex items-center gap-6 px-8 py-4 transition-all duration-500 ${isScrolled
                ? 'bg-slate-900/80 backdrop-blur-2xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] ring-1 ring-white/20 border border-white/10'
                : 'bg-slate-900/40 backdrop-blur-xl rounded-full shadow-lg ring-1 ring-white/10 border border-white/5'
                }`}>
                <Link href="/" className="font-display text-lg font-bold tracking-wide gradient-gold hover:opacity-80 transition-opacity">
                    {profile.name}
                </Link>
                <div className="hidden h-4 w-px bg-white/20 md:block" />
                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-xs font-bold uppercase tracking-widest transition-all relative group ${activePage === link.href
                                ? 'text-teal-400'
                                : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {link.label}
                            {/* Animated Active Indicator */}
                            {activePage === link.href && (
                                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-teal-400 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
                            )}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
}
