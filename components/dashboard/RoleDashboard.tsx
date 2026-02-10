"use client";

import { UserRole } from "@/lib/AuthContext";
import { MaintenanceVisibility, MaintenanceSummaryCard } from "@/components/dashboard/MaintenanceVisibility";
import { MetricCard, TrendBadge, ProgressCelebration } from "@/components/ui/TrendIndicator";
import { WhyThisMatters } from "@/components/ui/WhyThisMatters";
import { AIAdvisoryWrapper } from "@/components/ai/AIDisclaimer";

interface RoleDashboardProps {
    role: UserRole;
    userName?: string;
}

/**
 * Role-specific dashboard views
 * Each role sees what matters most to them, reducing cognitive overload
 */
export function RoleDashboard({ role, userName }: RoleDashboardProps) {
    switch (role) {
        case "technician":
            return <TechnicianDashboard userName={userName} />;
        case "supervisor":
            return <SupervisorDashboard userName={userName} />;
        case "maintenance_manager":
        case "fleet_manager":
            return <ManagerDashboard />;
        case "safety_qa":
            return <SafetyQADashboard />;
        case "maintenance_engineer":
            return <EngineerDashboard />;
        default:
            return <TechnicianDashboard userName={userName} />;
    }
}

/**
 * TECHNICIAN VIEW
 * Focus: Active work orders, parts availability, sign-off tasks
 * Keep it simple - they need to get work done, not analyze data
 */
function TechnicianDashboard({ userName }: { userName?: string }) {
    return (
        <div className="space-y-6">
            {/* Greeting */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    {userName ? `Welcome back, ${userName}` : "Welcome back"}
                </h1>
                <p className="text-slate-500">Here&apos;s what needs your attention today.</p>
            </div>

            {/* Achievement banner (shows progress) */}
            <ProgressCelebration
                achievement="Great week!"
                description="You closed 12 work orders with 92% first-attempt resolution. Keep it up!"
            />

            {/* Primary focus: My Work Orders */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <span>🔧</span> My Active Work Orders
                    <span className="ml-auto text-sm font-normal text-slate-500">3 items</span>
                </h2>

                <div className="space-y-3">
                    {/* Simplified work order cards */}
                    <WorkOrderCard
                        title="Engine oil leak - Left engine"
                        aircraft="N123AB"
                        priority="high"
                        status="Ready to work"
                        dueTime="Due in 2 hours"
                    />
                    <WorkOrderCard
                        title="Cabin pressurization fault"
                        aircraft="N456CD"
                        priority="high"
                        status="Awaiting parts"
                        dueTime="Parts arriving 14:30"
                        partsStatus="📦 Gasket kit en route"
                    />
                    <WorkOrderCard
                        title="Landing light replacement"
                        aircraft="N789EF"
                        priority="medium"
                        status="Ready to work"
                        dueTime="Due tomorrow"
                    />
                </div>

                <button
                    type="button"
                    className="mt-4 w-full text-center text-blue-600 hover:text-blue-700 font-medium py-2"
                    data-tour="new-entry"
                >
                    + Log New Discrepancy
                </button>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-3">
                <QuickActionCard icon="📋" label="Sign-off Pending" count={2} />
                <QuickActionCard icon="📦" label="Parts Status" count={1} alert />
            </div>

            {/* AI suggestion (optional, not prominent) */}
            <div data-tour="ai-panel">
                <AIAdvisoryWrapper title="AI Assistant">
                    <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600">
                        <p>
                            💡 <strong>Tip:</strong> For the oil leak on N123AB, similar cases (3 in last 6 months)
                            were often traced to the main seal. Check AMM 79-20-00.
                        </p>
                        <button type="button" className="mt-2 text-blue-600 hover:underline text-xs">
                            View similar cases →
                        </button>
                    </div>
                </AIAdvisoryWrapper>
            </div>
        </div>
    );
}

/**
 * SUPERVISOR VIEW
 * Focus: Team workload, priority tasks, shift handover
 */
function SupervisorDashboard({ userName }: { userName?: string }) {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    {userName ? `${userName}'s Team Overview` : "Team Overview"}
                </h1>
                <p className="text-slate-500">Current shift status at a glance.</p>
            </div>

            {/* Key metrics - limited to 4 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                    label="Team Workload"
                    value={8}
                    previousValue={10}
                    goodDirection="down"
                    icon="👥"
                />
                <MetricCard
                    label="Priority Items"
                    value={2}
                    previousValue={4}
                    goodDirection="down"
                    icon="🔴"
                />
                <MetricCard
                    label="Awaiting Sign-off"
                    value={3}
                    icon="✍️"
                />
                <MetricCard
                    label="Parts Delays"
                    value={1}
                    previousValue={2}
                    goodDirection="down"
                    icon="📦"
                />
            </div>

            {/* Maintenance visibility */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <MaintenanceVisibility />
            </div>

            {/* Team assignment quick view */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="font-semibold text-slate-900 mb-4">Team Assignments</h2>
                <div className="space-y-3">
                    <TeamMemberRow name="John D." tasks={3} status="active" />
                    <TeamMemberRow name="Sarah M." tasks={2} status="active" />
                    <TeamMemberRow name="Mike R." tasks={2} status="break" />
                    <TeamMemberRow name="Lisa K." tasks={1} status="active" />
                </div>
            </div>

            {/* Shift handover notes */}
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
                <h3 className="font-medium text-amber-800 flex items-center gap-2">
                    <span>📝</span> Shift Handover Notes
                </h3>
                <p className="mt-2 text-sm text-amber-700">
                    Engine oil leak on N123AB is priority. Parts for N456CD arriving at 14:30.
                    Mike R. has context on the pressurization fault from yesterday&apos;s shift.
                </p>
            </div>
        </div>
    );
}

/**
 * MANAGER VIEW
 * Focus: Fleet status, KPIs, resource planning
 */
function ManagerDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Fleet Operations</h1>
                <p className="text-slate-500">Real-time fleet health and maintenance status.</p>
            </div>

            {/* Primary KPIs - 3-5 max */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
                    <div className="text-sm opacity-80 mb-1">Fleet Availability</div>
                    <div className="flex items-end gap-3">
                        <WhyThisMatters metricKey="fleet_availability" position="bottom">
                            <span className="text-4xl font-bold">94%</span>
                        </WhyThisMatters>
                        <TrendBadge trend="improving" label="+2% this week" />
                    </div>
                    <div className="mt-3 text-sm opacity-80">15 of 16 aircraft ready</div>
                </div>

                <MetricCard
                    label="AOG"
                    value={1}
                    previousValue={2}
                    goodDirection="down"
                    icon="🛑"
                />
                <MetricCard
                    label="Open Work Orders"
                    value={23}
                    previousValue={28}
                    goodDirection="down"
                    icon="📋"
                />
            </div>

            {/* Additional metrics (collapsed by default) */}
            <details className="bg-white rounded-xl border border-slate-200">
                <summary className="p-4 cursor-pointer font-medium text-slate-700 hover:bg-slate-50 rounded-xl">
                    View more metrics
                </summary>
                <div className="p-4 pt-0 grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard label="Dispatch Reliability" value={99} format="percentage" previousValue={98} icon="✈️" />
                    <MetricCard label="MTTR" value={4.2} format="time" previousValue={5.1} goodDirection="down" icon="⏱️" />
                    <MetricCard label="Repeat Defects" value={3} format="percentage" previousValue={5} goodDirection="down" icon="🔄" />
                    <MetricCard label="Parts Fill Rate" value={96} format="percentage" previousValue={94} icon="📦" />
                </div>
            </details>

            {/* Maintenance summary */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <MaintenanceVisibility />
                </div>
                <div className="space-y-4">
                    <MaintenanceSummaryCard />
                    {/* Resource alerts */}
                    <div className="bg-white rounded-xl border border-slate-200 p-4">
                        <h3 className="font-medium text-slate-900 mb-3">Resource Alerts</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-amber-700">
                                <span>⚠️</span>
                                <span>Night shift understaffed (2 of 4 positions filled)</span>
                            </div>
                            <div className="flex items-center gap-2 text-red-700">
                                <span>🔴</span>
                                <span>Critical part low stock: P/N 123-456-789</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * SAFETY/QA VIEW
 * Focus: Compliance trends, repeat defects, audit readiness
 */
function SafetyQADashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Safety & Compliance</h1>
                <p className="text-slate-500">Quality assurance and regulatory compliance overview.</p>
            </div>

            {/* Compliance status */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                    <div className="text-sm opacity-80 mb-1">Overall Compliance</div>
                    <div className="flex items-end gap-3">
                        <WhyThisMatters metricKey="compliance_rate" position="bottom">
                            <span className="text-4xl font-bold">100%</span>
                        </WhyThisMatters>
                        <span className="text-sm bg-white/20 px-2 py-1 rounded-full">On track</span>
                    </div>
                </div>

                <MetricCard
                    label="Overdue Items"
                    value={0}
                    previousValue={1}
                    goodDirection="down"
                    icon="⏰"
                />
                <MetricCard
                    label="Repeat Defects"
                    value={2}
                    previousValue={4}
                    goodDirection="down"
                    icon="🔄"
                />
            </div>

            {/* Trend analysis */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="font-semibold text-slate-900 mb-4">Repeat Defect Trends</h2>
                <div className="space-y-3">
                    <RepeatDefectRow
                        system="Hydraulic System"
                        count={3}
                        trend="declining"
                        lastOccurrence="2 weeks ago"
                    />
                    <RepeatDefectRow
                        system="APU"
                        count={2}
                        trend="stable"
                        lastOccurrence="5 days ago"
                    />
                    <RepeatDefectRow
                        system="Landing Gear"
                        count={1}
                        trend="new"
                        lastOccurrence="Yesterday"
                    />
                </div>
            </div>

            {/* Audit readiness */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="font-semibold text-slate-900 mb-4">Audit Readiness</h2>
                <div className="space-y-4">
                    <AuditItem label="Documentation Complete" status="complete" />
                    <AuditItem label="Training Records Current" status="complete" />
                    <AuditItem label="Tool Calibration" status="warning" note="3 items due this week" />
                    <AuditItem label="AD Compliance" status="complete" />
                </div>
            </div>
        </div>
    );
}

/**
 * ENGINEER VIEW
 * Focus: Technical analysis, reliability data, engineering orders
 */
function EngineerDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Engineering Analysis</h1>
                <p className="text-slate-500">Technical data and reliability insights.</p>
            </div>

            {/* Reliability metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard label="MTBF (Fleet Avg)" value={1250} format="time" previousValue={1180} icon="📊" />
                <MetricCard label="Component Removals" value={8} previousValue={12} goodDirection="down" icon="🔧" />
                <MetricCard label="EOs Pending" value={3} icon="📝" />
                <MetricCard label="Reliability Alerts" value={2} previousValue={5} goodDirection="down" icon="⚠️" />
            </div>

            {/* AI-powered analysis */}
            <AIAdvisoryWrapper title="Reliability Analysis" disclaimerPosition="bottom">
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h2 className="font-semibold text-slate-900 mb-4">AI-Identified Patterns</h2>
                    <div className="space-y-4">
                        <div className="border-l-4 border-amber-400 pl-4">
                            <div className="font-medium text-slate-900">Hydraulic pump failures trending up</div>
                            <p className="text-sm text-slate-600 mt-1">
                                3 failures in last 60 days across fleet. Pattern suggests possible batch issue with P/N 123-456.
                                Recommend proactive inspection per SB 29-001.
                            </p>
                        </div>
                        <div className="border-l-4 border-blue-400 pl-4">
                            <div className="font-medium text-slate-900">APU start cycle optimization</div>
                            <p className="text-sm text-slate-600 mt-1">
                                Analysis shows 15% reduction in start time variance after latest software update.
                                Consider fleet-wide rollout.
                            </p>
                        </div>
                    </div>
                </div>
            </AIAdvisoryWrapper>
        </div>
    );
}

// Helper components

function WorkOrderCard({
    title,
    aircraft,
    priority,
    status,
    dueTime,
    partsStatus,
}: {
    title: string;
    aircraft: string;
    priority: "high" | "medium" | "low";
    status: string;
    dueTime: string;
    partsStatus?: string;
}) {
    const priorityColors = {
        high: "border-l-red-500",
        medium: "border-l-amber-500",
        low: "border-l-slate-300",
    };

    return (
        <div className={`border-l-4 ${priorityColors[priority]} bg-slate-50 rounded-r-lg p-4`}>
            <div className="flex items-start justify-between">
                <div>
                    <div className="font-medium text-slate-900">{title}</div>
                    <div className="text-sm text-slate-500 mt-1">
                        {aircraft} • {status}
                    </div>
                    {partsStatus && (
                        <div className="text-sm text-amber-600 mt-1">{partsStatus}</div>
                    )}
                </div>
                <div className="text-right">
                    <div className="text-sm text-slate-500">{dueTime}</div>
                    <button
                        type="button"
                        className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                        data-tour="close-action"
                    >
                        Open →
                    </button>
                </div>
            </div>
        </div>
    );
}

function QuickActionCard({
    icon,
    label,
    count,
    alert
}: {
    icon: string;
    label: string;
    count: number;
    alert?: boolean;
}) {
    return (
        <button
            type="button"
            className={`flex items-center gap-3 p-4 rounded-xl border transition hover:shadow-sm ${alert
                ? "bg-amber-50 border-amber-200 hover:border-amber-300"
                : "bg-white border-slate-200 hover:border-slate-300"
                }`}
        >
            <span className="text-2xl">{icon}</span>
            <div className="text-left">
                <div className="text-2xl font-bold text-slate-900">{count}</div>
                <div className="text-sm text-slate-500">{label}</div>
            </div>
        </button>
    );
}

function TeamMemberRow({
    name,
    tasks,
    status,
}: {
    name: string;
    tasks: number;
    status: "active" | "break" | "offline";
}) {
    const statusColors = {
        active: "bg-emerald-100 text-emerald-700",
        break: "bg-amber-100 text-amber-700",
        offline: "bg-slate-100 text-slate-500",
    };

    return (
        <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium">
                    {name.split(" ").map(n => n[0]).join("")}
                </div>
                <span className="font-medium text-slate-900">{name}</span>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">{tasks} tasks</span>
                <span className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}>
                    {status}
                </span>
            </div>
        </div>
    );
}

function RepeatDefectRow({
    system,
    count,
    trend,
    lastOccurrence,
}: {
    system: string;
    count: number;
    trend: "declining" | "stable" | "new";
    lastOccurrence: string;
}) {
    const trendIcons = {
        declining: { icon: "📉", color: "text-emerald-600", label: "Declining" },
        stable: { icon: "➡️", color: "text-slate-600", label: "Stable" },
        new: { icon: "🆕", color: "text-amber-600", label: "New" },
    };

    const t = trendIcons[trend];

    return (
        <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
            <div>
                <div className="font-medium text-slate-900">{system}</div>
                <div className="text-sm text-slate-500">Last: {lastOccurrence}</div>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-slate-900">{count}</span>
                <span className={`text-xs ${t.color}`}>
                    {t.icon} {t.label}
                </span>
            </div>
        </div>
    );
}

function AuditItem({
    label,
    status,
    note,
}: {
    label: string;
    status: "complete" | "warning" | "overdue";
    note?: string;
}) {
    const statusConfig = {
        complete: { icon: "✅", color: "text-emerald-600" },
        warning: { icon: "⚠️", color: "text-amber-600" },
        overdue: { icon: "🔴", color: "text-red-600" },
    };

    const s = statusConfig[status];

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <span>{s.icon}</span>
                <span className="text-slate-900">{label}</span>
            </div>
            {note && <span className={`text-sm ${s.color}`}>{note}</span>}
        </div>
    );
}

export {
    TechnicianDashboard,
    SupervisorDashboard,
    ManagerDashboard,
    SafetyQADashboard,
    EngineerDashboard,
};
