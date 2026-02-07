"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

type EnterpriseHighlight = {
    title: string;
    description: string;
    bullets?: string[];
};

const fallbackHighlights: EnterpriseHighlight[] = [
    {
        title: "Fleet-Scale Visibility",
        description:
            "Monitor maintenance performance across multiple fleets, stations, and teams in one view.",
        bullets: ["Cross-fleet reporting", "Station-level performance", "Executive dashboards"],
    },
    {
        title: "Operational Governance",
        description:
            "Standardize maintenance workflows with audit-ready documentation and approvals.",
        bullets: ["Role-based approvals", "Audit trails", "Policy-aligned workflows"],
    },
    {
        title: "Scalable Integrations",
        description:
            "Connect with enterprise maintenance systems while preserving data quality and traceability.",
        bullets: ["Structured data pipelines", "System interoperability", "Enterprise-grade security"],
    },
];

export default function EnterprisePage() {
    const [data, setData] = useState<EnterpriseHighlight[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        async function loadEnterpriseData() {
            try {
                const response = await fetch("/api/enterprise");
                if (response.ok) {
                    const payload = await response.json();
                    if (isActive && Array.isArray(payload)) {
                        setData(payload as EnterpriseHighlight[]);
                        return;
                    }
                }
            } catch (error) {
                console.error("Failed to load enterprise data:", error);
            }

            if (isActive) {
                setData(fallbackHighlights);
            }
        }

        loadEnterpriseData().finally(() => {
            if (isActive) setLoading(false);
        });

        return () => {
            isActive = false;
        };
    }, []);

    return (
        <div className="w-full">
            <section className="px-6 py-16 text-center md:py-24">
                <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-bold text-slate-900">Enterprise Solutions</h1>
                <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-700">
                    Scalable platform built for large-scale aircraft maintenance operations
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link href="/contact?intent=demo" className="rounded-lg bg-blue-600 px-8 py-3 text-white hover:bg-blue-700">
                        Request Demo
                    </Link>
                    <Link href="/contact" className="rounded-lg border border-slate-300 px-8 py-3 hover:bg-slate-50">
                        Contact Sales
                    </Link>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-12">
                {loading ? (
                    <div className="text-center">Loading enterprise data...</div>
                ) : data ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {data.map((item) => (
                            <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-6 text-left">
                                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                                <p className="mt-3 text-sm text-slate-600">{item.description}</p>
                                {item.bullets && item.bullets.length > 0 ? (
                                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                                        {item.bullets.map((bullet) => (
                                            <li key={bullet}>{bullet}</li>
                                        ))}
                                    </ul>
                                ) : null}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
                        <p className="text-slate-600">Enterprise data will load from live API</p>
                    </div>
                )}
            </section>
        </div>
    );
}
