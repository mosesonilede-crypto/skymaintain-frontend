import { NextResponse } from "next/server";
import { z } from "zod";

const IngestionRecordSchema = z.object({
    source: z.enum([
        "CMC/CMS Faults",
        "ACMS Outputs",
        "EFB Discrepancies",
        "MEL/Deferred Defect History",
        "Component Remove/Install History",
        "Reliability + Environment/Phase Context",
    ]),
    aircraftId: z.string().min(1),
    tailNumber: z.string().optional(),
    timestamp: z.string().min(1),
    payload: z.record(z.string(), z.any()),
});

type IngestionRecord = z.infer<typeof IngestionRecordSchema>;

type Store = { records: IngestionRecord[] };

const globalForIngestion = globalThis as unknown as { __ingestionStore?: Store };
const ingestionStore = globalForIngestion.__ingestionStore ?? { records: [] };

globalForIngestion.__ingestionStore = ingestionStore;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const record = IngestionRecordSchema.parse(body);

        if ("recommendation" in record.payload || "workOrder" in record.payload) {
            return NextResponse.json(
                { error: "Ingestion boundary violation: recommendations/work orders are not accepted." },
                { status: 400 }
            );
        }

        ingestionStore.records.push(record);
        return NextResponse.json({ ok: true });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Invalid ingestion payload" },
            { status: 400 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ records: ingestionStore.records });
}
