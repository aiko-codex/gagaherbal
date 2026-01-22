"use client";

import React from "react";

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-background min-h-screen pt-[160px] pb-24">
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Privacy Policy</h1>
                    <p className="text-muted-foreground mb-12">Last Updated: October 24, 2024</p>

                    <div className="prose prose-lg prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-secondary max-w-none">
                        <p>
                            Welcome to Gaga Herbal. We respect your privacy and are committed to protecting your personal data.
                            This privacy policy will inform you as to how we look after your personal data when you visit our website
                            (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                        </p>

                        <h3>1. Important Information and Who We Are</h3>
                        <p>
                            Gaga Herbal is the controller and responsible for your personal data.
                            We have appointed a data privacy manager who is responsible for overseeing questions in relation to this privacy policy.
                            If you have any questions about this privacy policy, including any requests to exercise your legal rights,
                            please contact the data privacy manager using the details set out below.
                        </p>

                        <h3>2. The Data We Collect About You</h3>
                        <p>
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <ul>
                            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                            <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                            <li><strong>Financial Data</strong> includes bank account and payment card details.</li>
                            <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
                        </ul>

                        <h3>3. How We Use Your Personal Data</h3>
                        <p>
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul>
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal or regulatory obligation.</li>
                        </ul>

                        <h3>4. Data Security</h3>
                        <p>
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                            In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                        </p>

                        <h3>5. Contact Us</h3>
                        <p>
                            If you have any questions about this privacy policy or our privacy practices, please contact us at: <br />
                            Email: <a href="mailto:hello@gagaherbal.com">hello@gagaherbal.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
