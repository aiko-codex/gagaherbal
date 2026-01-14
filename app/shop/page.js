"use client";

import { useState } from "react";
import ProductCard from "@/components/product/product-card";
import { Filter, ChevronDown } from "lucide-react";

// Mock Data
const ALL_PRODUCTS = [
    {
        id: 1,
        name: "Calming Chamomile Tea",
        slug: "calming-chamomile-tea",
        description: "Relax after a long day with our premium organic chamomile flowers.",
        price: 12.99,
        rating: 5,
        reviews: 128,
        category: "Tea",
        image: "https://loremflickr.com/800/800/chamomile,tea",
    },
    {
        id: 2,
        name: "Golden Turmeric Elixir",
        slug: "golden-turmeric-elixir",
        description: "A potent anti-inflammatory blend of turmeric, ginger, and black pepper.",
        price: 24.50,
        rating: 4,
        reviews: 85,
        category: "Supplements",
        image: "https://loremflickr.com/800/800/turmeric,spice",
    },
    {
        id: 3,
        name: "Organic Matcha Powder",
        slug: "organic-matcha-powder",
        description: "Ceremonial grade matcha sourced directly from Japan.",
        price: 29.99,
        rating: 5,
        reviews: 210,
        category: "Tea",
        image: "https://loremflickr.com/800/800/matcha,powder",
    },
    {
        id: 4,
        name: "Lavender Essential Oil",
        slug: "lavender-essential-oil",
        description: "Pure distilled lavender oil for aromatherapy and skin care.",
        price: 15.00,
        rating: 5,
        reviews: 94,
        category: "Oils",
        image: "https://loremflickr.com/800/800/lavender,oil",
    },
    {
        id: 5,
        name: "Ashwagandha Root Powder",
        slug: "ashwagandha-root-powder",
        description: "Ancient ayurvedic adaptogen for stress relief and energy.",
        price: 18.50,
        rating: 4,
        reviews: 56,
        category: "Supplements",
        image: "https://loremflickr.com/800/800/root,powder",
    },
    {
        id: 6,
        name: "Peppermint Oil",
        slug: "peppermint-oil",
        description: "Refreshing essential oil for focus and digestive health.",
        price: 14.00,
        rating: 5,
        reviews: 112,
        category: "Oils",
        image: "https://loremflickr.com/800/800/mint,oil",
    },
];

const CATEGORIES = ["All", "Tea", "Supplements", "Oils"];

export default function Shop() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filteredProducts =
        selectedCategory === "All"
            ? ALL_PRODUCTS
            : ALL_PRODUCTS.filter((p) => p.category === selectedCategory);

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                    <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                        Shop All
                    </h1>
                    <p className="text-muted-foreground">
                        {filteredProducts.length} results found
                    </p>
                </div>

                {/* Mobile Filter Toggle */}
                <button
                    className="md:hidden flex items-center gap-2 mt-4 md:mt-0 border px-4 py-2 rounded-md"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                    <Filter className="h-4 w-4" />
                    Filter Categories
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside
                    className={`w-full md:w-64 flex-shrink-0 ${isFilterOpen ? "block" : "hidden md:block"
                        }`}
                >
                    <div className="sticky top-24">
                        <h3 className="font-bold text-lg mb-4">Categories</h3>
                        <ul className="space-y-2">
                            {CATEGORIES.map((category) => (
                                <li key={category}>
                                    <button
                                        onClick={() => setSelectedCategory(category)}
                                        className={`w-full text-left px-2 py-1.5 rounded-md transition-colors ${selectedCategory === category
                                            ? "bg-primary text-primary-foreground font-medium"
                                            : "text-foreground/80 hover:bg-gray-100"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            No products found in this category.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
