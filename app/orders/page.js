"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Package,
    Loader2,
    ArrowLeft,
    Clock,
    Truck,
    CheckCircle,
    XCircle,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

async function fetchOrders() {
    const res = await fetch("/api/orders");
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
}

const statusConfig = {
    PENDING: { icon: Clock, color: "text-amber-500", bg: "bg-amber-50", label: "Processing" },
    SHIPPED: { icon: Truck, color: "text-blue-500", bg: "bg-blue-50", label: "Shipped" },
    DELIVERED: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50", label: "Delivered" },
    CANCELLED: { icon: XCircle, color: "text-red-500", bg: "bg-red-50", label: "Cancelled" },
};

export default function OrdersPage() {
    const { data: session, status: authStatus } = useSession();
    const router = useRouter();
    const [filter, setFilter] = useState("ALL");
    const [expandedOrder, setExpandedOrder] = useState(null);

    const { data, isLoading, error } = useQuery({
        queryKey: ["orders"],
        queryFn: fetchOrders,
        enabled: !!session,
    });

    useEffect(() => {
        if (authStatus === "unauthenticated") {
            router.push("/login?callbackUrl=/orders");
        }
    }, [authStatus, router]);

    if (authStatus === "loading" || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-secondary" />
            </div>
        );
    }

    if (!session) return null;

    const orders = data?.orders || [];
    const filteredOrders = filter === "ALL"
        ? orders
        : orders.filter(order => order.status === filter);

    const filters = [
        { key: "ALL", label: "All Orders" },
        { key: "PENDING", label: "Processing" },
        { key: "SHIPPED", label: "Shipped" },
        { key: "DELIVERED", label: "Delivered" },
    ];

    return (
        <div className="min-h-screen bg-background pt-40 pb-16">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/profile"
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                    >
                        <ArrowLeft size={20} className="text-muted-foreground" />
                    </Link>
                    <div>
                        <h1 className="font-serif text-3xl font-medium text-foreground">
                            My Orders
                        </h1>
                        <p className="text-muted-foreground">
                            {orders.length} order{orders.length !== 1 ? 's' : ''} total
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
                    {filters.map((f) => (
                        <button
                            key={f.key}
                            onClick={() => setFilter(f.key)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filter === f.key
                                ? "bg-foreground text-background"
                                : "bg-muted/50 text-muted-foreground hover:bg-muted"
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Orders List */}
                {error ? (
                    <div className="text-center py-16">
                        <p className="text-red-500">Failed to load orders. Please try again.</p>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="text-center py-16">
                        <Package size={48} className="mx-auto text-muted-foreground/30 mb-4" strokeWidth={1} />
                        <h3 className="font-serif text-xl font-medium text-foreground mb-2">
                            No orders found
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            {filter === "ALL"
                                ? "You haven't placed any orders yet."
                                : `No ${filters.find(f => f.key === filter)?.label.toLowerCase()} orders.`}
                        </p>
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/10 text-secondary rounded-full font-medium hover:bg-secondary/20 transition-colors"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredOrders.map((order) => {
                            const status = statusConfig[order.status] || statusConfig.PENDING;
                            const isExpanded = expandedOrder === order.id;

                            return (
                                <div
                                    key={order.id}
                                    className="bg-white rounded-2xl border border-border/30 overflow-hidden"
                                >
                                    {/* Order Header */}
                                    <button
                                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                                        className="w-full p-5 flex items-center justify-between hover:bg-muted/30 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-full ${status.bg}`}>
                                                <status.icon size={20} className={status.color} />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-medium text-foreground">
                                                    Order #{String(order.id).padStart(6, '0')}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="font-serif font-medium text-foreground">
                                                    ₹{Number(order.total).toFixed(2)}
                                                </p>
                                                <p className={`text-xs font-medium ${status.color}`}>
                                                    {status.label}
                                                </p>
                                            </div>
                                            {isExpanded ? (
                                                <ChevronUp size={20} className="text-muted-foreground" />
                                            ) : (
                                                <ChevronDown size={20} className="text-muted-foreground" />
                                            )}
                                        </div>
                                    </button>

                                    {/* Order Details (Expanded) */}
                                    {isExpanded && (
                                        <div className="px-5 pb-5 pt-2 border-t border-border/30">
                                            <div className="space-y-3">
                                                {order.items?.map((item) => (
                                                    <div key={item.id} className="flex items-center gap-4">
                                                        <div className="w-14 h-14 bg-muted/50 rounded-xl overflow-hidden flex-shrink-0">
                                                            <img
                                                                src={item.product?.image || "/images/placeholder.png"}
                                                                alt={item.product?.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-foreground truncate">
                                                                {item.product?.name || "Product"}
                                                            </p>
                                                            <p className="text-sm text-muted-foreground">
                                                                Qty: {item.quantity} × ₹{Number(item.price).toFixed(2)}
                                                            </p>
                                                        </div>
                                                        <p className="font-medium text-foreground">
                                                            ₹{(Number(item.price) * item.quantity).toFixed(2)}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
