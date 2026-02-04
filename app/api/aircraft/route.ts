import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        // Mock data generator - replace with real database queries
        const mockData = [
            { id: 1, tailNumber: "N123AB", model: "Boeing 737-800", airline: "SkyWings Airlines" },
            { id: 2, tailNumber: "N456CD", model: "Boeing 787-9", airline: "SkyWings Airlines" },
            { id: 3, tailNumber: "N789EF", model: "Airbus A320", airline: "SkyWings Airlines" },
            { id: 4, tailNumber: "N101GH", model: "Boeing 777-300ER", airline: "SkyWings Airlines" },
        ];

        return NextResponse.json({ aircraft: mockData }, {
            headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
        });
    } catch (error) {
        console.error("Error fetching aircraft:", error);
        return NextResponse.json(
            { error: "Failed to fetch aircraft data" },
            { status: 500 }
        );
    }
}
