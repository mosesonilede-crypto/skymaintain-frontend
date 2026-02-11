"use client";

import BackToHub from "@/components/app/BackToHub";
import { useAircraft } from "@/lib/AircraftContext";

const COMPONENTS = [
    {
        name: "Left Engine",
        serial: "CFM56-7B-LE-2219",
        hours: 11230,
        cycles: 8420,
        limitHours: 20000,
        limitCycles: 15000,
    },
    {
        name: "Right Engine",
        serial: "CFM56-7B-RE-2219",
        hours: 10940,
        cycles: 8295,
        limitHours: 20000,
        limitCycles: 15000,
    },
    {
        name: "APU",
        serial: "APS3200-2141",
        hours: 6240,
        cycles: 4020,
        limitHours: 10000,
        limitCycles: 8000,
    },
    {
        name: "Landing Gear",
        serial: "LG-737NG-8821",
        hours: 14200,
        cycles: 9100,
        limitHours: 18000,
        limitCycles: 12000,
    },
];

const UPCOMING = [
    {
        component: "Left Engine",
        dueInHours: 8770,
        dueInCycles: 6580,
        status: "On Track",
    },
    {
        component: "APU",
        dueInHours: 3760,
        dueInCycles: 3980,
        status: "Monitor",
    },
    {
        component: "Landing Gear",
        dueInHours: 3800,
        dueInCycles: 2900,
        status: "Plan Visit",
    },
];

const SYSTEMS = [
    {
        name: "Hydraulic System",
        intervalHours: 6000,
        intervalCycles: 4500,
        lastInspection: "2025-09-18",
        nextInspection: "2026-03-18",
        dueInHours: 1240,
        dueInCycles: 980,
        status: "Schedule",
    },
    {
        name: "Electrical Power System",
        intervalHours: 8000,
        intervalCycles: 6200,
        lastInspection: "2025-08-02",
        nextInspection: "2026-06-02",
        dueInHours: 3120,
        dueInCycles: 2480,
        status: "On Track",
    },
    {
        name: "Flight Controls",
        intervalHours: 7000,
        intervalCycles: 5200,
        lastInspection: "2025-10-05",
        nextInspection: "2026-04-05",
        dueInHours: 1540,
        dueInCycles: 1210,
        status: "Monitor",
    },
    {
        name: "Fuel System",
        intervalHours: 9000,
        intervalCycles: 7000,
        lastInspection: "2025-07-12",
        nextInspection: "2026-07-12",
        dueInHours: 3820,
        dueInCycles: 3010,
        status: "On Track",
    },
];

function percentRemaining(current: number, limit: number) {
    if (!limit) return 0;
    const remaining = Math.max(limit - current, 0);
    return Math.round((remaining / limit) * 100);
}

function componentStatus(remainingHours: number, remainingCycles: number) {
    if (remainingHours <= 1000 || remainingCycles <= 800) return "Replace Now";
    if (remainingHours <= 3000 || remainingCycles <= 2500) return "Plan Replacement";
    return "On Track";
}

export default function MaintenanceIntelligencePage() {
    const { selectedAircraft } = useAircraft();
    const itemsWithin6k = COMPONENTS.filter((component) => {
        const remainingHours = Math.max(component.limitHours - component.hours, 0);
        return remainingHours <= 6000;
    }).length;
    const criticalDueSoon = COMPONENTS.filter((component) => {
        const remainingHours = Math.max(component.limitHours - component.hours, 0);
        const remainingCycles = Math.max(component.limitCycles - component.cycles, 0);
        return remainingHours <= 1000 || remainingCycles <= 800;
    }).length;

    return (
        <section className="flex flex-col gap-6">
            <BackToHub title="Maintenance Intelligence" />

            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Maintenance Intelligence</h1>
                <p className="mt-2 text-sm text-slate-600">
                    Track life-limited components and system-level inspections with remaining hours, cycles, and upcoming thresholds.
                </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <div className="text-sm font-semibold text-slate-900">Aircraft</div>
                        <div className="text-xs text-slate-500">Active monitoring scope</div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900">
                        {selectedAircraft?.registration || "N123AB"} • {selectedAircraft?.model || "Boeing 737-800"}
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Components Tracked</div>
                    <div className="mt-3 text-2xl font-semibold text-slate-900">{COMPONENTS.length}</div>
                    <div className="mt-1 text-xs text-slate-500">Across engines, APU, landing gear</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Items Within 6k Hours</div>
                    <div className="mt-3 text-2xl font-semibold text-amber-600">{itemsWithin6k}</div>
                    <div className="mt-1 text-xs text-slate-500">Plan inspections and spares</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Critical Due Soon</div>
                    <div className="mt-3 text-2xl font-semibold text-rose-600">{criticalDueSoon}</div>
                    <div className="mt-1 text-xs text-slate-500">
                        {criticalDueSoon > 0 ? "Immediate removals required" : "No immediate removals"}
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-base font-semibold text-slate-900">Life-Limited Components</div>
                        <div className="text-xs text-slate-500">Hours/cycles remaining until limit</div>
                    </div>
                    <button
                        type="button"
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50"
                    >
                        Export
                    </button>
                </div>

                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-4 py-3">Component</th>
                                <th className="px-4 py-3">Serial</th>
                                <th className="px-4 py-3">Remaining Hours</th>
                                <th className="px-4 py-3">Remaining Cycles</th>
                                <th className="px-4 py-3">Remaining %</th>
                                <th className="px-4 py-3">Alert</th>
                            </tr>
                        </thead>
                        <tbody>
                            {COMPONENTS.map((component) => {
                                const remainingHours = Math.max(component.limitHours - component.hours, 0);
                                const remainingCycles = Math.max(component.limitCycles - component.cycles, 0);
                                const remainingPct = percentRemaining(component.hours, component.limitHours);
                                const status = componentStatus(remainingHours, remainingCycles);

                                return (
                                    <tr key={component.serial} className="border-t border-slate-200">
                                        <td className="px-4 py-3 font-semibold text-slate-900">{component.name}</td>
                                        <td className="px-4 py-3 text-slate-600">{component.serial}</td>
                                        <td className="px-4 py-3 text-slate-700">{remainingHours.toLocaleString()} hrs</td>
                                        <td className="px-4 py-3 text-slate-700">{remainingCycles.toLocaleString()} cyc</td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                                {remainingPct}%
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={[
                                                    "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                                                    status === "Replace Now"
                                                        ? "bg-rose-50 text-rose-700"
                                                        : status === "Plan Replacement"
                                                            ? "bg-amber-50 text-amber-700"
                                                            : "bg-emerald-50 text-emerald-700",
                                                ].join(" ")}
                                            >
                                                {status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-base font-semibold text-slate-900">Upcoming Thresholds</div>
                <div className="mt-1 text-xs text-slate-500">Plan work packages before limits are reached.</div>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                    {UPCOMING.map((item) => (
                        <div key={item.component} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="text-sm font-semibold text-slate-900">{item.component}</div>
                            <div className="mt-2 text-xs text-slate-600">
                                {item.dueInHours.toLocaleString()} hrs • {item.dueInCycles.toLocaleString()} cyc
                            </div>
                            <div className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                                {item.status}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-base font-semibold text-slate-900">Replacement Alerts</div>
                <div className="mt-1 text-xs text-slate-500">Triggered when remaining life hits replacement thresholds.</div>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                    {COMPONENTS.map((component) => {
                        const remainingHours = Math.max(component.limitHours - component.hours, 0);
                        const remainingCycles = Math.max(component.limitCycles - component.cycles, 0);
                        const status = componentStatus(remainingHours, remainingCycles);

                        return (
                            <div key={`${component.serial}-alert`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <div className="text-sm font-semibold text-slate-900">{component.name}</div>
                                <div className="mt-2 text-xs text-slate-600">
                                    {remainingHours.toLocaleString()} hrs • {remainingCycles.toLocaleString()} cyc remaining
                                </div>
                                <div className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                                    {status}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-base font-semibold text-slate-900">System Life Monitoring</div>
                        <div className="text-xs text-slate-500">
                            Scheduled inspections and overhaul intervals by system
                        </div>
                    </div>
                    <button
                        type="button"
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50"
                    >
                        Export
                    </button>
                </div>

                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-4 py-3">System</th>
                                <th className="px-4 py-3">Interval</th>
                                <th className="px-4 py-3">Next Inspection</th>
                                <th className="px-4 py-3">Remaining</th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SYSTEMS.map((system) => (
                                <tr key={system.name} className="border-t border-slate-200">
                                    <td className="px-4 py-3 font-semibold text-slate-900">{system.name}</td>
                                    <td className="px-4 py-3 text-slate-700">
                                        {system.intervalHours.toLocaleString()} hrs • {system.intervalCycles.toLocaleString()} cyc
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">{system.nextInspection}</td>
                                    <td className="px-4 py-3 text-slate-700">
                                        {system.dueInHours.toLocaleString()} hrs • {system.dueInCycles.toLocaleString()} cyc
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                            {system.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
