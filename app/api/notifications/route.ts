import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Mock notifications - replace with real database queries
        const mockData = [
            { id: 1, text: "Critical hydraulic system alert", severity: "critical", timestamp: new Date().toISOString() },
            { id: 2, text: "A-Check due in 50 days", severity: "warning", timestamp: new Date(Date.now() - 3600000).toISOString() },
            { id: 3, text: "Avionics software update available", severity: "info", timestamp: new Date(Date.now() - 7200000).toISOString() },
            { id: 4, text: "Engine oil change recommended", severity: "warning", timestamp: new Date(Date.now() - 10800000).toISOString() },
            { id: 5, text: "Landing gear inspection passed", severity: "success", timestamp: new Date(Date.now() - 14400000).toISOString() },
        ];

        return NextResponse.json({ notifications: mockData }, {
            headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
        });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return NextResponse.json(
            { error: "Failed to fetch notifications" },
            { status: 500 }
        );
    }
}
