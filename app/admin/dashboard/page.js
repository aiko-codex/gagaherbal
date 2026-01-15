"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, LayoutDashboard, DollarSign, ShoppingBag, Users, IndianRupee } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

async function fetchAdminOrders() {
    const res = await fetch("/api/admin/orders");
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
}

export default function AdminDashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const { data, isLoading } = useQuery({
        queryKey: ["admin-orders"],
        queryFn: fetchAdminOrders,
        enabled: !!session && (session.user.role === "SUPER_ADMIN" || session.user.role === "STAFF"),
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated" && session.user.role !== "SUPER_ADMIN" && session.user.role !== "STAFF") {
            router.push("/dashboard");
        }
    }, [status, session, router]);

    if (status === "loading" || isLoading) {
        return (
            <div className="min-h-screen pt-24 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!data?.orders) return null;

    const totalOrders = data.orders.length;
    const totalRevenue = data.orders.reduce((acc, order) => acc + Number(order.total), 0);
    const pendingOrders = data.orders.filter(o => o.status === 'PENDING').length;

    const getStatusVariant = (status) => {
        switch (status) {
            case 'PENDING': return 'warning';
            case 'DELIVERED': return 'success';
            case 'SHIPPED': return 'secondary';
            default: return 'outline';
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-muted/40">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <h1 className="font-serif text-3xl font-bold flex items-center gap-2">
                        <LayoutDashboard className="h-8 w-8 text-primary" />
                        Admin Dashboard
                    </h1>
                    <Button asChild variant="outline">
                        <Link href="/admin/products">Manage Products</Link>
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardContent className="flex items-center gap-4 pt-6">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                                <ShoppingBag className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Orders</p>
                                <h3 className="text-2xl font-bold">{totalOrders}</h3>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center gap-4 pt-6">
                            <div className="p-3 bg-green-100 text-green-600 rounded-full">
                                <IndianRupee className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Revenue</p>
                                <h3 className="text-2xl font-bold">₹{totalRevenue.toFixed(2)}</h3>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center gap-4 pt-6">
                            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Pending Orders</p>
                                <h3 className="text-2xl font-bold">{pendingOrders}</h3>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Orders Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-serif text-xl">Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">#{order.id}</TableCell>
                                        <TableCell>{order.user?.name || "Guest"}</TableCell>
                                        <TableCell className="text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusVariant(order.status)}>
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right font-bold">₹{Number(order.total).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
