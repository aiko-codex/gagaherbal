"use client";

import React from "react";
import { Leaf, Sparkles, Sprout, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OurStoryPage() {
    return (
        <div className="bg-background min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-[180px] pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {/* Background pattern or subtle gradient can go here */}
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/5 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center p-3 rounded-full bg-secondary/10 mb-8 fade-in-up">
                            <Leaf size={20} className="text-secondary" />
                        </div>
                        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal text-foreground leading-[1.1] mb-12 tracking-tight fade-in-up delay-100">
                            Gaga Herbal was born from a <span className="italic text-secondary">simple question</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto fade-in-up delay-200">
                            Why does skincare have to choose between tradition and results?
                        </p>
                    </div>
                </div>
            </section>

            {/* The Two Truths Section */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center max-w-5xl mx-auto">
                        <div className="order-2 md:order-1 relative">
                            <div className="aspect-[4/5] bg-secondary/5 rounded-2xl overflow-hidden relative">
                                {/* Placeholder for an image representing 'Tradition' */}
                                <div className="absolute inset-0 flex items-center justify-center text-secondary/20">
                                    <Sprout size={64} strokeWidth={1} />
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
                                Across generations, we saw <span className="italic">two truths.</span>
                            </h2>
                            <div className="space-y-8">
                                <div className="pl-6 border-l-2 border-secondary/30">
                                    <h3 className="font-serif text-xl text-foreground mb-2">The Mother</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Who trusted nature, rituals, and time-tested herbs.
                                    </p>
                                </div>
                                <div className="pl-6 border-l-2 border-primary/30">
                                    <h3 className="font-serif text-xl text-foreground mb-2">The Daughter</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Who grew up in a world of fast trends, stronger formulas, and louder promises.
                                    </p>
                                </div>
                            </div>
                            <p className="mt-10 text-lg font-medium text-foreground/80 italic">
                                Somewhere in between, Indian skin was being misunderstood.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Vision Section */}
            <section className="py-32">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-4xl mx-auto text-center space-y-12">
                        <h2 className="font-serif text-4xl md:text-6xl text-foreground leading-tight">
                            So we created <br /> <span className="text-secondary">Gaga Herbal</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed">
                            Where heritage meets high performance, and care feels luxurious, not complicated.
                        </p>
                        <div className="w-24 h-px bg-border mx-auto"></div>
                        <p className="text-lg text-muted-foreground leading-loose max-w-2xl mx-auto">
                            Our formulations blend potent herbal actives with modern science to nourish, protect, and elevate Indian skin in all its tones and textures.
                        </p>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-24 bg-foreground text-background relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    {/* Decorative pattern */}
                    <div className="absolute right-0 bottom-0 p-20 transform translate-x-1/2 translate-y-1/2 border-2 border-white/20 rounded-full w-[600px] h-[600px]"></div>
                </div>

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <Sparkles className="w-10 h-10 text-secondary mx-auto mb-8" />
                        <blockquote className="font-serif text-3xl md:text-5xl leading-tight mb-12">
                            "Because real beauty isn’t about changing yourself. It’s about showing up as yourself — confident, cared for, and rooted."
                        </blockquote>

                        <div className="font-sans text-sm md:text-base tracking-[0.2em] uppercase text-white/60 mb-16">
                            Gaga Herbal • Modern Desi Luxury • Made to Last
                        </div>

                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-foreground text-sm uppercase tracking-widest font-medium hover:bg-secondary hover:text-white transition-all duration-300"
                        >
                            Start Your Journey
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
