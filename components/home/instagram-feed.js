"use client";

import Image from "next/image";
import { Instagram, ArrowUpRight } from "lucide-react";

const INSTAGRAM_POSTS = [
    "https://loremflickr.com/600/750/yoga,nature",
    "https://loremflickr.com/600/750/herbal,tea",
    "https://loremflickr.com/600/750/meditation,calm",
    "https://loremflickr.com/600/750/leaves,green",
    "https://loremflickr.com/600/750/spa,wellness",
    "https://loremflickr.com/600/750/organic,food",
];

export default function InstagramFeed() {
    return (
        <section className="py-24 bg-background">
            {/* Header */}
            <div className="container mx-auto px-4 md:px-6 mb-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4 leading-tight">
                            Join Our <span className="italic text-secondary">Community</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Follow @GagaHerbal for daily wellness tips and behind-the-scenes.
                        </p>
                    </div>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3 bg-foreground/[0.03] border border-border/50 rounded-full font-medium hover:bg-secondary/10 hover:text-secondary hover:border-secondary/30 transition-all"
                    >
                        <Instagram size={20} />
                        Follow on Instagram
                        <ArrowUpRight size={16} />
                    </a>
                </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {INSTAGRAM_POSTS.map((src, i) => (
                    <a
                        key={i}
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="aspect-square relative group overflow-hidden"
                    >
                        <Image
                            src={src}
                            alt={`Instagram post ${i + 1}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                        />
                        <div className="absolute inset-0 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Instagram size={32} className="text-white" strokeWidth={1.5} />
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
