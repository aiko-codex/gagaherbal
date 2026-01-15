import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
    try {
        const session = await auth();
        // Strict Role Check
        if (!session?.user || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "STAFF")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                user: {
                    select: { name: true, email: true }
                },
                items: true,
            },
            take: 50, // Limit to recent 50 for now
        });

        return NextResponse.json({ orders }, { status: 200 });
    } catch (error) {
        console.error("Fetch admin orders error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
