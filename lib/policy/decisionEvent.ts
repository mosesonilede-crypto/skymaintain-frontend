import { z } from "zod";
import { PolicyStampedAdvisorySchema } from "./advisory";
import { RuleEngineDecisionSchema } from "./ruleEngine";

export const DecisionAcknowledgementSchema = z.object({
    acknowledgedBy: z.string().min(1),
    acknowledgedAt: z.string().min(1),
});

export const DecisionEventSchema = z.object({
    id: z.string().min(1),
    createdAt: z.string().min(1),
    advisory: PolicyStampedAdvisorySchema,
    authoritativeSources: z.array(z.string().min(1)),
    acknowledgement: DecisionAcknowledgementSchema,
    disposition: z.enum(["NO_ACTION", "MONITOR", "SCHEDULE", "COMPLY", "WORK_ORDER"]),
    overrideRationale: z.string().optional(),
    ruleDecision: RuleEngineDecisionSchema,
    userAction: z.enum(["acknowledge", "record_decision", "create_workorder"]),
    canCreateWorkorder: z.boolean(),
});

export type DecisionEvent = z.infer<typeof DecisionEventSchema>;
