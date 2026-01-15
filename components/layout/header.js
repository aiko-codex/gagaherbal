"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, User, Search, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { useStore } from "@/lib/store";
import { useSession, signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Header() {
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
                    {/* Mobile Menu - Using Shadcn Sheet */}
                    <Sheet>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon" className="-ml-2">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-72 p-6" usePortal={false}>
                            <nav className="flex flex-col gap-4 mt-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-lg font-medium text-foreground py-2 border-b border-border/50 last:border-0 hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                {status === "authenticated" ? (
                                    <>
                                        <Link href="/dashboard" className="text-lg font-medium text-foreground py-2 hover:text-primary">
                                            My Dashboard
                                        </Link>
                                        <button onClick={() => signOut()} className="text-left text-lg font-medium text-red-600 py-2">
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <Link href="/login" className="text-lg font-medium text-foreground py-2 hover:text-primary">
                                        Login / Register
                                    </Link>
                                )}
                            </nav>
                        </SheetContent>
                    </Sheet>

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
                    <div className="flex flex-1 justify-end items-center gap-2 md:gap-4">
                        <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                            <Search className="h-5 w-5" />
                        </Button>

                        {status === "authenticated" ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="relative">
                                        <User className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" sideOffset={8} usePortal={false} className="w-56">
                                    <DropdownMenuLabel>
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium">{session.user.name}</p>
                                            <p className="text-xs text-muted-foreground">{session.user.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard" className="cursor-pointer">
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            My Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    {(session.user.role === "SUPER_ADMIN" || session.user.role === "STAFF") && (
                                        <DropdownMenuItem asChild>
                                            <Link href="/admin/dashboard" className="cursor-pointer">
                                                <Settings className="mr-2 h-4 w-4" />
                                                Admin Panel
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => signOut({ callbackUrl: "/" })}
                                        className="text-red-600 focus:text-red-600 cursor-pointer"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="/login">
                                    <User className="h-5 w-5" />
                                </Link>
                            </Button>
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
        </header>
    );
}
