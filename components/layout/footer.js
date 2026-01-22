"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Mail,
    MapPin,
    Phone,
    ArrowUp,
    Leaf,
} from "lucide-react";

export default function Footer() {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 500);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const quickLinks = [
        { name: "Shop All", href: "/shop" },
        { name: "Our Blends", href: "/category/blends" },
        { name: "About Us", href: "/about" },
        { name: "Journal", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ];

    const customerCare = [
        { name: "My Account", href: "/profile" },
        { name: "Track Order", href: "/orders" },
        { name: "Shipping Policy", href: "/shipping-policy" },
        { name: "Returns & Refunds", href: "/return-policy" },
        { name: "Cancellation Policy", href: "/refund-and-cancellation-policy" },
        { name: "FAQs", href: "/faqs" },
    ];

    const socialLinks = [
        { name: "Facebook", icon: Facebook, href: "#" },
        { name: "Instagram", icon: Instagram, href: "#" },
        { name: "Twitter", icon: Twitter, href: "#" },
        { name: "YouTube", icon: Youtube, href: "#" },
    ];

    return (
        <>
            <footer className="bg-zinc-900 text-white">
                {/* Main Footer Content */}
                <div className="container mx-auto px-4 md:px-6 py-16 md:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                        {/* Column 1: About Story */}
                        <div className="lg:col-span-1">
                            <Link href="/" className="inline-block mb-6">
                                <Image
                                    src="/images/logodark.png"
                                    alt="GagaHerbal"
                                    width={160}
                                    height={40}
                                    className="h-20 w-auto"
                                />
                            </Link>
                            <p className="text-white/80 leading-relaxed">
                                At GagaHerbal, we believe in the healing power of nature.
                                Every product is crafted with care using organic ingredients,
                                because your wellness journey deserves nothing less.{" "}
                                <Link href="/about" className="underline underline-offset-4 hover:text-white transition-colors">
                                    more info
                                </Link>
                            </p>

                            {/* Social Links */}
                            <div className="flex items-center gap-4 mt-8">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        aria-label={social.name}
                                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-secondary transition-all"
                                    >
                                        <social.icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Column 2: Quick Links */}
                        <div>
                            <h3 className="font-serif text-xl font-medium mb-6">Quick Links</h3>
                            <ul className="space-y-3">
                                {quickLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-white/80 hover:text-white transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Customer Care */}
                        <div>
                            <h3 className="font-serif text-xl font-medium mb-6">Customer Care</h3>
                            <ul className="space-y-3">
                                {customerCare.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-white/80 hover:text-white transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4: Contact Info */}
                        <div>
                            <h3 className="font-serif text-xl font-medium mb-6">Get in Touch</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <MapPin size={20} className="shrink-0 mt-0.5 text-white/60" />
                                    <span className="text-white/80">
                                        123 Herbal Street,<br />
                                        Green Valley, NY 10012
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone size={20} className="shrink-0 text-white/60" />
                                    <a href="tel:+15551234567" className="text-white/80 hover:text-white transition-colors">
                                        +1 (555) 123-4567
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail size={20} className="shrink-0 text-white/60" />
                                    <a href="mailto:hello@gagaherbal.com" className="text-white/80 hover:text-white transition-colors">
                                        hello@gagaherbal.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10">
                    <div className="container mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/60 text-sm">
                            © {new Date().getFullYear()} GagaHerbal. Crafted with 🌿
                        </p>
                        <div className="flex items-center gap-6 text-sm">
                            <Link href="/privacy-policy" className="text-white/60 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms-and-condition" className="text-white/60 hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-zinc-900 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-zinc-800 ${showBackToTop
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
            >
                <ArrowUp size={20} />
            </button>
        </>
    );
}
