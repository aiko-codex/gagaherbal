"use client";

import { useState } from "react";
import ProductCard from "@/components/product/product-card";

// Products with real images
const ALL_PRODUCTS = [
    {
        id: 1,
        name: "Calming Chamomile Tea",
        slug: "calming-chamomile-tea",
        description: "Relax after a long day with our premium organic chamomile flowers.",
        price: 299,
        category: "Tea",
        image: "/images/products/chamomile-tea.png",
    },
    {
        id: 2,
        name: "Golden Turmeric Elixir",
        slug: "golden-turmeric-elixir",
        description: "A potent anti-inflammatory blend of turmeric, ginger, and black pepper.",
        price: 549,
        category: "Supplements",
        image: "/images/products/turmeric-elixir.png",
    },
    {
        id: 3,
        name: "Organic Matcha Powder",
        slug: "organic-matcha-powder",
        description: "Ceremonial grade matcha sourced directly from Japan.",
        price: 799,
        category: "Tea",
        image: "/images/products/matcha-powder.png",
    },
    {
        id: 4,
        name: "Lavender Essential Oil",
        slug: "lavender-essential-oil",
        description: "Pure distilled lavender oil for aromatherapy and skin care.",
        price: 399,
        category: "Oils",
        image: "/images/products/lavender-oil.png",
    },
    {
        id: 5,
        name: "Ashwagandha Root Powder",
        slug: "ashwagandha-root-powder",
        description: "Ancient ayurvedic adaptogen for stress relief and energy.",
        price: 449,
        category: "Supplements",
        image: "/images/products/ashwagandha-powder.png",
    },
    {
        id: 6,
        name: "Peppermint Oil",
        slug: "peppermint-oil",
        description: "Refreshing essential oil for focus and digestive health.",
        price: 349,
        category: "Oils",
        image: "/images/products/peppermint-oil.png",
    },
    {
        id: 7,
        name: "Echinacea Immune Boost",
        slug: "echinacea-immune-boost",
        description: "Natural immune system support from organic echinacea.",
        price: 599,
        category: "Supplements",
        image: "/images/products/echinacea-supplement.png",
    },
    {
        id: 8,
        name: "Green Tea Blend",
        slug: "green-tea-blend",
        description: "Antioxidant-rich green tea with hints of jasmine.",
        price: 399,
        category: "Tea",
        image: "/images/products/green-tea-blend.png",
    },
];

const CATEGORIES = ["All", "Tea", "Supplements", "Oils"];

export default function Shop() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProducts =
        selectedCategory === "All"
            ? ALL_PRODUCTS
            : ALL_PRODUCTS.filter((p) => p.category === selectedCategory);

    return (
        <div className="min-h-screen bg-background pt-40 pb-16">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4 leading-tight">
                        Our <span className="italic text-secondary">Collection</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Discover our range of organic herbal products, carefully crafted for your wellness journey.
                    </p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                    ? "bg-foreground text-background"
                                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Results Count */}
                <p className="text-center text-muted-foreground text-sm mb-8">
                    Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </p>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground">No products found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
