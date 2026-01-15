"use client";

import ProductCard from "@/components/product/product-card";

// Mock Data with Unsplash Images
// Keywords: Herbal, Tea, Supplement, Oil, Nature, Organic
const FEATURED_PRODUCTS = [
    {
        id: 1,
        name: "Calming Chamomile Tea",
        slug: "calming-chamomile-tea",
        description: "Relax after a long day with our premium organic chamomile flowers tailored for deep sleep.",
        price: 12.99,
        rating: 5,
        reviews: 128,
        image: "https://loremflickr.com/800/800/chamomile,tea",
    },
    {
        id: 2,
        name: "Golden Turmeric Elixir",
        slug: "golden-turmeric-elixir",
        description: "A potent anti-inflammatory blend of turmeric, ginger, and black pepper for joint health.",
        price: 24.50,
        rating: 4,
        reviews: 85,
        image: "https://loremflickr.com/800/800/turmeric,spice",
    },
    {
        id: 3,
        name: "Organic Matcha Powder",
        slug: "organic-matcha-powder",
        description: "Ceremonial grade matcha sourced directly from Japan. High in antioxidants and energy.",
        price: 29.99,
        rating: 5,
        reviews: 210,
        image: "https://loremflickr.com/800/800/matcha,powder",
    },
    {
        id: 4,
        name: "Lavender Essential Oil",
        slug: "lavender-essential-oil",
        description: "Pure distilled lavender oil for aromatherapy and skin care. 100% organic and therapeutic grade.",
        price: 15.00,
        rating: 5,
        reviews: 94,
        image: "https://loremflickr.com/800/800/lavender,Essential",
    },
];

export default function FeaturedProducts() {
    return (
        <section className="container mx-auto py-16 px-4 md:px-6">
            <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                    Featured Collections
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Explore our most popular herbal remedies, hand-picked for their potency and purity.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {FEATURED_PRODUCTS.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
