/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import Link from "next/link";

// Figma assets
const imgIconMaintenance = "https://www.figma.com/api/mcp/asset/b838d9b0-297f-41ed-bc5d-185a1f9bd199";
const imgIconSafety = "https://www.figma.com/api/mcp/asset/25d6013f-c082-4e76-a7d2-d4d5d5ad18a7";
const imgIconData = "https://www.figma.com/api/mcp/asset/a1ee18d6-6edd-41a3-9813-53f1901dcf35";
const imgIconProduct = "https://www.figma.com/api/mcp/asset/51db4495-41fb-4814-aad9-6001ac699c0e";
const imgIconMail = "https://www.figma.com/api/mcp/asset/85a52cd3-b50e-433f-bc7a-1280f980c2e2";
const imgIconMailSmall = "https://www.figma.com/api/mcp/asset/6c5e42d4-b8e3-46d9-b774-eef4f0b4910b";
const imgVector = "https://www.figma.com/api/mcp/asset/f9c920d8-80b9-4e98-80ca-56b3c2e33d0e";
const imgVectorLarge = "https://www.figma.com/api/mcp/asset/a89967a8-dc08-435a-8253-3ff1629b43a0";
const imgIconArrowWhite = "https://www.figma.com/api/mcp/asset/e8463257-a618-49f5-b5a2-6679221e35e7";

type DataMode = "mock" | "live" | "hybrid";

type AreaOfInterest = {
    id: string;
    title: string;
    icon: string;
};

type CareersDoc = {
    badge: string;
    headline: string;
    intro: string;
    paragraph: string;
    areas_title: string;
    areas: AreaOfInterest[];
    touch_title: string;
    touch_text: string;
    email: string;
};

type ApiEnvelope<T> = { ok: boolean; data: T; meta?: { request_id?: string } };

function getDataMode(): DataMode {
    const raw = (process.env.NEXT_PUBLIC_DATA_MODE || "mock").toLowerCase();
    if (raw === "mock" || raw === "live" || raw === "hybrid") return raw;
    return "mock";
}

function getApiBaseUrl(): string {
    return (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");
}

const DEFAULT_DOC: CareersDoc = {
    badge: "Careers",
    headline: "Careers at SkyMaintain",
    intro:
        "SkyMaintain is building the next generation of AI-assisted decision-support tools for aviation maintenance professionals.",
    paragraph:
        "While we are a growing platform, we are always interested in connecting with individuals who share a passion for aviation safety, engineering excellence, and responsible technology development.",
    areas_title: "Areas of Interest",
    areas: [
        { id: "maintenance", title: "Aircraft Maintenance & Engineering", icon: imgIconMaintenance },
        { id: "safety", title: "Aviation Safety & Compliance", icon: imgIconSafety },
        { id: "data", title: "Data & AI Systems", icon: imgIconData },
        { id: "product", title: "Product, UX, and Platform Design", icon: imgIconProduct },
    ],
    touch_title: "Get in Touch",
    touch_text: "Interested in joining our team or learning more about opportunities?",
    email: "careers@skymaintain.ai",
};

let mockStore: CareersDoc = structuredClone(DEFAULT_DOC);

async function apiGetCareers(signal?: AbortSignal): Promise<CareersDoc> {
    const mode = getDataMode();

    if (mode === "mock") {
        await new Promise((r) => setTimeout(r, 90));
        return structuredClone(mockStore);
    }

    const base = getApiBaseUrl();
    if (!base) {
        await new Promise((r) => setTimeout(r, 70));
        return structuredClone(mockStore);
    }

    const res = await fetch(`${base}/v1/public/careers`, {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
        signal,
    });

    if (!res.ok) {
        if (mode === "hybrid") return structuredClone(mockStore);
        throw new Error(`GET /v1/public/careers failed (${res.status})`);
    }

    const json = (await res.json()) as ApiEnvelope<CareersDoc>;
    if (!json?.ok || !json?.data) {
        if (mode === "hybrid") return structuredClone(mockStore);
        throw new Error("Unexpected response shape from GET /v1/public/careers");
    }

    if (mode === "hybrid") mockStore = structuredClone(json.data);
    return json.data;
}

function AreaCard({
    area,
    loading,
}: {
    area: AreaOfInterest;
    loading: boolean;
}): React.ReactElement {
    return (
        <div
            className="rounded-xl bg-white p-8"
            style={{ border: "1.6px solid rgba(0,0,0,0.1)" }}
        >
            <div className="flex items-center gap-4">
                {loading ? (
                    <div className="h-10 w-10 animate-pulse rounded-full bg-slate-100" />
                ) : (
                    <img src={area.icon} alt="" className="h-10 w-10" />
                )}
                <h3
                    className="text-xl font-bold"
                    style={{ color: "#101828", lineHeight: "28px" }}
                >
                    {area.title}
                </h3>
            </div>
        </div>
    );
}

export default function CareersPage(): React.ReactElement {
    const [loading, setLoading] = React.useState(true);
    const [doc, setDoc] = React.useState<CareersDoc>(structuredClone(DEFAULT_DOC));

    React.useEffect(() => {
        const ac = new AbortController();
        (async () => {
            setLoading(true);
            try {
                const data = await apiGetCareers(ac.signal);
                setDoc(data);
            } catch {
                // Fallback to default doc
                setDoc(structuredClone(DEFAULT_DOC));
            } finally {
                setLoading(false);
            }
        })();
        return () => ac.abort();
    }, []);

    const content = loading ? DEFAULT_DOC : doc;

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
                                boxShadow:
                                    "0px 10px 15px rgba(0,0,0,0.1), 0px 4px 6px rgba(0,0,0,0.1)",
                            }}
                        >
                            <img
                                src={imgVectorLarge}
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
                            <p className="text-xs" style={{ color: "#4a5565" }}>
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
                            <img src={imgIconArrowWhite} alt="" className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section
                className="px-6 pb-16 pt-32 text-center"
                style={{
                    background: "linear-gradient(161deg, #eff6ff 0%, #faf5ff 100%)",
                }}
            >
                <div className="mx-auto max-w-4xl">
                    {/* Badge */}
                    <div
                        className="mx-auto inline-flex items-center justify-center rounded-lg px-5 py-2"
                        style={{ backgroundColor: "#155dfc" }}
                    >
                        <span className="text-sm font-medium" style={{ color: "#ffffff" }}>
                            {content.badge}
                        </span>
                    </div>

                    {/* Title */}
                    <h1
                        className="mt-6 text-5xl font-bold tracking-tight"
                        style={{ color: "#101828", lineHeight: "48px" }}
                    >
                        {content.headline}
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed"
                        style={{ color: "#4a5565" }}
                    >
                        {content.intro}
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="bg-white px-6 py-20">
                <div className="mx-auto max-w-5xl space-y-16">
                    {/* Blue info card */}
                    <div
                        className="rounded-xl p-10"
                        style={{
                            backgroundColor: "#eff6ff",
                            border: "1.6px solid rgba(0,0,0,0.1)",
                        }}
                    >
                        <p
                            className="text-center text-lg"
                            style={{ color: "#364153", lineHeight: "29px" }}
                        >
                            {content.paragraph}
                        </p>
                    </div>

                    {/* Areas of Interest */}
                    <div className="space-y-8">
                        <h2
                            className="text-center text-3xl font-bold"
                            style={{ color: "#101828", lineHeight: "36px" }}
                        >
                            {content.areas_title}
                        </h2>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {content.areas.map((area) => (
                                <AreaCard key={area.id} area={area} loading={loading} />
                            ))}
                        </div>
                    </div>

                    {/* Get in Touch Card */}
                    <div
                        className="rounded-xl px-12 py-12 text-center"
                        style={{
                            background: "linear-gradient(158deg, #155dfc 0%, #9810fa 100%)",
                            border: "0.8px solid rgba(0,0,0,0.1)",
                        }}
                    >
                        {/* Mail Icon */}
                        <div className="mb-8 flex justify-center">
                            <img src={imgIconMail} alt="" className="h-16 w-16" />
                        </div>

                        {/* Title */}
                        <h2
                            className="text-3xl font-bold"
                            style={{ color: "#ffffff", lineHeight: "36px" }}
                        >
                            {content.touch_title}
                        </h2>

                        {/* Text */}
                        <p
                            className="mt-10 text-xl"
                            style={{ color: "#dbeafe", lineHeight: "28px" }}
                        >
                            {content.touch_text}
                        </p>

                        {/* Email */}
                        <div className="mt-20 flex items-center justify-start gap-3">
                            <img src={imgIconMailSmall} alt="" className="h-6 w-6" />
                            <a
                                href={`mailto:${content.email}`}
                                className="text-2xl font-bold text-white hover:underline"
                                style={{ lineHeight: "32px" }}
                            >
                                {content.email}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-6" style={{ backgroundColor: "#101828" }}>
                <div className="mx-auto max-w-4xl text-center">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-2">
                        <div
                            className="flex h-9 w-9 items-center justify-center rounded-lg"
                            style={{ backgroundColor: "#155dfc" }}
                        >
                            <img src={imgVector} alt="SkyMaintain" className="h-5 w-5" />
                        </div>
                        <span className="text-lg font-bold" style={{ color: "#ffffff" }}>
                            SkyMaintain
                        </span>
                    </div>

                    {/* Tagline */}
                    <p className="mt-3 text-sm" style={{ color: "#99a1af" }}>
                        AI-powered aircraft maintenance platform ensuring safety,
                        compliance, and efficiency.
                    </p>

                    {/* Copyright */}
                    <p className="mt-2 text-sm" style={{ color: "#d1d5dc" }}>
                        © 2026 <span style={{ color: "#51a2ff" }}>SkyMaintain</span>. All
                        Rights Reserved.
                    </p>

                    {/* EncycloAMTs */}
                    <p className="mt-2 text-sm" style={{ color: "#6a7282" }}>
                        SkyMaintain is a product of EncycloAMTs LLC.
                    </p>
                </div>
            </footer>
        </div>
    );
}
