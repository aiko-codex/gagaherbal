"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

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

            router.push("/");
            router.refresh(); // Refresh to update session in header
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm border">
            <div className="text-center">
                <h2 className="font-serif text-3xl font-bold text-gray-900">
                    Welcome Back
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Sign in to access your account
                </p>
            </div>

            {successMessage && (
                <div className="bg-green-50 text-green-600 text-sm p-3 rounded-md text-center">
                    Account created successfully! Please sign in.
                </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {error && (
                    <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md text-center">
                        {error}
                    </div>
                )}
                <div className="rounded-md shadow-sm space-y-4">
                    <div>
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin h-5 w-5" />
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </div>
            </form>
            <div className="text-center text-sm">
                <span className="text-gray-500">Don't have an account? </span>
                <Link
                    href="/register"
                    className="font-medium text-primary hover:text-primary/80"
                >
                    Sign up
                </Link>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<div className="flex justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
}
