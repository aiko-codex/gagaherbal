"use client";

import { Quote } from "lucide-react";

const TESTIMONIALS = [
    {
        id: 1,
        text: "The chamomile tea has completely changed my sleep routine. I fall asleep faster and wake up refreshed.",
        author: "Sarah Jenkins",
        role: "Yoga Instructor",
    },
    {
        id: 2,
        text: "I was skeptical about herbal supplements, but the turmeric elixir has noticeably reduced my joint pain.",
        author: "Michael Chen",
        role: "Marathon Runner",
    },
    {
        id: 3,
        text: "The quality of these products is unmatched. You can really taste and feel the difference in the ingredients.",
        author: "Emma Rodriguez",
        role: "Nutritionist",
    },
];

export default function Testimonials() {
    return (
        <section className="bg-stone-50 py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                        What Our Community Says
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow relative"
                        >
                            <Quote className="h-10 w-10 text-primary/20 absolute top-6 left-6" />
                            <p className="text-foreground/80 italic mb-6 relative z-10 pt-4">
                                "{testimonial.text}"
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-serif font-bold">
                                    {testimonial.author[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">{testimonial.author}</h4>
                                    <p className="text-xs text-muted-foreground">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
