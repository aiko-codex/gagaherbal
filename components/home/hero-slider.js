"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative w-full min-h-screen overflow-hidden pt-[120px]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/hero/hero_bg_1.png"
                    alt="Herbal tea fields"
                    className="w-full h-full object-cover"
                />
                {/* Soft gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 md:px-12 h-full min-h-[calc(100vh-120px)] flex items-center relative z-10">
                <div className="max-w-2xl py-16">
                    <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal text-white leading-[1.15] mb-6 tracking-tight">
                        Enjoy pure refreshment and harmony with our eco-friendly tea blends
                    </h1>
                    <p className="text-base md:text-lg text-white/85 font-light max-w-lg mb-10 leading-relaxed">
                        Our teas are lovingly crafted in harmony with nature and people, inviting you to embrace moments of clarity, calm, and personal wellbeing.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-foreground text-sm uppercase tracking-widest font-medium hover:bg-secondary hover:text-white transition-all duration-300"
                    >
                        Browse Our Blends
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
