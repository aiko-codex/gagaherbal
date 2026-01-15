"use client";

import Image from "next/image";

const brands = [
    { name: "Himalaya", logo: "https://loremflickr.com/200/80/logo,minimal?lock=1" },
    { name: "Organic India", logo: "https://loremflickr.com/200/80/logo,minimal?lock=2" },
    { name: "Forest Essentials", logo: "https://loremflickr.com/200/80/logo,minimal?lock=3" },
    { name: "Kama Ayurveda", logo: "https://loremflickr.com/200/80/logo,minimal?lock=4" },
    { name: "Biotique", logo: "https://loremflickr.com/200/80/logo,minimal?lock=5" },
    { name: "Patanjali", logo: "https://loremflickr.com/200/80/logo,minimal?lock=6" },
];

export default function BrandsSection() {
    return (
        <section className="py-20 bg-muted/20">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-3">
                        Our <span className="italic text-secondary">Partners</span>
                    </h2>
                    <p className="text-muted-foreground">
                        Trusted by leading wellness and herbal brands worldwide
                    </p>
                </div>

                {/* Brands Grid - Centered */}
                <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
                    {brands.map((brand, index) => (
                        <div
                            key={index}
                            className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
                        >
                            <div className="relative h-10 w-28">
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
