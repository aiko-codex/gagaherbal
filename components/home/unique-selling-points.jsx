"use client";

import { Leaf, Heart, Recycle, Truck, ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/product-card";

const products = [
  {
    id: 101,
    name: "Ashwagandha Root Powder",
    slug: "ashwagandha-root-powder",
    description: "Ancient ayurvedic adaptogen for stress relief and energy.",
    image: "/images/products/ashwagandha-powder.png",
    price: 449,
  },
  {
    id: 102,
    name: "Peppermint Oil",
    slug: "peppermint-oil",
    description: "Refreshing essential oil for focus and digestive health.",
    image: "/images/products/peppermint-oil.png",
    price: 349,
  },
  {
    id: 103,
    name: "Echinacea Immune Boost",
    slug: "echinacea-immune-boost",
    description: "Natural immune system support from organic echinacea.",
    image: "/images/products/echinacea-supplement.png",
    price: 599,
  },
  {
    id: 104,
    name: "Green Tea Blend",
    slug: "green-tea-blend",
    description: "Antioxidant-rich green tea with hints of jasmine.",
    image: "/images/products/green-tea-blend.png",
    price: 399,
  },
];

const features = [
  {
    icon: Leaf,
    title: "100% Organic",
    text: "Sourced from certified organic farms.",
  },
  {
    icon: Heart,
    title: "Cruelty Free",
    text: "Never tested on animals, ever.",
  },
  {
    icon: Recycle,
    title: "Eco-Friendly",
    text: "Biodegradable packaging materials.",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    text: "Free delivery on orders over ₹499.",
  },
];

export default function UniqueSellingPoints() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Top row: Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4 leading-tight">
            Our <span className="italic text-secondary">Bestsellers</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            These are our most loved products — handpicked by thousands of happy customers.
          </p>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-3 p-4">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <feature.icon size={22} className="text-secondary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{feature.title}</p>
                <p className="text-muted-foreground text-sm">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA Link */}
        <div className="text-center mt-12">
          <a
            href="/shop"
            className="inline-flex items-center gap-2 text-foreground font-medium hover:text-secondary transition-colors group"
          >
            Explore all products
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
