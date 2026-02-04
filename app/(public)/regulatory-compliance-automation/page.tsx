
"use client";

import * as React from "react";
import Link from "next/link";
import { CONTACT_DEMO } from "@/lib/routes";


type BenefitTile = {
    title: string;
    description: string;
    icon: "visibility" | "overhead" | "audit" | "accountability";
};

type SectionBlock = {
    title: string;
    body: string[];
    bullets: string[];
    footer_note?: string;
};

type RegulatoryComplianceAutomationDoc = {
    page_label: string;
    headline: string;
    subhead: string;
    intro: string;
    what_it_does: SectionBlock;
    how_it_works: SectionBlock;
    benefits: {
        title: string;
        tiles: BenefitTile[];
    };
    designed_for_regulated: {
        title: string;
        body: string[];
        bullets: string[];
        warning: string;
    };
    human_in_the_loop: {
        title: string;
        body: string[];
        bullets: string[];
        footer_note: string;
    };
    transparency: {
        title: string;
        body: string[];
        bullets: string[];
        footer_note: string;
    };
    who_its_for: {
        title: string;
        body: string[];
        groups: string[];
        closing: string;
    };
    final_cta: {
        title: string;
        body: string[];
        primary: { label: string; href: string };
        secondary: { label: string; href: string };
    };
};

type ApiEnvelope<T> = { ok: boolean; data: T; meta?: { request_id?: string } };

function getApiBaseUrl(): string {
    return (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");
}

function safeJsonParse<T>(value: string | null, fallback: T): T {
    if (!value) return fallback;
    try {
        return JSON.parse(value) as T;
    } catch {
        return fallback;
    }
}

function buildCompliancePayload() {
    if (typeof window === "undefined") {
        return {
            aircraft: { registration: "UNKNOWN" },
            maintenance: {},
            manuals: [],
            official_sources: [],
            discrepancies: [],
        };
    }

    const draft = safeJsonParse<Record<string, string>>(
        window.localStorage.getItem("skymaintain.documentationDraft"),
        {}
    );
    const manuals = safeJsonParse<
        Array<{ filename: string; date?: string; category?: string }>
    >(window.localStorage.getItem("skymaintain.documentationUploads"), []);
    const discrepancies = safeJsonParse<Array<{ title: string }>>(
        window.localStorage.getItem("skymaintain.discrepancySubmissions"),
        []
    );

    return {
        aircraft: {
            registration: draft.aircraftRegistration || "UNKNOWN",
            model: draft.aircraftModel || undefined,
            manufacturer: draft.aircraftManufacturer || undefined,
            operator: draft.aircraftOperator || undefined,
        },
        maintenance: {
            total_cycles: draft.totalCycles || undefined,
            time_in_service: draft.timeInService || undefined,
            time_since_new: draft.timeSinceNew || undefined,
            time_since_overhaul: draft.timeSinceOverhaul || undefined,
            last_maintenance_type: draft.lastMaintenanceType || undefined,
            maintenance_date: draft.maintenanceDate || undefined,
        },
        manuals,
        official_sources: [
            "https://www.faa.gov/regulations_policies/handbook",
            "https://www.faa.gov/regulations_policies/advisory_circulars",
            "https://drs.faa.gov/browse",
            "https://www.faa.gov/aircraft/air_cert/airworthiness_directives",
            "https://www.easa.europa.eu/en/domains/aircraft-products/continuing-airworthiness",
            "https://ad.easa.europa.eu",
            "https://www.easa.europa.eu/en/document-library/advisory-material-guidance-material",
        ],
        discrepancies: discrepancies.map((item) => item.title),
    };
}

const DEFAULT_DOC: RegulatoryComplianceAutomationDoc = {
    page_label: "Regulatory Compliance Automation",
    headline: "Simplify Compliance Without Compromising Oversight",
    subhead:
        "Automated visibility and tracking tools that help maintenance organizations stay aligned with regulatory requirements—without replacing professional judgment.",
    intro: "",
    what_it_does: {
        title: "What It Does",
        body: [
            "SkyMaintain's Regulatory Compliance Automation module helps maintenance teams track, organize, and manage regulatory obligations more efficiently.",
            "The platform provides structured visibility into compliance-related information so organizations can:",
        ],
        bullets: [
            "Monitor applicable FAA and EASA requirements",
            "Track airworthiness directives and compliance deadlines",
            "Maintain organized compliance records",
            "Reduce administrative burden and missed obligations",
        ],
        footer_note:
            "SkyMaintain supports compliance management, not regulatory decision-making.",
    },
    how_it_works: {
        title: "How It Works",
        body: [
            "The system aggregates regulatory references and compliance-related data into a centralized dashboard, helping teams stay informed of:",
        ],
        bullets: [
            "Applicable airworthiness directives (ADs)",
            "Compliance timelines and status indicators",
            "Maintenance actions linked to regulatory items",
            "Documentation and audit-readiness signals",
        ],
        footer_note:
            "Automated alerts and reminders help ensure nothing is overlooked, while final compliance determinations remain with authorized personnel.",
    },
    benefits: {
        title: "Key Benefits",
        tiles: [
            {
                title: "Improved Compliance Visibility",
                description:
                    "See regulatory obligations clearly across aircraft, components, and maintenance programs.",
                icon: "visibility",
            },
            {
                title: "Reduced Administrative Overhead",
                description:
                    "Minimize manual tracking and spreadsheet-based compliance management.",
                icon: "overhead",
            },
            {
                title: "Audit-Ready Documentation",
                description:
                    "Maintain organized records to support internal reviews and external audits.",
                icon: "audit",
            },
            {
                title: "Clear Accountability",
                description:
                    "Ensure compliance actions are assigned, tracked, and reviewed by responsible personnel.",
                icon: "accountability",
            },
        ],
    },
    designed_for_regulated: {
        title: "Designed for Regulated Environments",
        body: [
            "SkyMaintain is built with the realities of aviation regulation in mind.",
            "The platform:",
        ],
        bullets: [
            "Supports FAA and EASA maintenance governance frameworks",
            "Preserves clear audit trails and traceability",
            "Avoids automated regulatory determinations",
            "Reinforces documented, human-approved compliance actions",
        ],
        warning:
            "SkyMaintain does not issue regulatory approvals, certify compliance, or replace authority-mandated oversight.",
    },
    human_in_the_loop: {
        title: "Human-in-the-Loop Compliance",
        body: [
            "SkyMaintain is intentionally designed to support—not substitute—regulatory accountability.",
        ],
        bullets: [
            "No automated compliance sign-offs",
            "No override of approved maintenance programs",
            "No substitution for required inspections or certifications",
        ],
        footer_note:
            "Every compliance-related action remains under the control of qualified, authorized professionals.",
    },
    transparency: {
        title: "Transparency & Trust",
        body: ["SkyMaintain emphasizes responsible system design:"],
        bullets: [
            "Clear separation between automation and decision authority",
            "Transparent compliance status indicators",
            "Customer ownership of compliance data",
            "No sale or external monetization of regulatory information",
        ],
        footer_note:
            "Compliance insights are informational tools, not regulatory judgments.",
    },
    who_its_for: {
        title: "Who It's For",
        body: ["This capability supports:"],
        groups: [
            "Airlines and fleet operators",
            "MRO compliance departments",
            "Continuing airworthiness management organizations (CAMOs)",
            "Engineering and quality assurance teams",
            "Safety and compliance leadership",
            "Regulatory affairs specialists",
        ],
        closing:
            "Whether managing a single fleet or multiple operators, SkyMaintain helps teams maintain clarity and control.",
    },
    final_cta: {
        title: "Ready to Modernize Compliance Management?",
        body: [
            "Discover how structured automation can improve oversight, accountability, and audit readiness—without sacrificing regulatory integrity.",
        ],
        primary: { label: "Start a Free Trial", href: "/get-started" },
        secondary: { label: "Schedule a Demo", href: CONTACT_DEMO },
    },
};

async function apiGetDoc(
    signal?: AbortSignal
): Promise<RegulatoryComplianceAutomationDoc> {
    const base = getApiBaseUrl();
    if (!base) {
        throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
    }

    const payload = buildCompliancePayload();
    const res = await fetch(`${base}/v1/public/regulatory-compliance-automation`, {
        method: "POST",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal,
    });

    if (!res.ok) {
        throw new Error(
            `GET /v1/public/regulatory-compliance-automation failed (${res.status})`
        );
    }

    const json = (await res.json()) as ApiEnvelope<RegulatoryComplianceAutomationDoc>;
    if (!json?.ok || !json?.data) {
        throw new Error(
            "Unexpected response shape from GET /v1/public/regulatory-compliance-automation"
        );
    }
    return json.data;
}

// Icon components matching Figma design
type IconProps = { className?: string; style?: React.CSSProperties };

function CheckIcon({ className, style }: IconProps) {
    return (
        <svg
            className={className}
            style={style}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M16.6667 5L7.50001 14.1667L3.33334 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function EyeIcon({ className, style }: IconProps) {
    return (
        <svg
            className={className}
            style={style}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle
                cx="12"
                cy="12"
                r="3"
                stroke="currentColor"
                strokeWidth="2"
            />
        </svg>
    );
}

function TrashIcon({ className, style }: IconProps) {
    return (
        <svg
            className={className}
            style={style}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ClipboardIcon({ className, style }: IconProps) {
    return (
        <svg
            className={className}
            style={style}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <rect
                x="8"
                y="2"
                width="8"
                height="4"
                rx="1"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                d="M9 12h6M9 16h6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function UserIcon({ className, style }: IconProps) {
    return (
        <svg
            className={className}
            style={style}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle
                cx="12"
                cy="7"
                r="4"
                stroke="currentColor"
                strokeWidth="2"
            />
        </svg>
    );
}

function ShieldIcon({ className, style }: IconProps) {
    return (
        <svg
            className={className}
            style={style}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function UsersIcon({ className, style }: IconProps) {
    return (
        <svg
            className={className}
            style={style}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
            <path
                d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function XIcon({ className, style }: IconProps) {
    return (
        <svg
            className={className}
            style={style}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15 5L5 15M5 5l10 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ArrowRightIcon({ className, style }: IconProps) {
    return (
        <svg
            className={className}
            style={style}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4.16666 10H15.8333M15.8333 10L10 4.16666M15.8333 10L10 15.8333"
                stroke="currentColor"
                strokeWidth="1.67"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function BuildingIcon({ className, style }: IconProps) {
    return (
        <svg
            className={className}
            style={style}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default function RegulatoryComplianceAutomationPage(): React.ReactElement {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [doc, setDoc] = React.useState<RegulatoryComplianceAutomationDoc | null>(null);

    React.useEffect(() => {
        const ac = new AbortController();
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await apiGetDoc(ac.signal);
                setDoc(data);
            } catch (e) {
                const msg = e instanceof Error ? e.message : "Failed to load page.";
                setError(msg);
                setDoc(null);
            } finally {
                setLoading(false);
            }
        })();
        return () => ac.abort();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <p className="text-sm text-slate-600">Loading compliance data...</p>
            </div>
        );
    }

    if (error || !doc) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white px-6">
                <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">Compliance data unavailable</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        {error || "Live compliance data is required for this page."}
                    </p>
                </div>
            </div>
        );
    }

    const content = doc;

    return (
        <div className="flex min-h-screen flex-col" style={{ backgroundColor: "#ffffff" }}>
            {/* Fixed Header */}
            <header
                className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-4"
                style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb" }}
            >
                <Link href="/" className="flex items-center gap-2">
                    <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{ backgroundColor: "#155dfc" }}
                    >
                        <span className="text-sm font-bold text-white">S</span>
                    </div>
                    <span className="text-lg font-semibold" style={{ color: "#101828" }}>
                        SkyMaintain
                    </span>
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
                    <Link
                        href="/platform-features"
                        className="text-sm font-medium transition-colors hover:opacity-70"
                        style={{ color: "#364153" }}
                    >
                        Platform
                    </Link>
                    <Link
                        href="/platform-features"
                        className="text-sm font-medium transition-colors hover:opacity-70"
                        style={{ color: "#364153" }}
                    >
                        Solutions
                    </Link>
                    <Link
                        href="/pricing"
                        className="text-sm font-medium transition-colors hover:opacity-70"
                        style={{ color: "#364153" }}
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium transition-colors hover:opacity-70"
                        style={{ color: "#364153" }}
                    >
                        About
                    </Link>
                </nav>

                <div className="flex items-center gap-3">
                    <Link
                        href="/signin"
                        className="text-sm font-medium transition-colors hover:opacity-70"
                        style={{ color: "#364153" }}
                    >
                        Log in
                    </Link>
                    <Link
                        href="/get-started"
                        className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ backgroundColor: "#155dfc" }}
                    >
                        Get started
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section
                className="px-8 pb-16 pt-32"
                style={{
                    background:
                        "linear-gradient(180deg, #f0fdf4 0%, #eff6ff 50%, #ecfdf5 100%)",
                }}
            >
                <div className="mx-auto max-w-4xl text-center">
                    <div
                        className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2"
                        style={{ backgroundColor: "#dcfce7", border: "1px solid #bbf7d0" }}
                    >
                        <span className="text-sm font-medium" style={{ color: "#166534" }}>
                            {content.page_label}
                        </span>
                    </div>

                    <h1
                        className="mb-6 text-4xl font-semibold leading-tight sm:text-5xl"
                        style={{ color: "#101828" }}
                    >
                        {content.headline}
                    </h1>

                    <p
                        className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed"
                        style={{ color: "#364153" }}
                    >
                        {content.subhead}
                    </p>

                    {error && (
                        <div
                            className="mx-auto max-w-2xl rounded-lg px-4 py-3 text-sm"
                            style={{
                                backgroundColor: "#fef2f2",
                                border: "1px solid #fecaca",
                                color: "#991b1b",
                            }}
                        >
                            {error}
                        </div>
                    )}
                </div>
            </section>

            {/* What It Does Section */}
            <section className="px-8 py-16" style={{ backgroundColor: "#ffffff" }}>
                <div className="mx-auto max-w-6xl">
                    <h2
                        className="mb-8 text-center text-3xl font-semibold"
                        style={{ color: "#101828" }}
                    >
                        {content.what_it_does.title}
                    </h2>

                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Left: Description Card */}
                        <div
                            className="rounded-xl p-6"
                            style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}
                        >
                            {content.what_it_does.body.map((p, i) => (
                                <p
                                    key={i}
                                    className="mb-4 text-base leading-relaxed"
                                    style={{ color: "#364153" }}
                                >
                                    {p}
                                </p>
                            ))}

                            <ul className="space-y-3">
                                {content.what_it_does.bullets.map((bullet, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div
                                            className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                                            style={{ backgroundColor: "#dcfce7" }}
                                        >
                                            <CheckIcon className="h-3 w-3" style={{ color: "#16a34a" }} />
                                        </div>
                                        <span className="text-base" style={{ color: "#364153" }}>
                                            {bullet}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: Callout Box */}
                        <div
                            className="flex items-center rounded-xl p-6"
                            style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe" }}
                        >
                            <p className="text-base leading-relaxed" style={{ color: "#1e40af" }}>
                                {content.what_it_does.footer_note}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section
                className="px-8 py-16"
                style={{
                    background: "linear-gradient(180deg, #f0fdf4 0%, #ecfdf5 100%)",
                }}
            >
                <div className="mx-auto max-w-6xl">
                    <h2
                        className="mb-8 text-center text-3xl font-semibold"
                        style={{ color: "#101828" }}
                    >
                        {content.how_it_works.title}
                    </h2>

                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Left: Steps */}
                        <div
                            className="rounded-xl p-6"
                            style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                        >
                            {content.how_it_works.body.map((p, i) => (
                                <p
                                    key={i}
                                    className="mb-4 text-base leading-relaxed"
                                    style={{ color: "#364153" }}
                                >
                                    {p}
                                </p>
                            ))}

                            <ul className="space-y-3">
                                {content.how_it_works.bullets.map((bullet, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div
                                            className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                                            style={{ backgroundColor: "#dcfce7" }}
                                        >
                                            <CheckIcon className="h-3 w-3" style={{ color: "#16a34a" }} />
                                        </div>
                                        <span className="text-base" style={{ color: "#364153" }}>
                                            {bullet}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: Callout */}
                        <div
                            className="flex items-center rounded-xl p-6"
                            style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}
                        >
                            <p className="text-base leading-relaxed" style={{ color: "#166534" }}>
                                {content.how_it_works.footer_note}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Benefits Section */}
            <section className="px-8 py-16" style={{ backgroundColor: "#ffffff" }}>
                <div className="mx-auto max-w-6xl">
                    <h2
                        className="mb-12 text-center text-3xl font-semibold"
                        style={{ color: "#101828" }}
                    >
                        {content.benefits.title}
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Visibility Card */}
                        <div
                            className="rounded-xl p-6"
                            style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                        >
                            <div
                                className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
                                style={{ backgroundColor: "#eff6ff" }}
                            >
                                <EyeIcon className="h-6 w-6" style={{ color: "#155dfc" }} />
                            </div>
                            <h3
                                className="mb-2 text-lg font-semibold"
                                style={{ color: "#101828" }}
                            >
                                {content.benefits.tiles[0]?.title}
                            </h3>
                            <p className="text-base leading-relaxed" style={{ color: "#4a5565" }}>
                                {content.benefits.tiles[0]?.description}
                            </p>
                        </div>

                        {/* Admin Overhead Card */}
                        <div
                            className="rounded-xl p-6"
                            style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                        >
                            <div
                                className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
                                style={{ backgroundColor: "#f0fdf4" }}
                            >
                                <TrashIcon className="h-6 w-6" style={{ color: "#16a34a" }} />
                            </div>
                            <h3
                                className="mb-2 text-lg font-semibold"
                                style={{ color: "#101828" }}
                            >
                                {content.benefits.tiles[1]?.title}
                            </h3>
                            <p className="text-base leading-relaxed" style={{ color: "#4a5565" }}>
                                {content.benefits.tiles[1]?.description}
                            </p>
                        </div>

                        {/* Audit-Ready Card */}
                        <div
                            className="rounded-xl p-6"
                            style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                        >
                            <div
                                className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
                                style={{ backgroundColor: "#fef3c7" }}
                            >
                                <ClipboardIcon className="h-6 w-6" style={{ color: "#d97706" }} />
                            </div>
                            <h3
                                className="mb-2 text-lg font-semibold"
                                style={{ color: "#101828" }}
                            >
                                {content.benefits.tiles[2]?.title}
                            </h3>
                            <p className="text-base leading-relaxed" style={{ color: "#4a5565" }}>
                                {content.benefits.tiles[2]?.description}
                            </p>
                        </div>

                        {/* Accountability Card */}
                        <div
                            className="rounded-xl p-6"
                            style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                        >
                            <div
                                className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
                                style={{ backgroundColor: "#eef2ff" }}
                            >
                                <UserIcon className="h-6 w-6" style={{ color: "#6366f1" }} />
                            </div>
                            <h3
                                className="mb-2 text-lg font-semibold"
                                style={{ color: "#101828" }}
                            >
                                {content.benefits.tiles[3]?.title}
                            </h3>
                            <p className="text-base leading-relaxed" style={{ color: "#4a5565" }}>
                                {content.benefits.tiles[3]?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Designed for Regulated Environments Section */}
            <section
                className="px-8 py-16"
                style={{ backgroundColor: "#f9fafb" }}
            >
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Left: Content */}
                        <div>
                            <div
                                className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
                                style={{ backgroundColor: "#f0fdf4" }}
                            >
                                <ShieldIcon className="h-6 w-6" style={{ color: "#16a34a" }} />
                            </div>
                            <h2
                                className="mb-4 text-2xl font-semibold"
                                style={{ color: "#101828" }}
                            >
                                {content.designed_for_regulated.title}
                            </h2>

                            {content.designed_for_regulated.body.map((p, i) => (
                                <p
                                    key={i}
                                    className="mb-4 text-base leading-relaxed"
                                    style={{ color: "#364153" }}
                                >
                                    {p}
                                </p>
                            ))}

                            <ul className="space-y-3">
                                {content.designed_for_regulated.bullets.map((bullet, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div
                                            className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                                            style={{ backgroundColor: "#dcfce7" }}
                                        >
                                            <CheckIcon className="h-3 w-3" style={{ color: "#16a34a" }} />
                                        </div>
                                        <span className="text-base" style={{ color: "#364153" }}>
                                            {bullet}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: Warning Callout */}
                        <div
                            className="flex items-center rounded-xl p-6"
                            style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca" }}
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                                    style={{ backgroundColor: "#fee2e2" }}
                                >
                                    <XIcon className="h-5 w-5" style={{ color: "#dc2626" }} />
                                </div>
                                <p className="text-base leading-relaxed" style={{ color: "#991b1b" }}>
                                    {content.designed_for_regulated.warning}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Human-in-the-Loop Compliance Section */}
            <section className="px-8 py-16" style={{ backgroundColor: "#ffffff" }}>
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Left: Content */}
                        <div>
                            <div
                                className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
                                style={{ backgroundColor: "#eff6ff" }}
                            >
                                <UsersIcon className="h-6 w-6" style={{ color: "#155dfc" }} />
                            </div>
                            <h2
                                className="mb-4 text-2xl font-semibold"
                                style={{ color: "#101828" }}
                            >
                                {content.human_in_the_loop.title}
                            </h2>

                            {content.human_in_the_loop.body.map((p, i) => (
                                <p
                                    key={i}
                                    className="mb-4 text-base leading-relaxed"
                                    style={{ color: "#364153" }}
                                >
                                    {p}
                                </p>
                            ))}

                            <ul className="space-y-3">
                                {content.human_in_the_loop.bullets.map((bullet, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div
                                            className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                                            style={{ backgroundColor: "#dbeafe" }}
                                        >
                                            <XIcon className="h-3 w-3" style={{ color: "#155dfc" }} />
                                        </div>
                                        <span className="text-base" style={{ color: "#364153" }}>
                                            {bullet}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: Callout */}
                        <div
                            className="flex items-center rounded-xl p-6"
                            style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe" }}
                        >
                            <p className="text-base leading-relaxed" style={{ color: "#1e40af" }}>
                                {content.human_in_the_loop.footer_note}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Transparency & Trust Section */}
            <section
                className="px-8 py-16"
                style={{
                    background: "linear-gradient(180deg, #f0fdf4 0%, #ecfdf5 100%)",
                }}
            >
                <div className="mx-auto max-w-6xl">
                    <h2
                        className="mb-8 text-center text-3xl font-semibold"
                        style={{ color: "#101828" }}
                    >
                        {content.transparency.title}
                    </h2>

                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Left: Content */}
                        <div
                            className="rounded-xl p-6"
                            style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                        >
                            {content.transparency.body.map((p, i) => (
                                <p
                                    key={i}
                                    className="mb-4 text-base leading-relaxed"
                                    style={{ color: "#364153" }}
                                >
                                    {p}
                                </p>
                            ))}

                            <ul className="space-y-3">
                                {content.transparency.bullets.map((bullet, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div
                                            className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                                            style={{ backgroundColor: "#dcfce7" }}
                                        >
                                            <CheckIcon className="h-3 w-3" style={{ color: "#16a34a" }} />
                                        </div>
                                        <span className="text-base" style={{ color: "#364153" }}>
                                            {bullet}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: Purple Callout */}
                        <div
                            className="flex items-center rounded-xl p-6"
                            style={{ backgroundColor: "#eef2ff", border: "1px solid #c7d2fe" }}
                        >
                            <p className="text-base leading-relaxed" style={{ color: "#4338ca" }}>
                                {content.transparency.footer_note}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who It's For Section */}
            <section className="px-8 py-16" style={{ backgroundColor: "#ffffff" }}>
                <div className="mx-auto max-w-6xl">
                    <h2
                        className="mb-4 text-center text-3xl font-semibold"
                        style={{ color: "#101828" }}
                    >
                        {content.who_its_for.title}
                    </h2>

                    {content.who_its_for.body.map((p, i) => (
                        <p
                            key={i}
                            className="mb-8 text-center text-base leading-relaxed"
                            style={{ color: "#364153" }}
                        >
                            {p}
                        </p>
                    ))}

                    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {content.who_its_for.groups.map((group, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 rounded-lg p-4"
                                style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
                            >
                                <div
                                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                                    style={{ backgroundColor: "#eff6ff" }}
                                >
                                    <BuildingIcon className="h-4 w-4" style={{ color: "#155dfc" }} />
                                </div>
                                <span className="text-sm font-medium" style={{ color: "#101828" }}>
                                    {group}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div
                        className="rounded-xl p-6 text-center"
                        style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}
                    >
                        <p className="text-base leading-relaxed" style={{ color: "#166534" }}>
                            {content.who_its_for.closing}
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                className="px-8 py-20"
                style={{
                    background: "linear-gradient(135deg, #00a63e 0%, #009966 50%, #00786f 100%)",
                }}
            >
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mb-6 text-3xl font-semibold text-white sm:text-4xl">
                        {content.final_cta.title}
                    </h2>

                    {content.final_cta.body.map((line, i) => (
                        <p
                            key={i}
                            className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/90"
                        >
                            {line}
                        </p>
                    ))}

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href={content.final_cta.primary.href}
                            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold transition-opacity hover:opacity-90"
                            style={{ color: "#101828" }}
                        >
                            {content.final_cta.primary.label}
                            <ArrowRightIcon className="h-5 w-5" style={{ color: "#00a63e" }} />
                        </Link>
                        <Link
                            href={content.final_cta.secondary.href}
                            className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/20"
                        >
                            {content.final_cta.secondary.label}
                            <ArrowRightIcon className="h-5 w-5 text-white" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-8 py-16" style={{ backgroundColor: "#101828" }}>
                <div className="mx-auto max-w-6xl">
                    <div className="grid gap-12 md:grid-cols-4">
                        {/* Brand Column */}
                        <div className="md:col-span-1">
                            <Link href="/" className="flex items-center gap-2">
                                <div
                                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                                    style={{ backgroundColor: "#155dfc" }}
                                >
                                    <span className="text-sm font-bold text-white">S</span>
                                </div>
                                <span className="text-lg font-semibold text-white">
                                    SkyMaintain
                                </span>
                            </Link>
                            <p className="mt-4 text-sm leading-relaxed" style={{ color: "#9ca3af" }}>
                                AI-powered predictive maintenance for aviation.
                            </p>
                        </div>

                        {/* Platform Column */}
                        <div>
                            <h4 className="mb-4 text-sm font-semibold text-white">Platform</h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href="/platform-features"
                                        className="text-sm transition-colors hover:text-white"
                                        style={{ color: "#9ca3af" }}
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/security"
                                        className="text-sm transition-colors hover:text-white"
                                        style={{ color: "#9ca3af" }}
                                    >
                                        Security
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/compliance"
                                        className="text-sm transition-colors hover:text-white"
                                        style={{ color: "#9ca3af" }}
                                    >
                                        Compliance
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company Column */}
                        <div>
                            <h4 className="mb-4 text-sm font-semibold text-white">Company</h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href="/about"
                                        className="text-sm transition-colors hover:text-white"
                                        style={{ color: "#9ca3af" }}
                                    >
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="text-sm transition-colors hover:text-white"
                                        style={{ color: "#9ca3af" }}
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/careers"
                                        className="text-sm transition-colors hover:text-white"
                                        style={{ color: "#9ca3af" }}
                                    >
                                        Careers
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Legal Column */}
                        <div>
                            <h4 className="mb-4 text-sm font-semibold text-white">Legal</h4>
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href="/privacy"
                                        className="text-sm transition-colors hover:text-white"
                                        style={{ color: "#9ca3af" }}
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/terms"
                                        className="text-sm transition-colors hover:text-white"
                                        style={{ color: "#9ca3af" }}
                                    >
                                        Terms of Service
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div
                        className="mt-12 border-t pt-8"
                        style={{ borderColor: "#1f2937" }}
                    >
                        <p className="text-center text-sm" style={{ color: "#6b7280" }}>
                            © {new Date().getFullYear()} SkyMaintain. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
