"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useStore();

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = subtotal > 499 ? 0 : 50;
    const total = subtotal + shipping;

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="font-serif text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-8">
                    Looks like you haven't added any herbal remedies yet.
                </p>
                <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-sm"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-4 p-4 border rounded-xl bg-white shadow-sm"
                        >
                            <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-serif font-bold text-lg">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">Each: ₹{item.price.toFixed(2)}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                                        aria-label="Remove item"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="flex justify-between items-center mt-2">
                                    <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                            className="p-1 hover:text-primary transition-colors"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </button>
                                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 hover:text-primary transition-colors"
                                        >
                                            <Plus className="h-3 w-3" />
                                        </button>
                                    </div>
                                    <span className="font-bold text-lg">
                                        ₹{(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-stone-50 p-6 rounded-xl border sticky top-24">
                        <h2 className="font-serif text-xl font-bold mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className="font-medium">
                                    {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                                </span>
                            </div>
                            <div className="border-t pt-4 flex justify-between items-center">
                                <span className="font-bold text-lg">Total</span>
                                <span className="font-bold text-2xl text-primary">₹{total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button className="w-full bg-primary text-primary-foreground py-3 rounded-full font-bold shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                            Proceed to Checkout
                            <ArrowRight className="h-5 w-5" />
                        </button>

                        <p className="text-xs text-center text-muted-foreground mt-4">
                            Secure Checkout • 30 Day Money Back Guarantee
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
