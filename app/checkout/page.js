"use client";

import { useStore } from "@/lib/store";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

    if (cart.length === 0 && !isSuccess) {
        return (
            <div className="min-h-screen pt-24 pb-12 container mx-auto px-4 text-center">
                <h1 className="font-serif text-3xl font-bold mb-4">Your cart is empty</h1>
                <p className="text-muted-foreground mb-8">Add some items before checking out.</p>
                <Button asChild variant="outline">
                    <Link href="/shop">Return to Shop</Link>
                </Button>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen pt-24 pb-12 container mx-auto px-4 flex flex-col items-center justify-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-6">
                    <CheckCircle2 className="h-16 w-16 text-green-600" />
                </div>
                <h1 className="font-serif text-4xl font-bold mb-4">Order Placed Successfully!</h1>
                <p className="text-muted-foreground mb-8 max-w-md">
                    Thank you for your purchase, {formData.firstName}. We have sent a confirmation email to {formData.email}.
                </p>
                <div className="flex gap-4">
                    <Button asChild variant="outline">
                        <Link href="/shop">Continue Shopping</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/dashboard">View My Orders</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-stone-50">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <Link href="/cart" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Cart
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Shipping Form */}
                    <div className="lg:col-span-7">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-serif text-2xl">Shipping Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" name="firstName" required value={formData.firstName} onChange={handleChange} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" name="lastName" required value={formData.lastName} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Street Address</Label>
                                        <Input id="address" name="address" required placeholder="123 Nature Way" value={formData.address} onChange={handleChange} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input id="city" name="city" required value={formData.city} onChange={handleChange} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="postalCode">Postal Code</Label>
                                            <Input id="postalCode" name="postalCode" required value={formData.postalCode} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} />
                                    </div>

                                    <div className="pt-6 border-t">
                                        <h3 className="font-serif text-xl font-bold mb-4">Payment</h3>
                                        <div className="bg-muted p-4 rounded-lg border flex items-center gap-3">
                                            <div className="w-4 h-4 rounded-full bg-primary ring-2 ring-primary ring-offset-2"></div>
                                            <span className="font-medium">Cash on Delivery (COD)</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-2">Pay securely when your order arrives.</p>
                                    </div>

                                    <Button type="submit" disabled={isProcessing} className="w-full" size="lg">
                                        {isProcessing ? <><Loader2 className="animate-spin mr-2 h-5 w-5" /> Processing...</> : "Place Order"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-5">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle className="font-serif text-2xl">Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 max-h-72 overflow-y-auto pr-2 mb-6">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-4 py-3 border-b last:border-0">
                                            <div className="relative h-16 w-16 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                                                <img src={item.image || "https://loremflickr.com/320/240/herbal"} alt={item.name} className="h-full w-full object-cover" />
                                                <Badge className="absolute -top-1 -right-1 text-[10px] h-5 w-5 p-0 flex items-center justify-center">
                                                    {item.quantity}
                                                </Badge>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium line-clamp-1">{item.name}</h4>
                                                <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
                                            </div>
                                            <p className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2 pt-4 border-t text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-lg font-bold text-primary pt-3 border-t">
                                        <span>Total</span>
                                        <span>₹{total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
