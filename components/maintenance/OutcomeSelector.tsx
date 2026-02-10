"use client";

/**
 * Maintenance outcome categories for closing work orders.
 * These help track first-time fix rates and identify recurring issues.
 */
export type MaintenanceOutcome =
    | "resolved_first_attempt"
    | "resolved_repeat"
    | "deferred"
    | "escalated";

export const OUTCOME_OPTIONS: {
    id: MaintenanceOutcome;
    label: string;
    description: string;
    color: string;
    bgColor: string;
    icon: string;
}[] = [
        {
            id: "resolved_first_attempt",
            label: "Resolved – First Attempt",
            description: "Issue fixed on the first try. Parts and procedures worked as expected.",
            color: "text-emerald-700",
            bgColor: "bg-emerald-50 border-emerald-200",
            icon: "✅",
        },
        {
            id: "resolved_repeat",
            label: "Resolved – Repeat Action",
            description: "Issue fixed, but required multiple attempts or return visits.",
            color: "text-amber-700",
            bgColor: "bg-amber-50 border-amber-200",
            icon: "🔄",
        },
        {
            id: "deferred",
            label: "Deferred",
            description: "Action postponed per MEL/CDL allowance or pending parts/scheduling.",
            color: "text-blue-700",
            bgColor: "bg-blue-50 border-blue-200",
            icon: "⏸️",
        },
        {
            id: "escalated",
            label: "Escalated",
            description: "Referred to engineering, OEM support, or specialist team for resolution.",
            color: "text-purple-700",
            bgColor: "bg-purple-50 border-purple-200",
            icon: "⬆️",
        },
    ];

interface OutcomeSelectorProps {
    value?: MaintenanceOutcome;
    onChange: (outcome: MaintenanceOutcome) => void;
    required?: boolean;
}

export function OutcomeSelector({ value, onChange, required }: OutcomeSelectorProps) {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
                Maintenance Outcome
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="grid gap-2 sm:grid-cols-2">
                {OUTCOME_OPTIONS.map((option) => (
                    <button
                        key={option.id}
                        type="button"
                        onClick={() => onChange(option.id)}
                        className={[
                            "flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all",
                            value === option.id
                                ? `${option.bgColor} border-current ${option.color} shadow-sm`
                                : "border-slate-200 hover:border-slate-300 bg-white",
                        ].join(" ")}
                    >
                        <span className="text-xl mt-0.5">{option.icon}</span>
                        <div className="flex-1 min-w-0">
                            <div className={`font-medium text-sm ${value === option.id ? option.color : "text-slate-900"}`}>
                                {option.label}
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                {option.description}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

/**
 * Display-only badge for showing outcome on completed work orders
 */
interface OutcomeBadgeProps {
    outcome: MaintenanceOutcome;
    size?: "sm" | "md";
}

export function OutcomeBadge({ outcome, size = "md" }: OutcomeBadgeProps) {
    const option = OUTCOME_OPTIONS.find((o) => o.id === outcome);
    if (!option) return null;

    const sizeClasses = size === "sm"
        ? "text-xs px-2 py-0.5"
        : "text-sm px-3 py-1";

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full border ${option.bgColor} ${option.color} ${sizeClasses}`}>
            <span>{option.icon}</span>
            <span className="font-medium">{option.label}</span>
        </span>
    );
}

/**
 * Delay/context reason tags for deferred items
 */
export type DelayReason =
    | "awaiting_parts"
    | "awaiting_tools"
    | "priority_override"
    | "mel_allowance"
    | "scheduling"
    | "engineering_review"
    | "weather"
    | "other";

export const DELAY_REASONS: { id: DelayReason; label: string; icon: string }[] = [
    { id: "awaiting_parts", label: "Awaiting Parts", icon: "📦" },
    { id: "awaiting_tools", label: "Awaiting Tools/GSE", icon: "🔧" },
    { id: "priority_override", label: "Priority Override", icon: "⚡" },
    { id: "mel_allowance", label: "MEL/CDL Allowance", icon: "📋" },
    { id: "scheduling", label: "Scheduling Conflict", icon: "📅" },
    { id: "engineering_review", label: "Engineering Review", icon: "🔬" },
    { id: "weather", label: "Weather Hold", icon: "🌧️" },
    { id: "other", label: "Other", icon: "💬" },
];

interface DelayReasonSelectorProps {
    value?: DelayReason;
    onChange: (reason: DelayReason) => void;
}

export function DelayReasonSelector({ value, onChange }: DelayReasonSelectorProps) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
                Reason for Deferral
            </label>
            <div className="flex flex-wrap gap-2">
                {DELAY_REASONS.map((reason) => (
                    <button
                        key={reason.id}
                        type="button"
                        onClick={() => onChange(reason.id)}
                        className={[
                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition",
                            value === reason.id
                                ? "bg-blue-50 border-blue-300 text-blue-700"
                                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300",
                        ].join(" ")}
                    >
                        <span>{reason.icon}</span>
                        <span>{reason.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

interface DelayReasonBadgeProps {
    reason: DelayReason;
}

export function DelayReasonBadge({ reason }: DelayReasonBadgeProps) {
    const option = DELAY_REASONS.find((r) => r.id === reason);
    if (!option) return null;

    return (
        <span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
            <span>{option.icon}</span>
            <span>{option.label}</span>
        </span>
    );
}
