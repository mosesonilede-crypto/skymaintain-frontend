"use client";

import * as React from "react";
import Link from "next/link";

type PlatformHighlight = {
    title: string;
    description: string;
    bullets?: string[];
};

const fallbackHighlights: PlatformHighlight[] = [
    {
        title: "Unified Maintenance Intelligence",
        description:
            "Consolidate inspections, defect reports, and maintenance logs into a single operational view.",
        bullets: ["Centralized documentation", "Cross-fleet visibility", "Data-driven insights"],
    },
    {
        title: "Regulatory-Ready Workflows",
        description:
            "Maintain audit-ready records aligned to FAA and EASA expectations.",
        bullets: ["Traceable maintenance actions", "Compliance documentation", "Audit preparation"],
    },
    {
        title: "Operational Reliability",
        description:
            "Improve dispatch reliability with proactive insights and maintenance planning.",
        bullets: ["Early risk identification", "Maintenance trend analysis", "Decision support"],
    },
];

export default function PlatformPage() {
    const [data, setData] = React.useState<PlatformHighlight[] | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        let isActive = true;

        async function loadPlatformData() {
            try {
                const response = await fetch("/api/platform");
                if (response.ok) {
                    const payload = await response.json();
                    if (isActive && Array.isArray(payload)) {
                        setData(payload as PlatformHighlight[]);
                        return;
                    }
                }
            } catch (error) {
                console.error("Failed to load platform data:", error);
            }

            if (isActive) {
                setData(fallbackHighlights);
            }
        }

        loadPlatformData().finally(() => {
            if (isActive) setLoading(false);
        });

        return () => {
            isActive = false;
        };
    }, []);

    if (loading) {
        return <div className="p-8 text-center">Loading platform data...</div>;
    }

    return (
        <div className="w-full">
            <section className="px-6 py-16 text-center md:py-24">
                <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                    SkyMaintain Platform
                </h1>
                <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-700">
                    Enterprise aircraft maintenance intelligence platform
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link href="/contact?intent=demo" className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white hover:bg-blue-700">
                        Request Demo
                    </Link>
                    <Link href="/platform-features" className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-8 py-3 text-base font-semibold text-slate-900 hover:bg-slate-50">
                        View Features
                    </Link>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-12">
                {data ? (
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
                        <p className="text-slate-600">Platform data will load from live API</p>
                    </div>
                )}
            </section>
        </div>
    );
}
