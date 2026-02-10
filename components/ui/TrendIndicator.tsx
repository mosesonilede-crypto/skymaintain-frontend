"use client";

type TrendDirection = "up" | "down" | "flat";
type TrendSentiment = "positive" | "negative" | "neutral";

interface TrendIndicatorProps {
    /** Current value */
    value: number;
    /** Previous value for comparison */
    previousValue: number;
    /** What direction is "good" for this metric? */
    goodDirection?: "up" | "down";
    /** Format for display (e.g., "percentage", "number", "currency") */
    format?: "percentage" | "number" | "currency" | "time";
    /** Show the actual change value */
    showChange?: boolean;
    /** Size variant */
    size?: "sm" | "md" | "lg";
}

export function TrendIndicator({
    value,
    previousValue,
    goodDirection = "up",
    format = "number",
    showChange = true,
    size = "md",
}: TrendIndicatorProps) {
    // Calculate change
    const change = value - previousValue;
    const percentChange = previousValue !== 0
        ? Math.round((change / previousValue) * 100)
        : 0;

    // Determine trend direction
    const direction: TrendDirection =
        change > 0 ? "up" : change < 0 ? "down" : "flat";

    // Determine sentiment (is this change good or bad?)
    const sentiment: TrendSentiment =
        direction === "flat"
            ? "neutral"
            : (direction === goodDirection)
                ? "positive"
                : "negative";

    // Styling based on sentiment
    const sentimentStyles = {
        positive: {
            bg: "bg-emerald-50",
            text: "text-emerald-700",
            icon: "↑",
            label: "Improved",
        },
        negative: {
            bg: "bg-red-50",
            text: "text-red-700",
            icon: "↓",
            label: "Declined",
        },
        neutral: {
            bg: "bg-slate-50",
            text: "text-slate-600",
            icon: "→",
            label: "No change",
        },
    };

    const style = sentimentStyles[sentiment];

    // Size classes
    const sizeClasses = {
        sm: "text-xs px-1.5 py-0.5",
        md: "text-sm px-2 py-1",
        lg: "text-base px-3 py-1.5",
    };

    // Format the change value
    const formatChange = () => {
        const absChange = Math.abs(change);
        const sign = change > 0 ? "+" : change < 0 ? "-" : "";

        switch (format) {
            case "percentage":
                return `${sign}${absChange}%`;
            case "currency":
                return `${sign}$${absChange.toLocaleString()}`;
            case "time":
                return `${sign}${absChange}h`;
            default:
                return `${sign}${absChange}`;
        }
    };

    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full font-medium ${style.bg} ${style.text} ${sizeClasses[size]}`}
            title={`${style.label} from ${previousValue} to ${value} (${percentChange > 0 ? "+" : ""}${percentChange}%)`}
        >
            <span className="font-bold">{style.icon}</span>
            {showChange && (
                <span>{formatChange()}</span>
            )}
            {percentChange !== 0 && (
                <span className="opacity-70">({Math.abs(percentChange)}%)</span>
            )}
        </span>
    );
}

/**
 * Metric card with built-in trend indicator
 */
interface MetricCardProps {
    label: string;
    value: number;
    previousValue?: number;
    format?: "percentage" | "number" | "currency" | "time";
    goodDirection?: "up" | "down";
    icon?: string;
    metricKey?: string; // For WhyThisMatters integration
}

export function MetricCard({
    label,
    value,
    previousValue,
    format = "number",
    goodDirection = "up",
    icon,
}: MetricCardProps) {
    const formatValue = () => {
        switch (format) {
            case "percentage":
                return `${value}%`;
            case "currency":
                return `$${value.toLocaleString()}`;
            case "time":
                return `${value}h`;
            default:
                return value.toLocaleString();
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-start justify-between">
                <div>
                    <div className="text-sm text-slate-500 mb-1">{label}</div>
                    <div className="text-2xl font-bold text-slate-900">{formatValue()}</div>
                </div>
                {icon && <span className="text-2xl">{icon}</span>}
            </div>

            {previousValue !== undefined && (
                <div className="mt-3 flex items-center gap-2">
                    <TrendIndicator
                        value={value}
                        previousValue={previousValue}
                        goodDirection={goodDirection}
                        format={format}
                        size="sm"
                    />
                    <span className="text-xs text-slate-400">vs last period</span>
                </div>
            )}
        </div>
    );
}

/**
 * Compact trend badge for inline use
 */
interface TrendBadgeProps {
    trend: "improving" | "declining" | "stable";
    label?: string;
}

export function TrendBadge({ trend, label }: TrendBadgeProps) {
    const styles = {
        improving: {
            bg: "bg-emerald-100",
            text: "text-emerald-700",
            icon: "📈",
            defaultLabel: "Improving",
        },
        declining: {
            bg: "bg-red-100",
            text: "text-red-700",
            icon: "📉",
            defaultLabel: "Needs attention",
        },
        stable: {
            bg: "bg-slate-100",
            text: "text-slate-600",
            icon: "➡️",
            defaultLabel: "Stable",
        },
    };

    const style = styles[trend];

    return (
        <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${style.bg} ${style.text}`}>
            <span>{style.icon}</span>
            <span className="font-medium">{label || style.defaultLabel}</span>
        </span>
    );
}

/**
 * Progress celebration for achievements
 */
interface ProgressCelebrationProps {
    achievement: string;
    description: string;
    onDismiss?: () => void;
}

export function ProgressCelebration({ achievement, description, onDismiss }: ProgressCelebrationProps) {
    return (
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-200 p-4">
            <div className="flex items-start gap-3">
                <span className="text-3xl">🎉</span>
                <div className="flex-1">
                    <div className="font-semibold text-emerald-800">{achievement}</div>
                    <div className="text-sm text-emerald-700 mt-1">{description}</div>
                </div>
                {onDismiss && (
                    <button
                        type="button"
                        onClick={onDismiss}
                        className="text-emerald-600 hover:text-emerald-800 transition"
                        aria-label="Dismiss"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}
