export type IngestionField = {
    field: string;
    type: string;
    units?: string;
    required: boolean;
    validation: string;
};

export type IngestionContract = {
    source: string;
    description: string;
    requiredIdentifiers: string[];
    fields: IngestionField[];
};

export const INGESTION_CONTRACTS: IngestionContract[] = [
    {
        source: "CMC/CMS Faults",
        description: "Central Maintenance Computer/Monitoring System fault events.",
        requiredIdentifiers: ["aircraftId", "tailNumber", "timestamp"],
        fields: [
            { field: "faultCode", type: "string", required: true, validation: "Non-empty; matches OEM fault catalog." },
            { field: "system", type: "string", required: true, validation: "ATA chapter or system name." },
            { field: "severity", type: "string", required: true, validation: "info | warning | critical" },
            { field: "timestamp", type: "ISO-8601", required: true, validation: "UTC timestamp" },
            { field: "flightPhase", type: "string", required: false, validation: "taxi | takeoff | cruise | landing" },
        ],
    },
    {
        source: "ACMS Outputs",
        description: "Aircraft Condition Monitoring System metrics and exceedances.",
        requiredIdentifiers: ["aircraftId", "tailNumber", "timestamp"],
        fields: [
            { field: "parameter", type: "string", required: true, validation: "Known ACMS parameter" },
            { field: "value", type: "number", required: true, validation: "Numeric" },
            { field: "units", type: "string", required: true, validation: "Unit string" },
            { field: "timestamp", type: "ISO-8601", required: true, validation: "UTC timestamp" },
            { field: "phase", type: "string", required: false, validation: "Flight phase" },
        ],
    },
    {
        source: "EFB Discrepancies",
        description: "Electronic Flight Bag discrepancy reports.",
        requiredIdentifiers: ["aircraftId", "tailNumber", "timestamp"],
        fields: [
            { field: "discrepancyId", type: "string", required: true, validation: "Unique identifier" },
            { field: "description", type: "string", required: true, validation: "Non-empty" },
            { field: "reportedBy", type: "string", required: true, validation: "User identifier" },
            { field: "timestamp", type: "ISO-8601", required: true, validation: "UTC timestamp" },
        ],
    },
    {
        source: "MEL/Deferred Defect History",
        description: "Minimum Equipment List deferrals and history.",
        requiredIdentifiers: ["aircraftId", "tailNumber", "melRef"],
        fields: [
            { field: "melRef", type: "string", required: true, validation: "MEL reference" },
            { field: "deferralDate", type: "ISO-8601", required: true, validation: "UTC timestamp" },
            { field: "expiryDate", type: "ISO-8601", required: true, validation: "UTC timestamp" },
            { field: "status", type: "string", required: true, validation: "open | cleared" },
        ],
    },
    {
        source: "Component Remove/Install History",
        description: "Lifecycle events for serialized components.",
        requiredIdentifiers: ["aircraftId", "componentSerial"],
        fields: [
            { field: "componentSerial", type: "string", required: true, validation: "Non-empty" },
            { field: "event", type: "string", required: true, validation: "remove | install" },
            { field: "timestamp", type: "ISO-8601", required: true, validation: "UTC timestamp" },
            { field: "hours", type: "number", required: false, validation: "Numeric" },
            { field: "cycles", type: "number", required: false, validation: "Numeric" },
        ],
    },
    {
        source: "Reliability + Environment/Phase Context",
        description: "Reliability KPIs with environmental/phase context.",
        requiredIdentifiers: ["aircraftId", "timestamp"],
        fields: [
            { field: "kpi", type: "string", required: true, validation: "MTBUR | MTBF | MTTR" },
            { field: "value", type: "number", required: true, validation: "Numeric" },
            { field: "environment", type: "string", required: false, validation: "Hot/high | cold | coastal" },
            { field: "flightPhase", type: "string", required: false, validation: "Phase string" },
        ],
    },
];
