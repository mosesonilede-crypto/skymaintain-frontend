"use client";

import { useState } from "react";

interface AIDisclaimerProps {
    variant?: "inline" | "banner" | "tooltip";
    className?: string;
}

/**
 * Standard AI advisory disclaimer for all AI-powered features.
 * Required on every AI panel to maintain trust and compliance.
 */
export function AIDisclaimer({ variant = "inline", className = "" }: AIDisclaimerProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const baseMessage = "AI Insight – advisory only. Final decisions remain with certified personnel.";

    const extendedMessage =
        "This AI-generated information is intended to assist qualified maintenance personnel by surfacing relevant historical data and regulatory references. " +
        "It does not replace manufacturer documentation, approved maintenance procedures, or the judgment of certified aviation maintenance technicians. " +
        "Always verify AI suggestions against official sources before taking action.";

    if (variant === "banner") {
        return (
            <div className={`bg-amber-50 border border-amber-200 rounded-lg p-3 ${className}`}>
                <div className="flex items-start gap-2">
                    <span className="text-amber-600 text-lg mt-0.5">⚠️</span>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-amber-800">{baseMessage}</p>
                        {isExpanded && (
                            <p className="mt-2 text-xs text-amber-700 leading-relaxed">{extendedMessage}</p>
                        )}
                        <button
                            type="button"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="mt-1 text-xs text-amber-600 hover:text-amber-800 underline"
                        >
                            {isExpanded ? "Show less" : "Learn more"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === "tooltip") {
        return (
            <span className={`inline-flex items-center gap-1 text-xs text-slate-500 ${className}`}>
                <span className="cursor-help" title={baseMessage}>
                    🤖
                </span>
                <span className="italic">{baseMessage}</span>
            </span>
        );
    }

    // Default inline variant
    return (
        <div className={`flex items-center gap-2 text-xs text-slate-500 bg-slate-50 rounded-md px-3 py-2 ${className}`}>
            <span>🤖</span>
            <span className="italic">{baseMessage}</span>
        </div>
    );
}

/**
 * Wrapper component to add AI disclaimer to any AI-powered panel
 */
interface AIAdvisoryWrapperProps {
    children: React.ReactNode;
    title?: string;
    disclaimerPosition?: "top" | "bottom";
}

export function AIAdvisoryWrapper({ children, title, disclaimerPosition = "top" }: AIAdvisoryWrapperProps) {
    return (
        <div className="relative">
            {title && (
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">🤖</span>
                    <h3 className="font-semibold text-slate-900">{title}</h3>
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                        AI-Powered
                    </span>
                </div>
            )}

            {disclaimerPosition === "top" && <AIDisclaimer variant="inline" className="mb-4" />}

            {children}

            {disclaimerPosition === "bottom" && <AIDisclaimer variant="inline" className="mt-4" />}
        </div>
    );
}
