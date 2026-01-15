"use client";

import { useStore } from "@/lib/store";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    Loader2,
    ArrowLeft,
    CheckCircle,
    User,
    MapPin,
    Phone,
    Mail,
    CreditCard,
    Package,
    ArrowRight,
} from "lucide-react";

export default function CheckoutPage() {
    const { cart, clearCart } = useStore();
    const { data: session } = useSession();

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        country: "India",
        phone: "",
    });

    useEffect(() => {
        if (session?.user) {
            const names = session.user.name?.split(" ") || ["", ""];
            setFormData((prev) => ({
                ...prev,
                firstName: names[0] || "",
                lastName: names.slice(1).join(" ") || "",
                email: session.user.email || "",
            }));
        }
    }, [session]);

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = subtotal > 499 ? 0 : 50;
    const total = subtotal + shipping;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cart,
                    shippingDetails: formData
                })
            });

            if (!response.ok) throw new Error("Failed to place order");

            setIsSuccess(true);
            clearCart();
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    // Empty Cart State
    if (cart.length === 0 && !isSuccess) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4">
                <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                    <Package size={40} className="text-muted-foreground/50" strokeWidth={1} />
                </div>
                <h1 className="font-serif text-2xl font-medium text-foreground mb-2">Your cart is empty</h1>
                <p className="text-muted-foreground mb-8">Add some items before checking out.</p>
                <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-secondary/10 text-secondary rounded-full font-medium hover:bg-secondary/20 transition-colors"
                >
                    Return to Shop
                </Link>
            </div>
        );
    }

    // Success State
    if (isSuccess) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-16">
                <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center mb-8">
                    <CheckCircle size={48} className="text-secondary" strokeWidth={1.5} />
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-3 text-center">
                    Order Placed Successfully!
                </h1>
                <p className="text-muted-foreground text-center max-w-md mb-8">
                    Thank you for your purchase, {formData.firstName}. We've sent a confirmation email to {formData.email}.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/shop"
                        className="px-8 py-3.5 border border-border rounded-full font-medium hover:bg-muted/50 transition-colors text-center"
                    >
                        Continue Shopping
                    </Link>
                    <Link
                        href="/orders"
                        className="px-8 py-3.5 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors text-center"
                    >
                        View My Orders
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-40 pb-16">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <Link
                        href="/cart"
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                    >
                        <ArrowLeft size={20} className="text-muted-foreground" />
                    </Link>
                    <div>
                        <h1 className="font-serif text-3xl font-medium text-foreground">Checkout</h1>
                        <p className="text-muted-foreground">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Shipping Form */}
                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Contact Section */}
                            <div className="bg-white rounded-2xl border border-border/30 p-6">
                                <h2 className="font-serif text-xl font-medium mb-6 flex items-center gap-3">
                                    <User size={20} className="text-secondary" />
                                    Contact Information
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">First Name</label>
                                        <input
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3.5 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Last Name</label>
                                        <input
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3.5 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Email</label>
                                        <div className="relative">
                                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <input
                                                name="email"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-3.5 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Phone</label>
                                        <div className="relative">
                                            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                            <input
                                                name="phone"
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full pl-12 pr-4 py-3.5 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Section */}
                            <div className="bg-white rounded-2xl border border-border/30 p-6">
                                <h2 className="font-serif text-xl font-medium mb-6 flex items-center gap-3">
                                    <MapPin size={20} className="text-secondary" />
                                    Shipping Address
                                </h2>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Street Address</label>
                                        <input
                                            name="address"
                                            required
                                            placeholder="123 Nature Way"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3.5 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground">City</label>
                                            <input
                                                name="city"
                                                required
                                                value={formData.city}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3.5 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground">Postal Code</label>
                                            <input
                                                name="postalCode"
                                                required
                                                value={formData.postalCode}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3.5 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Section */}
                            <div className="bg-white rounded-2xl border border-border/30 p-6">
                                <h2 className="font-serif text-xl font-medium mb-6 flex items-center gap-3">
                                    <CreditCard size={20} className="text-secondary" />
                                    Payment Method
                                </h2>
                                <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-4 flex items-center gap-4">
                                    <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">Cash on Delivery</p>
                                        <p className="text-sm text-muted-foreground">Pay when your order arrives</p>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full flex items-center justify-center gap-2 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors disabled:opacity-70"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="animate-spin h-5 w-5" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Place Order
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-2">
                        <div className="bg-muted/30 rounded-2xl border border-border/30 p-6 sticky top-40">
                            <h2 className="font-serif text-xl font-medium mb-6">Order Summary</h2>

                            {/* Items */}
                            <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-16 h-16 bg-white rounded-xl overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-[10px] font-medium rounded-full flex items-center justify-center">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-foreground truncate">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                                        </div>
                                        <p className="font-medium text-foreground">
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 pt-4 border-t border-border/50">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className={`font-medium ${shipping === 0 ? 'text-secondary' : ''}`}>
                                        {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between pt-3 border-t border-border/50">
                                    <span className="font-medium">Total</span>
                                    <span className="font-serif text-2xl font-medium">₹{total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
