"use client";

import React from "react";

export default function ReturnPolicyPage() {
    return (
        <div className="bg-background min-h-screen pt-[160px] pb-24">
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Return Policy</h1>
                    <p className="text-muted-foreground mb-12">Last Updated: October 24, 2024</p>

                    <div className="prose prose-lg prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-secondary max-w-none">
                        <h3>1. Return Window</h3>
                        <p>
                            Our return policy lasts 7 days. If 7 days have gone by since your purchase arrives, unfortunately, we can’t offer you a refund or exchange.
                        </p>

                        <h3>2. Eligibility for Returns</h3>
                        <p>
                            To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
                            Several types of goods are exempt from being returned, such as perishable goods (food, flowers, newspapers, or magazines).
                        </p>
                        <p>Additional non-returnable items:</p>
                        <ul>
                            <li>Gift cards</li>
                            <li>Opened personal care items (for hygiene reasons)</li>
                        </ul>

                        <h3>3. Return Shipping</h3>
                        <p>
                            You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.
                        </p>

                        <h3>4. How to Initiate a Return</h3>
                        <p>
                            To complete your return, we require a receipt or proof of purchase. Please email us at <a href="mailto:hello@gagaherbal.com">hello@gagaherbal.com</a>
                            with your order number and reason for return. We will provide you with instructions on where to send your package.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
