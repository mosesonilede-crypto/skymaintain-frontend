/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { CONTACT_DEMO, CONTACT_PARTNERSHIPS, CONTACT_SUPPORT } from "@/lib/routes";

const imgImageGlobalAeroAirlinesFleet = "https://www.figma.com/api/mcp/asset/7ee18b35-eb01-4e9e-afdd-0922bc103dfe";
const imgImageAiPoweredPredictiveAnalytics = "https://www.figma.com/api/mcp/asset/0dc95faf-607a-4090-9816-c3b1b5be7892";
const imgImageRegulatoryComplianceAutomation = "https://www.figma.com/api/mcp/asset/af351394-9d53-42c7-acd9-5ab8fcc648fd";
const imgImageRealTimeIoTMonitoring = "https://www.figma.com/api/mcp/asset/950fe1d6-1d79-454f-90cc-c7a26808a25d";
const imgImageSmartMaintenanceWorkflows = "https://www.figma.com/api/mcp/asset/9d1c0a51-35a4-4543-bb5e-44109c93f7dd";
const imgImageAviationPartsAndComponents = "https://www.figma.com/api/mcp/asset/3679b348-8f57-45aa-81a9-785f65425b8c";

const imgIcon = "https://www.figma.com/api/mcp/asset/f00d0374-f2dc-402b-b5f2-2f34e54cae03";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/10cddaad-7761-4827-bc9c-e3c063ceb477";
const imgIcon2 = "https://www.figma.com/api/mcp/asset/30805ce7-bdde-49ec-84fb-7f06d7553076";
const imgIcon3 = "https://www.figma.com/api/mcp/asset/ad090d4b-007c-4147-b8ed-462152c5736b";
const imgIcon4 = "https://www.figma.com/api/mcp/asset/27c5b5ac-72ad-4b67-85f2-19614a6496b6";
const imgIcon5 = "https://www.figma.com/api/mcp/asset/8a83b814-3e18-4c1d-9bc8-32d5efe05412";
const imgIcon6 = "https://www.figma.com/api/mcp/asset/7234df16-b4d3-45aa-91f4-7bedb9b8ba29";
const imgIcon7 = "https://www.figma.com/api/mcp/asset/301ab00c-dd72-48ba-aff2-e08eb965a7f1";
const imgIcon8 = "https://www.figma.com/api/mcp/asset/fde0f63f-ae60-4799-a80b-dfdea4b46bf3";
const imgIcon9 = "https://www.figma.com/api/mcp/asset/402bded0-ef82-4411-8376-09e99011460c";
const imgIcon10 = "https://www.figma.com/api/mcp/asset/afe63649-b056-44b6-8f80-99e36ed74695";
const imgIcon11 = "https://www.figma.com/api/mcp/asset/f4998b27-9025-4352-b0ff-733012a2d1d0";
const imgIcon12 = "https://www.figma.com/api/mcp/asset/2f64f239-4016-49af-8d0a-8ee94f3d85ef";
const imgIcon13 = "https://www.figma.com/api/mcp/asset/c2ed563b-ce46-48cf-a98a-089faabc0eaa";
const imgIcon14 = "https://www.figma.com/api/mcp/asset/46fe6535-10ba-49ce-8b33-5065e54145bf";
const imgIcon15 = "https://www.figma.com/api/mcp/asset/3aceb051-8a6b-4854-a62e-daa417932c80";
const imgIcon16 = "https://www.figma.com/api/mcp/asset/8d44e70d-d24a-4038-bfdf-1694ea02fad1";
const imgIcon18 = "https://www.figma.com/api/mcp/asset/2f37c902-7fb6-4ff5-ae37-5ffc811d749c";
const imgIcon19 = "https://www.figma.com/api/mcp/asset/a629cbb1-c547-430f-a285-b52a18049a51";
const imgIcon20 = "https://www.figma.com/api/mcp/asset/47a55164-2543-4913-8f30-60e2e9671bd1";
const imgIcon21 = "https://www.figma.com/api/mcp/asset/eb504707-b8c7-45e7-b6b7-e3c280090796";
const imgIcon22 = "https://www.figma.com/api/mcp/asset/64f6f42c-feb2-41c7-a400-0adce94e435a";
const imgIcon23 = "https://www.figma.com/api/mcp/asset/96904418-edf8-41b0-85c5-4a7551b5902e";
const imgVector12 = "https://www.figma.com/api/mcp/asset/ec61e660-0291-4cb6-9cb7-792c4e108ecb";
const imgVector16 = "https://www.figma.com/api/mcp/asset/2390cc2c-dad2-461e-8147-60b7b0f1988b";
const imgSkyMaintainLogo = "https://www.figma.com/api/mcp/asset/c03d14cf-e548-404a-a66c-76e7da02cc37";

export const metadata = {
    title: "SkyMaintain | Get Started",
    description: "AI-powered predictive aircraft maintenance built for safety, compliance, and scale.",
};

const stats = [
    { value: "35%", label: "Reduction in Downtime", icon: imgIcon },
    { value: "99.8%", label: "Compliance Rate", icon: imgIcon1 },
    { value: "60%", label: "Faster Task Completion", icon: imgIcon2 },
    { value: "$250K", label: "Annual Cost Savings", icon: imgIcon3 },
];

const featureRows = [
    {
        title: "AI-Powered Predictive Analytics",
        body: "Advanced machine learning algorithms predict maintenance needs before failures occur, reducing unplanned downtime by up to 35%.",
        image: imgImageAiPoweredPredictiveAnalytics,
        icon: imgVector12,
        arrow: imgIcon7,
        align: "left",
    },
    {
        title: "Regulatory Compliance Automation",
        body: "Automated tracking of FAA/EASA airworthiness directives with real-time alerts and compliance deadline management.",
        image: imgImageRegulatoryComplianceAutomation,
        icon: imgIcon8,
        arrow: imgIcon8,
        align: "right",
    },
    {
        title: "Real-Time IoT Monitoring",
        body: "Continuous aircraft health monitoring through integrated sensor data providing instant visibility into all critical systems.",
        image: imgImageRealTimeIoTMonitoring,
        icon: imgIcon9,
        arrow: imgIcon7,
        align: "left",
    },
    {
        title: "Smart Maintenance Workflows",
        body: "Interactive digital checklists with photo documentation requirements and team collaboration features for efficient task management.",
        image: imgImageSmartMaintenanceWorkflows,
        icon: imgIcon10,
        arrow: imgIcon8,
        align: "right",
    },
];

const testimonials = [
    {
        quote: "SkyMaintain's AI predictions helped us avoid two major engine failures, saving over $400,000 in emergency repairs.",
        name: "Michael Rodriguez",
        title: "Director of Maintenance",
        company: "Global Airways",
        quoteIcon: imgIcon9,
        star: imgIcon10,
    },
    {
        quote: "The regulatory compliance tracking is exceptional. We've achieved 100% AD compliance since implementation.",
        name: "Sarah Chen",
        title: "Fleet Manager",
        company: "Pacific Aviation",
        quoteIcon: imgIcon11,
        star: imgIcon12,
    },
];

const faqExpanded = [
    {
        q: "Does SkyMaintain replace approved maintenance manuals?",
        a: [
            "No.",
            "SkyMaintain does not replace AMM, MEL, SRM, IPC, or any approved maintenance documentation.",
            "SkyMaintain works with the manuals you are authorized to use and assists by organizing, cross-referencing, and interpreting them. The manuals remain the sole technical authority.",
        ],
    },
    {
        q: "Does SkyMaintain need FAA or EASA approval?",
        a: [
            "No.",
            "SkyMaintain is a maintenance decision-support tool, not a maintenance approval or certification system.",
            "It does not issue approvals, certify work, modify aircraft configuration, or replace regulatory authority. Therefore, FAA or EASA approval is not required.",
        ],
    },
    {
        q: "Can SkyMaintain give answers without manuals?",
        a: [
            "No.",
            "SkyMaintain enforces a strict \"No Docs, No Answer\" rule.",
            "If no applicable, authorized manual is available, the AI Mechanic will refuse to answer and will instead tell the user which documents are required to proceed.",
        ],
    },
];

const faqCollapsed = [
    {
        q: "Where do the manuals come from?",
        a: [
            "Manuals are provided by the customer or sourced from authorized, licensed distributors.",
            "SkyMaintain only uses the documents you are approved to use for your operation.",
        ],
    },
    {
        q: "Does SkyMaintain store or modify original manuals?",
        a: [
            "Original manuals remain unchanged.",
            "SkyMaintain references and indexes the content but does not alter source documents.",
        ],
    },
    {
        q: "How does SkyMaintain ensure accuracy?",
        a: [
            "Responses are grounded in the referenced manuals and citations shown in context.",
            "If required documentation is missing or unclear, SkyMaintain refuses to answer.",
        ],
    },
    {
        q: "Who is responsible for the maintenance decision?",
        a: [
            "Qualified, authorized personnel remain responsible for all maintenance decisions.",
            "SkyMaintain is an advisory tool and does not assume regulatory or operational authority.",
        ],
    },
    {
        q: "Can SkyMaintain be used in regulated airline or MRO environments?",
        a: [
            "Yes.",
            "The platform is designed to support regulated workflows with clear auditability and human sign-off.",
        ],
    },
    {
        q: "Is SkyMaintain an AI chatbot?",
        a: [
            "No.",
            "It is a compliance-focused maintenance decision-support system with strict document controls.",
        ],
    },
    {
        q: "What happens if the wrong document or revision is uploaded?",
        a: [
            "SkyMaintain flags conflicts and requires the correct revision before proceeding.",
            "Incorrect or outdated documents are not used for guidance.",
        ],
    },
];

const faqItems = [...faqExpanded, ...faqCollapsed];

export default function GetStartedPage() {
    return (
        <div className="bg-white text-slate-900">
            <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 px-6 py-4 shadow-sm">
                <div className="mx-auto flex max-w-[1100px] items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg">
                            <img src={imgSkyMaintainLogo} alt="" className="h-7 w-10 object-cover" />
                        </div>
                        <div>
                            <div className="text-xl font-bold text-slate-900">SkyMaintain</div>
                            <div className="text-xs text-slate-600">Regulatory-Compliant AI Platform</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/signin" className="rounded-lg px-4 py-2 text-sm text-slate-700">
                            Sign In
                        </Link>
                        <Link
                            href="/get-started"
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                        >
                            Get Started
                            <img src={imgIcon23} alt="" className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                <section className="bg-gradient-to-br from-purple-700 via-purple-700 to-indigo-800 px-6 pb-24 pt-32 text-center text-white">
                    <div className="mx-auto max-w-[976px]">
                        <h1 className="text-5xl font-bold leading-tight md:text-6xl">
                            AI-Powered Predictive Aircraft Maintenance
                        </h1>
                        <p className="mt-6 text-2xl text-purple-100">Built for Safety, Compliance, and Scale</p>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href="/get-started"
                                className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-3 text-lg font-bold text-purple-700 shadow-2xl"
                            >
                                Start Your Free Trial
                                <img src={imgIcon21} alt="" className="h-5 w-5" />
                            </Link>
                            <Link
                                href={CONTACT_DEMO}
                                className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-3 text-lg font-bold text-blue-600 shadow-2xl"
                            >
                                Request Demo
                            </Link>
                        </div>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-purple-100">
                            {["14-day free trial", "No credit card required", "Full platform access"].map((label) => (
                                <span key={label} className="inline-flex items-center gap-2">
                                    <img src={imgIcon22} alt="" className="h-5 w-5" />
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-16 text-white">
                    <div className="mx-auto grid max-w-[1100px] gap-8 text-center md:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.label}>
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                                    <img src={stat.icon} alt="" className="h-6 w-6" />
                                </div>
                                <div className="mt-4 text-4xl font-bold">{stat.value}</div>
                                <div className="mt-2 text-sm text-blue-100">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-gradient-to-br from-slate-50 to-gray-100 px-6 py-16">
                    <div className="mx-auto max-w-[1100px]">
                        <div className="text-center text-xs font-semibold uppercase tracking-wide text-slate-600">
                            Featured Partner
                        </div>
                        <div className="mt-6 rounded-2xl border-4 border-indigo-200 bg-white shadow-2xl">
                            <div className="grid md:grid-cols-2">
                                <div className="relative overflow-hidden rounded-l-2xl bg-gradient-to-br from-blue-900 to-indigo-900 p-10 text-white">
                                    <div className="mb-8 flex h-12 w-16 items-center justify-center rounded-xl bg-white/20">
                                        <img src={imgIcon4} alt="" className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-3xl font-bold">GlobalAero Airlines</h3>
                                    <p className="mt-4 text-lg text-blue-100">
                                        &ldquo;Partnering with the world&rsquo;s leading carriers. Experience excellence in aviation with our
                                        premium fleet services and 24/7 maintenance support.&rdquo;
                                    </p>
                                    <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
                                        {["500+ Aircraft Fleet", "Global Coverage", "ISO Certified"].map((item) => (
                                            <span key={item} className="inline-flex items-center gap-2">
                                                <img src={imgIcon5} alt="" className="h-5 w-5" />
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                    <Link
                                        href={CONTACT_DEMO}
                                        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-blue-700"
                                    >
                                        Learn More
                                        <img src={imgIcon6} alt="" className="h-4 w-4" />
                                    </Link>
                                </div>
                                <div className="relative">
                                    <img src={imgImageGlobalAeroAirlinesFleet} alt="GlobalAero Airlines Fleet" className="h-full w-full object-cover" />
                                    <div className="absolute left-4 top-4 rounded-lg bg-slate-600 px-3 py-1 text-xs text-white">
                                        Sponsored
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 rounded-xl bg-slate-100 px-4 py-3 text-xs text-slate-600">
                            <span className="font-semibold">DEV INFO:</span> Ad ID: ad-001-globalaero | Contract: 2026-01-01 to
                            2026-12-31 | Annual contract - Premium airline partner
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50 px-6 py-20">
                    <div className="mx-auto max-w-[1100px] text-center">
                        <div className="inline-flex rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold uppercase text-white">
                            Platform Capabilities
                        </div>
                        <h2 className="mt-5 text-3xl font-bold text-slate-900">
                            Comprehensive AI-Driven Maintenance Solution
                        </h2>
                        <p className="mt-4 text-xl text-slate-600">
                            Built specifically for aviation maintenance operations with regulatory compliance at its core
                        </p>
                    </div>

                    <div className="mx-auto mt-16 flex max-w-[1100px] flex-col gap-16">
                        {featureRows.map((item) => (
                            <div key={item.title} className="grid items-center gap-12 md:grid-cols-2">
                                {item.align === "left" ? (
                                    <>
                                        <div>
                                            <img src={item.icon} alt="" className="h-12 w-12" />
                                            <h3 className="mt-6 text-3xl font-bold text-slate-900">{item.title}</h3>
                                            <p className="mt-4 text-lg text-slate-600">{item.body}</p>
                                            <Link
                                                href={CONTACT_DEMO}
                                                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                                            >
                                                Learn More
                                                <img src={item.arrow} alt="" className="h-4 w-4" />
                                            </Link>
                                        </div>
                                        <div className="rounded-2xl border-4 border-white shadow-2xl">
                                            <img src={item.image} alt={item.title} className="h-80 w-full rounded-2xl object-cover" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="rounded-2xl border-4 border-white shadow-2xl">
                                            <img src={item.image} alt={item.title} className="h-80 w-full rounded-2xl object-cover" />
                                        </div>
                                        <div>
                                            <img src={item.icon} alt="" className="h-12 w-12" />
                                            <h3 className="mt-6 text-3xl font-bold text-slate-900">{item.title}</h3>
                                            <p className="mt-4 text-lg text-slate-600">{item.body}</p>
                                            <Link
                                                href={CONTACT_DEMO}
                                                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                                            >
                                                Learn More
                                                <img src={item.arrow} alt="" className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-white px-6 py-20">
                    <div className="mx-auto max-w-[1100px] text-center">
                        <div className="inline-flex rounded-lg bg-purple-600 px-3 py-1 text-xs font-semibold uppercase text-white">
                            Customer Success
                        </div>
                        <h2 className="mt-5 text-3xl font-bold text-slate-900">Trusted by Aviation Professionals</h2>
                    </div>
                    <div className="mx-auto mt-12 grid max-w-[1100px] gap-8 md:grid-cols-2">
                        {testimonials.map((t) => (
                            <div key={t.name} className="rounded-2xl border border-slate-200 bg-white p-8">
                                <img src={t.quoteIcon} alt="" className="h-12 w-12" />
                                <div className="mt-6 flex gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <img key={i} src={t.star} alt="" className="h-5 w-5" />
                                    ))}
                                </div>
                                <p className="mt-6 text-lg italic text-slate-700">“{t.quote}”</p>
                                <div className="mt-6 border-t border-slate-200 pt-6">
                                    <div className="text-sm font-bold text-slate-900">{t.name}</div>
                                    <div className="text-sm text-slate-600">{t.title}</div>
                                    <div className="text-sm font-semibold text-blue-600">{t.company}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-gradient-to-br from-orange-50 to-amber-50 px-6 py-16">
                    <div className="mx-auto max-w-[1100px]">
                        <div className="text-center text-xs font-semibold uppercase tracking-wide text-orange-600">
                            Industry Partner
                        </div>
                        <div className="mt-6 rounded-2xl border-4 border-orange-300 bg-white shadow-2xl">
                            <div className="grid md:grid-cols-2">
                                <div className="relative">
                                    <img src={imgImageAviationPartsAndComponents} alt="Aviation Parts and Components" className="h-full w-full object-cover" />
                                </div>
                                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-10 text-white">
                                    <div className="mb-8 flex h-12 w-16 items-center justify-center rounded-xl bg-white/20">
                                        <img src={imgIcon13} alt="" className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-3xl font-bold">AeroTech Parts &amp; Supply</h3>
                                    <p className="mt-4 text-lg text-orange-100">
                                        &ldquo;Your trusted source for certified aircraft parts and components. Fast delivery, competitive
                                        pricing, and unmatched quality assurance.&rdquo;
                                    </p>
                                    <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
                                        {["FAA/EASA Certified", "24-Hour Shipping", "50,000+ Parts"].map((item) => (
                                            <span key={item} className="inline-flex items-center gap-2">
                                                <img src={imgIcon14} alt="" className="h-5 w-5" />
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-6 flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm">
                                        <img src={imgIcon15} alt="" className="h-5 w-5" />
                                        <div>
                                            <div className="text-xs text-orange-100">Special Offer</div>
                                            <div className="text-sm font-bold">15% Off First Order - Use Code: SKYMAINT15</div>
                                        </div>
                                    </div>
                                    <Link
                                        href={CONTACT_PARTNERSHIPS}
                                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-orange-600"
                                    >
                                        Shop Parts Catalog
                                        <img src={imgIcon16} alt="" className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 rounded-xl bg-slate-100 px-4 py-3 text-xs text-slate-600">
                            <span className="font-semibold">DEV INFO:</span> Ad ID: ad-002-aerotech | Contract: 2026-01-15 to
                            2026-07-15 | 6-month contract with promo code tracking
                        </div>
                    </div>
                </section>

                <section className="bg-gradient-to-br from-slate-50 to-blue-50 px-6 py-20">
                    <div className="mx-auto max-w-[1100px] text-center">
                        <div className="inline-flex rounded-lg bg-purple-600 px-3 py-1 text-xs font-semibold uppercase text-white">
                            Industry Partners
                        </div>
                        <h2 className="mt-5 text-3xl font-bold text-slate-900">Connecting Aviation Excellence</h2>
                        <p className="mt-4 text-xl text-slate-600">
                            Featured partners providing trusted solutions to the aviation maintenance community
                        </p>
                    </div>
                    <div className="mx-auto mt-12 grid max-w-[1024px] gap-8 md:grid-cols-2">
                        <div className="relative rounded-2xl border border-slate-200 bg-white p-8">
                            <div className="absolute right-6 top-6 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                                Sponsored
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                                    <img src={imgVector12} alt="" className="h-5 w-5" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">AeroTech Solutions</h3>
                            </div>
                            <p className="mt-4 text-center text-base text-slate-700">
                                Advanced diagnostic tools and predictive analytics for modern aircraft fleets.
                            </p>
                            <Link
                                href={CONTACT_PARTNERSHIPS}
                                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                            >
                                Learn More
                                <img src={imgIcon8} alt="" className="h-4 w-4" />
                            </Link>
                            <div className="mt-3 text-center text-xs text-slate-500">
                                Sponsored content. SkyMaintain does not endorse products.
                            </div>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-200">
                                    <img src={imgVector16} alt="" className="h-5 w-5" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-500">Partner Slot Available</h3>
                            </div>
                            <p className="mt-4 text-center text-base text-slate-500">
                                Join our network of industry partners and reach aviation maintenance professionals worldwide.
                            </p>
                            <Link
                                href={CONTACT_PARTNERSHIPS}
                                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-600 px-4 py-2 text-sm font-semibold text-white"
                            >
                                Become a Partner
                                <img src={imgIcon8} alt="" className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                    <p className="mx-auto mt-10 max-w-[768px] text-center text-xs text-slate-500">
                        <span className="font-semibold">Partner Disclosure:</span> SkyMaintain displays sponsored partner content.
                        Sponsorship does not influence AI responses, maintenance recommendations, or compliance assessments. All
                        partnerships are reviewed for aviation industry relevance and quality standards.
                    </p>
                </section>

                <section className="bg-slate-50 px-6 py-20">
                    <div className="mx-auto max-w-[800px] text-center">
                        <h2 className="text-3xl font-bold text-slate-900">
                            Compliance &amp; Trust — Frequently Asked Questions
                        </h2>
                        <p className="mt-4 text-lg text-slate-600">
                            How SkyMaintain supports maintenance professionals safely, responsibly, and in line with regulations.
                        </p>
                    </div>
                    <div className="mx-auto mt-12 max-w-[800px] space-y-4">
                        {faqItems.map((item) => (
                            <details
                                key={item.q}
                                className="group rounded-2xl border border-slate-200 bg-white"
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5">
                                    <h3 className="text-lg font-bold text-slate-900">{item.q}</h3>
                                    <img
                                        src={imgIcon18}
                                        alt=""
                                        className="h-5 w-5 transition-transform group-open:rotate-180"
                                    />
                                </summary>
                                <div className="border-t border-slate-200 px-6 pb-6 pt-4 text-sm text-slate-700">
                                    {item.a.map((line, idx) => (
                                        <p key={idx} className="mb-2 last:mb-0">
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </details>
                        ))}
                    </div>
                    <div className="mt-8 text-center text-sm text-slate-600">
                        Have more questions?{" "}
                        <Link href={CONTACT_SUPPORT} className="font-semibold text-blue-600 hover:underline">
                            Contact our compliance team
                        </Link>
                    </div>
                </section>

                <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 px-6 py-20 text-white">
                    <div className="mx-auto max-w-[848px] text-center">
                        <img src={imgIcon19} alt="" className="mx-auto h-20 w-20" />
                        <h2 className="mt-8 text-4xl font-bold">Ready to Transform Your Maintenance Operations?</h2>
                        <p className="mt-6 text-xl text-blue-100">
                            Join 50+ airlines and operators using SkyMaintain to improve safety, reduce costs, and ensure 100%
                            regulatory compliance.
                        </p>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href="/get-started"
                                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-lg font-semibold text-blue-600 shadow-xl"
                            >
                                Start Your Free Trial
                                <img src={imgIcon20} alt="" className="h-5 w-5" />
                            </Link>
                            <Link
                                href={CONTACT_DEMO}
                                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-lg font-semibold text-blue-600 shadow-xl"
                            >
                                Schedule a Demo
                            </Link>
                        </div>
                        <p className="mt-6 text-sm text-blue-100">
                            ✓ 14-day free trial • ✓ No credit card required • ✓ Full platform access
                        </p>
                    </div>
                </section>
            </main>

            <footer className="bg-slate-900 px-6 py-12 text-slate-300">
                <div className="mx-auto grid max-w-[1100px] gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
                                <img src={imgSkyMaintainLogo} alt="" className="h-5 w-8 object-cover" />
                            </div>
                            <span className="text-lg font-bold text-white">SkyMaintain</span>
                        </div>
                        <p className="text-sm text-slate-400">
                            AI-powered aircraft maintenance platform ensuring safety, compliance, and efficiency.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-white">Product</h4>
                        <ul className="mt-4 space-y-2 text-sm text-slate-300">
                            <li><Link href="/platform-features" className="hover:text-white">Features</Link></li>
                            <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                            <li><Link href="/security" className="hover:text-white">Security</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-white">Company</h4>
                        <ul className="mt-4 space-y-2 text-sm text-slate-300">
                            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-white">Legal</h4>
                        <ul className="mt-4 space-y-2 text-sm text-slate-300">
                            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                            <li><Link href="/compliance" className="hover:text-white">Compliance</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mx-auto mt-8 max-w-[1100px] border-t border-slate-800 pt-6 text-center text-sm text-slate-400">
                    <p>© 2026 <span className="text-blue-400">SkyMaintain</span>. All Rights Reserved.</p>
                    <p className="mt-2">SkyMaintain is a product of EncycloAMTs LLC.</p>
                    <p className="mt-2">A Regulatory-Compliant Architecture for AI-Assisted Aircraft Maintenance Decision Support</p>
                    <p className="mt-4 text-xs">
                        <span className="font-semibold">Partner Disclosure:</span> SkyMaintain displays sponsored partner content.
                        Sponsorship does not influence AI responses, maintenance recommendations, or compliance assessments.
                    </p>
                </div>
            </footer>
        </div>
    );
}
