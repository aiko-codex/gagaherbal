"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle, Mail, MessageSquare } from "lucide-react";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to submit");

            setIsSuccess(true);
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-muted/20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6 leading-tight">
                            Let's Start a <span className="italic text-secondary">Conversation</span>
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                            Have a question about our products? Need personalized wellness advice?
                            We'd love to hear from you. Our team typically responds within 24 hours.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                                    <Mail size={20} className="text-secondary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email us at</p>
                                    <a href="mailto:hello@gagaherbal.com" className="font-medium text-foreground hover:text-secondary transition-colors">
                                        hello@gagaherbal.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                                    <MessageSquare size={20} className="text-secondary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Live chat available</p>
                                    <p className="font-medium text-foreground">Mon-Fri, 9am-6pm IST</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="bg-white rounded-2xl border border-border/30 p-8">
                        {isSuccess ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
                                    <CheckCircle size={32} className="text-secondary" />
                                </div>
                                <h3 className="font-serif text-2xl font-medium text-foreground mb-2">
                                    Message Sent!
                                </h3>
                                <p className="text-muted-foreground mb-6">
                                    We'll get back to you within 24 hours.
                                </p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="text-secondary font-medium hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {error && (
                                    <div className="bg-red-50 text-red-500 text-sm p-4 rounded-xl">
                                        {error}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Name</label>
                                        <input
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your name"
                                            className="w-full px-4 py-3.5 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Email</label>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                            className="w-full px-4 py-3.5 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Phone (optional)</label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                            className="w-full px-4 py-3.5 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Subject</label>
                                        <input
                                            name="subject"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="How can we help?"
                                            className="w-full px-4 py-3.5 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Message</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us more about your question..."
                                        className="w-full px-4 py-3.5 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center gap-2 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin h-5 w-5" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
