"use client";

import React from "react";

export default function RefundAndCancellationPage() {
    return (
        <div className="bg-background min-h-screen pt-[160px] pb-24">
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Refund & Cancellation Policy</h1>
                    <p className="text-muted-foreground mb-12">Last Updated: October 24, 2024</p>

                    <div className="prose prose-lg prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-secondary max-w-none">
                        <h3>1. Order Cancellation</h3>
                        <p>
                            You may cancel your order within 24 hours of placing it for a full refund.
                            Once the order has been processed or shipped, it cannot be cancelled, but you may be eligible for a return (see Return Policy).
                        </p>
                        <p>
                            To cancel an order, please email us at <a href="mailto:hello@gagaherbal.com">hello@gagaherbal.com</a> with your order details immediately.
                        </p>

                        <h3>2. Refund Eligibility</h3>
                        <p>
                            Refunds are processed for:
                        </p>
                        <ul>
                            <li>Orders cancelled within the 24-hour window.</li>
                            <li>Products received in a damaged or defective condition.</li>
                            <li>Incorrect items shipped by us.</li>
                        </ul>

                        <h3>3. Refund Process</h3>
                        <p>
                            Once your return is received and inspected (if applicable), we will send you an email to notify you of the approval or rejection of your refund.
                            If approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment within 5-7 business days.
                        </p>

                        <h3>4. Late or Missing Refunds</h3>
                        <p>
                            If you haven’t received a refund yet, first check your bank account again.
                            Then contact your credit card company, it may take some time before your refund is officially posted.
                            If you’ve done all of this and you still have not received your refund yet, please contact us.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
