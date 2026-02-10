"use client";

import { useState } from "react";
import { UserRole } from "@/lib/AuthContext";

type RoleOption = {
    id: UserRole;
    title: string;
    description: string;
    icon: string;
    focus: string[];
};

const ROLE_OPTIONS: RoleOption[] = [
    {
        id: "technician",
        title: "Technician",
        description: "Front-line maintenance personnel performing inspections and repairs",
        icon: "🔧",
        focus: ["Active work orders", "Parts availability", "Sign-off tasks"],
    },
    {
        id: "supervisor",
        title: "Supervisor",
        description: "Shift supervisors and team leads overseeing daily operations",
        icon: "👷",
        focus: ["Team workload", "Priority tasks", "Shift handover"],
    },
    {
        id: "maintenance_manager",
        title: "Maintenance Manager",
        description: "Managers and commanders responsible for fleet readiness",
        icon: "📊",
        focus: ["Fleet status", "KPIs", "Resource planning"],
    },
    {
        id: "safety_qa",
        title: "Safety / QA",
        description: "Safety officers and quality assurance inspectors",
        icon: "✅",
        focus: ["Compliance trends", "Repeat defects", "Audit readiness"],
    },
];

interface RoleSelectorProps {
    onSelectRole: (role: UserRole) => void;
    currentRole?: UserRole;
    showSkip?: boolean;
    onSkip?: () => void;
}

export function RoleSelector({ onSelectRole, currentRole, showSkip, onSkip }: RoleSelectorProps) {
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(currentRole || null);

    return (
        <div className="mx-auto max-w-2xl">
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-slate-900">What&apos;s your role?</h2>
                <p className="mt-2 text-slate-600">
                    We&apos;ll customize your dashboard to show what matters most to you.
                </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {ROLE_OPTIONS.map((role) => (
                    <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        className={[
                            "rounded-2xl border-2 p-5 text-left transition-all",
                            selectedRole === role.id
                                ? "border-blue-500 bg-blue-50 shadow-md"
                                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm",
                        ].join(" ")}
                    >
                        <div className="flex items-start gap-4">
                            <span className="text-3xl">{role.icon}</span>
                            <div className="flex-1">
                                <div className="font-semibold text-slate-900">{role.title}</div>
                                <div className="mt-1 text-sm text-slate-600">{role.description}</div>
                                <div className="mt-3">
                                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                        Your dashboard will focus on:
                                    </div>
                                    <ul className="mt-1 space-y-1">
                                        {role.focus.map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                                                <span className="text-emerald-500">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                    type="button"
                    onClick={() => selectedRole && onSelectRole(selectedRole)}
                    disabled={!selectedRole}
                    className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue with {selectedRole ? ROLE_OPTIONS.find(r => r.id === selectedRole)?.title : "selected role"}
                </button>
                {showSkip && onSkip && (
                    <button
                        type="button"
                        onClick={onSkip}
                        className="rounded-xl border border-slate-200 px-8 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                        Skip for now
                    </button>
                )}
            </div>

            <p className="mt-4 text-center text-xs text-slate-500">
                You can change your role anytime in Settings.
            </p>
        </div>
    );
}

// Export role metadata for use elsewhere
export { ROLE_OPTIONS };
export type { RoleOption };
