import { NextResponse } from "next/server";
import { auth } from "@/auth"; // Use auth.js, assuming it exports the node-compatible one or I might validly need to use the one from proxy if it's universal. actually auth.js is the one with providers.
// Wait, auth.js has the full NextAuth config.
// In app directory, we can use `auth()` helper. 
// import { auth } from "@/auth"; 

import { prisma } from "@/lib/prisma";

export async function POST(req) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { items, shippingDetails } = body;
        // shippingDetails is ignored for now as per schema limitations, 
        // or we could assume it's stored conceptually.

        if (!items || items.length === 0) {
            return NextResponse.json({ error: "No items in order" }, { status: 400 });
        }

        // 1. Calculate total from DB prices to be secure
        const productIds = items.map((item) => item.id);
        const complexProducts = await prisma.product.findMany({
            where: { id: { in: productIds } },
        });

        let calculatedTotal = 0;
        const orderItemsData = [];

        for (const item of items) {
            const dbProduct = complexProducts.find((p) => p.id === item.id);
            if (!dbProduct) continue; // or throw error

            const quantity = item.quantity;
            const price = Number(dbProduct.price); // Ensure it's a number

            calculatedTotal += price * quantity;

            orderItemsData.push({
                productId: item.id,
                quantity: quantity,
                price: price, // Store snapshot of price
            });
        }

        // Add shipping rule: Free > 499, else 50
        const shippingCost = calculatedTotal > 499 ? 0 : 50;
        const finalTotal = calculatedTotal + shippingCost;

        // 2. Create Order Transaction
        const order = await prisma.order.create({
            data: {
                userId: Number(session.user.id),
                total: finalTotal,
                status: "PENDING",
                items: {
                    create: orderItemsData,
                },
            },
            include: {
                items: true,
            },
        });

        return NextResponse.json({ order }, { status: 201 });
    } catch (error) {
        console.error("Order creation error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const orders = await prisma.order.findMany({
            where: {
                userId: Number(session.user.id),
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        return NextResponse.json({ orders }, { status: 200 });
    } catch (error) {
        console.error("Fetch orders error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
