import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { aircraftReg: string } }
) {
    try {
        const aircraftReg = params.aircraftReg.toUpperCase();

        // Generate mock insights data - replace with real database queries
        const mockData = {
            predictiveAlert: {
                aircraftRegistration: aircraftReg,
                type: "Engine Bearing Health",
                severity: "High",
                confidence: 0.89,
                predictedFailureDate: new Date(Date.now() + 259200000).toISOString(),
                currentMetrics: {
                    vibration: 4.2,
                    temperature: 72.5,
                    loadFactor: 0.85,
                },
                trend: "Deteriorating",
                recommendation: "Schedule engine bearing replacement within 72 hours to prevent operational downtime.",
            },
            systemMetrics: [
                { name: "Engine 1", value: 94, unit: "%" },
                { name: "Engine 2", value: 91, unit: "%" },
                { name: "Hydraulics", value: 87, unit: "%" },
                { name: "Electrical", value: 98, unit: "%" },
                { name: "Landing Gear", value: 92, unit: "%" },
            ],
            maintenanceInsights: [
                "Engine bearing replacement should be completed within 72 hours",
                "Hydraulic system maintenance is recommended in the next 30 days",
                "Avionics software update available and should be scheduled",
            ],
            lastUpdated: new Date().toISOString(),
        };

        return NextResponse.json(mockData, {
            headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200" },
        });
    } catch (error) {
        console.error("Error fetching insights:", error);
        return NextResponse.json(
            { error: "Failed to fetch insights" },
            { status: 500 }
        );
    }
}
