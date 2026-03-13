"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { profile } from "../data/portfolio";
import { Menu, X } from "lucide-react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/research-group", label: "Research" },
    { href: "/publications", label: "Publications" },
    { href: "/projects", label: "Projects" },
    { href: "/teaching", label: "Teaching" },
    { href: "/administrative", label: "Admin" },
    { href: "/gallery", label: "Gallery" },
] as const;

interface NavigationProps {
    currentPage?: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const activePage = currentPage || pathname;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled 
                ? 'bg-background/80 backdrop-blur-md border-b border-border-subtle h-16' 
                : 'bg-transparent h-24'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                <Link href="/" className="font-serif text-xl md:text-2xl font-bold tracking-tighter group">
                    MK<span className="text-accent-teal group-hover:animate-pulse">.</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-accent-teal ${
                                activePage === link.href
                                ? 'text-accent-teal'
                                : 'text-slate-500'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Toggle */}
                <button 
                    className="lg:hidden p-2 text-slate-500 hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border-subtle p-8 animate-fadeIn shadow-2xl">
                    <nav className="flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`text-2xl font-serif font-bold ${
                                    activePage === link.href ? 'text-accent-teal' : 'text-foreground'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
