import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ aircraftReg: string }> }
) {
    try {
        const { aircraftReg: reg } = await params;
        const aircraftReg = reg.toUpperCase();

        // Generate mock dashboard data - replace with real database queries
        const mockData = {
            aircraft: {
                tailNumber: aircraftReg,
                model: "Boeing 737-800",
                operator: "SkyWings Fleet",
                status: "Operational",
                health: "Excellent",
                location: "Airport Gate B12",
                totalFlightHours: 45230,
                totalCycles: 15420,
                lastMaintenance: new Date(Date.now() - 604800000).toISOString(),
            },
            kpis: {
                critical: {
                    count: 2,
                    items: ["Hydraulic system inspection", "Engine bearing replacement"],
                },
                scheduled: {
                    count: 5,
                    items: ["A-Check due", "Oil change", "Filter replacement", "Tire inspection", "Avionics update"],
                },
                good: {
                    count: 23,
                    items: Array.from({ length: 23 }, (_, i) => `System check ${i + 1}`),
                },
            },
            systemHealth: [
                { system: "Engine 1", status: "Healthy", efficiency: 98 },
                { system: "Engine 2", status: "Healthy", efficiency: 97 },
                { system: "Hydraulics", status: "Warning", efficiency: 85 },
                { system: "Avionics", status: "Healthy", efficiency: 100 },
                { system: "Landing Gear", status: "Healthy", efficiency: 99 },
                { system: "Electrical", status: "Healthy", efficiency: 96 },
            ],
            lastUpdated: new Date().toISOString(),
        };

        return NextResponse.json(mockData, {
            headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return NextResponse.json(
            { error: "Failed to fetch dashboard data" },
            { status: 500 }
        );
    }
}
