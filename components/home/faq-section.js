"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "Are your products 100% organic?",
        answer: "Yes! All our herbal products are certified organic and sourced from sustainable farms. We never use synthetic pesticides, herbicides, or GMOs in our ingredients.",
    },
    {
        question: "How long does shipping take?",
        answer: "Standard shipping takes 3-5 business days within India. We also offer express shipping (1-2 days) for an additional fee. Free shipping is available on orders over ₹499.",
    },
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day money-back guarantee on all products. If you're not completely satisfied, simply return the unused portion for a full refund, no questions asked.",
    },
    {
        question: "Are your products safe for sensitive skin?",
        answer: "Our products are formulated with gentle, natural ingredients suitable for most skin types. However, we always recommend doing a patch test before first use, especially if you have known allergies.",
    },
    {
        question: "Do you offer subscriptions?",
        answer: "Yes! Subscribe to your favorite products and save 15% on every order. You can pause, modify, or cancel your subscription anytime from your account dashboard.",
    },
    {
        question: "How should I store herbal products?",
        answer: "Store products in a cool, dry place away from direct sunlight. For teas and herbs, keep them in airtight containers to preserve freshness. Most products have a shelf life of 12-24 months.",
    },
];

function FAQItem({ question, answer, isOpen, onToggle }) {
    return (
        <div className="border-b border-border/30 last:border-0">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between py-6 text-left group"
            >
                <span className="font-medium text-foreground pr-4 group-hover:text-secondary transition-colors">
                    {question}
                </span>
                <ChevronDown
                    size={20}
                    className={`shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-secondary" : ""
                        }`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-48 pb-6" : "max-h-0"
                    }`}
            >
                <p className="text-muted-foreground leading-relaxed pr-8">
                    {answer}
                </p>
            </div>
        </div>
    );
}

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4 leading-tight">
                        Frequently Asked <span className="italic text-secondary">Questions</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Everything you need to know about our herbal products and services.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="bg-white rounded-2xl border border-border/30 p-6 md:p-8">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                        />
                    ))}
                </div>

                {/* Contact CTA */}
                <p className="text-center text-muted-foreground mt-8">
                    Still have questions?{" "}
                    <a href="#contact" className="text-secondary font-medium hover:underline">
                        Get in touch
                    </a>
                </p>
            </div>
        </section>
    );
}
