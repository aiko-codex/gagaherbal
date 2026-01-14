import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-muted text-muted-foreground pt-12 pb-6 border-t font-sans">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Column 1: About */}
                    <div>
                        <Link href="/" className="inline-block mb-4">
                            <span className="font-serif text-2xl font-bold text-primary">
                                GagaHerbal
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-4">
                            Premium herbal products designed to enhance your natural well-being.
                            Ethically sourced and scientifically backed.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/shop" className="hover:text-primary transition-colors">
                                    Shop All
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-primary transition-colors">
                                    Health Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-primary transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Customer Care */}
                    <div>
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                            Customer Care
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/account" className="hover:text-primary transition-colors">
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <Link href="/track-order" className="hover:text-primary transition-colors">
                                    Track Order
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="hover:text-primary transition-colors">
                                    Shipping Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="hover:text-primary transition-colors">
                                    Returns & Refunds
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div>
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                            Contact Us
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0" />
                                <span>123 Herbal Street, Green Valley, NY 10012</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <span>support@gagaherbal.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>© {new Date().getFullYear()} GagaHerbal. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:text-primary transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
