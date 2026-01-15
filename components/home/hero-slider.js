"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSlider() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000 }),
    ]);

    const slides = [
        {
            id: 1,
            title: "Nature's Healing Touch",
            subtitle: "Premium Herbal Remedies for a Healthier You",
            buttonText: "Shop Now",
            link: "/shop",
            bgClass: "bg-background",
            image: "/hero/hero_bg_1.png",
        },
        {
            id: 2,
            title: "100% Organic Ingredients",
            subtitle: "Sourced Ethically from Best Farms",
            buttonText: "Learn More",
            link: "/about",
            bgClass: "bg-background",
            image: "/hero/hero_bg_2.png",
        },
        {
            id: 3,
            title: "Holistic Wellness",
            subtitle: "Ancient Wisdom, Modern Science",
            buttonText: "View Collection",
            link: "/shop",
            bgClass: "bg-background",
            image: "/hero/hero_bg_3.png",
        },
    ];

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <div className="relative overflow-hidden group">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            className={`flex-[0_0_100%] min-w-0 h-[500px] md:h-[600px] relative ${slide.bgClass} flex items-center justify-center`}
                        >
                            {/* Background Image */}
                            {slide.image && (
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Dark Overlay for Text Readability */}
                                    <div className="absolute inset-0 bg-black/40" />
                                </div>
                            )}

                            <div className="container px-4 md:px-6 text-center z-10 relative">
                                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 drop-shadow-md">
                                    {slide.title}
                                </h1>
                                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 drop-shadow-sm">
                                    {slide.subtitle}
                                </p>
                                <Link
                                    href={slide.link}
                                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full text-lg font-medium hover:bg-primary/90 transition-all hover:scale-105 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200 shadow-lg"
                                >
                                    {slide.buttonText}
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={scrollPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                aria-label="Previous slide"
            >
                <ArrowRight className="h-6 w-6 rotate-180 text-primary" />
            </button>
            <button
                onClick={scrollNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                aria-label="Next slide"
            >
                <ArrowRight className="h-6 w-6 text-primary" />
            </button>
        </div>
    );
}
