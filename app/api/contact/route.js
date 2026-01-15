import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, phone, subject, message } = body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create contact query in database
        const query = await prisma.contactQuery.create({
            data: {
                name,
                email,
                phone: phone || null,
                subject,
                message,
            },
        });

        return NextResponse.json({ success: true, id: query.id });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to submit query" },
            { status: 500 }
        );
    }
}

export async function GET() {
    // For admin to fetch queries (can add auth later)
    try {
        const queries = await prisma.contactQuery.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({ queries });
    } catch (error) {
        console.error("Fetch queries error:", error);
        return NextResponse.json(
            { error: "Failed to fetch queries" },
            { status: 500 }
        );
    }
}
