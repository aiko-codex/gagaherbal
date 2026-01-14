"use client";

import { use, useState } from "react";
import Image from "next/image";
import { Star, ShoppingCart, Truck, RefreshCw, ShieldCheck } from "lucide-react";
import { useStore } from "@/lib/store";

// Mock Data (In real app, fetch from DB)
const getProduct = (slug) => {
    const products = [
        {
            id: 1,
            name: "Calming Chamomile Tea",
            slug: "calming-chamomile-tea",
            description: "Experience the soothing embrace of our premium organic chamomile. Sourced from the pristine valleys of the Himalayas, these flowers are hand-picked at dawn to preserve their essential oils. Perfect for winding down after a stressful day, this tea promotes deep, restorative sleep and aids digestion.",
            price: 12.99,
            rating: 5,
            reviews: 128,
            stock: 50,
            image: "https://loremflickr.com/800/800/chamomile,tea",
            ingredients: ["Organic Chamomile Flowers (Matricaria recutita)"],
            benefits: ["Promotes Sleep", "Reduces Anxiety", "Digestive Aid"],
        },
        {
            id: 2,
            name: "Golden Turmeric Elixir",
            slug: "golden-turmeric-elixir",
            description: "A potent anti-inflammatory blend of turmeric, ginger, and black pepper for joint health.",
            price: 24.50,
            rating: 4,
            reviews: 85,
            rating: 4,
            reviews: 85,
            stock: 0,
            image: "https://loremflickr.com/800/800/turmeric,spice",
            ingredients: ["Organic Turmeric", "Ginger Root", "Black Pepper Extract"],
            benefits: ["Anti-inflammatory", "Joint Support", "Immunity Boost"],
        },
        {
            id: 3,
            name: "Organic Matcha Powder",
            slug: "organic-matcha-powder",
            description: "Ceremonial grade matcha sourced directly from Japan. High in antioxidants and energy.",
            price: 29.99,
            rating: 5,
            reviews: 210,
            stock: 20,
            image: "https://loremflickr.com/800/800/matcha,powder",
            ingredients: ["100% Organic Matcha Green Tea"],
            benefits: ["High Energy", "Focus & Clarity", "Metabolism Boost"],
        },
        {
            id: 4,
            name: "Lavender Essential Oil",
            slug: "lavender-essential-oil",
            description: "Pure distilled lavender oil for aromatherapy and skin care. 100% organic and therapeutic grade.",
            price: 15.00,
            rating: 5,
            reviews: 94,
            stock: 100,
            image: "https://loremflickr.com/800/800/lavender,oil",
            ingredients: ["Lavandula Angustifolia Oil"],
            benefits: ["Relaxation", "Sleep Aid", "Skin Soothing"],
        },
        {
            id: 5,
            name: "Ashwagandha Root Powder",
            slug: "ashwagandha-root-powder",
            description: "Ancient ayurvedic adaptogen for stress relief and energy.",
            price: 18.50,
            rating: 4,
            reviews: 56,
            stock: 30,
            image: "https://loremflickr.com/800/800/root,powder",
            ingredients: ["Organic Ashwagandha Root"],
            benefits: ["Stress Relief", "Hormonal Balance", "Strength"],
        },
        {
            id: 6,
            name: "Peppermint Oil",
            slug: "peppermint-oil",
            description: "Refreshing essential oil for focus and digestive health.",
            price: 14.00,
            rating: 5,
            reviews: 112,
            stock: 80,
            image: "https://loremflickr.com/800/800/mint,oil",
            ingredients: ["Peppermint Essential Oil"],
            benefits: ["Focus", "Headache Relief", "Digestive Health"],
        }
    ];
    return products.find((p) => p.slug === slug);
};

export default function ProductPage({ params }) {
    const { slug } = use(params);
    const product = getProduct(slug);
    const addToCart = useStore((state) => state.addToCart);

    if (!product) {
        return (
            <div className="container mx-auto py-24 text-center">
                <h1 className="text-2xl font-bold">Product Not Found</h1>
                <p className="text-muted-foreground mt-2">The product you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                {/* Product Details */}
                <div>
                    <div className="mb-2 flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < product.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                    }`}
                            />
                        ))}
                        <span className="text-sm text-foreground ml-2 underline cursor-pointer">
                            {product.reviews} reviews
                        </span>
                    </div>

                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                        {product.name}
                    </h1>

                    <span className="text-3xl font-bold text-primary">
                        ₹{product.price.toFixed(2)}
                    </span>

                    <p className="text-foreground/80 leading-relaxed mb-8">
                        {product.description}
                    </p>

                    <button
                        onClick={() => addToCart(product)}
                        className="w-full md:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all mb-8 shadow-md hover:shadow-lg"
                    >
                        <ShoppingCart className="h-5 w-5" />
                        Add to Cart
                    </button>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-b border-border py-6 mb-8">
                        <div className="flex flex-col items-center text-center gap-2">
                            <Truck className="h-6 w-6 text-primary" />
                            <span className="text-sm font-medium">Free Shipping</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2 border-l border-r border-border md:px-4">
                            <RefreshCw className="h-6 w-6 text-primary" />
                            <span className="text-sm font-medium">30 Day Returns</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                            <span className="text-sm font-medium">Secure Checkout</span>
                        </div>
                    </div>

                    {/* Ingredients & Benefits */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-serif text-lg font-bold mb-2">Key Ingredients</h3>
                            <ul className="list-disc list-inside text-foreground/80 space-y-1">
                                {product.ingredients?.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-serif text-lg font-bold mb-2">Benefits</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.benefits?.map((item, i) => (
                                    <span key={i} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
