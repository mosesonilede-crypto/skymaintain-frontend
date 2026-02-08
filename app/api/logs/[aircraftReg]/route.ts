import { NextRequest, NextResponse } from "next/server";

// Realistic maintenance log data generator
function generateMaintenanceLogs(aircraftReg: string) {
    const logTemplates = [
        {
            type: "A-Check",
            title: "A-Check Inspection",
            description: "Complete A-Check including visual inspection, lubrication, and minor repairs",
            durationHours: 18,
        },
        {
            type: "Avionics",
            title: "Avionics Software Update",
            description: "Critical avionics software update for FMS and TCAS systems",
            durationHours: 4,
        },
        {
            type: "Landing Gear",
            title: "Landing Gear Inspection",
            description: "Routine landing gear inspection and hydraulic fluid check",
            durationHours: 6,
        },
        {
            type: "Engine",
            title: "Engine Oil Analysis",
            description: "Scheduled engine oil sampling and analysis for wear metal detection",
            durationHours: 2,
        },
        {
            type: "Pressurization",
            title: "Cabin Pressure System Check",
            description: "Inspection of cabin pressurization system and outflow valves",
            durationHours: 5,
        },
        {
            type: "Electrical",
            title: "Electrical System Test",
            description: "Comprehensive electrical system diagnostic and battery load test",
            durationHours: 3,
        },
        {
            type: "Hydraulics",
            title: "Hydraulic System Service",
            description: "Hydraulic fluid replacement and system pressure test",
            durationHours: 4,
        },
        {
            type: "Flight Controls",
            title: "Flight Control Rigging",
            description: "Flight control surfaces rigging check and adjustment",
            durationHours: 8,
        },
    ];

    const technicians = [
        "John Anderson",
        "Sarah Williams",
        "Mike Chen",
        "Emily Davis",
        "Robert Martinez",
        "Jessica Thompson",
        "David Wilson",
        "Amanda Garcia",
    ];

    const statuses = ["Completed", "Completed", "Completed", "Completed", "In Progress"];

    // Generate logs going back in time
    const logs = logTemplates.slice(0, 6).map((template, i) => {
        const daysAgo = i * 7; // Weekly intervals
        const logDate = new Date();
        logDate.setDate(logDate.getDate() - daysAgo);

        return {
            id: `log-${aircraftReg}-${i + 1}`,
            date: logDate.toISOString(),
            type: template.type,
            title: template.title,
            description: template.description,
            technician: technicians[i % technicians.length],
            status: statuses[Math.min(i, statuses.length - 1)],
            durationHours: template.durationHours,
            parts: [],
            notes: i === 0 ? "Most recent maintenance completed successfully." : "",
        };
    });

    return logs;
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ aircraftReg: string }> }
) {
    try {
        const { aircraftReg: reg } = await params;
        const aircraftReg = reg.toUpperCase();

        // Check for live backend API
        const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (apiBase) {
            try {
                const backendResponse = await fetch(`${apiBase}/aircraft/${aircraftReg}/logs`, {
                    headers: {
                        "Accept": "application/json",
                    },
                });
                if (backendResponse.ok) {
                    const liveData = await backendResponse.json();
                    return NextResponse.json(liveData, {
                        headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" },
                    });
                }
            } catch (error) {
                console.warn("Backend API unavailable, using mock data");
            }
        }

        // Generate mock data with realistic maintenance information
        const mockData = {
            aircraftReg,
            logs: generateMaintenanceLogs(aircraftReg),
            lastUpdated: new Date().toISOString(),
            source: "mock",
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
