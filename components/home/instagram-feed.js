"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";

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
        <section className="pt-16 md:pt-24 pb-0">
            <div className="container mx-auto px-4 md:px-6 mb-12 flex flex-col items-center text-center">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                    Follow Us @GagaHerbal
                </h2>
                <p className="text-muted-foreground mb-6">
                    Join our community for daily wellness tips and behind-the-scenes.
                </p>
                <a
                    href="#"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                    <Instagram className="h-5 w-5" />
                    See on Instagram
                </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {INSTAGRAM_POSTS.map((src, i) => (
                    <div
                        key={i}
                        className="aspect-[4/5] relative group overflow-hidden bg-gray-100"
                    >
                        <Image
                            src={src}
                            alt={`Instagram post ${i + 1}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Instagram className="h-8 w-8 text-white" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
