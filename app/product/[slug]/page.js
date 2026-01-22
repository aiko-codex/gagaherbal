"use client";

import { use, useState } from "react";
import Image from "next/image";
import { Star, ShoppingCart, Truck, RefreshCw, ShieldCheck } from "lucide-react";
import { useStore } from "@/lib/store";
import { getProduct } from "@/lib/data";

export default function ProductPage({ params }) {
    const { slug } = use(params);
    const product = getProduct(slug);
    const addToCart = useStore((state) => state.addToCart);

    if (!product) {
        return (
            <div className="container mx-auto py-24 text-center">
                <h1 className="font-serif text-3xl font-medium mb-4">Product Not Found</h1>
                <p className="text-muted-foreground">The product you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-[120px] pb-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    {/* Product Image - Sticky on Desktop */}
                    <div className="w-full lg:w-1/2">
                        <div className="lg:sticky lg:top-32 fade-in-up">
                            <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted/20">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center fade-in-up" style={{ animationDelay: "0.2s" }}>
                        <div className="mb-4 flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < product.rating
                                        ? "fill-primary text-primary"
                                        : "text-muted-foreground/30"
                                        }`}
                                />
                            ))}
                            <span className="text-xs uppercase tracking-widest text-muted-foreground ml-3 border-b border-border pb-0.5">
                                {product.reviews} Reviews
                            </span>
                        </div>

                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-[1.1]">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="font-serif text-3xl text-secondary">
                                ₹{product.price.toFixed(2)}
                            </span>
                            {product.stock > 0 ? (
                                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-wider">
                                    In Stock
                                </span>
                            ) : (
                                <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full uppercase tracking-wider">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        <p className="text-muted-foreground text-lg leading-relaxed mb-10 font-light max-w-xl">
                            {product.description}
                        </p>

                        <button
                            onClick={() => addToCart(product)}
                            disabled={product.stock === 0}
                            className="w-full md:w-auto bg-secondary text-secondary-foreground px-12 py-5 uppercase tracking-widest text-sm font-medium hover:bg-secondary/90 transition-all mb-12 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            {product.stock > 0 ? "Add to Cart" : "Sold Out"}
                        </button>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-6 border-t border-border py-8 mb-10">
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                                    <Truck className="h-5 w-5" />
                                </div>
                                <span className="text-xs uppercase tracking-wider font-medium text-muted-foreground">Free Shipping</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-3 border-l border-r border-border px-4">
                                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                                    <RefreshCw className="h-5 w-5" />
                                </div>
                                <span className="text-xs uppercase tracking-wider font-medium text-muted-foreground">Free Returns</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <span className="text-xs uppercase tracking-wider font-medium text-muted-foreground">Secure Pay</span>
                            </div>
                        </div>

                        {/* Ingredients & Benefits */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-serif text-xl mb-4 text-foreground">Key Ingredients</h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.ingredients?.map((item, i) => (
                                        <span key={i} className="text-sm border border-border px-4 py-2 text-muted-foreground bg-muted/5">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-serif text-xl mb-4 text-foreground">Benefits</h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {product.benefits?.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-muted-foreground text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
