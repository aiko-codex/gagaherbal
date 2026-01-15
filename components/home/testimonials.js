"use client";

import { Star } from "lucide-react";

const TESTIMONIALS = [
    {
        id: 1,
        text: "The chamomile tea has completely changed my sleep routine. I fall asleep faster and wake up refreshed.",
        author: "Sarah Jenkins",
        role: "Yoga Instructor",
        rating: 5,
    },
    {
        id: 2,
        text: "I was skeptical about herbal supplements, but the turmeric elixir has noticeably reduced my joint pain.",
        author: "Michael Chen",
        role: "Marathon Runner",
        rating: 5,
    },
    {
        id: 3,
        text: "The quality of these products is unmatched. You can really taste and feel the difference in the ingredients.",
        author: "Emma Rodriguez",
        role: "Nutritionist",
        rating: 5,
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-muted/20">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4 leading-tight">
                        What Our <span className="italic text-secondary">Community</span> Says
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Real stories from people who've embraced the power of nature.
                    </p>
                </div>

                {/* Testimonial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {TESTIMONIALS.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white p-8 rounded-2xl border border-border/30 hover:border-secondary/30 transition-colors"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-secondary text-secondary" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-foreground leading-relaxed mb-8">
                                "{testimonial.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                                    <span className="font-serif text-lg font-medium text-secondary">
                                        {testimonial.author[0]}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">{testimonial.author}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
