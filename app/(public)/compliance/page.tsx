/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

// Figma assets
const imgIconShield = "https://www.figma.com/api/mcp/asset/27cd0d1f-956b-42ef-b2c5-efa2c377db9a";
const imgIconCheck = "https://www.figma.com/api/mcp/asset/f4fbdd5b-55d0-4b83-b271-b03f41ec8e3f";
const imgIconCheckCircle = "https://www.figma.com/api/mcp/asset/345b4caa-3dd0-4ab1-bb33-43ee1bff5d29";
const imgIconWarning = "https://www.figma.com/api/mcp/asset/db18d365-d64b-4c7b-ad71-288dd0911377";
const imgIconXCircle = "https://www.figma.com/api/mcp/asset/a4c4a379-f356-4f80-a527-9c0f09fe0f43";
const imgIconShieldWhite = "https://www.figma.com/api/mcp/asset/dceb1d20-696e-4197-978c-64a351885eb5";
const imgVector = "https://www.figma.com/api/mcp/asset/39687fb4-39b5-4b0d-a4de-0b4f505edbba";
const imgVectorLarge = "https://www.figma.com/api/mcp/asset/c9f9c2b1-4ac9-4cd7-83fb-0fe087b3c2bd";
const imgIconArrow = "https://www.figma.com/api/mcp/asset/4f5257fe-f895-480d-a782-783154a8a5cc";

export const metadata = {
    title: "Compliance Statement | SkyMaintain",
    description:
        "Compliance & Regulatory Alignment statement for the SkyMaintain Regulatory-Compliant AI Platform.",
};

type CompliancePayload = {
    headlineTop: string;
    backToHomeLabel: string;
    subhead: string;
    pageTitle: string;
    heroKicker: string;
    heroBody: string;
    keyPrinciplesTitle: string;
    keyPrinciples: string[];
    regulatoryAlignmentTitle: string;
    regulatoryAlignmentIntro: string;
    regulatoryAlignmentBullets: string[];
    importantNoticeTitle: string;
    importantNoticeIntro: string;
    importantNoticeBullets: string[];
    importantNoticeClosingLine1: string;
    importantNoticeClosingLine2: string;
    lastUpdated?: string;
};

function getEnv(name: string, fallback: string) {
    const v = process.env[name];
    return (v ?? fallback).trim();
}

function mockCompliance(): CompliancePayload {
    return {
        headlineTop: "SkyMaintain",
        backToHomeLabel: "Back to Home",
        subhead: "Regulatory-Compliant AI Platform",
        pageTitle: "Compliance Statement",
        heroKicker: "Compliance & Regulatory Alignment",
        heroBody:
            "SkyMaintain is designed as a decision-support platform aligned with aviation maintenance best practices and regulatory frameworks.",
        keyPrinciplesTitle: "Key Principles",
        keyPrinciples: [
            "Human-in-the-loop decision support",
            "No autonomous maintenance actions",
            "No certification authority",
            "No airworthiness approvals",
        ],
        regulatoryAlignmentTitle: "Regulatory Alignment",
        regulatoryAlignmentIntro: "SkyMaintain architecture is informed by:",
        regulatoryAlignmentBullets: [
            "FAA maintenance and continuing airworthiness principles",
            "EASA maintenance organization concepts",
            "Industry safety management practices",
        ],
        importantNoticeTitle: "Important Notice",
        importantNoticeIntro: "SkyMaintain does not replace:",
        importantNoticeBullets: [
            "Approved Maintenance Programs",
            "Regulatory authority oversight",
            "Certified maintenance judgment",
        ],
        importantNoticeClosingLine1: "SkyMaintain supports maintenance professionals —",
        importantNoticeClosingLine2: "it does not substitute them.",
    };
}

async function fetchComplianceLive(baseUrl: string): Promise<CompliancePayload> {
    const url = `${baseUrl.replace(/\/+$/, "")}/v1/public/compliance`;
    const res = await fetch(url, {
        method: "GET",
        cache: "no-store",
        headers: { Accept: "application/json" },
    });

    if (!res.ok) throw new Error(`GET /v1/public/compliance failed: ${res.status}`);

    const data = (await res.json()) as Partial<CompliancePayload>;

    if (
        !data ||
        typeof data.subhead !== "string" ||
        typeof data.pageTitle !== "string" ||
        typeof data.heroKicker !== "string" ||
        typeof data.heroBody !== "string" ||
        !Array.isArray(data.keyPrinciples) ||
        !Array.isArray(data.regulatoryAlignmentBullets) ||
        !Array.isArray(data.importantNoticeBullets)
    ) {
        throw new Error("Invalid compliance payload shape");
    }

    return {
        ...mockCompliance(),
        ...data,
    };
}

async function loadCompliance(): Promise<{ payload: CompliancePayload; source: "mock" | "live" }> {
    const mode = getEnv("NEXT_PUBLIC_DATA_MODE", "mock");
    const baseUrl = getEnv("NEXT_PUBLIC_API_BASE_URL", "");

    if (mode === "mock") return { payload: mockCompliance(), source: "mock" };
    if (!baseUrl) return { payload: mockCompliance(), source: "mock" };

    if (mode === "live") {
        const payload = await fetchComplianceLive(baseUrl);
        return { payload, source: "live" };
    }

    try {
        const payload = await fetchComplianceLive(baseUrl);
        return { payload, source: "live" };
    } catch {
        return { payload: mockCompliance(), source: "mock" };
    }
}

export default async function CompliancePage() {
    const { payload, source } = await loadCompliance();

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
                            <p
                                className="text-xs"
                                style={{ color: "#4a5565" }}
                            >
                                Regulatory-Compliant AI Platform
                            </p>
                        </div>
                    </Link>

                    {/* Back to Home button */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100"
                    >
                        <img
                            src={imgIconArrow}
                            alt=""
                            className="h-4 w-4"
                        />
                        <span
                            className="text-sm"
                            style={{ color: "#364153" }}
                        >
                            Back to Home
                        </span>
                    </Link>
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

                    {/* Compliance Statement Badge */}
                    <div
                        className="mx-auto mt-6 inline-flex items-center justify-center rounded-lg px-5 py-2"
                        style={{ backgroundColor: "#00a63e" }}
                    >
                        <span
                            className="text-sm font-medium"
                            style={{ color: "#ffffff" }}
                        >
                            Compliance Statement
                        </span>
                    </div>

                    {/* Title */}
                    <h1
                        className="mt-6 text-5xl font-bold tracking-tight"
                        style={{ color: "#101828", lineHeight: "48px" }}
                    >
                        Compliance &amp; Regulatory Alignment
                    </h1>

                    {/* Description */}
                    <p
                        className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed"
                        style={{ color: "#4a5565" }}
                    >
                        {payload.heroBody}
                    </p>

                    {/* Data source badge (for development) */}
                    {source === "mock" && (
                        <div className="mt-4">
                            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
                                Data: MOCK
                            </span>
                        </div>
                    )}
                </div>
            </section>

            {/* Content Section */}
            <section className="bg-white px-6 py-20">
                <div className="mx-auto max-w-4xl space-y-16">
                    {/* Key Principles */}
                    <div>
                        <h2
                            className="text-center text-3xl font-bold"
                            style={{ color: "#101828", lineHeight: "36px" }}
                        >
                            {payload.keyPrinciplesTitle}
                        </h2>

                        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                            {payload.keyPrinciples.map((principle, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 rounded-xl border bg-white p-6"
                                    style={{ borderColor: "rgba(0,0,0,0.1)" }}
                                >
                                    <img
                                        src={imgIconCheck}
                                        alt=""
                                        className="h-8 w-8 flex-shrink-0"
                                    />
                                    <span
                                        className="text-lg font-bold"
                                        style={{ color: "#101828" }}
                                    >
                                        {principle}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Regulatory Alignment */}
                    <div>
                        <h2
                            className="text-center text-3xl font-bold"
                            style={{ color: "#101828", lineHeight: "36px" }}
                        >
                            {payload.regulatoryAlignmentTitle}
                        </h2>

                        <div
                            className="mt-8 rounded-xl border bg-white p-8"
                            style={{ borderColor: "rgba(0,0,0,0.1)" }}
                        >
                            <p
                                className="text-lg"
                                style={{ color: "#364153", lineHeight: "28px" }}
                            >
                                {payload.regulatoryAlignmentIntro}
                            </p>

                            <ul className="mt-10 space-y-4">
                                {payload.regulatoryAlignmentBullets.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-4">
                                        <img
                                            src={imgIconCheckCircle}
                                            alt=""
                                            className="h-6 w-6 flex-shrink-0"
                                        />
                                        <span
                                            className="text-lg"
                                            style={{ color: "#364153", lineHeight: "28px" }}
                                        >
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Important Notice */}
                    <div>
                        <h2
                            className="text-center text-3xl font-bold"
                            style={{ color: "#101828", lineHeight: "36px" }}
                        >
                            {payload.importantNoticeTitle}
                        </h2>

                        <div
                            className="mt-8 rounded-xl border p-8"
                            style={{
                                backgroundColor: "#fffbeb",
                                borderColor: "#fee685",
                            }}
                        >
                            <div className="flex items-start gap-4">
                                <img
                                    src={imgIconWarning}
                                    alt=""
                                    className="h-8 w-8 flex-shrink-0"
                                />
                                <p
                                    className="text-xl font-bold"
                                    style={{ color: "#101828", lineHeight: "28px" }}
                                >
                                    {payload.importantNoticeIntro}
                                </p>
                            </div>

                            <ul className="ml-12 mt-8 space-y-3">
                                {payload.importantNoticeBullets.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-4">
                                        <img
                                            src={imgIconXCircle}
                                            alt=""
                                            className="h-6 w-6 flex-shrink-0"
                                        />
                                        <span
                                            className="text-lg"
                                            style={{ color: "#364153", lineHeight: "28px" }}
                                        >
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* CTA Banner */}
                    <div
                        className="rounded-xl p-10 text-center"
                        style={{
                            background: "linear-gradient(163deg, #155dfc 0%, #9810fa 100%)",
                            border: "1px solid rgba(0,0,0,0.1)",
                        }}
                    >
                        <img
                            src={imgIconShieldWhite}
                            alt=""
                            className="mx-auto h-16 w-16"
                        />

                        <p
                            className="mt-12 text-2xl font-bold"
                            style={{ color: "#ffffff", lineHeight: "32px" }}
                        >
                            {payload.importantNoticeClosingLine1}
                        </p>
                        <p
                            className="mt-4 text-2xl font-bold"
                            style={{ color: "#ffffff", lineHeight: "32px" }}
                        >
                            {payload.importantNoticeClosingLine2}
                        </p>
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
