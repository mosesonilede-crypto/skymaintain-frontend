/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { CONTACT_DEMO } from "@/lib/routes";

/* ----------------------------- Figma Assets ----------------------------- */
const imgLogo = "https://www.figma.com/api/mcp/asset/c03d14cf-e548-404a-a66c-76e7da02cc37";
const imgIcon = "https://www.figma.com/api/mcp/asset/5bebae97-b2cb-42af-b805-9200a6114e2a";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/ce853884-0332-4dec-b6a9-c256069522fc";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/b17d54b6-feaa-48f9-a582-fc5d0d83f601";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/274871da-8cfb-421d-ab4d-369f051a79d2";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/af557c0a-905c-4fdb-90fb-4ab5eec203de";
const imgIcon5 = "https://www.figma.com/api/mcp/asset/1dc802b9-0807-436e-8ec3-92e732a74576";
const imgIcon6 = "https://www.figma.com/api/mcp/asset/568b1a30-2e12-4285-9016-ab2d4a911a0b";
const imgIcon7 = "https://www.figma.com/api/mcp/asset/98216e3d-c8b3-4e28-a0b2-48169b8845ca";
const imgIcon8 = "https://www.figma.com/api/mcp/asset/3b9eaee9-45e3-4367-a4af-8ac6645da777";
const imgIcon9 = "https://www.figma.com/api/mcp/asset/c4e55bfd-8f33-42c3-b19a-658130d98ace";
const imgIcon10 = "https://www.figma.com/api/mcp/asset/14c8504e-059d-4830-b413-f30e9054bc67";
const imgIcon11 = "https://www.figma.com/api/mcp/asset/bb25ccb9-339a-4e7c-86e4-8462476dea7a";
const imgIcon12 = "https://www.figma.com/api/mcp/asset/199bdf39-48b0-4208-889b-d58dfa671152";
const imgIcon13 = "https://www.figma.com/api/mcp/asset/47124b69-ed38-4106-b371-9ac0473d00a6";
const imgIcon14 = "https://www.figma.com/api/mcp/asset/20fc0130-4d16-454d-816d-3f8f3feac67e";
const imgIcon15 = "https://www.figma.com/api/mcp/asset/aa32af40-f910-4375-a125-3a28b9767121";
const imgIcon16 = "https://www.figma.com/api/mcp/asset/c68b3265-3ce1-4d15-b323-14df75d65c5c";
const imgIcon17 = "https://www.figma.com/api/mcp/asset/43f49dfc-3b53-4753-a0d5-abc569f0d60e";
const imgIcon18 = "https://www.figma.com/api/mcp/asset/7469f7b4-0e19-43f4-97ee-3c1f032c5608";
const imgIcon19 = "https://www.figma.com/api/mcp/asset/c8325285-1618-4c3e-8ffe-bfb6d58d8f0b";

export const metadata = {
    title: "SkyMaintain | Enterprise Aircraft Maintenance Intelligence",
    description:
        "Regulatory-grade, deterministic, and auditable AI decision support for aircraft maintenance operations.",
};

const operationalCards = [
    {
        title: "Deterministic Maintenance Reasoning",
        body:
            "SkyMaintain provides AI-assisted reasoning grounded exclusively in approved technical documentation, maintenance data, and policy constraints. Outputs are deterministic, explainable, and suitable for regulated decision-support use.",
        icon: imgIcon2,
        tint: "bg-[#eff6ff]",
    },
    {
        title: "Policy-Aligned Decision Support",
        body:
            "All recommendations are generated within clearly defined policy boundaries, ensuring alignment with organizational procedures, regulatory requirements, and approved maintenance practices. No autonomous actions. No opaque logic. Human authority remains absolute.",
        icon: imgIcon3,
        tint: "bg-[#f0fdf4]",
    },
    {
        title: "Source-Anchored Traceability",
        body:
            "Every response is linked to its originating technical sources, enabling engineers, inspectors, and auditors to review, validate, and defend decisions with confidence. This supports internal audits, regulatory reviews, and quality assurance processes.",
        icon: imgIcon4,
        tint: "bg-[#faf5ff]",
    },
    {
        title: "Predictive Maintenance Alerts (Advisory Only)",
        body:
            "SkyMaintain surfaces predictive insights based on historical and operational data trends to support maintenance planning and risk awareness. Alerts are advisory, not prescriptive—designed to inform engineers, not replace judgment.",
        icon: imgIcon5,
        tint: "bg-[#fffbeb]",
    },
];

const whyCards = [
    {
        title: "Built for Regulated Aviation",
        body: "Specifically engineered for regulated aviation maintenance environments",
        icon: imgIcon6,
        tint: "bg-[#dbeafe]",
    },
    {
        title: "Deterministic Outputs",
        body: "Outputs suitable for audit and regulatory review",
        icon: imgIcon7,
        tint: "bg-[#dcfce7]",
    },
    {
        title: "No Black-Box ML",
        body: "No black-box machine learning in safety-critical decision paths",
        icon: imgIcon8,
        tint: "bg-[#f3e8ff]",
    },
    {
        title: "Human-in-the-Loop",
        body: "Human-in-the-loop design by default",
        icon: imgIcon9,
        tint: "bg-[#fef3c6]",
    },
    {
        title: "Clear Separation",
        body: "Advisory intelligence separated from maintenance authority",
        icon: imgIcon10,
        tint: "bg-[#e0e7ff]",
    },
    {
        title: "Safety First",
        body: "Safety and accountability over automation speed",
        icon: imgIcon11,
        tint: "bg-[#ffe2e2]",
    },
];

const regulatedCards = [
    {
        title: "Regulatory Alignment",
        body: "Designed with FAA and EASA maintenance philosophies in mind, supporting Part 145, airline, and CAMO operational structures.",
        icon: imgIcon12,
        tint: "bg-[#eff6ff]",
    },
    {
        title: "Audit-Ready Architecture",
        body: "Every interaction is logged, traceable, and reviewable to support quality systems, audits, and compliance oversight.",
        icon: imgIcon13,
        tint: "bg-[#f0fdf4]",
    },
    {
        title: "Security & Tenant Isolation",
        body: "Enterprise-grade access control, organization-level isolation, and role-based permissions protect operational integrity.",
        icon: imgIcon14,
        tint: "bg-[#faf5ff]",
    },
    {
        title: "Operational Transparency",
        body: "No hidden decision logic. No uncontrolled automation. SkyMaintain operates as a controlled, inspectable system.",
        icon: imgIcon15,
        tint: "bg-[#fffbeb]",
    },
];

const supportCards = [
    {
        title: "Maintenance Engineering",
        body: "Assist engineers in interpreting manuals, troubleshooting recurring defects, and validating maintenance pathways using traceable references.",
        icon: imgIcon16,
        tint: "bg-[#eff6ff]",
    },
    {
        title: "Maintenance Control & Planning",
        body: "Support informed planning decisions with advisory insights derived from operational patterns and historical data.",
        icon: imgIcon17,
        tint: "bg-[#f0fdf4]",
    },
    {
        title: "Quality Assurance & Compliance",
        body: "Enable transparent review of AI-assisted decisions with full traceability for internal and external audits.",
        icon: imgIcon18,
        tint: "bg-[#faf5ff]",
    },
    {
        title: "Technical Leadership",
        body: "Provide leadership with confidence that digital intelligence supports—not undermines—regulatory accountability.",
        icon: imgIcon19,
        tint: "bg-[#fffbeb]",
    },
];

export default function PublicHomePage() {
    return (
        <div className="bg-white text-[#0f172b]">
            <header
                className="sticky top-0 z-30 border-b border-[#e2e8f0] bg-white/95 backdrop-blur"
                data-node-id="122:302"
            >
                <div className="mx-auto flex w-full max-w-[1148px] items-center justify-between px-8 py-4">
                    <Link href="/" className="flex items-center gap-2">
                        <img src={imgLogo} alt="" className="h-8 w-12 object-cover" />
                        <span className="text-lg font-bold text-[#0f172b]">SkyMaintain</span>
                    </Link>
                    <nav className="hidden items-center gap-6 md:flex">
                        <Link href="/platform-features" className="text-base text-[#45556c] hover:text-[#0f172b]">
                            Platform
                        </Link>
                        <Link href="/compliance" className="text-base text-[#45556c] hover:text-[#0f172b]">
                            Compliance
                        </Link>
                        <Link href="/security" className="text-base text-[#45556c] hover:text-[#0f172b]">
                            Security
                        </Link>
                        <Link href="/contact" className="text-base text-[#45556c] hover:text-[#0f172b]">
                            Contact
                        </Link>
                        <Link href="/signin" className="text-sm text-[#45556c] hover:text-[#0f172b]">
                            Sign In
                        </Link>
                        <Link
                            href={CONTACT_DEMO}
                            className="rounded-lg bg-[#030213] px-4 py-2 text-sm text-white"
                        >
                            Request Demo
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="bg-gradient-to-b from-[#f8fafc] to-white">
                <section className="mx-auto max-w-[1084px] px-8 pb-24 pt-16 text-center" data-node-id="122:26">
                    <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[#eff6ff] px-4 py-1 text-sm text-[#1447e6]">
                        <img src={imgIcon} alt="" className="h-4 w-4" />
                        <span>Enterprise Aircraft Maintenance Intelligence</span>
                    </div>

                    <h1 className="mt-8 text-5xl font-bold leading-[1.2] text-[#0f172b] md:text-6xl">
                        Regulatory-Grade AI for
                        <br />
                        Aircraft Maintenance Operations
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-xl text-[#45556c]">
                        Deterministic, auditable, and policy-aligned decision support for airlines, MROs, and regulated
                        maintenance environments.
                    </p>
                    <p className="mx-auto mt-4 max-w-3xl text-sm text-[#62748e]">
                        Designed to support compliance-driven maintenance workflows without compromising human authority,
                        safety, or regulatory accountability.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href={CONTACT_DEMO}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#030213] px-8 py-5 text-lg text-white"
                        >
                            Request Enterprise Demo
                            <img src={imgIcon1} alt="" className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/platform-features"
                            className="inline-flex items-center rounded-lg border border-black/10 bg-white px-8 py-5 text-lg text-[#0a0a0a]"
                        >
                            View Platform Capabilities
                        </Link>
                    </div>
                </section>

                <section className="mx-auto max-w-[1024px] bg-[#0f172b] px-8 py-10 text-center text-white" data-node-id="122:46">
                    <h2 className="text-3xl font-bold">Built for Aviation. Designed for Accountability.</h2>
                    <p className="mx-auto mt-4 max-w-4xl text-lg text-[#cad5e2]">
                        SkyMaintain is not a general-purpose AI tool. It is an enterprise maintenance intelligence platform engineered
                        for environments governed by FAA, EASA, and organizational maintenance control requirements.
                    </p>
                    <p className="mx-auto mt-3 max-w-4xl text-lg text-white">
                        Every output is traceable. Every decision is explainable. Every workflow respects regulatory boundaries.
                    </p>
                </section>

                <section className="mx-auto max-w-[1084px] px-8 py-24" data-node-id="122:54">
                    <h2 className="text-center text-4xl font-bold text-[#0f172b]">
                        Operational Intelligence for Aircraft Maintenance
                    </h2>
                    <div className="mt-16 grid gap-8 md:grid-cols-2">
                        {operationalCards.map((item) => (
                            <div key={item.title} className="rounded-2xl border border-black/10 bg-white p-8">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.tint}`}>
                                    <img src={item.icon} alt="" className="h-6 w-6" />
                                </div>
                                <h3 className="mt-10 text-xl font-bold text-[#0f172b]">{item.title}</h3>
                                <p className="mt-6 text-base leading-relaxed text-[#45556c]">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-[#f8fafc]" data-node-id="122:104">
                    <div className="mx-auto max-w-[1084px] px-8 py-20 text-center">
                        <h2 className="text-4xl font-bold text-[#0f172b]">Why SkyMaintain Is Different</h2>
                        <p className="mx-auto mt-4 max-w-3xl text-xl text-[#45556c]">
                            Most AI platforms prioritize speed and automation. SkyMaintain prioritizes safety, traceability, and
                            regulatory confidence.
                        </p>
                        <div className="mt-12 grid gap-8 md:grid-cols-3">
                            {whyCards.map((item) => (
                                <div key={item.title} className="flex flex-col items-center gap-4 px-4 py-6">
                                    <div className={`flex h-16 w-16 items-center justify-center rounded-full ${item.tint}`}>
                                        <img src={item.icon} alt="" className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[#0f172b]">{item.title}</h3>
                                    <p className="text-sm text-[#45556c]">{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-[1084px] px-8 py-24" data-node-id="122:167">
                    <h2 className="text-center text-4xl font-bold text-[#0f172b]">
                        Designed for Regulated Maintenance Environments
                    </h2>
                    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {regulatedCards.map((item) => (
                            <div key={item.title} className="rounded-2xl border border-black/10 bg-white p-6 text-center">
                                <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${item.tint}`}>
                                    <img src={item.icon} alt="" className="h-7 w-7" />
                                </div>
                                <h3 className="mt-6 text-lg font-bold text-[#0f172b]">{item.title}</h3>
                                <p className="mt-4 text-sm text-[#45556c]">{item.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-[#f8fafc]" data-node-id="122:207">
                    <div className="mx-auto max-w-[1084px] px-8 py-20">
                        <h2 className="text-center text-4xl font-bold text-[#0f172b]">
                            Supporting Maintenance Across the Operation
                        </h2>
                        <div className="mt-12 grid gap-8 md:grid-cols-2">
                            {supportCards.map((item) => (
                                <div key={item.title} className="rounded-2xl border border-black/10 bg-white p-8">
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.tint}`}>
                                        <img src={item.icon} alt="" className="h-6 w-6" />
                                    </div>
                                    <h3 className="mt-6 text-lg font-bold text-[#0f172b]">{item.title}</h3>
                                    <p className="mt-4 text-base text-[#45556c]">{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    className="px-8 py-20"
                    style={{ backgroundImage: "linear-gradient(162deg, rgb(28, 57, 142) 0%, rgb(15, 23, 43) 100%)" }}
                    data-node-id="122:260"
                >
                    <div className="mx-auto max-w-[896px] text-center text-white">
                        <h2 className="text-4xl font-bold">AI That Respects Aviation Realities</h2>
                        <p className="mt-6 text-xl text-[#dbeafe]">
                            SkyMaintain is engineered with the understanding that aircraft maintenance is not a domain for experimentation.
                        </p>
                        <p className="mt-4 text-xl text-[#dbeafe]">
                            It is a controlled, high-consequence environment where technology must enhance discipline, not bypass it.
                        </p>
                    </div>
                </section>

                <section className="mx-auto max-w-[896px] px-8 py-20 text-center" data-node-id="122:268">
                    <h2 className="text-4xl font-bold text-[#0f172b]">
                        Evaluate SkyMaintain for Your Maintenance Operation
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-xl text-[#45556c]">
                        See how a deterministic, audit-ready AI platform can support compliance-driven aircraft maintenance without compromising safety, authority, or regulatory trust.
                    </p>
                    <Link
                        href={CONTACT_DEMO}
                        className="mt-10 inline-flex items-center gap-2 rounded-lg bg-[#030213] px-8 py-5 text-lg text-white"
                    >
                        Schedule a Technical Walkthrough
                        <img src={imgIcon1} alt="" className="h-4 w-4" />
                    </Link>
                </section>
            </main>

            <footer className="bg-[#0f172b]" data-node-id="122:278">
                <div className="mx-auto flex max-w-[1084px] flex-col items-center gap-4 px-8 py-10 text-center">
                    <div className="flex items-center gap-2">
                        <img src={imgLogo} alt="" className="h-8 w-12 object-cover" />
                        <span className="text-2xl font-bold text-white">SkyMaintain</span>
                    </div>
                    <p className="text-base text-[#90a1b9]">Enterprise AI for regulated aircraft maintenance operations.</p>
                    <p className="text-sm text-[#62748e]">Built for compliance. Designed for accountability.</p>
                </div>
                <div className="border-t border-[#1d293d]">
                    <div className="mx-auto flex max-w-[1084px] flex-wrap items-center justify-center gap-6 px-8 py-8 text-sm text-[#90a1b9]">
                        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                        <Link href="/compliance" className="hover:text-white">Compliance</Link>
                        <Link href="/security" className="hover:text-white">Security</Link>
                        <Link href="/contact" className="hover:text-white">Contact</Link>
                    </div>
                    <div className="pb-8 text-center text-xs text-[#62748e]">© 2026 SkyMaintain. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
}
