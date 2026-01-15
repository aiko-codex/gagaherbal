"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductCard({ product }) {
    const addToCart = useStore((state) => state.addToCart);

    return (
        <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-muted">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <CardContent className="p-4">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-3 w-3 ${i < product.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                                }`}
                        />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">
                        ({product.reviews})
                    </span>
                </div>

                {/* Title */}
                <Link href={`/product/${product.slug}`}>
                    <h3 className="font-serif text-lg font-medium text-foreground mb-1 hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {product.description}
                </p>

                {/* Price and Add Button */}
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-primary">
                        ₹{product.price.toFixed(2)}
                    </span>
                    <Button
                        onClick={() => addToCart(product)}
                        size="sm"
                        className="gap-2"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        Add
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
