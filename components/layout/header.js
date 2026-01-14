"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, User, Search } from "lucide-react";
import { useStore } from "@/lib/store";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cart = useStore((state) => state.cart);
    const { data: session, status } = useSession();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/shop" },
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header
            className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled
                ? "bg-white/80 backdrop-blur-md shadow-sm border-b"
                : "bg-white border-b"
                }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">
                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 -ml-2 text-foreground"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>

                    {/* Logo */}
                    <div className="flex lg:flex-1 justify-center md:justify-start">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="font-serif text-2xl font-bold tracking-tight text-primary">
                                GagaHerbal
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-6 lg:gap-8 mx-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Icons */}
                    <div className="flex flex-1 justify-end items-center gap-4">
                        <button className="hidden sm:block p-2 text-foreground/80 hover:text-primary transition-colors">
                            <Search className="h-5 w-5" />
                        </button>

                        {status === "authenticated" ? (
                            <div className="relative group">
                                <button className="p-2 text-foreground/80 hover:text-primary transition-colors flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    <span className="hidden lg:inline text-sm font-medium">
                                        {session.user.name?.split(" ")[0]}
                                    </span>
                                </button>
                                {/* Dropdown */}
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-lg shadow-lg py-1 hidden group-hover:block">
                                    <div className="px-4 py-2 border-b text-sm text-muted-foreground">
                                        {session.user.email}
                                    </div>
                                    <button
                                        onClick={() => signOut()}
                                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="p-2 text-foreground/80 hover:text-primary transition-colors"
                            >
                                <User className="h-5 w-5" />
                            </Link>
                        )}

                        <Link
                            href="/cart"
                            className="relative p-2 text-foreground/80 hover:text-primary transition-colors"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {cart.length > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-primary rounded-full">
                                    {cart.length}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden border-t bg-white relative z-50 shadow-lg">
                    <nav className="flex flex-col p-4 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-base font-medium text-foreground py-2 border-b border-border/50 last:border-0"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/login"
                            className="text-base font-medium text-foreground py-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            My Account
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
