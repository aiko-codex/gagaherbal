"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { useStore } from "@/lib/store";

export default function ProductCard({ product }) {
    const addToCart = useStore((state) => state.addToCart);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            slug: product.slug,
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    // Format price in INR
    const formatPrice = (price) => {
        return `₹${price.toFixed(2)}`;
    };

    return (
        <div className="group flex flex-col h-full">
            {/* Image */}
            <Link
                href={`/product/${product.slug}`}
                className="block relative aspect-square overflow-hidden rounded-2xl bg-muted/30 mb-5"
            >
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-grow">
                {/* Title & Price Row */}
                <div className="flex justify-between items-start gap-2 mb-2">
                    <Link href={`/product/${product.slug}`}>
                        <h3 className="text-lg font-serif font-medium text-foreground hover:text-secondary transition-colors leading-tight">
                            {product.name}
                        </h3>
                    </Link>
                    <span className="text-muted-foreground font-medium text-sm whitespace-nowrap">
                        {formatPrice(product.price)}
                    </span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-grow mb-4">
                    {product.description}
                </p>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={`mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium transition-all duration-300 ${isAdded
                            ? "bg-secondary/20 text-secondary border border-secondary/30"
                            : "bg-foreground/[0.03] text-foreground/70 border border-border/50 hover:bg-secondary/10 hover:text-secondary hover:border-secondary/30"
                        }`}
                >
                    {isAdded ? (
                        <>
                            <Check size={16} />
                            Added
                        </>
                    ) : (
                        <>
                            <Plus size={16} />
                            Add to cart
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
