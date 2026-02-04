import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { aircraftReg: string } }
) {
    try {
        const aircraftReg = params.aircraftReg.toUpperCase();

        // Generate mock alerts - replace with real database queries
        const mockAlerts = [
            {
                id: "1",
                type: "Hydraulic System",
                severity: "critical",
                status: "Active",
                aircraftRegistration: aircraftReg,
                predictedFailureDate: new Date(Date.now() + 86400000).toISOString(),
                confidence: 0.92,
                recommendation: "Immediate hydraulic system inspection required",
            },
            {
                id: "2",
                type: "Engine Bearing",
                severity: "high",
                status: "Active",
                aircraftRegistration: aircraftReg,
                predictedFailureDate: new Date(Date.now() + 259200000).toISOString(),
                confidence: 0.87,
                recommendation: "Schedule engine bearing replacement within 72 hours",
            },
            {
                id: "3",
                type: "Landing Gear",
                severity: "medium",
                status: "Monitoring",
                aircraftRegistration: aircraftReg,
                predictedFailureDate: new Date(Date.now() + 604800000).toISOString(),
                confidence: 0.75,
                recommendation: "Monitor landing gear actuator performance",
            },
            {
                id: "4",
                type: "Avionics System",
                severity: "low",
                status: "Monitoring",
                aircraftRegistration: aircraftReg,
                predictedFailureDate: new Date(Date.now() + 1209600000).toISOString(),
                confidence: 0.68,
                recommendation: "Schedule avionics software update",
            },
        ];

        return NextResponse.json({ alerts: mockAlerts }, {
            headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200" },
        });
    } catch (error) {
        console.error("Error fetching alerts:", error);
        return NextResponse.json(
            { error: "Failed to fetch alerts" },
            { status: 500 }
        );
    }
}
