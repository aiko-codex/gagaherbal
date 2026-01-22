"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingBag, User, X, ArrowRight, Leaf } from "lucide-react";
import { useStore } from "@/lib/store";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import AnnouncementBar from "@/components/ui/announcement-bar";

export default function Header() {
    const cart = useStore((state) => state.cart);
    const { status } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 10) {
                setIsVisible(true);
                lastScrollY.current = currentScrollY;
                return;
            }

            if (currentScrollY > lastScrollY.current) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Shop", href: "/shop", description: "Browse all products" },
        { name: "Our Story", href: "/our-story", description: "Our journey and values" },
        { name: "Founders' Note", href: "/founders-note", description: "From a Mother & Daughter" },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-sm transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                <AnnouncementBar />
                <div className="container mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
                    {/* Logo (Left) */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center p-2">
                            <Image
                                src="/images/new_logo.png"
                                alt="GagaHerbal"
                                width={200}
                                height={40}
                                className="h-14 w-auto"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Navigation (Center) - Desktop */}
                    <nav className="hidden lg:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[11px] uppercase tracking-[0.15em] font-medium text-foreground/70 hover:text-primary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions (Right) */}
                    <div className="flex items-center gap-4">
                        {/* Desktop Icons */}
                        <div className="hidden lg:flex items-center gap-5">
                            <Link href={status === "authenticated" ? "/profile" : "/login"} className="text-foreground/70 hover:text-secondary transition-colors">
                                <User className="h-5 w-5 stroke-[1.5]" />
                            </Link>
                            <Link href="/cart" className="relative text-foreground/70 hover:text-secondary transition-colors">
                                <ShoppingBag className="h-5 w-5 stroke-[1.5]" />
                                {cart.length > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-medium text-white">
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                        </div>

                        {/* Mobile Menu Trigger */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <Menu className="h-6 w-6 stroke-[1.5]" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <div
                className={`fixed top-0 right-0 bottom-0 z-[101] w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-out lg:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Menu Header */}
                    <div className="flex items-center justify-between px-8 py-6 border-b border-border/30">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                                <Leaf size={16} className="text-secondary" />
                            </div>
                            <span className="font-serif text-xl text-foreground">Menu</span>
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors"
                        >
                            <X size={20} strokeWidth={1.5} />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 overflow-y-auto px-6 py-8">
                        <div className="space-y-1">
                            {navLinks.map((link, index) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="group flex items-center justify-between py-4 border-b border-border/20 transition-all duration-300"
                                    style={{
                                        transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                                    }}
                                >
                                    <div>
                                        <span className="block text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                                            {link.name}
                                        </span>
                                        <span className="block text-sm text-muted-foreground mt-0.5">
                                            {link.description}
                                        </span>
                                    </div>
                                    <ArrowRight
                                        size={18}
                                        className="text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all"
                                    />
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* Menu Footer */}
                    <div className="px-8 py-6 border-t border-border/30 bg-muted/20">
                        <div className="flex items-center gap-3 mb-6">
                            <Link
                                href={status === "authenticated" ? "/profile" : "/login"}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-foreground/90 text-background rounded-full text-sm font-medium hover:bg-foreground transition-colors"
                            >
                                <User size={16} strokeWidth={1.5} />
                                {status === "authenticated" ? "My Profile" : "Sign In"}
                            </Link>
                            <Link
                                href="/cart"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-center gap-2 py-3.5 px-6 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-sm font-medium hover:bg-secondary/20 transition-colors relative"
                            >
                                <ShoppingBag size={16} strokeWidth={1.5} />
                                Cart
                                {cart.length > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-medium text-white">
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                        </div>
                        <p className="text-center text-xs text-muted-foreground">
                            © 2024 GagaHerbal. Crafted with 🌿
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
