"use client";

import React from "react";

export default function TermsAndConditionsPage() {
    return (
        <div className="bg-background min-h-screen pt-[160px] pb-24">
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Terms & Conditions</h1>
                    <p className="text-muted-foreground mb-12">Last Updated: October 24, 2024</p>

                    <div className="prose prose-lg prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-secondary max-w-none">
                        <p>
                            These terms and conditions outline the rules and regulations for the use of Gaga Herbal's Website.
                        </p>

                        <h3>1. Introduction</h3>
                        <p>
                            By accessing this website we assume you accept these terms and conditions.
                            Do not continue to use Gaga Herbal if you do not agree to take all of the terms and conditions stated on this page.
                        </p>

                        <h3>2. License</h3>
                        <p>
                            Unless otherwise stated, Gaga Herbal and/or its licensors own the intellectual property rights for all material on Gaga Herbal.
                            All intellectual property rights are reserved. You may access this from Gaga Herbal for your own personal use subjected to restrictions set in these terms and conditions.
                        </p>
                        <p>You must not:</p>
                        <ul>
                            <li>Republish material from Gaga Herbal</li>
                            <li>Sell, rent or sub-license material from Gaga Herbal</li>
                            <li>Reproduce, duplicate or copy material from Gaga Herbal</li>
                            <li>Redistribute content from Gaga Herbal</li>
                        </ul>

                        <h3>3. Product Descriptions</h3>
                        <p>
                            We attempt to be as accurate as possible. However, Gaga Herbal does not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free.
                            If a product offered by Gaga Herbal itself is not as described, your sole remedy is to return it in unused condition.
                        </p>

                        <h3>4. Pricing</h3>
                        <p>
                            All prices are subject to change without notice. We reserve the right to modify or discontinue the Service (or any part or content thereof) without notice at any time.
                        </p>

                        <h3>5. Governing Law</h3>
                        <p>
                            These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
