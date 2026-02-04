/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import Link from "next/link";
import { CONTACT_DEMO } from "@/lib/routes";

// Figma assets
const imgIconMission = "https://www.figma.com/api/mcp/asset/e38ae147-44b7-43ba-bcb1-b1aafcdca3ea";
const imgIconApproach = "https://www.figma.com/api/mcp/asset/89f514f3-9f9a-4290-bb11-6aca7f478ab9";
const imgIconCheckGreen = "https://www.figma.com/api/mcp/asset/23d5efba-21ab-4132-9825-64786d7cdeaa";
const imgIconArrowBlue = "https://www.figma.com/api/mcp/asset/3c2d7336-ec16-457f-b1b4-11d1040ea7b4";
const imgVector = "https://www.figma.com/api/mcp/asset/fdfc0aee-33b2-4132-a826-c3ebb1a8f1cb";
const imgVectorLarge = "https://www.figma.com/api/mcp/asset/3c017aac-4d2c-4ad8-b734-98e55371a884";
const imgIconArrowWhite = "https://www.figma.com/api/mcp/asset/4df05114-5a42-467d-9ed5-4f91c37e9ab8";

type DataMode = "mock" | "live" | "hybrid";

type AboutDoc = {
    badge: string;
    headline: string;
    intro: string;
    product_line: string;
    bridge_line: string;
    mission_title: string;
    mission_text: string;
    approach_title: string;
    approach_bullets: string[];
    closing_headline: string;
    cta: {
        primary: { label: string; href: string };
        secondary: { label: string; href: string };
    };
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

const DEFAULT_DOC: AboutDoc = {
    badge: "About Us",
    headline: "About SkyMaintain",
    intro:
        "SkyMaintain is an AI-assisted aircraft maintenance decision-support platform designed to enhance safety, efficiency, and regulatory alignment in aviation maintenance operations.",
    product_line:
        "SkyMaintain is a product of EncycloAMTs LLC, an aviation technology and training company focused on advancing maintenance knowledge, decision support, and workforce capability.",
    bridge_line:
        "Built by professionals with deep experience in aircraft maintenance, engineering, logistics, and regulatory environments, SkyMaintain bridges operational expertise with modern AI-driven analytics.",
    mission_title: "Our Mission",
    mission_text:
        "To support aircraft maintenance professionals with intelligent tools that enhance human decision-making while respecting regulatory boundaries.",
    approach_title: "Our Approach",
    approach_bullets: [
        "Human-in-the-loop design",
        "Regulatory-aware architecture",
        "Practical, operationally grounded insights",
        "Continuous improvement driven by industry feedback",
    ],
    closing_headline: "Join us in advancing aviation maintenance",
    cta: {
        primary: { label: "Start Your Free Trial", href: "/get-started" },
        secondary: { label: "Schedule a Demo", href: CONTACT_DEMO },
    },
};

let mockStore: AboutDoc = structuredClone(DEFAULT_DOC);

async function apiGetAbout(signal?: AbortSignal): Promise<AboutDoc> {
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

    const res = await fetch(`${base}/v1/public/about`, {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
        signal,
    });

    if (!res.ok) {
        if (mode === "hybrid") return structuredClone(mockStore);
        throw new Error(`GET /v1/public/about failed (${res.status})`);
    }

    const json = (await res.json()) as ApiEnvelope<AboutDoc>;
    if (!json?.ok || !json?.data) {
        if (mode === "hybrid") return structuredClone(mockStore);
        throw new Error("Unexpected response shape from GET /v1/public/about");
    }

    if (mode === "hybrid") mockStore = structuredClone(json.data);
    return json.data;
}

export default function AboutPage(): React.ReactElement {
    const [loading, setLoading] = React.useState(true);
    const [doc, setDoc] = React.useState<AboutDoc>(structuredClone(DEFAULT_DOC));

    React.useEffect(() => {
        const ac = new AbortController();
        (async () => {
            setLoading(true);
            try {
                const data = await apiGetAbout(ac.signal);
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
                    background: "linear-gradient(160deg, #eff6ff 0%, #faf5ff 100%)",
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
                <div className="mx-auto max-w-5xl space-y-12">
                    {/* About Card - Gradient */}
                    <div
                        className="rounded-xl p-10"
                        style={{
                            background: "linear-gradient(166deg, #eff6ff 0%, #faf5ff 100%)",
                            border: "1.6px solid rgba(0,0,0,0.1)",
                        }}
                    >
                        <p
                            className="text-lg"
                            style={{ color: "#364153", lineHeight: "29px" }}
                        >
                            <span className="font-bold" style={{ color: "#101828" }}>
                                SkyMaintain is a product of EncycloAMTs LLC
                            </span>
                            , an aviation technology and training company focused on advancing maintenance knowledge, decision support, and workforce capability.
                        </p>
                        <p
                            className="mt-6 text-lg"
                            style={{ color: "#364153", lineHeight: "29px" }}
                        >
                            {content.bridge_line}
                        </p>
                    </div>

                    {/* Our Mission */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <img src={imgIconMission} alt="" className="h-10 w-10" />
                            <h2
                                className="text-3xl font-bold"
                                style={{ color: "#101828", lineHeight: "36px" }}
                            >
                                {content.mission_title}
                            </h2>
                        </div>

                        <div
                            className="rounded-xl bg-white p-8"
                            style={{ border: "1.6px solid rgba(0,0,0,0.1)" }}
                        >
                            <p
                                className="text-lg"
                                style={{ color: "#364153", lineHeight: "29px" }}
                            >
                                {content.mission_text}
                            </p>
                        </div>
                    </div>

                    {/* Our Approach */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <img src={imgIconApproach} alt="" className="h-10 w-10" />
                            <h2
                                className="text-3xl font-bold"
                                style={{ color: "#101828", lineHeight: "36px" }}
                            >
                                {content.approach_title}
                            </h2>
                        </div>

                        <div
                            className="rounded-xl bg-white p-8"
                            style={{ border: "1.6px solid rgba(0,0,0,0.1)" }}
                        >
                            <ul className="space-y-4">
                                {loading
                                    ? Array.from({ length: 4 }).map((_, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <div className="h-6 w-6 animate-pulse rounded-full bg-slate-100" />
                                            <div className="h-6 flex-1 animate-pulse rounded bg-slate-100" />
                                        </li>
                                    ))
                                    : content.approach_bullets.map((b, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <img
                                                src={imgIconCheckGreen}
                                                alt=""
                                                className="mt-0.5 h-6 w-6 shrink-0"
                                            />
                                            <span
                                                className="text-lg"
                                                style={{ color: "#364153", lineHeight: "28px" }}
                                            >
                                                {b}
                                            </span>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                className="px-6 py-24"
                style={{
                    background:
                        "linear-gradient(165deg, #155dfc 0%, #9810fa 50%, #432dd7 100%)",
                }}
            >
                <div className="mx-auto max-w-4xl text-center">
                    {/* Headline */}
                    <h2
                        className="text-4xl font-bold"
                        style={{ color: "#ffffff", lineHeight: "40px" }}
                    >
                        {content.closing_headline}
                    </h2>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href={content.cta.primary.href}
                            className="flex items-center gap-2 rounded-lg bg-white px-10 py-3 text-lg font-medium transition-colors hover:bg-gray-100"
                            style={{
                                color: "#155dfc",
                                boxShadow: "0px 25px 50px rgba(0,0,0,0.25)",
                            }}
                        >
                            {content.cta.primary.label}
                            <img src={imgIconArrowBlue} alt="" className="h-5 w-5" />
                        </Link>
                        <Link
                            href={content.cta.secondary.href}
                            className="rounded-lg bg-white px-10 py-3 text-lg font-medium transition-colors hover:bg-gray-100"
                            style={{
                                color: "#155dfc",
                                boxShadow: "0px 25px 50px rgba(0,0,0,0.25)",
                            }}
                        >
                            {content.cta.secondary.label}
                        </Link>
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
