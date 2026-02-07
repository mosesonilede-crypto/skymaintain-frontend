"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

type PlatformFeature = {
    title: string;
    description: string;
    bullets?: string[];
};

const fallbackFeatures: PlatformFeature[] = [
    {
        title: "Predictive Maintenance Intelligence",
        description:
            "SkyMaintain analyzes maintenance data to identify recurring issues, emerging risks, and performance trends across aircraft systems.",
        bullets: [
            "AI-assisted pattern recognition",
            "Early identification of high-risk components",
            "Trend analysis across maintenance events",
            "Decision-support insights",
        ],
    },
    {
        title: "Maintenance Data Integration",
        description:
            "Designed to work with structured maintenance records and operational data for consistent analysis across systems.",
        bullets: [
            "Supports inspection records, defect reports, and maintenance logs",
            "Modular architecture for system-specific analysis",
            "Built to evolve with operator data maturity",
        ],
    },
    {
        title: "Regulatory-Aligned Architecture",
        description:
            "Built with regulatory awareness to support traceability, documentation, and audit readiness.",
        bullets: [
            "Architecture informed by FAA and EASA maintenance principles",
            "Supports compliance documentation workflows",
            "Designed to complement approved maintenance programs",
        ],
    },
    {
        title: "Technician & Engineer Support",
        description:
            "Clear, intuitive dashboards reduce cognitive load and improve troubleshooting workflows.",
        bullets: [
            "Human-centered design for maintenance professionals",
            "Visual insights to support planning",
            "Encourages consistent decision-making",
        ],
    },
    {
        title: "Secure, Scalable SaaS Platform",
        description:
            "Enterprise-ready foundation designed for growth, security, and role-based access.",
        bullets: [
            "Role-based access control",
            "Secure cloud-native architecture",
            "Audit-friendly system design",
            "Scalable for operators and MROs",
        ],
    },
];

export default function PlatformFeaturesPage() {
    const [features, setFeatures] = useState<PlatformFeature[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        async function loadFeatures() {
            try {
                const response = await fetch("/api/features");
                if (response.ok) {
                    const data = await response.json();
                    if (isActive && Array.isArray(data)) {
                        setFeatures(data as PlatformFeature[]);
                        return;
                    }
                }
            } catch (error) {
                console.error("Failed to load platform features:", error);
            }

            if (isActive) {
                setFeatures(fallbackFeatures);
            }
        }

        loadFeatures().finally(() => {
            if (isActive) setLoading(false);
        });

        return () => {
            isActive = false;
        };
    }, []);

    return (
        <div className="w-full">
            <section className="px-6 py-16 text-center md:py-24">
                <h1 className="mx-auto mt-8 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                    Platform Features
                </h1>
                <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-700">
                    Explore the capabilities that power intelligent aircraft maintenance
                </p>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-12">
                {loading ? (
                    <div className="text-center">Loading features...</div>
                ) : features.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="rounded-lg border border-slate-200 bg-white p-6 text-left"
                            >
                                <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                                <p className="mt-3 text-sm text-slate-600">{feature.description}</p>
                                {feature.bullets && feature.bullets.length > 0 ? (
                                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                                        {feature.bullets.map((bullet) => (
                                            <li key={bullet}>{bullet}</li>
                                        ))}
                                    </ul>
                                ) : null}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
                        <p className="text-slate-600">Features data will load from live API</p>
                    </div>
                )}
            </section>

            <section className="mx-auto max-w-6xl px-6 py-12">
                <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
                    <h3 className="text-2xl font-bold text-slate-900">Ready to get started?</h3>
                    <p className="mt-4 text-slate-600">Request a demo or start your free trial today</p>
                    <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link href="/contact?intent=demo" className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
                            Request Demo
                        </Link>
                        <Link href="/get-started" className="rounded-lg border border-slate-300 px-6 py-3 hover:bg-slate-50">
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
