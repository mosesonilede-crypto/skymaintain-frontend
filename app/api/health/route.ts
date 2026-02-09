import { NextResponse } from "next/server";

export const runtime = "edge";

type HealthStatus = {
    status: "healthy" | "degraded" | "unhealthy";
    timestamp: string;
    version: string;
    environment: string;
    checks: {
        name: string;
        status: "pass" | "warn" | "fail";
        message?: string;
    }[];
};

export async function GET() {
    const checks: HealthStatus["checks"] = [];

    // Check required environment variables
    const requiredEnvVars = [
        "TWO_FA_SECRET",
        "SMTP_HOST",
        "SMTP_FROM",
    ];

    const missingVars = requiredEnvVars.filter(v => !process.env[v]);

    if (missingVars.length === 0) {
        checks.push({ name: "env_config", status: "pass" });
    } else if (missingVars.length < requiredEnvVars.length) {
        checks.push({
            name: "env_config",
            status: "warn",
            message: `Missing: ${missingVars.join(", ")}`
        });
    } else {
        checks.push({
            name: "env_config",
            status: "fail",
            message: "Critical environment variables missing"
        });
    }

    // Check data mode configuration
    const dataMode = process.env.NEXT_PUBLIC_DATA_MODE || "mock";
    checks.push({
        name: "data_mode",
        status: dataMode === "live" ? "pass" : "warn",
        message: `Mode: ${dataMode}`,
    });

    // Determine overall status
    const hasFailure = checks.some(c => c.status === "fail");
    const hasWarning = checks.some(c => c.status === "warn");

    const status: HealthStatus = {
        status: hasFailure ? "unhealthy" : hasWarning ? "degraded" : "healthy",
        timestamp: new Date().toISOString(),
        version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || "dev",
        environment: process.env.NODE_ENV || "development",
        checks,
    };

    return NextResponse.json(status, {
        status: hasFailure ? 503 : 200,
        headers: {
            "Cache-Control": "no-store",
        },
    });
}
