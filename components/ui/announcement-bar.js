"use client";

import { useState } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AnnouncementBar() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-foreground/[0.03] border-b border-border/30">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex items-center justify-center py-2.5 relative">
                    {/* Main Content */}
                    <div className="flex items-center gap-3 text-sm">
                        <span className="hidden sm:flex items-center justify-center w-5 h-5 rounded-full bg-secondary/20">
                            <Sparkles size={12} className="text-secondary" />
                        </span>
                        <p className="text-muted-foreground tracking-wide">
                            <span className="font-medium text-foreground">Free shipping</span>
                            {" "}on all orders over ₹499
                        </p>
                        <Link
                            href="/shop"
                            className="hidden md:inline-flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all duration-300"
                        >
                            Shop now
                            <ArrowRight size={14} />
                        </Link>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute right-0 p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors"
                        aria-label="Close announcement"
                    >
                        <X size={14} strokeWidth={1.5} />
                    </button>
                </div>
            </div>
        </div>
    );
}
