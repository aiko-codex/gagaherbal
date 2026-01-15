"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

async function fetchOrders() {
    const res = await fetch("/api/orders");
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
}

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const { data, isLoading, error } = useQuery({
        queryKey: ["orders"],
        queryFn: fetchOrders,
        enabled: !!session,
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading" || isLoading) {
        return (
            <div className="min-h-screen pt-24 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!session) return null;

    const getStatusVariant = (orderStatus) => {
        switch (orderStatus) {
            case 'PENDING': return 'warning';
            case 'DELIVERED': return 'success';
            case 'SHIPPED': return 'secondary';
            default: return 'outline';
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-muted/40">
            <div className="container mx-auto px-4 md:px-6">
                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">My Dashboard</h1>
                <p className="text-muted-foreground mb-8">Welcome back, {session.user.name}</p>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar / Info */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Profile Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <label className="text-xs text-muted-foreground uppercase tracking-wider">Name</label>
                                    <p className="font-medium">{session.user.name}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground uppercase tracking-wider">Email</label>
                                    <p className="font-medium">{session.user.email}</p>
                                </div>
                                <div>
                                    <label className="text-xs text-muted-foreground uppercase tracking-wider">Role</label>
                                    <Badge variant="success" className="mt-1">{session.user.role}</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content: Orders */}
                    <div className="lg:col-span-3">
                        <h2 className="font-serif text-2xl font-bold mb-6 flex items-center gap-2">
                            <ShoppingBag className="h-6 w-6 text-primary" />
                            Order History
                        </h2>

                        {error && (
                            <div className="bg-red-50 text-red-500 p-4 rounded-lg">
                                Failed to load orders. Please try again later.
                            </div>
                        )}

                        {data?.orders?.length === 0 ? (
                            <Card className="text-center py-12">
                                <CardContent>
                                    <Package className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                                    <h3 className="text-xl font-bold mb-2">No orders yet</h3>
                                    <p className="text-muted-foreground mb-6">Start your journey with our herbal remedies.</p>
                                    <Button asChild>
                                        <Link href="/shop">Browse Products</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="space-y-6">
                                {data?.orders?.map((order) => (
                                    <Card key={order.id} className="overflow-hidden">
                                        <div className="p-4 md:p-6 border-b bg-muted/30 flex flex-wrap gap-4 justify-between items-center">
                                            <div className="flex gap-4 md:gap-6 text-sm">
                                                <div>
                                                    <p className="text-xs text-muted-foreground uppercase">Order Date</p>
                                                    <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground uppercase">Total</p>
                                                    <p className="font-bold text-primary">₹{Number(order.total).toFixed(2)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground uppercase">Status</p>
                                                    <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                                                </div>
                                            </div>
                                            <div className="text-sm text-muted-foreground">Order #{order.id}</div>
                                        </div>
                                        <CardContent className="p-4 md:p-6">
                                            <div className="space-y-4">
                                                {order.items.map((item) => (
                                                    <div key={item.id} className="flex gap-4 items-center">
                                                        <div className="h-14 w-14 bg-muted rounded-md overflow-hidden flex-shrink-0 relative">
                                                            <img
                                                                src="https://loremflickr.com/320/240/herbal"
                                                                alt="Product"
                                                                className="object-cover h-full w-full"
                                                            />
                                                            <Badge className="absolute -bottom-1 -right-1 text-[10px] h-5 w-5 p-0 flex items-center justify-center">
                                                                x{item.quantity}
                                                            </Badge>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-medium">{item.product?.name || "Unknown Product"}</h4>
                                                            <p className="text-sm text-muted-foreground">₹{Number(item.price).toFixed(2)}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
