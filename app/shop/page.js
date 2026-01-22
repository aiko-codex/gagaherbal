"use client";

import { useState } from "react";
import ProductCard from "@/components/product/product-card";
import { PRODUCTS, getProductCategories } from "@/lib/data";

const CATEGORIES = getProductCategories();

export default function Shop() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProducts =
        selectedCategory === "All"
            ? PRODUCTS
            : PRODUCTS.filter((p) => p.category === selectedCategory);

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
