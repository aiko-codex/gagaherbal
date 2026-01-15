"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2, Mail, Lock, ArrowRight, Leaf, Eye, EyeOff } from "lucide-react";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const successMessage = searchParams.get("success");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (result.error) {
                throw new Error("Invalid email or password");
            }

            router.push(callbackUrl);
            router.refresh();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const inputStyles = "w-full pl-12 pr-4 py-4 bg-muted/30 border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all autofill:bg-muted/30 autofill:shadow-[inset_0_0_0px_1000px_rgb(var(--muted)/0.3)]";

    return (
        <div className="w-full max-w-md">
            {/* Logo */}
            <div className="text-center mb-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Leaf size={28} className="text-secondary" />
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-2">
                    Welcome Back
                </h1>
                <p className="text-muted-foreground">
                    Sign in to continue your wellness journey
                </p>
            </div>

            {/* Success Message */}
            {successMessage && (
                <div className="bg-secondary/10 text-secondary text-sm p-4 rounded-2xl text-center mb-6 border border-secondary/20">
                    Account created successfully! Please sign in.
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 text-red-500 text-sm p-4 rounded-2xl text-center mb-6 border border-red-100">
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={inputStyles}
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-foreground">
                        Password
                    </label>
                    <div className="relative">
                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className={`${inputStyles} pr-12`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                    <Link href="/forgot-password" className="text-sm text-muted-foreground hover:text-secondary transition-colors">
                        Forgot password?
                    </Link>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors disabled:opacity-70"
                >
                    {loading ? (
                        <Loader2 className="animate-spin h-5 w-5" />
                    ) : (
                        <>
                            Sign In
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>
            </form>

            {/* Register Link */}
            <p className="text-center text-muted-foreground mt-8">
                Don't have an account?{" "}
                <Link href="/register" className="text-secondary font-medium hover:underline">
                    Create one
                </Link>
            </p>

            {/* Footer */}
            <p className="text-center text-xs text-muted-foreground mt-12">
                By signing in, you agree to our Terms and Privacy Policy
            </p>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background pt-32 pb-16 px-4">
            <Suspense fallback={<Loader2 className="animate-spin h-8 w-8 text-secondary" />}>
                <LoginForm />
            </Suspense>
        </div>
    );
}
