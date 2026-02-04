import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { aircraftReg: string } }
) {
    try {
        const aircraftReg = params.aircraftReg.toUpperCase();

        // Generate mock logs data - replace with real database queries
        const mockData = {
            logs: Array.from({ length: 20 }, (_, i) => ({
                id: `log-${i + 1}`,
                date: new Date(Date.now() - (i * 86400000)).toISOString(),
                type: ["Maintenance", "Repair", "Inspection", "Update"][i % 4],
                title: [
                    "Routine maintenance check",
                    "Engine oil change",
                    "Hydraulic system inspection",
                    "Avionics software update",
                    "Landing gear inspection",
                    "Electrical system test",
                ][i % 6],
                description: "Work completed successfully",
                technician: `Technician #${Math.floor(i / 2) + 1}`,
                status: "Completed",
            })),
            lastUpdated: new Date().toISOString(),
        };

        return NextResponse.json(mockData, {
            headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200" },
        });
    } catch (error) {
        console.error("Error fetching logs:", error);
        return NextResponse.json(
            { error: "Failed to fetch logs" },
            { status: 500 }
        );
    }
}
