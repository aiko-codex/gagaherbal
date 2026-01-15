"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Trash2, Plus, Minus, ArrowRight, Loader2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useStore } from "@/lib/store";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useStore();
    const { data: session } = useSession();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = subtotal > 499 ? 0 : 50;
    const total = subtotal + shipping;

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        if (!session) {
            router.push("/login?callbackUrl=/checkout");
        } else {
            router.push("/checkout");
        }
    };

    if (!isMounted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-secondary" />
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                    <ShoppingBag size={40} className="text-muted-foreground/50" strokeWidth={1} />
                </div>
                <h1 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-2">
                    Your cart is empty
                </h1>
                <p className="text-muted-foreground text-center mb-8 max-w-sm">
                    Looks like you haven't added any herbal remedies yet.
                </p>
                <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-secondary/10 text-secondary rounded-full font-medium hover:bg-secondary/20 transition-colors"
                >
                    Continue Shopping
                    <ArrowRight size={18} />
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-40 pb-16">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <Link
                        href="/shop"
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                    >
                        <ArrowLeft size={20} className="text-muted-foreground" />
                    </Link>
                    <div>
                        <h1 className="font-serif text-3xl font-medium text-foreground">
                            Shopping Cart
                        </h1>
                        <p className="text-muted-foreground">
                            {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-5 p-5 bg-white rounded-2xl border border-border/30"
                            >
                                <div className="relative w-24 h-24 bg-muted/30 rounded-xl overflow-hidden shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between min-w-0">
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="min-w-0">
                                            <h3 className="font-serif font-medium text-lg text-foreground truncate">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                ₹{item.price.toFixed(2)} each
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-center mt-3">
                                        <div className="flex items-center gap-1 bg-muted/50 rounded-full p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                className="p-2 hover:bg-white rounded-full transition-colors disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-2 hover:bg-white rounded-full transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <span className="font-serif font-medium text-lg text-foreground">
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-muted/30 p-6 rounded-2xl border border-border/30 sticky top-32">
                            <h2 className="font-serif text-xl font-medium mb-6 text-foreground">
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-medium text-foreground">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className={`font-medium ${shipping === 0 ? 'text-secondary' : 'text-foreground'}`}>
                                        {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                {shipping > 0 && (
                                    <p className="text-xs text-muted-foreground">
                                        Add ₹{(499 - subtotal).toFixed(2)} more for free shipping
                                    </p>
                                )}
                                <div className="border-t border-border/50 pt-4 flex justify-between items-center">
                                    <span className="font-medium text-foreground">Total</span>
                                    <span className="font-serif text-2xl font-medium text-foreground">
                                        ₹{total.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                                className="w-full flex items-center justify-center gap-2 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors disabled:opacity-70"
                            >
                                {isCheckingOut ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Proceed to Checkout
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-center text-muted-foreground mt-4">
                                Secure Checkout • 30 Day Money Back Guarantee
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
