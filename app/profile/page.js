"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Link from "next/link";
import {
    User,
    Package,
    ShoppingBag,
    Heart,
    Settings,
    LogOut,
    ChevronRight,
    Loader2,
    Mail,
    Calendar,
    Award,
} from "lucide-react";

async function fetchUserStats() {
    const res = await fetch("/api/orders");
    if (!res.ok) return { orders: [] };
    return res.json();
}

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const { data, isLoading } = useQuery({
        queryKey: ["userStats"],
        queryFn: fetchUserStats,
        enabled: !!session,
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=/profile");
        }
    }, [status, router]);

    if (status === "loading" || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-secondary" />
            </div>
        );
    }

    if (!session) return null;

    const orderCount = data?.orders?.length || 0;

    const quickLinks = [
        {
            name: "My Orders",
            description: "View order history and track shipments",
            href: "/orders",
            icon: Package,
        },
        {
            name: "Shopping Cart",
            description: "Review items in your cart",
            href: "/cart",
            icon: ShoppingBag,
        },
        {
            name: "Wishlist",
            description: "Products you've saved for later",
            href: "/wishlist",
            icon: Heart,
        },
        {
            name: "Account Settings",
            description: "Update your preferences",
            href: "/settings",
            icon: Settings,
        },
    ];

    const stats = [
        { label: "Total Orders", value: orderCount, icon: Package },
        { label: "Wishlist Items", value: 0, icon: Heart },
        { label: "Reward Points", value: orderCount * 50, icon: Award },
    ];

    return (
        <div className="min-h-screen bg-background pt-40 pb-16">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                {/* Profile Header */}
                <div className="text-center mb-12">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
                        {session.user.image ? (
                            <img
                                src={session.user.image}
                                alt={session.user.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <User size={40} className="text-secondary" strokeWidth={1.5} />
                        )}
                    </div>
                    <h1 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-2">
                        {session.user.name}
                    </h1>
                    <p className="text-muted-foreground flex items-center justify-center gap-2">
                        <Mail size={16} />
                        {session.user.email}
                    </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mb-12">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-muted/30 rounded-2xl p-6 text-center border border-border/30"
                        >
                            <stat.icon size={24} className="mx-auto mb-3 text-secondary" strokeWidth={1.5} />
                            <p className="text-2xl font-serif font-medium text-foreground mb-1">
                                {stat.value}
                            </p>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Quick Links */}
                <div className="space-y-3 mb-12">
                    {quickLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="flex items-center justify-between p-5 bg-white rounded-2xl border border-border/30 hover:border-secondary/30 hover:bg-secondary/5 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                                    <link.icon size={20} className="text-secondary" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">{link.name}</p>
                                    <p className="text-sm text-muted-foreground">{link.description}</p>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                        </Link>
                    ))}
                </div>

                {/* Logout Button */}
                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-full border border-red-200 text-red-500 hover:bg-red-50 transition-colors font-medium"
                >
                    <LogOut size={18} strokeWidth={1.5} />
                    Sign Out
                </button>

                {/* Footer Note */}
                <p className="text-center text-xs text-muted-foreground mt-8">
                    Member since {new Date().getFullYear()} • GagaHerbal 🌿
                </p>
            </div>
        </div>
    );
}
