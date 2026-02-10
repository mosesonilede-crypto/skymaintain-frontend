import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ aircraftReg: string }> }
) {
    try {
        const { aircraftReg: reg } = await params;
        const aircraftReg = reg.toUpperCase();

        // Generate mock reports data - replace with real database queries
        const mockData = {
            aircraftOverview: [
                { label: "Tail Number", value: aircraftReg },
                { label: "Model", value: "Boeing 737-800" },
                { label: "Operator", value: "SkyWings Fleet" },
                { label: "Registration", value: `N/A-${aircraftReg}` },
                { label: "Manufactured", value: "2015" },
            ],
            maintenanceSummary: [
                { label: "Last A-Check", value: "45 days ago" },
                { label: "Last C-Check", value: "180 days ago" },
                { label: "Next Scheduled", value: "In 12 days" },
                { label: "Flight Hours", value: "45,230 hours" },
                { label: "Flight Cycles", value: "15,420 cycles" },
            ],
            systemHealth: [
                { name: "Engines", health: "Excellent", percentage: 95 },
                { name: "Hydraulics", health: "Good", percentage: 87 },
                { name: "Electrical", health: "Excellent", percentage: 98 },
                { name: "Landing Gear", health: "Good", percentage: 91 },
                { name: "Avionics", health: "Excellent", percentage: 100 },
                { name: "Environmental Control", health: "Good", percentage: 88 },
            ],
            lastUpdated: new Date().toISOString(),
        };

        return NextResponse.json(mockData, {
            headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
        });
    } catch (error) {
        console.error("Error fetching reports data:", error);
        return NextResponse.json(
            { error: "Failed to fetch reports data" },
            { status: 500 }
        );
    }
}
