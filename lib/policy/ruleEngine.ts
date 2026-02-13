import { z } from "zod";

export const RuleEngineInputSchema = z.object({
    aircraftId: z.string().min(1),
    component: z.string().optional(),
    system: z.string().optional(),
    remainingHours: z.number().optional(),
    remainingCycles: z.number().optional(),
    hardTimeThresholdHours: z.number().optional(),
    hardTimeThresholdCycles: z.number().optional(),
    mandatedIntervalHit: z.boolean().optional(),
});

export type RuleEngineInput = z.infer<typeof RuleEngineInputSchema>;

export const RuleEngineDecisionSchema = z.object({
    outcome: z.enum(["AUTHORITATIVE_REQUIRED", "ADVISORY_ONLY"]),
    reason: z.string().min(1),
    ruleHits: z.array(z.string()).min(1),
    evaluatedAt: z.string().min(1),
});

export type RuleEngineDecision = z.infer<typeof RuleEngineDecisionSchema>;

export function evaluateRuleEngineDecision(input: RuleEngineInput): RuleEngineDecision {
    const now = new Date().toISOString();
    const ruleHits: string[] = [];

    if (input.mandatedIntervalHit) {
        ruleHits.push("MANDATED_INTERVAL_REACHED");
    }

    if (
        typeof input.remainingHours === "number" &&
        typeof input.hardTimeThresholdHours === "number" &&
        input.remainingHours <= input.hardTimeThresholdHours
    ) {
        ruleHits.push("HARD_TIME_HOURS_THRESHOLD_REACHED");
    }

    if (
        typeof input.remainingCycles === "number" &&
        typeof input.hardTimeThresholdCycles === "number" &&
        input.remainingCycles <= input.hardTimeThresholdCycles
    ) {
        ruleHits.push("HARD_TIME_CYCLES_THRESHOLD_REACHED");
    }

    if (ruleHits.length > 0) {
        return {
            outcome: "AUTHORITATIVE_REQUIRED",
            reason: "Authoritative rule threshold reached. Advisory cannot override mandatory action.",
            ruleHits,
            evaluatedAt: now,
        };
    }

    return {
        outcome: "ADVISORY_ONLY",
        reason: "No authoritative rule thresholds reached. Advisory may inform human decision.",
        ruleHits: ["NO_RULE_HIT"],
        evaluatedAt: now,
    };
}
