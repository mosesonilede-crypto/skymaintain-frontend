"use client";

import { useState, useRef, useEffect } from "react";

/**
 * Metric explanations for common aviation maintenance KPIs.
 * These help users understand why each metric matters operationally.
 */
export const METRIC_EXPLANATIONS: Record<string, { why: string; impact: string; benchmark?: string }> = {
    // Fleet/Aircraft metrics
    "fleet_availability": {
        why: "Shows how many aircraft in your fleet are ready to fly right now.",
        impact: "Higher availability means fewer delays and better schedule reliability.",
        benchmark: "Industry target: 95%+ for commercial, 85%+ for cargo operations."
    },
    "aircraft_on_ground": {
        why: "Counts aircraft unable to fly due to maintenance issues.",
        impact: "Each AOG day costs significant revenue and may require aircraft swaps.",
        benchmark: "Goal: Minimize to zero. Any AOG needs priority resolution."
    },
    "dispatch_reliability": {
        why: "Percentage of flights departing without maintenance delays.",
        impact: "Directly affects on-time performance and passenger satisfaction.",
        benchmark: "Industry target: 99%+ for major carriers."
    },

    // Maintenance metrics
    "open_work_orders": {
        why: "Total maintenance tasks awaiting completion.",
        impact: "High numbers may indicate backlog or resource constraints.",
        benchmark: "Context-dependent—compare to your rolling 30-day average."
    },
    "unscheduled_maintenance": {
        why: "Maintenance events that weren't planned—breakdowns, defects, surprises.",
        impact: "High unscheduled rates suggest predictive maintenance opportunities.",
        benchmark: "Goal: Below 15% of total maintenance events."
    },
    "repeat_defects": {
        why: "Issues that keep coming back after repair attempts.",
        impact: "Indicates root cause wasn't addressed. Wastes time and materials.",
        benchmark: "Target: Below 5%. Above 10% requires process review."
    },
    "mtbf": {
        why: "Mean Time Between Failures—average hours a component runs before failing.",
        impact: "Higher is better. Helps plan part replacements proactively.",
        benchmark: "Varies by component. Track against manufacturer specs."
    },
    "mttr": {
        why: "Mean Time To Repair—average hours to fix an issue.",
        impact: "Lower is better. Affects aircraft downtime and availability.",
        benchmark: "Track trend over time. Aim for continuous improvement."
    },

    // Compliance metrics
    "compliance_rate": {
        why: "Percentage of maintenance done per regulatory requirements.",
        impact: "100% required. Non-compliance risks certificates and operations.",
        benchmark: "Must be 100%. No exceptions."
    },
    "overdue_tasks": {
        why: "Scheduled maintenance items past their due date.",
        impact: "Regulatory risk. May ground aircraft until resolved.",
        benchmark: "Target: Zero. Any overdue needs immediate attention."
    },
    "ad_compliance": {
        why: "Airworthiness Directive completion status.",
        impact: "ADs are mandatory. Non-compliance is a serious violation.",
        benchmark: "Must be 100% on time."
    },

    // Resource metrics
    "parts_availability": {
        why: "Percentage of needed parts in stock when required.",
        impact: "Low availability causes delays and AOG situations.",
        benchmark: "Target: 95%+ for critical parts."
    },
    "technician_utilization": {
        why: "How much of technicians' time is spent on productive work.",
        impact: "Low utilization = wasted labor cost. Too high = burnout risk.",
        benchmark: "Sweet spot: 75-85%."
    },
};

interface WhyThisMattersProps {
    metricKey: string;
    children: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
}

export function WhyThisMatters({ metricKey, children, position = "top" }: WhyThisMattersProps) {
    const [isOpen, setIsOpen] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const explanation = METRIC_EXPLANATIONS[metricKey];

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                tooltipRef.current &&
                !tooltipRef.current.contains(event.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            return () => document.removeEventListener("keydown", handleEscape);
        }
    }, [isOpen]);

    if (!explanation) {
        // If no explanation exists, just render children without tooltip
        return <>{children}</>;
    }

    const positionClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    return (
        <span className="relative inline-flex items-center gap-1.5 group">
            {children}
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-200 hover:bg-blue-100 text-slate-500 hover:text-blue-600 text-[10px] font-bold transition cursor-help"
                aria-label="Why this matters"
                title="Why this matters"
            >
                ?
            </button>

            {isOpen && (
                <div
                    ref={tooltipRef}
                    className={`absolute z-50 w-72 ${positionClasses[position]}`}
                >
                    <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 border-b border-slate-100">
                            <span className="text-xs font-semibold text-blue-800 uppercase tracking-wide">
                                Why This Matters
                            </span>
                        </div>
                        <div className="p-4 space-y-3">
                            <div>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    {explanation.why}
                                </p>
                            </div>
                            <div>
                                <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                    Business Impact
                                </span>
                                <p className="mt-1 text-sm text-slate-600">
                                    {explanation.impact}
                                </p>
                            </div>
                            {explanation.benchmark && (
                                <div className="bg-emerald-50 rounded-lg px-3 py-2">
                                    <span className="text-xs font-medium text-emerald-700">
                                        📊 {explanation.benchmark}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </span>
    );
}

/**
 * Simple inline tooltip for quick explanations
 */
interface SimpleTooltipProps {
    text: string;
    children: React.ReactNode;
}

export function SimpleTooltip({ text, children }: SimpleTooltipProps) {
    return (
        <span className="relative group cursor-help">
            {children}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {text}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
            </span>
        </span>
    );
}
