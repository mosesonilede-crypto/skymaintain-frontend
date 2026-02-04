/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CONTACT_SUPPORT } from "@/lib/routes";

// Tab icons
const iconOverview = "https://www.figma.com/api/mcp/asset/7152f121-affd-4cdc-a88e-cd80448740ee";
const iconBilling = "https://www.figma.com/api/mcp/asset/730d44da-f0bc-4c4c-afbe-95b006eaf641";

// Subscription card icons
const iconPlan = "https://www.figma.com/api/mcp/asset/6875e51d-fdf1-44c6-a5a4-e7ba8e394e08";
const iconCalendar = "https://www.figma.com/api/mcp/asset/be0d63a4-9f30-4868-b482-104e31d32c7f";
const iconTeam = "https://www.figma.com/api/mcp/asset/1dda0b36-ba8d-4f01-955a-340072441c4d";

// Plan icons
const iconStarter = "https://www.figma.com/api/mcp/asset/93cae803-e838-4f02-abb8-ba888069c6bc";
const iconProfessional = "https://www.figma.com/api/mcp/asset/2947368f-019e-4302-9afe-46513e49f970";
const iconEnterprise = "https://www.figma.com/api/mcp/asset/94b1222a-3584-4085-829b-f816a968c3e4";
const iconCheck = "https://www.figma.com/api/mcp/asset/350f79e2-4a11-4c23-9803-c684671fe0c9";

// Button icons
const iconAddPayment = "https://www.figma.com/api/mcp/asset/4bbd5496-491b-4832-a193-0335c02e48d3";
const iconMore = "https://www.figma.com/api/mcp/asset/b4377308-cf73-4221-bc76-f06ff1f90d58";
const iconDownload = "https://www.figma.com/api/mcp/asset/79f51b28-1222-4467-87dc-fbb524040a90";
const iconActive = "https://www.figma.com/api/mcp/asset/5cf5d6ef-efa5-47e1-b3e6-9bb8b6ff206a";

type DataMode = "mock" | "live" | "hybrid";

type BillingCycle = "Monthly" | "Annual";

type Plan = {
    id: "starter" | "professional" | "enterprise";
    name: string;
    tagline: string;
    priceYear: number;
    savePerYear: number;
    bullets: string[];
    badge?: "Most Popular" | "Current Plan";
    isCurrent?: boolean;
};

type PaymentMethod = {
    id: string;
    label: string;
    expires: string;
    isDefault: boolean;
};

type BillingInvoice = {
    date: string;
    description: string;
    amount: string;
    status: "Paid" | "Unpaid" | string;
};

type SubscriptionBillingPayload = {
    status: "Active" | "Inactive" | string;
    currentPlanLabel: string;
    currentPlanPriceYear: number;
    nextBilling: string;
    autoRenewEnabled: boolean;
    teamMembers: number;
    teamMembersAllowed: number;
    billingCycle: BillingCycle;
    plans: Plan[];
    paymentMethods: PaymentMethod[];
    billingHistory: BillingInvoice[];
};

function getPublicEnv(name: string, fallback: string) {
    const v = process.env[name];
    return (v ?? fallback).trim();
}

function normalizeMode(value: string): DataMode {
    if (value === "live" || value === "hybrid" || value === "mock") return value;
    return "mock";
}

function mockPayload(): SubscriptionBillingPayload {
    return {
        status: "Active",
        currentPlanLabel: "professional",
        currentPlanPriceYear: 4990,
        nextBilling: "Feb 1, 2026",
        autoRenewEnabled: true,
        teamMembers: 5,
        teamMembersAllowed: 25,
        billingCycle: "Annual",
        plans: [
            {
                id: "starter",
                name: "Starter",
                tagline: "Perfect for small operations",
                priceYear: 1990,
                savePerYear: 398,
                bullets: [
                    "Up to 5 aircraft",
                    "Basic maintenance tracking",
                    "Email support",
                    "Standard compliance reports",
                    "1 GB cloud storage",
                    "Mobile app access",
                ],
            },
            {
                id: "professional",
                name: "Professional",
                tagline: "For growing fleets",
                priceYear: 4990,
                savePerYear: 998,
                bullets: [
                    "Up to 25 aircraft",
                    "Advanced AI insights",
                    "Priority support",
                    "Real-time IoT integration",
                    "Custom compliance reports",
                    "50 GB cloud storage",
                    "API access",
                    "Multi-location support",
                ],
                badge: "Most Popular",
                isCurrent: true,
            },
            {
                id: "enterprise",
                name: "Enterprise",
                tagline: "For large airlines",
                priceYear: 14990,
                savePerYear: 2998,
                bullets: [
                    "Unlimited aircraft",
                    "Advanced AI mechanic",
                    "24/7 dedicated support",
                    "Custom integrations",
                    "White-label options",
                    "Unlimited storage",
                    "Advanced analytics",
                    "On-premise deployment option",
                    "SLA guarantee",
                    "Custom training",
                ],
            },
        ],
        paymentMethods: [{ id: "pm_1", label: "Visa •••• 4242", expires: "12/25", isDefault: true }],
        billingHistory: [
            {
                date: "12/31/2024",
                description: "SkyMaintain Professional - Annual Subscription",
                amount: "$49.99",
                status: "Paid",
            },
            {
                date: "11/30/2024",
                description: "SkyMaintain Professional - Monthly Subscription",
                amount: "$4.99",
                status: "Paid",
            },
            {
                date: "10/31/2024",
                description: "SkyMaintain Professional - Monthly Subscription",
                amount: "$4.99",
                status: "Paid",
            },
        ],
    };
}

async function fetchLive(baseUrl: string): Promise<SubscriptionBillingPayload> {
    const url = `${baseUrl.replace(/\/+$/, "")}/v1/admin/billing/summary`;
    const res = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
    });

    if (!res.ok) throw new Error(`GET /v1/admin/billing/summary failed: ${res.status}`);

    const data = (await res.json()) as Partial<SubscriptionBillingPayload>;
    if (
        !data ||
        typeof data.currentPlanLabel !== "string" ||
        typeof data.currentPlanPriceYear !== "number" ||
        typeof data.nextBilling !== "string" ||
        !Array.isArray(data.plans) ||
        !Array.isArray(data.paymentMethods) ||
        !Array.isArray(data.billingHistory)
    ) {
        throw new Error("Invalid billing payload shape");
    }

    return data as SubscriptionBillingPayload;
}

function StatCard({
    title,
    value,
    subline,
    tone,
    icon,
}: {
    title: string;
    value: string;
    subline: string;
    tone: "blue" | "purple" | "green";
    icon: string;
}) {
    const styles = {
        blue: {
            bg: "bg-[#eff6ff]",
            border: "border-[#bedbff]",
            title: "text-[#1c398e]",
            value: "text-[#1c398e]",
            subline: "text-[#1447e6]",
        },
        purple: {
            bg: "bg-[#faf5ff]",
            border: "border-[#e9d4ff]",
            title: "text-[#59168b]",
            value: "text-[#59168b]",
            subline: "text-[#8200db]",
        },
        green: {
            bg: "bg-[#f0fdf4]",
            border: "border-[#b9f8cf]",
            title: "text-[#0d542b]",
            value: "text-[#0d542b]",
            subline: "text-[#008236]",
        },
    };

    const s = styles[tone];

    return (
        <div className={`flex flex-1 flex-col gap-2 rounded-xl border ${s.border} ${s.bg} p-4`}>
            <div className="flex items-center gap-2">
                <img src={icon} alt="" className="h-5 w-5" />
                <span className={`text-sm ${s.title}`}>{title}</span>
            </div>
            <p className={`text-2xl font-bold ${s.value} capitalize`}>{value}</p>
            <p className={`text-sm ${s.subline}`}>{subline}</p>
        </div>
    );
}

function Badge({ label, tone }: { label: string; tone?: "purple" | "blue" | "green" | "slate" }) {
    const cls =
        label === "Most Popular"
            ? "bg-[#9810fa] text-white"
            : label === "Current Plan"
                ? "bg-[#155dfc] text-white"
                : tone === "green"
                    ? "bg-[#dcfce7] text-[#008236]"
                    : tone === "blue"
                        ? "bg-[#dbeafe] text-[#1447e6]"
                        : "bg-[#f3f4f6] text-[#364153]";

    return (
        <span className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs ${cls}`}>
            {label}
        </span>
    );
}

function PlanCard({
    plan,
    onUpgrade,
}: {
    plan: Plan;
    onUpgrade: (planId: Plan["id"]) => void;
}) {
    const isCurrent = !!plan.isCurrent;
    const planIcons: Record<Plan["id"], string> = {
        starter: iconStarter,
        professional: iconProfessional,
        enterprise: iconEnterprise,
    };

    return (
        <div
            className={[
                "relative flex flex-col gap-10 rounded-2xl bg-white p-6",
                isCurrent
                    ? "border-[1.6px] border-[#9810fa] shadow-lg"
                    : "border border-black/10",
            ].join(" ")}
        >
            {/* Badges */}
            {(plan.badge || isCurrent) && (
                <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 gap-2">
                    {plan.badge && <Badge label={plan.badge} />}
                    {isCurrent && plan.badge !== "Current Plan" && <Badge label="Current Plan" />}
                </div>
            )}

            {/* Plan Info */}
            <div className="flex flex-col">
                <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundImage: "linear-gradient(135deg, rgb(219, 234, 254) 0%, rgb(243, 232, 255) 100%)" }}
                >
                    <img src={planIcons[plan.id]} alt="" className="h-6 w-6" />
                </div>
                <h4 className="mt-4 text-xl font-bold text-[#0a0a0a]">{plan.name}</h4>
                <p className="text-sm text-[#4a5565]">{plan.tagline}</p>
                <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-[#0a0a0a]">${plan.priceYear}</span>
                    <span className="text-base text-[#4a5565]">/year</span>
                </div>
                <p className="text-sm text-[#00a63e]">Save ${plan.savePerYear}/year</p>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-3">
                {plan.bullets.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                        <img src={iconCheck} alt="" className="mt-0.5 h-5 w-5" />
                        <span className="text-sm text-[#0a0a0a] leading-5">{b}</span>
                    </div>
                ))}
            </div>

            {/* Button */}
            <div className="mt-auto">
                {isCurrent ? (
                    <button
                        type="button"
                        className="flex w-full items-center justify-center rounded-lg border border-black/10 bg-white px-4 py-2 text-sm text-[#0a0a0a] opacity-50"
                        disabled
                    >
                        Current Plan
                    </button>
                ) : (
                    <button
                        type="button"
                        className="flex w-full items-center justify-center rounded-lg bg-[#030213] px-4 py-2 text-sm text-white hover:bg-[#1a1a2e]"
                        onClick={() => onUpgrade(plan.id)}
                    >
                        Upgrade
                    </button>
                )}
            </div>
        </div>
    );
}

export default function SubscriptionBillingPage() {
    const mode = useMemo(() => normalizeMode(getPublicEnv("NEXT_PUBLIC_DATA_MODE", "mock")), []);
    const baseUrl = useMemo(() => getPublicEnv("NEXT_PUBLIC_API_BASE_URL", ""), []);

    const [, setSource] = useState<"mock" | "live">("mock");
    const [payload, setPayload] = useState<SubscriptionBillingPayload>(() => mockPayload());
    const [, setLoading] = useState<boolean>(mode !== "mock");
    const [error, setError] = useState<string>("");
    const [actionMessage, setActionMessage] = useState<string>("");
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
    const [paymentForm, setPaymentForm] = useState({
        cardholder: "",
        cardNumber: "",
        expMonth: "",
        expYear: "",
        cvc: "",
        makeDefault: true,
    });
    const [paymentError, setPaymentError] = useState<string>("");

    const [cycle, setCycle] = useState<BillingCycle>(() => mockPayload().billingCycle);

    useEffect(() => {
        let cancelled = false;

        async function run() {
            setError("");

            if (mode === "mock") {
                const p = mockPayload();
                if (cancelled) return;
                setPayload(p);
                setCycle(p.billingCycle);
                setSource("mock");
                setLoading(false);
                return;
            }

            if (!baseUrl) {
                const p = mockPayload();
                if (cancelled) return;
                setPayload(p);
                setCycle(p.billingCycle);
                setSource("mock");
                setLoading(false);
                return;
            }

            setLoading(true);

            if (mode === "live") {
                try {
                    const live = await fetchLive(baseUrl);
                    if (cancelled) return;
                    setPayload(live);
                    setCycle(live.billingCycle ?? "Annual");
                    setSource("live");
                } catch (e) {
                    if (cancelled) return;
                    const p = mockPayload();
                    setPayload(p);
                    setCycle(p.billingCycle);
                    setSource("mock");
                    setError(e instanceof Error ? e.message : "Failed to load billing data");
                } finally {
                    if (!cancelled) setLoading(false);
                }
                return;
            }

            try {
                const live = await fetchLive(baseUrl);
                if (cancelled) return;
                setPayload(live);
                setCycle(live.billingCycle ?? "Annual");
                setSource("live");
            } catch (e) {
                if (cancelled) return;
                const p = mockPayload();
                setPayload(p);
                setCycle(p.billingCycle);
                setSource("mock");
                setError(e instanceof Error ? e.message : "Failed to load billing data");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        run();
        return () => {
            cancelled = true;
        };
    }, [mode, baseUrl]);

    function onUpgrade(planId: Plan["id"]) {
        setActionMessage("");
        if (mode === "live" && baseUrl) {
            setActionMessage("Plan change request sent. Your subscription will update shortly.");
            return;
        }

        setPayload((prev) => {
            const selected = prev.plans.find((p) => p.id === planId);
            if (!selected) return prev;
            const nextPlans = prev.plans.map((p) => ({
                ...p,
                isCurrent: p.id === planId,
                badge: p.id === planId ? "Current Plan" : p.badge === "Current Plan" ? undefined : p.badge,
            }));
            return {
                ...prev,
                currentPlanLabel: planId,
                currentPlanPriceYear: selected.priceYear,
                plans: nextPlans,
            };
        });
        setActionMessage("Mock mode: plan updated.");
    }

    function onAddPaymentMethod() {
        setActionMessage("");
        setPaymentError("");
        setPaymentForm({
            cardholder: "",
            cardNumber: "",
            expMonth: "",
            expYear: "",
            cvc: "",
            makeDefault: true,
        });
        setIsPaymentModalOpen(true);
    }

    function validatePaymentForm(): string | null {
        if (!paymentForm.cardholder.trim()) return "Cardholder name is required.";
        const digits = paymentForm.cardNumber.replace(/\s|-/g, "");
        if (!/^\d{12,19}$/.test(digits)) return "Enter a valid card number.";
        if (!/^\d{1,2}$/.test(paymentForm.expMonth)) return "Enter a valid month.";
        const month = Number(paymentForm.expMonth);
        if (month < 1 || month > 12) return "Expiration month must be 1-12.";
        if (!/^\d{2,4}$/.test(paymentForm.expYear)) return "Enter a valid year.";
        if (!/^\d{3,4}$/.test(paymentForm.cvc)) return "Enter a valid CVC.";
        return null;
    }

    function onSavePaymentMethod() {
        const err = validatePaymentForm();
        if (err) {
            setPaymentError(err);
            return;
        }

        const digits = paymentForm.cardNumber.replace(/\s|-/g, "");
        const last4 = digits.slice(-4);
        const month = paymentForm.expMonth.padStart(2, "0");
        const year = paymentForm.expYear.length === 2 ? `20${paymentForm.expYear}` : paymentForm.expYear;

        setPayload((prev) => {
            const nextMethods = prev.paymentMethods.map((pm) => ({
                ...pm,
                isDefault: paymentForm.makeDefault ? false : pm.isDefault,
            }));
            nextMethods.unshift({
                id: `pm_${Date.now()}`,
                label: `Card •••• ${last4}`,
                expires: `${month}/${year.slice(-2)}`,
                isDefault: paymentForm.makeDefault,
            });
            return { ...prev, paymentMethods: nextMethods };
        });

        setIsPaymentModalOpen(false);
        setActionMessage("Payment method added.");
    }

    function onSetDefaultPayment(methodId: string) {
        setPayload((prev) => ({
            ...prev,
            paymentMethods: prev.paymentMethods.map((pm) => ({
                ...pm,
                isDefault: pm.id === methodId,
            })),
        }));
        setActionMessage("Default payment method updated.");
    }

    function onMorePaymentActions(label: string) {
        setActionMessage(`More actions for ${label} coming soon.`);
    }

    function onDownloadInvoice(invoice: BillingInvoice) {
        const content = [
            "SkyMaintain Invoice",
            `Date: ${invoice.date}`,
            `Description: ${invoice.description}`,
            `Amount: ${invoice.amount}`,
            `Status: ${invoice.status}`,
        ].join("\n");
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `invoice-${invoice.date.replace(/\//g, "-")}.txt`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
        setActionMessage("Invoice download started.");
    }

    function onContactSupport() {
        window.location.assign(CONTACT_SUPPORT);
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Page Title */}
            <h1 className="text-2xl font-normal text-[#0a0a0a]">Admin Panel</h1>

            {/* Debug info */}
            {error && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                    {error}
                </div>
            )}
            {actionMessage && (
                <div className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-xs text-sky-800">
                    {actionMessage}
                </div>
            )}

            {/* Tabs */}
            <div className="flex gap-2 border-b border-[#e5e7eb]">
                <Link
                    href="/app/admin-panel"
                    className="flex items-center gap-2 border-b-[1.6px] border-transparent px-6 py-3 text-sm text-[#4a5565] hover:text-[#0a0a0a]"
                >
                    <img src={iconOverview} alt="" className="h-4 w-4" />
                    Overview &amp; Management
                </Link>
                <button
                    type="button"
                    className="flex items-center gap-2 border-b-[1.6px] border-[#155dfc] px-6 py-3 text-sm text-[#155dfc]"
                    aria-current="page"
                >
                    <img src={iconBilling} alt="" className="h-4 w-4" />
                    Subscription &amp; Billing
                </button>
            </div>

            {/* Subscription Overview Card */}
            <div className="flex flex-col gap-12 rounded-2xl border border-black/10 bg-white p-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold text-[#0a0a0a]">Subscription &amp; Billing</h2>
                        <p className="text-base text-[#4a5565]">
                            Manage your subscription, payment methods, and billing history
                        </p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-lg bg-[#dcfce7] px-3 py-1 text-xs text-[#008236]">
                        <img src={iconActive} alt="" className="h-3 w-3" />
                        {payload.status}
                    </span>
                </div>

                {/* Subscription Stats */}
                <div className="flex gap-4">
                    <StatCard
                        title="Current Plan"
                        value={payload.currentPlanLabel}
                        subline={`$${payload.currentPlanPriceYear}/year`}
                        tone="blue"
                        icon={iconPlan}
                    />
                    <StatCard
                        title="Next Billing"
                        value={payload.nextBilling}
                        subline={payload.autoRenewEnabled ? "Auto-renew enabled" : "Auto-renew disabled"}
                        tone="purple"
                        icon={iconCalendar}
                    />
                    <StatCard
                        title="Team Members"
                        value={String(payload.teamMembers)}
                        subline={`of ${payload.teamMembersAllowed} allowed`}
                        tone="green"
                        icon={iconTeam}
                    />
                </div>

                {/* Billing Cycle */}
                <div className="flex items-center justify-between rounded-xl bg-[#f9fafb] px-4 py-4">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-bold text-[#0a0a0a]">Billing Cycle</h3>
                        <p className="text-sm text-[#4a5565]">Save $998 per year with annual billing</p>
                    </div>
                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => setCycle("Monthly")}
                            className={`rounded-lg px-3 py-1.5 text-sm ${cycle === "Monthly"
                                ? "bg-[#030213] text-white"
                                : "border border-black/10 bg-white text-[#0a0a0a]"
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            type="button"
                            onClick={() => setCycle("Annual")}
                            className={`ml-2 rounded-lg px-3 py-1.5 text-sm ${cycle === "Annual"
                                ? "bg-[#030213] text-white"
                                : "border border-black/10 bg-white text-[#0a0a0a]"
                                }`}
                        >
                            Annual
                        </button>
                    </div>
                </div>
            </div>

            {/* Available Plans Section */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-[#0a0a0a]">Available Plans</h3>
                <div className="grid gap-6 lg:grid-cols-3">
                    {payload.plans.map((p) => (
                        <PlanCard key={p.id} plan={p} onUpgrade={onUpgrade} />
                    ))}
                </div>
            </div>

            {/* Payment Methods Card */}
            <div className="flex flex-col gap-12 rounded-2xl border border-black/10 bg-white p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-bold text-[#0a0a0a]">Payment Methods</h3>
                        <p className="text-sm text-[#4a5565]">
                            Manage your payment methods and billing information
                        </p>
                    </div>
                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg bg-[#030213] px-3 py-2 text-sm text-white hover:bg-[#1a1a2e]"
                        onClick={onAddPaymentMethod}
                    >
                        <img src={iconAddPayment} alt="" className="h-4 w-4" />
                        Add Payment Method
                    </button>
                </div>

                {/* Payment Methods List */}
                <div className="flex flex-col gap-3">
                    {payload.paymentMethods.map((pm) => (
                        <div
                            key={pm.id}
                            className={`flex items-center justify-between rounded-xl px-4 py-4 ${pm.isDefault
                                ? "border border-[#155dfc] bg-[#eff6ff]"
                                : "border border-[#e5e7eb]"
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white">
                                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                                        <rect x="2" y="5" width="20" height="14" rx="2" stroke={pm.isDefault ? "#1447e6" : "#4a5565"} strokeWidth="1.5" />
                                        <line x1="2" y1="10" x2="22" y2="10" stroke={pm.isDefault ? "#1447e6" : "#4a5565"} strokeWidth="1.5" />
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className="text-base text-[#0a0a0a]">{pm.label}</span>
                                        {pm.isDefault && <Badge label="Default" tone="blue" />}
                                    </div>
                                    <span className="text-sm text-[#4a5565]">Expires {pm.expires}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {!pm.isDefault && (
                                    <button
                                        type="button"
                                        className="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-sm text-[#0a0a0a] hover:bg-slate-50"
                                        onClick={() => onSetDefaultPayment(pm.id)}
                                    >
                                        Set Default
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="flex h-8 w-9 items-center justify-center rounded-lg hover:bg-slate-100"
                                    onClick={() => onMorePaymentActions(pm.label)}
                                >
                                    <img src={iconMore} alt="" className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {isPaymentModalOpen && (
                    <div className="mt-6 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-lg font-bold text-[#0a0a0a]">Add Payment Method</h4>
                                <p className="text-sm text-[#4a5565]">Enter card details to save a payment method.</p>
                            </div>
                            <button
                                type="button"
                                className="flex h-8 w-9 items-center justify-center rounded-lg hover:bg-slate-100"
                                onClick={() => {
                                    setIsPaymentModalOpen(false);
                                    setPaymentError("");
                                }}
                                aria-label="Close"
                            >
                                <img src={iconMore} alt="" className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-[#0a0a0a]">Cardholder Name</label>
                                <input
                                    value={paymentForm.cardholder}
                                    onChange={(e) => setPaymentForm((prev) => ({ ...prev, cardholder: e.target.value }))}
                                    placeholder="Name on card"
                                    className="mt-2 w-full rounded-lg border border-[#d1d5dc] bg-white px-3 py-2 text-sm text-[#0a0a0a]"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-sm font-medium text-[#0a0a0a]">Card Number</label>
                                <input
                                    value={paymentForm.cardNumber}
                                    onChange={(e) => setPaymentForm((prev) => ({ ...prev, cardNumber: e.target.value }))}
                                    placeholder="1234 5678 9012 3456"
                                    inputMode="numeric"
                                    className="mt-2 w-full rounded-lg border border-[#d1d5dc] bg-white px-3 py-2 text-sm text-[#0a0a0a]"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-[#0a0a0a]">Exp. Month</label>
                                <input
                                    value={paymentForm.expMonth}
                                    onChange={(e) => setPaymentForm((prev) => ({ ...prev, expMonth: e.target.value }))}
                                    placeholder="MM"
                                    inputMode="numeric"
                                    className="mt-2 w-full rounded-lg border border-[#d1d5dc] bg-white px-3 py-2 text-sm text-[#0a0a0a]"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-[#0a0a0a]">Exp. Year</label>
                                <input
                                    value={paymentForm.expYear}
                                    onChange={(e) => setPaymentForm((prev) => ({ ...prev, expYear: e.target.value }))}
                                    placeholder="YY"
                                    inputMode="numeric"
                                    className="mt-2 w-full rounded-lg border border-[#d1d5dc] bg-white px-3 py-2 text-sm text-[#0a0a0a]"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-[#0a0a0a]">CVC</label>
                                <input
                                    value={paymentForm.cvc}
                                    onChange={(e) => setPaymentForm((prev) => ({ ...prev, cvc: e.target.value }))}
                                    placeholder="CVC"
                                    inputMode="numeric"
                                    className="mt-2 w-full rounded-lg border border-[#d1d5dc] bg-white px-3 py-2 text-sm text-[#0a0a0a]"
                                />
                            </div>
                            <div className="flex items-center gap-2 md:col-span-2">
                                <input
                                    type="checkbox"
                                    checked={paymentForm.makeDefault}
                                    onChange={(e) => setPaymentForm((prev) => ({ ...prev, makeDefault: e.target.checked }))}
                                    className="h-4 w-4 rounded border border-[#cbd5e1]"
                                />
                                <span className="text-sm text-[#4a5565]">Set as default payment method</span>
                            </div>
                        </div>

                        {paymentError && (
                            <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
                                {paymentError}
                            </div>
                        )}

                        <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#e5e7eb] pt-6">
                            <button
                                type="button"
                                className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm text-[#0a0a0a] hover:bg-slate-50"
                                onClick={() => {
                                    setIsPaymentModalOpen(false);
                                    setPaymentError("");
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="rounded-lg bg-[#030213] px-4 py-2 text-sm text-white hover:bg-[#1a1a2e]"
                                onClick={onSavePaymentMethod}
                            >
                                Save Payment Method
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Billing History Card */}
            <div className="flex flex-col gap-12 rounded-2xl border border-black/10 bg-white p-6">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-[#0a0a0a]">Billing History</h3>
                    <p className="text-sm text-[#4a5565]">
                        Download invoices and view past payments
                    </p>
                </div>

                {/* Invoice Table */}
                <div className="overflow-hidden rounded-xl">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-black/10">
                            <tr>
                                <th className="pb-3 text-sm font-normal text-[#4a5565]">Date</th>
                                <th className="pb-3 text-sm font-normal text-[#4a5565]">Description</th>
                                <th className="pb-3 text-sm font-normal text-[#4a5565]">Amount</th>
                                <th className="pb-3 text-sm font-normal text-[#4a5565]">Status</th>
                                <th className="pb-3 text-sm font-normal text-[#4a5565]">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/10">
                            {payload.billingHistory.map((row, idx) => (
                                <tr key={`${row.date}-${idx}`}>
                                    <td className="py-5 text-sm text-[#0a0a0a]">{row.date}</td>
                                    <td className="py-5 text-sm text-[#0a0a0a]">{row.description}</td>
                                    <td className="py-5 text-sm text-[#0a0a0a]">{row.amount}</td>
                                    <td className="py-5">
                                        <span className="inline-flex items-center gap-1 rounded-lg bg-[#dcfce7] px-2 py-0.5 text-xs text-[#008236]">
                                            <img src={iconActive} alt="" className="h-3 w-3" />
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="py-5">
                                        <button
                                            type="button"
                                            className="flex items-center gap-2 text-sm text-[#0a0a0a] hover:text-[#155dfc]"
                                            onClick={() => onDownloadInvoice(row)}
                                        >
                                            <img src={iconDownload} alt="" className="h-4 w-4" />
                                            Download
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {payload.billingHistory.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-sm text-[#6a7282]">
                                        No billing history available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Support Cards Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Need Help Card */}
                <div className="flex flex-col gap-10 rounded-2xl border border-black/10 bg-white p-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#dbeafe]">
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="9" stroke="#1447e6" strokeWidth="1.5" />
                                <path d="M9 9a3 3 0 1 1 4 2.83V13" stroke="#1447e6" strokeWidth="1.5" strokeLinecap="round" />
                                <circle cx="12" cy="17" r="0.5" fill="#1447e6" stroke="#1447e6" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#0a0a0a]">Need Help?</h3>
                            <p className="text-sm text-[#4a5565]">Our support team is here</p>
                        </div>
                    </div>

                    <p className="text-sm text-[#4a5565]">
                        Have questions about billing or subscriptions? Contact our support team for assistance.
                    </p>

                    <button
                        type="button"
                        onClick={onContactSupport}
                        className="flex items-center justify-center rounded-lg border border-black/10 bg-white px-4 py-2 text-sm text-[#0a0a0a] hover:bg-slate-50"
                    >
                        Contact Support
                    </button>
                </div>

                {/* Secure Payments Card */}
                <div className="flex flex-col gap-10 rounded-2xl border border-black/10 bg-white p-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#dcfce7]">
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                                <path d="M12 3L4 7v6c0 5.25 3.44 10.18 8 11.5 4.56-1.32 8-6.25 8-11.5V7l-8-4z" stroke="#008236" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M9 12l2 2 4-4" stroke="#008236" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#0a0a0a]">Secure Payments</h3>
                            <p className="text-sm text-[#4a5565]">Your data is protected</p>
                        </div>
                    </div>

                    <p className="text-sm text-[#4a5565]">
                        All transactions are encrypted and secure. We never store your full card details.
                    </p>

                    <div className="flex gap-2">
                        <Badge label="PCI DSS" tone="slate" />
                        <Badge label="SSL Encrypted" tone="slate" />
                        <Badge label="256-bit" tone="slate" />
                    </div>
                </div>
            </div>
        </div>
    );
}
