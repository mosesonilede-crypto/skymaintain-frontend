import { z } from "zod";

export const PolicyStampedAdvisorySchema = z.object({
    label: z.literal("ADVISORY_ONLY"),
    advisoryId: z.string().min(1),
    title: z.string().min(1),
    summary: z.string().min(1),
    confidenceDescriptor: z.enum(["LOW", "MEDIUM", "HIGH", "VERY_HIGH"]),
    confidenceScore: z.number().min(0).max(1).optional(),
    sourceDataReferences: z.array(
        z.object({
            source: z.string().min(1),
            referenceId: z.string().min(1),
            capturedAt: z.string().min(1),
            units: z.string().optional(),
        })
    ),
    noAutomaticExecutionRights: z.literal(true),
    aircraftId: z.string().min(1),
    system: z.string().optional(),
    component: z.string().optional(),
    generatedAt: z.string().min(1),
});

export type PolicyStampedAdvisory = z.infer<typeof PolicyStampedAdvisorySchema>;

export function assertPolicyStampedAdvisory(payload: unknown): PolicyStampedAdvisory {
    return PolicyStampedAdvisorySchema.parse(payload);
}
