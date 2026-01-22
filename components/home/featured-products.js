"use client";

import ProductCard from "@/components/product/product-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/data";

const FEATURED_PRODUCTS = getFeaturedProducts();

export default function FeaturedProducts() {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4 leading-tight">
                            Featured <span className="italic text-secondary">Collections</span>
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Explore our most popular herbal remedies, hand-picked for their potency and purity.
                        </p>
                    </div>
                    <Link
                        href="/shop"
                        className="hidden md:flex items-center gap-2 text-foreground font-medium hover:text-secondary transition-colors group pb-1 border-b border-transparent hover:border-secondary"
                    >
                        View all products
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {FEATURED_PRODUCTS.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Mobile Link */}
                <div className="md:hidden mt-10 text-center">
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 text-foreground font-medium hover:text-secondary transition-colors group pb-1 border-b border-transparent hover:border-secondary"
                    >
                        View all products
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
