/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import Link from "next/link";
import { CONTACT_DEMO } from "@/lib/routes";

// Figma assets
const imgIconShield = "https://www.figma.com/api/mcp/asset/0346723f-df63-4eb0-9ee2-6cc7c30a61f2";
const imgIconPlatformSecurity = "https://www.figma.com/api/mcp/asset/808da02e-eaf9-46bb-aaf5-72492eb24e0d";
const imgIconOperational = "https://www.figma.com/api/mcp/asset/bbeab37e-1520-4e70-8a5a-27635030771f";
const imgIconSecureDev = "https://www.figma.com/api/mcp/asset/c0de44ff-8174-4a8d-8f4e-8b4252a219da";
const imgIconCheck = "https://www.figma.com/api/mcp/asset/6db474ff-0d96-4b0e-8caa-b04374105d64";
const imgIconCheckAlt = "https://www.figma.com/api/mcp/asset/9e6f2380-9110-45c0-8a99-0f37477e9310";
const imgIconKey = "https://www.figma.com/api/mcp/asset/8cac856d-f882-448a-b949-f95fb00fd080";
const imgIconArrow = "https://www.figma.com/api/mcp/asset/e9f3e812-8321-4116-8dd5-2f1f9f18ee6d";
const imgIconArrowWhite = "https://www.figma.com/api/mcp/asset/cb9a9a90-c0cf-4e0e-9d0f-04e9fdb75783";
const imgVector = "https://www.figma.com/api/mcp/asset/9482912b-0fd4-40a3-bf85-5f8c4a5e7cf5";

type DataMode = "mock" | "live" | "hybrid";

type SecurityDoc = {
    page_label: string;
    title: string;
    intro: string;
    columns: Array<{
        heading: string;
        bullets: string[];
    }>;
    closing: string;
    cta_strip: {
        eyebrow: string;
        primary: { label: string; href: string };
        secondary: { label: string; href: string };
    };
};

type ApiEnvelope<T> = { ok: boolean; data: T; meta?: { request_id?: string } };

function cx(...classes: Array<string | false | null | undefined>): string {
    return classes.filter(Boolean).join(" ");
}

function getDataMode(): DataMode {
    const raw = (process.env.NEXT_PUBLIC_DATA_MODE || "mock").toLowerCase();
    if (raw === "mock" || raw === "live" || raw === "hybrid") return raw;
    return "mock";
}

function getApiBaseUrl(): string {
    return (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");
}

const DEFAULT_DOC: SecurityDoc = {
    page_label: "Security & Data Protection",
    title: "Security & Data Protection",
    intro: "SkyMaintain is designed with security-first principles to support enterprise aviation environments.",
    columns: [
        {
            heading: "Platform Security",
            bullets: [
                "Secure cloud infrastructure",
                "Encryption of data in transit and at rest",
                "Role-based access controls",
                "Secure authentication and authorization mechanisms",
            ],
        },
        {
            heading: "Operational Integrity",
            bullets: [
                "Audit-friendly logging and traceability",
                "Separation of operational and analytical layers",
                "Controlled access to sensitive data",
            ],
        },
        {
            heading: "Secure Development Practices",
            bullets: ["Secure development lifecycle principles", "Regular system monitoring", "Ongoing platform improvement"],
        },
    ],
    closing:
        "SkyMaintain is designed to support aviation safety and data protection requirements, while recognizing the sensitive nature of maintenance information.",
    cta_strip: {
        eyebrow: "Enterprise-grade security for aviation operations",
        primary: { label: "Start Your Free Trial", href: "/get-started" },
        secondary: { label: "Schedule a Demo", href: CONTACT_DEMO },
    },
};

let mockStore: SecurityDoc = structuredClone(DEFAULT_DOC);

async function apiGetSecurityDoc(signal?: AbortSignal): Promise<SecurityDoc> {
    const mode = getDataMode();

    if (mode === "mock") {
        await new Promise((r) => setTimeout(r, 100));
        return structuredClone(mockStore);
    }

    const base = getApiBaseUrl();
    if (!base) {
        await new Promise((r) => setTimeout(r, 70));
        return structuredClone(mockStore);
    }

    const res = await fetch(`${base}/v1/legal/security-data-protection`, {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
        signal,
    });

    if (!res.ok) {
        if (mode === "hybrid") return structuredClone(mockStore);
        throw new Error(`GET /v1/legal/security-data-protection failed (${res.status})`);
    }

    const json = (await res.json()) as ApiEnvelope<SecurityDoc>;
    if (!json?.ok || !json?.data) {
        if (mode === "hybrid") return structuredClone(mockStore);
        throw new Error("Unexpected response shape from GET /v1/legal/security-data-protection");
    }

    if (mode === "hybrid") mockStore = structuredClone(json.data);
    return json.data;
}

function Card({
    heading,
    bullets,
    loading,
    iconSrc,
    iconType,
}: {
    heading: string;
    bullets: string[];
    loading: boolean;
    iconSrc: string;
    iconType: "blue" | "green";
}): React.ReactElement {
    const checkIcon = iconType === "blue" ? imgIconCheck : imgIconCheckAlt;

    return (
        <div
            className="rounded-xl border bg-white p-8"
            style={{ borderColor: "rgba(0,0,0,0.1)" }}
        >
            {/* Icon */}
            <img
                src={iconSrc}
                alt=""
                className="h-12 w-12"
            />

            {/* Heading */}
            <h2
                className="mt-12 text-2xl font-bold"
                style={{ color: "#101828", lineHeight: "32px" }}
            >
                {heading}
            </h2>

            {/* List */}
            {loading ? (
                <div className="mt-12 space-y-3">
                    {Array.from({ length: Math.max(3, bullets.length || 3) }).map((_, idx) => (
                        <div key={idx} className="h-6 animate-pulse rounded bg-slate-100" />
                    ))}
                </div>
            ) : (
                <ul className="mt-12 space-y-3">
                    {bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <img
                                src={checkIcon}
                                alt=""
                                className="mt-0.5 h-5 w-5 flex-shrink-0"
                            />
                            <span
                                className="text-base leading-relaxed"
                                style={{ color: "#364153" }}
                            >
                                {b}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default function SecurityDataProtectionPage(): React.ReactElement {
    const mode = getDataMode();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [doc, setDoc] = React.useState<SecurityDoc>(structuredClone(DEFAULT_DOC));

    React.useEffect(() => {
        const ac = new AbortController();
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await apiGetSecurityDoc(ac.signal);
                setDoc(data);
            } catch (e) {
                const msg = e instanceof Error ? e.message : "Failed to load Security & Data Protection.";
                setError(msg);
                setDoc(structuredClone(DEFAULT_DOC));
            } finally {
                setLoading(false);
            }
        })();
        return () => ac.abort();
    }, []);

    return (
        <div className="w-full bg-white">
            {/* Header */}
            <header
                className="fixed left-0 right-0 top-0 z-50 border-b px-6 py-4"
                style={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    borderColor: "#e5e7eb",
                    boxShadow: "0px 1px 3px rgba(0,0,0,0.1), 0px 1px 2px rgba(0,0,0,0.1)",
                }}
            >
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div
                            className="flex h-12 w-12 items-center justify-center rounded-xl"
                            style={{
                                background: "linear-gradient(135deg, #155dfc 0%, #1447e6 100%)",
                                boxShadow: "0px 10px 15px rgba(0,0,0,0.1), 0px 4px 6px rgba(0,0,0,0.1)",
                            }}
                        >
                            <img
                                src={imgVector}
                                alt="SkyMaintain"
                                className="h-7 w-7"
                            />
                        </div>
                        <div>
                            <p
                                className="text-2xl font-bold"
                                style={{ color: "#101828", lineHeight: "32px" }}
                            >
                                SkyMaintain
                            </p>
                            <p
                                className="text-xs"
                                style={{ color: "#4a5565" }}
                            >
                                Regulatory-Compliant AI Platform
                            </p>
                        </div>
                    </Link>

                    {/* Right buttons */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="rounded-lg px-4 py-2 text-sm transition-colors hover:bg-gray-100"
                            style={{ color: "#364153" }}
                        >
                            Back to Home
                        </Link>
                        <Link
                            href="/get-started"
                            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
                            style={{ backgroundColor: "#155dfc" }}
                        >
                            Get Started
                            <img
                                src={imgIconArrowWhite}
                                alt=""
                                className="h-4 w-4"
                            />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section
                className="px-6 pb-16 pt-32 text-center"
                style={{
                    background: "linear-gradient(157deg, #eff6ff 0%, #faf5ff 100%)",
                }}
            >
                <div className="mx-auto max-w-4xl">
                    {/* Shield Icon */}
                    <img
                        src={imgIconShield}
                        alt=""
                        className="mx-auto h-20 w-20"
                    />

                    {/* Badge */}
                    <div
                        className="mx-auto mt-6 inline-flex items-center justify-center rounded-lg px-5 py-2"
                        style={{ backgroundColor: "#155dfc" }}
                    >
                        <span
                            className="text-sm font-medium"
                            style={{ color: "#ffffff" }}
                        >
                            {doc.page_label}
                        </span>
                    </div>

                    {/* Title */}
                    <h1
                        className="mt-6 text-5xl font-bold tracking-tight"
                        style={{ color: "#101828", lineHeight: "48px" }}
                    >
                        {doc.title}
                    </h1>

                    {/* Description */}
                    <p
                        className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed"
                        style={{ color: "#4a5565" }}
                    >
                        {doc.intro}
                    </p>

                    {/* Data mode badge */}
                    <div className="mt-4">
                        <span
                            className={cx(
                                "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
                                mode === "live"
                                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                    : mode === "hybrid"
                                        ? "border-amber-200 bg-amber-50 text-amber-800"
                                        : "border-slate-200 bg-slate-50 text-slate-700"
                            )}
                            title="Data mode is controlled by NEXT_PUBLIC_DATA_MODE"
                        >
                            Data: {mode.toUpperCase()}
                        </span>
                    </div>

                    {error && (
                        <div className="mx-auto mt-5 max-w-2xl rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                            {error}
                        </div>
                    )}
                </div>
            </section>

            {/* Content Section */}
            <section className="bg-white px-6 py-20">
                <div className="mx-auto max-w-6xl">
                    {/* Three Column Cards */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <Card
                            heading={doc.columns[0]?.heading ?? "Platform Security"}
                            bullets={doc.columns[0]?.bullets ?? []}
                            loading={loading}
                            iconSrc={imgIconPlatformSecurity}
                            iconType="blue"
                        />
                        <Card
                            heading={doc.columns[1]?.heading ?? "Operational Integrity"}
                            bullets={doc.columns[1]?.bullets ?? []}
                            loading={loading}
                            iconSrc={imgIconOperational}
                            iconType="green"
                        />
                        <Card
                            heading={doc.columns[2]?.heading ?? "Secure Development Practices"}
                            bullets={doc.columns[2]?.bullets ?? []}
                            loading={loading}
                            iconSrc={imgIconSecureDev}
                            iconType="green"
                        />
                    </div>

                    {/* Closing Statement Card */}
                    <div
                        className="mt-16 rounded-xl border p-10 text-center"
                        style={{
                            backgroundColor: "#eff6ff",
                            borderColor: "#bedbff",
                        }}
                    >
                        <p
                            className="text-lg leading-relaxed"
                            style={{ color: "#364153" }}
                        >
                            {doc.closing}
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                className="px-6 py-24"
                style={{
                    background: "linear-gradient(161deg, #155dfc 0%, #9810fa 50%, #432dd7 100%)",
                }}
            >
                <div className="mx-auto max-w-4xl text-center">
                    {/* Key Icon */}
                    <img
                        src={imgIconKey}
                        alt=""
                        className="mx-auto h-16 w-16"
                    />

                    {/* Eyebrow */}
                    <h2
                        className="mt-8 text-4xl font-bold"
                        style={{ color: "#ffffff", lineHeight: "40px" }}
                    >
                        {doc.cta_strip.eyebrow}
                    </h2>

                    {/* Buttons */}
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href={doc.cta_strip.primary.href}
                            className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-lg font-medium transition-colors hover:bg-gray-100"
                            style={{
                                color: "#155dfc",
                                boxShadow: "0px 25px 50px rgba(0,0,0,0.25)",
                            }}
                        >
                            {doc.cta_strip.primary.label}
                            <img
                                src={imgIconArrow}
                                alt=""
                                className="h-5 w-5"
                            />
                        </Link>
                        <Link
                            href={doc.cta_strip.secondary.href}
                            className="rounded-lg bg-white px-10 py-3 text-lg font-medium transition-colors hover:bg-gray-100"
                            style={{
                                color: "#155dfc",
                                boxShadow: "0px 25px 50px rgba(0,0,0,0.25)",
                            }}
                        >
                            {doc.cta_strip.secondary.label}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="px-6 py-6"
                style={{ backgroundColor: "#101828" }}
            >
                <div className="mx-auto max-w-4xl text-center">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-2">
                        <div
                            className="flex h-9 w-9 items-center justify-center rounded-lg"
                            style={{ backgroundColor: "#155dfc" }}
                        >
                            <img
                                src={imgVector}
                                alt="SkyMaintain"
                                className="h-5 w-5"
                            />
                        </div>
                        <span
                            className="text-lg font-bold"
                            style={{ color: "#ffffff" }}
                        >
                            SkyMaintain
                        </span>
                    </div>

                    {/* Tagline */}
                    <p
                        className="mt-3 text-sm"
                        style={{ color: "#99a1af" }}
                    >
                        AI-powered aircraft maintenance platform ensuring safety, compliance, and efficiency.
                    </p>

                    {/* Copyright */}
                    <p
                        className="mt-2 text-sm"
                        style={{ color: "#d1d5dc" }}
                    >
                        © 2026{" "}
                        <span style={{ color: "#51a2ff" }}>SkyMaintain</span>
                        . All Rights Reserved.
                    </p>

                    {/* EncycloAMTs */}
                    <p
                        className="mt-2 text-sm"
                        style={{ color: "#6a7282" }}
                    >
                        SkyMaintain is a product of EncycloAMTs LLC.
                    </p>
                </div>
            </footer>
        </div>
    );
}
