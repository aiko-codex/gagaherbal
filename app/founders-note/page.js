"use client";

import React from "react";
import { Quote, Sparkles, Heart } from "lucide-react";

export default function FoundersNotePage() {
    return (
        <div className="bg-background min-h-screen">
            {/* Hero Section - The Origin */}
            <section className="pt-[200px] pb-24 relative overflow-hidden">
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center p-4 rounded-full bg-secondary/10 mb-8 animate-fade-in-up">
                            <Heart size={24} className="text-secondary fill-secondary/20" />
                        </div>
                        <h1 className="font-serif text-5xl md:text-7xl text-foreground mb-6 Tracking-tight leading-[1.1] fade-in-up delay-100">
                            Founders’ Note
                        </h1>
                        <p className="font-serif text-2xl md:text-3xl text-secondary italic fade-in-up delay-200">
                            From a Mother & Daughter
                        </p>
                        <div className="w-24 h-px bg-border mx-auto my-12 fade-in-up delay-200"></div>
                        <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto fade-in-up delay-200">
                            <span className="font-serif text-foreground font-normal block mb-4 text-2xl">Gaga Herbal is deeply personal to us.</span>
                            It began with a mother’s instinct to nurture and a daughter’s need to question.
                        </p>
                    </div>
                </div>
            </section>

            {/* The Two Worlds Section */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
                            <div className="bg-white p-10 md:p-12 rounded-2xl shadow-sm border border-border/40 h-full">
                                <div className="text-secondary opacity-20 mb-6">
                                    <Quote size={48} />
                                </div>
                                <h3 className="font-serif text-2xl text-foreground mb-4">The Roots</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    One of us grew up trusting herbal remedies and rituals. Deeply connected to nature, understanding the slow, healing power of plants.
                                </p>
                            </div>
                            <div className="bg-white p-10 md:p-12 rounded-2xl shadow-sm border border-border/40 h-full">
                                <div className="text-primary opacity-20 mb-6">
                                    <Quote size={48} />
                                </div>
                                <h3 className="font-serif text-2xl text-foreground mb-4">The Reality</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    The other grew up surrounded by modern skincare, fast trends, and unrealistic beauty standards. Always searching for something "better."
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-20 max-w-3xl mx-auto">
                            <p className="text-xl md:text-2xl text-foreground font-light leading-relaxed">
                                Somewhere between those two worlds, we found our purpose.
                            </p>
                            <div className="mt-8">
                                <h2 className="font-serif text-3xl md:text-4xl leading-tight text-foreground">
                                    To create skincare that blends <br />
                                    <span className="text-secondary italic">heritage with innovation</span>,<br />
                                    <span className="text-secondary italic">gentleness with performance</span>,<br />
                                    and <span className="text-secondary italic">luxury with honesty</span>.
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="mb-12">
                            <Sparkles className="w-8 h-8 text-secondary mx-auto" />
                        </div>
                        <p className="text-lg text-muted-foreground uppercase tracking-widest mb-6">Our Shared Belief</p>
                        <blockquote className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.2] mb-12">
                            "Your skin is not a problem to solve.<br />
                            It’s something to care for patiently, consistently, lovingly."
                        </blockquote>

                        <p className="text-xl text-foreground/80 font-light leading-relaxed max-w-2xl mx-auto">
                            We hope Gaga Herbal becomes part of your everyday rituals, just as it became part of our story.
                        </p>
                    </div>
                </div>
            </section>

            {/* Signature Section */}
            <section className="pb-32 pt-12">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <div className="inline-block border-t border-border pt-12">
                        <p className="font-serif text-2xl text-foreground mb-2">With care,</p>
                        <p className="text-secondary font-medium tracking-wide">The Mother Daughter Duo behind Gaga Herbal.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
