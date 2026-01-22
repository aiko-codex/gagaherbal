"use client";

import React from "react";

export default function ShippingPolicyPage() {
    return (
        <div className="bg-background min-h-screen pt-[160px] pb-24">
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Shipping Policy</h1>
                    <p className="text-muted-foreground mb-12">Last Updated: October 24, 2024</p>

                    <div className="prose prose-lg prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-secondary max-w-none">
                        <h3>1. Shipping Rates & Delivery Estimates</h3>
                        <p>
                            <strong>Domestic Shipping (India):</strong><br />
                            We offer free standard shipping on all orders above ₹499. For orders under ₹499, a flat rate of ₹50 applies.
                        </p>
                        <p>
                            <strong>Delivery Estimates:</strong><br />
                            Standard shipping usually takes 3-7 business days depending on your location.
                        </p>

                        <h3>2. Shipment Processing Time</h3>
                        <p>
                            All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.
                            If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.
                        </p>

                        <h3>3. Shipment Confirmation & Order Tracking</h3>
                        <p>
                            You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s).
                            The tracking number will be active within 24 hours.
                        </p>

                        <h3>4. Damages</h3>
                        <p>
                            Gaga Herbal is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim.
                            Please save all packaging materials and damaged goods before filing a claim.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
