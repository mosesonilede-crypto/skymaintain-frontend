/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

// Figma tab icons
const iconOverview = "https://www.figma.com/api/mcp/asset/7152f121-affd-4cdc-a88e-cd80448740ee";
const iconBilling = "https://www.figma.com/api/mcp/asset/730d44da-f0bc-4c4c-afbe-95b006eaf641";

// Stat card icons
const iconAircraft = "https://www.figma.com/api/mcp/asset/f084f8c6-ebaf-4432-9177-dad9d1d88c99";
const iconUsers = "https://www.figma.com/api/mcp/asset/0c6c1a62-0ead-4072-8aae-5ff0a69d215f";
const iconRecords = "https://www.figma.com/api/mcp/asset/d6e71a4c-7d39-4fc3-a95f-747c0fb8160f";
const iconCompliance = "https://www.figma.com/api/mcp/asset/2298fc77-fa1b-4e6d-bc43-1d99e9692a16";

// Button icons
const iconAdd = "https://www.figma.com/api/mcp/asset/ceee9997-5200-403e-b205-0eaf0c6ffe5f";
const iconAddUser = "https://www.figma.com/api/mcp/asset/f757172a-e63a-414d-beb2-bc3145cff7dd";
const iconPlane = "https://www.figma.com/api/mcp/asset/dce408cc-be17-42fe-8999-0e66976641cd";
const iconClose = "https://www.figma.com/api/mcp/asset/aff3831c-e655-4b18-8f07-2e2e3a7d51cc";
const iconRegister = "https://www.figma.com/api/mcp/asset/a072cd8d-feba-4f9f-8f18-2b47de9c375d";

type DataMode = "mock" | "live" | "hybrid";

type AdminKpis = {
    totalAircraft: number;
    activeUsers: number;
    maintenanceRecords: number;
    complianceRatePct: number;
};

type AdminUser = {
    name: string;
    email: string;
    role: "Admin" | "Fleet Manager" | "Maintenance Engineer" | string;
    status: "Active" | "Suspended" | string;
};

type SystemConfig = {
    licenseStatus: "Active" | "Inactive" | string;
    licenseExpires: string;
    storageUsedGb: number;
    storageTotalGb: number;
};

type AdminPanelPayload = {
    kpis: AdminKpis;
    users: AdminUser[];
    system: SystemConfig;
};

type StoredDoc = { size?: string };
type AiAssessment = { registration: string; assessedAt: string };
type MaintenanceSubmission = { submittedAt?: string };
type ComplianceSubmission = { aircraftRegistration?: string; maintenanceDate?: string };
type SelectedAircraft = { registration?: string };

type AircraftStatus = "Available" | "In Maintenance" | "Grounded" | "Active";

type RegisterAircraftForm = {
    registrationNumber: string;
    tailNumber: string;
    serialNumber: string;
    yearOfManufacture: string;
    manufacturer: string;
    model: string;
    aircraftType: string;
    category: string;
    owner: string;
    operator: string;
    currentLocation: string;
    status: AircraftStatus | "";
};

const MANUFACTURERS = ["Airbus", "Boeing", "Bombardier", "Cessna", "Embraer", "Gulfstream", "Other"];

function getPublicEnv(name: string, fallback: string) {
    const v = process.env[name];
    return (v ?? fallback).trim();
}

function normalizeMode(value: string): DataMode {
    if (value === "live" || value === "hybrid" || value === "mock") return value;
    return "mock";
}

function mockPayload(): AdminPanelPayload {
    return {
        kpis: { totalAircraft: 24, activeUsers: 45, maintenanceRecords: 1234, complianceRatePct: 98 },
        users: [
            { name: "John Anderson", email: "john.anderson@skywings.com", role: "Admin", status: "Active" },
            { name: "Sarah Mitchell", email: "sarah.mitchell@skywings.com", role: "Fleet Manager", status: "Active" },
            { name: "Michael Chen", email: "michael.chen@skywings.com", role: "Maintenance Engineer", status: "Active" },
        ],
        system: {
            licenseStatus: "Active",
            licenseExpires: "December 31, 2026",
            storageUsedGb: 42.5,
            storageTotalGb: 100,
        },
    };
}

async function fetchLive(baseUrl: string): Promise<AdminPanelPayload> {
    const url = `${baseUrl.replace(/\/+$/, "")}/v1/admin/panel/overview`;
    const res = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
    });

    if (!res.ok) throw new Error(`GET /v1/admin/panel/overview failed: ${res.status}`);

    const data = (await res.json()) as Partial<AdminPanelPayload>;
    if (
        !data ||
        !data.kpis ||
        typeof data.kpis.totalAircraft !== "number" ||
        typeof data.kpis.activeUsers !== "number" ||
        typeof data.kpis.maintenanceRecords !== "number" ||
        typeof data.kpis.complianceRatePct !== "number" ||
        !Array.isArray(data.users) ||
        !data.system ||
        typeof data.system.storageUsedGb !== "number" ||
        typeof data.system.storageTotalGb !== "number"
    ) {
        throw new Error("Invalid admin panel payload shape");
    }

    return data as AdminPanelPayload;
}

async function registerAircraftLive(baseUrl: string, form: RegisterAircraftForm): Promise<void> {
    const url = `${baseUrl.replace(/\/+$/, "")}/v1/admin/aircraft`;
    const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`POST /v1/admin/aircraft failed: ${res.status}${text ? ` • ${text}` : ""}`);
    }
}

function Pill({ label, tone }: { label: string; tone: "green" | "slate" | "blue" | "purple" }) {
    const cls =
        tone === "green"
            ? "bg-[#dcfce7] text-[#008236] border-transparent"
            : tone === "purple"
                ? "bg-[#f3e8ff] text-[#8200db] border-transparent"
                : tone === "blue"
                    ? "bg-[#dbeafe] text-[#1447e6] border-transparent"
                    : "bg-[#f3f4f6] text-[#364153] border-transparent";

    return (
        <span className={`inline-flex items-center rounded-lg border px-2 py-0.5 text-xs font-medium ${cls}`}>
            {label}
        </span>
    );
}

function StatCard({ value, label, icon, bgColor }: { value: string; label: string; icon?: string; bgColor?: string }) {
    return (
        <div className="flex flex-col items-start rounded-2xl border border-black/10 bg-white p-6">
            <div className="flex items-center gap-4">
                {icon && (
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${bgColor || "bg-[#eff6ff]"}`}>
                        <img src={icon} alt="" className="h-[18px] w-[18px]" />
                    </div>
                )}
                <div>
                    <p className="text-2xl font-normal text-[#0a0a0a]">{value}</p>
                    <p className="text-sm text-[#4a5565]">{label}</p>
                </div>
            </div>
        </div>
    );
}

function FieldLabel({ children, required }: { children: string; required?: boolean }) {
    return (
        <div className="text-sm text-[#364153] leading-5">
            {children}
            {required ? <span className="text-[#fb2c36]"> *</span> : null}
        </div>
    );
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="mt-2 w-full rounded-[10px] border border-[#d1d5dc] bg-white px-3 py-2.5 text-base text-[#0a0a0a] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:ring-2 focus:ring-[#155dfc]/30"
        />
    );
}

function Select({
    value,
    onChange,
    options,
    placeholder,
}: {
    value: string;
    onChange: (v: string) => void;
    options: string[];
    placeholder: string;
}) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-2 w-full rounded-[10px] border border-[#d1d5dc] bg-white px-3 py-2.5 text-base text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#155dfc]/30"
        >
            <option value="">{placeholder}</option>
            {options.map((o) => (
                <option key={o} value={o}>
                    {o}
                </option>
            ))}
        </select>
    );
}

function parseStorageSizeToGb(size?: string): number {
    if (!size) return 0;
    const match = size.trim().match(/(\d+(?:\.\d+)?)\s*(kb|mb|gb)/i);
    if (!match) return 0;
    const value = Number(match[1]);
    if (!Number.isFinite(value)) return 0;
    const unit = match[2].toLowerCase();
    if (unit === "gb") return value;
    if (unit === "mb") return value / 1024;
    if (unit === "kb") return value / (1024 * 1024);
    return 0;
}

function getLocalStorageUsageGb(): number | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = window.localStorage.getItem("skymaintain.documentationUploads");
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return null;
        const total = parsed.reduce((sum: number, doc: StoredDoc) => sum + parseStorageSizeToGb(doc?.size), 0);
        return Number.isFinite(total) ? total : null;
    } catch {
        return null;
    }
}

function getAiAssessmentStats(): { count: number; lastAssessedAt: string | null } {
    if (typeof window === "undefined") return { count: 0, lastAssessedAt: null };
    try {
        const raw = window.localStorage.getItem("skymaintain.aiAssessments");
        if (!raw) return { count: 0, lastAssessedAt: null };
        const parsed = JSON.parse(raw) as AiAssessment[];
        if (!Array.isArray(parsed) || parsed.length === 0) return { count: 0, lastAssessedAt: null };
        const valid = parsed.filter((item) => item?.registration && item?.assessedAt);
        if (!valid.length) return { count: 0, lastAssessedAt: null };
        const last = valid
            .map((item) => new Date(item.assessedAt))
            .filter((d) => !Number.isNaN(d.getTime()))
            .sort((a, b) => b.getTime() - a.getTime())[0];
        return {
            count: valid.length,
            lastAssessedAt: last ? last.toISOString() : null,
        };
    } catch {
        return { count: 0, lastAssessedAt: null };
    }
}

function formatLicenseDate(value: string | null, fallback: string): string {
    if (!value) return fallback;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return fallback;
    return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export default function AdminPanelPage() {
    const mode = useMemo(() => normalizeMode(getPublicEnv("NEXT_PUBLIC_DATA_MODE", "mock")), []);
    const baseUrl = useMemo(() => getPublicEnv("NEXT_PUBLIC_API_BASE_URL", ""), []);

    const [, setSource] = useState<"mock" | "live">("mock");
    const [payload, setPayload] = useState<AdminPanelPayload>(() => mockPayload());
    const [, setLoading] = useState<boolean>(mode !== "mock");
    const [error, setError] = useState<string>("");

    const aircraftTypeChips = ["Commercial", "Cargo", "Private", "Military", "Charter", "Turboprop"];
    const categoryChips = ["Narrow-body", "Wide-body", "Regional", "Business Jet", "Other"];
    const statusOptions: AircraftStatus[] = ["Available", "In Maintenance", "Grounded", "Active"];
    const userRoleOptions: AdminUser["role"][] = ["Admin", "Fleet Manager", "Maintenance Engineer", "Viewer"];
    const userStatusOptions: AdminUser["status"][] = ["Active", "Suspended"];

    const [selectedAircraftType, setSelectedAircraftType] = useState<string>("Commercial");
    const [selectedCategory, setSelectedCategory] = useState<string>("Narrow-body");

    const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
    const [registerTab, setRegisterTab] = useState<"basic" | "maintenance" | "compliance">("basic");

    const [form, setForm] = useState<RegisterAircraftForm>(() => ({
        registrationNumber: "",
        tailNumber: "",
        serialNumber: "",
        yearOfManufacture: "2026",
        manufacturer: "",
        model: "",
        aircraftType: "Commercial",
        category: "Narrow-body",
        owner: "",
        operator: "",
        currentLocation: "",
        status: "",
    }));

    const [submitError, setSubmitError] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);

    const [localStorageUsedGb, setLocalStorageUsedGb] = useState<number | null>(null);
    const [aiAssessmentStats, setAiAssessmentStats] = useState<{ count: number; lastAssessedAt: string | null }>({
        count: 0,
        lastAssessedAt: null,
    });
    const [maintenanceRecordCount, setMaintenanceRecordCount] = useState<number>(0);
    const [complianceRatePct, setComplianceRatePct] = useState<number>(payload.kpis.complianceRatePct);

    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [userEditIndex, setUserEditIndex] = useState<number | null>(null);
    const [userForm, setUserForm] = useState<AdminUser>(() => ({
        name: "",
        email: "",
        role: "Fleet Manager",
        status: "Active",
    }));
    const [userSubmitError, setUserSubmitError] = useState<string>("");

    useEffect(() => {
        setForm((f) => ({ ...f, aircraftType: selectedAircraftType, category: selectedCategory }));
    }, [selectedAircraftType, selectedCategory]);

    useEffect(() => {
        let cancelled = false;

        async function run() {
            setError("");

            if (mode === "mock") {
                setPayload(mockPayload());
                setSource("mock");
                setLoading(false);
                return;
            }

            if (!baseUrl) {
                setPayload(mockPayload());
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
                    setSource("live");
                } catch (e) {
                    if (cancelled) return;
                    setPayload(mockPayload());
                    setSource("mock");
                    setError(e instanceof Error ? e.message : "Failed to load live data");
                } finally {
                    if (!cancelled) setLoading(false);
                }
                return;
            }

            try {
                const live = await fetchLive(baseUrl);
                if (cancelled) return;
                setPayload(live);
                setSource("live");
            } catch (e) {
                if (cancelled) return;
                setPayload(mockPayload());
                setSource("mock");
                setError(e instanceof Error ? e.message : "Failed to load live data");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        run();
        return () => {
            cancelled = true;
        };
    }, [mode, baseUrl]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const updateUsage = () => {
            const usage = getLocalStorageUsageGb();
            setLocalStorageUsedGb(usage);
        };
        updateUsage();
        window.addEventListener("storage", updateUsage);
        return () => window.removeEventListener("storage", updateUsage);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const updateRecords = () => setMaintenanceRecordCount(getMaintenanceRecordCount());
        updateRecords();
        window.addEventListener("storage", updateRecords);
        window.addEventListener("focus", updateRecords);
        return () => {
            window.removeEventListener("storage", updateRecords);
            window.removeEventListener("focus", updateRecords);
        };
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const updateCompliance = () => {
            const registration = getSelectedAircraftRegistration();
            setComplianceRatePct(getComplianceRateForAircraft(registration));
        };
        updateCompliance();
        window.addEventListener("storage", updateCompliance);
        window.addEventListener("focus", updateCompliance);
        window.addEventListener("skymaintain:aircraft-changed", updateCompliance as EventListener);
        return () => {
            window.removeEventListener("storage", updateCompliance);
            window.removeEventListener("focus", updateCompliance);
            window.removeEventListener("skymaintain:aircraft-changed", updateCompliance as EventListener);
        };
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const updateAssessments = () => setAiAssessmentStats(getAiAssessmentStats());
        updateAssessments();
        window.addEventListener("storage", updateAssessments);
        window.addEventListener("skymaintain:ai-assessment-updated", updateAssessments as EventListener);
        return () => {
            window.removeEventListener("storage", updateAssessments);
            window.removeEventListener("skymaintain:ai-assessment-updated", updateAssessments as EventListener);
        };
    }, []);

    const used = localStorageUsedGb ?? payload.system.storageUsedGb;
    const total = payload.system.storageTotalGb;
    const pct = total > 0 ? Math.min(100, Math.max(0, (used / total) * 100)) : 0;
    const licenseStatus = aiAssessmentStats.count > 0 ? "Active" : "Inactive";
    const licenseExpires = aiAssessmentStats.lastAssessedAt
        ? formatLicenseDate(aiAssessmentStats.lastAssessedAt, payload.system.licenseExpires)
        : payload.system.licenseExpires;
    const activeUsers = payload.users.filter((u) => u.status === "Active").length;
    const maintenanceRecords = maintenanceRecordCount || payload.kpis.maintenanceRecords;
    const complianceRate = maintenanceRecordCount > 0 ? complianceRatePct : payload.kpis.complianceRatePct;

    function resetForm() {
        setSelectedAircraftType("Commercial");
        setSelectedCategory("Narrow-body");
        setRegisterTab("basic");
        setForm({
            registrationNumber: "",
            tailNumber: "",
            serialNumber: "",
            yearOfManufacture: "2026",
            manufacturer: "",
            model: "",
            aircraftType: "Commercial",
            category: "Narrow-body",
            owner: "",
            operator: "",
            currentLocation: "",
            status: "",
        });
        setSubmitError("");
    }

    function resetUserForm() {
        setUserForm({
            name: "",
            email: "",
            role: "Fleet Manager",
            status: "Active",
        });
        setUserEditIndex(null);
        setUserSubmitError("");
    }

    function openEditUser(user: AdminUser, index: number) {
        setUserForm({ ...user });
        setUserEditIndex(index);
        setUserSubmitError("");
        setIsUserModalOpen(true);
    }

    function openAddUser() {
        resetUserForm();
        setIsUserModalOpen(true);
    }

    function validateUserForm(): string | null {
        if (!userForm.name.trim()) return "Name is required.";
        if (!userForm.email.trim()) return "Email is required.";
        if (!/.+@.+\..+/.test(userForm.email.trim())) return "Enter a valid email address.";
        if (!userForm.role) return "Role is required.";
        if (!userForm.status) return "Status is required.";
        return null;
    }

    function onSaveUser() {
        const errorMsg = validateUserForm();
        if (errorMsg) {
            setUserSubmitError(errorMsg);
            return;
        }

        setPayload((prev) => {
            const nextUsers = [...prev.users];
            if (userEditIndex === null) {
                nextUsers.push({ ...userForm, email: userForm.email.trim() });
            } else if (nextUsers[userEditIndex]) {
                nextUsers[userEditIndex] = { ...userForm, email: userForm.email.trim() };
            }
            return { ...prev, users: nextUsers };
        });

        setIsUserModalOpen(false);
        resetUserForm();
    }

    function validateBasic(): string | null {
        const requiredFields: Array<[keyof RegisterAircraftForm, string]> = [
            ["registrationNumber", "Registration Number"],
            ["tailNumber", "Tail Number"],
            ["serialNumber", "Serial Number"],
            ["yearOfManufacture", "Year of Manufacture"],
            ["manufacturer", "Manufacturer"],
            ["model", "Model"],
            ["aircraftType", "Aircraft Type"],
            ["category", "Category"],
            ["owner", "Owner"],
            ["operator", "Operator"],
            ["currentLocation", "Current Location"],
            ["status", "Status"],
        ];

        for (const [k, label] of requiredFields) {
            const v = String(form[k] ?? "").trim();
            if (!v) return `${label} is required.`;
        }

        const yr = Number(form.yearOfManufacture);
        if (!Number.isFinite(yr) || yr < 1900 || yr > 2100) return "Year of Manufacture must be a valid year.";
        return null;
    }

    async function onRegisterAircraft() {
        setSubmitError("");

        if (registerTab !== "basic") {
            setSubmitError('Complete "Basic Information" before proceeding.');
            setRegisterTab("basic");
            return;
        }

        const v = validateBasic();
        if (v) {
            setSubmitError(v);
            return;
        }

        try {
            setSubmitting(true);

            if (mode === "mock" || !baseUrl) {
                setIsRegisterOpen(false);
                resetForm();
                return;
            }

            if (mode === "live") {
                await registerAircraftLive(baseUrl, form);
                setIsRegisterOpen(false);
                resetForm();
                return;
            }

            try {
                await registerAircraftLive(baseUrl, form);
                setIsRegisterOpen(false);
                resetForm();
            } catch (e) {
                setIsRegisterOpen(false);
                resetForm();
                setError(e instanceof Error ? e.message : "Register aircraft failed (hybrid fallback).");
            }
        } catch (e) {
            setSubmitError(e instanceof Error ? e.message : "Failed to register aircraft.");
        } finally {
            setSubmitting(false);
        }
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

            {/* Tabs */}
            <div className="flex gap-2 border-b border-[#e5e7eb]">
                <button
                    type="button"
                    className="flex items-center gap-2 border-b-[1.6px] border-[#155dfc] px-6 py-3 text-sm text-[#155dfc]"
                    aria-current="page"
                >
                    <img src={iconOverview} alt="" className="h-4 w-4" />
                    Overview &amp; Management
                </button>
                <Link
                    href="/app/subscription-billing"
                    className="flex items-center gap-2 border-b-[1.6px] border-transparent px-6 py-3 text-sm text-[#4a5565] hover:text-[#0a0a0a]"
                >
                    <img src={iconBilling} alt="" className="h-4 w-4" />
                    Subscription &amp; Billing
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard value={String(payload.kpis.totalAircraft)} label="Total Aircraft" icon={iconAircraft} bgColor="bg-[#eff6ff]" />
                <StatCard value={String(activeUsers)} label="Active Users" icon={iconUsers} bgColor="bg-[#f0fdf4]" />
                <StatCard value={maintenanceRecords.toLocaleString()} label="Maintenance Records" icon={iconRecords} bgColor="bg-[#faf5ff]" />
                <StatCard value={`${complianceRate}%`} label="Compliance Rate" icon={iconCompliance} bgColor="bg-[#fff7ed]" />
            </div>

            {/* Aircraft Management Card */}
            <div className="flex flex-col gap-12 rounded-2xl border border-black/10 bg-white p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-normal text-[#0a0a0a]">Aircraft Management</h2>
                        <p className="text-sm text-[#4a5565]">Add, edit, and manage aircraft in the fleet</p>
                    </div>
                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg bg-[#155dfc] px-3 py-2 text-sm text-white hover:bg-[#1447e6] transition-colors"
                        onClick={() => setIsRegisterOpen(true)}
                    >
                        <img src={iconAdd} alt="" className="h-4 w-4" />
                        Add New Aircraft
                    </button>
                </div>

                {/* Register Aircraft Inline Form (Figma) */}
                {isRegisterOpen ? (
                    <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-6">
                        {/* Form Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-normal text-[#0a0a0a]">Register New Aircraft</h3>
                                <p className="text-sm text-[#4a5565]">Enter comprehensive aircraft details</p>
                            </div>
                            <button
                                type="button"
                                className="flex h-8 w-9 items-center justify-center rounded-lg hover:bg-slate-100"
                                onClick={() => {
                                    setIsRegisterOpen(false);
                                    resetForm();
                                }}
                                aria-label="Close"
                            >
                                <img src={iconClose} alt="" className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Form Tabs */}
                        <div className="mt-6 flex gap-2 border-b border-[#e5e7eb]">
                            <button
                                type="button"
                                onClick={() => setRegisterTab("basic")}
                                className={`pb-3 px-1 text-sm ${registerTab === "basic" ? "text-[#155dfc] border-b-[1.6px] border-[#155dfc]" : "text-[#4a5565]"}`}
                            >
                                Basic Information
                            </button>
                            <button
                                type="button"
                                onClick={() => setRegisterTab("maintenance")}
                                className={`pb-3 px-1 text-sm ${registerTab === "maintenance" ? "text-[#155dfc] border-b-[1.6px] border-[#155dfc]" : "text-[#4a5565]"}`}
                            >
                                Maintenance Data
                            </button>
                            <button
                                type="button"
                                onClick={() => setRegisterTab("compliance")}
                                className={`pb-3 px-1 text-sm ${registerTab === "compliance" ? "text-[#155dfc] border-b-[1.6px] border-[#155dfc]" : "text-[#4a5565]"}`}
                            >
                                Compliance
                            </button>
                        </div>

                        {/* Form Content */}
                        <div className="mt-6">
                            {registerTab === "basic" ? (
                                <div className="space-y-6">
                                    {/* Aircraft Identification */}
                                    <div>
                                        <p className="text-sm text-[#364153]">Aircraft Identification</p>
                                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                                            <div>
                                                <FieldLabel required>Registration Number</FieldLabel>
                                                <Input
                                                    value={form.registrationNumber}
                                                    onChange={(v) => setForm((f) => ({ ...f, registrationNumber: v }))}
                                                    placeholder="e.g., N12345"
                                                />
                                            </div>
                                            <div>
                                                <FieldLabel required>Tail Number</FieldLabel>
                                                <Input
                                                    value={form.tailNumber}
                                                    onChange={(v) => setForm((f) => ({ ...f, tailNumber: v }))}
                                                    placeholder="e.g., N12345"
                                                />
                                            </div>
                                            <div>
                                                <FieldLabel required>Serial Number</FieldLabel>
                                                <Input
                                                    value={form.serialNumber}
                                                    onChange={(v) => setForm((f) => ({ ...f, serialNumber: v }))}
                                                    placeholder="e.g., B737-30234"
                                                />
                                            </div>
                                            <div>
                                                <FieldLabel required>Year of Manufacture</FieldLabel>
                                                <Input
                                                    value={form.yearOfManufacture}
                                                    onChange={(v) => setForm((f) => ({ ...f, yearOfManufacture: v }))}
                                                    placeholder="2026"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Aircraft Model */}
                                    <div>
                                        <p className="text-sm text-[#364153]">Aircraft Model</p>
                                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                                            <div>
                                                <FieldLabel required>Manufacturer</FieldLabel>
                                                <Select
                                                    value={form.manufacturer}
                                                    onChange={(v) => setForm((f) => ({ ...f, manufacturer: v }))}
                                                    options={MANUFACTURERS}
                                                    placeholder="Select Manufacturer"
                                                />
                                            </div>
                                            <div>
                                                <FieldLabel required>Model</FieldLabel>
                                                <Input
                                                    value={form.model}
                                                    onChange={(v) => setForm((f) => ({ ...f, model: v }))}
                                                    placeholder="e.g., Boeing 737-800"
                                                />
                                            </div>
                                            <div>
                                                <FieldLabel required>Aircraft Type</FieldLabel>
                                                <Select
                                                    value={form.aircraftType}
                                                    onChange={(v) => setForm((f) => ({ ...f, aircraftType: v }))}
                                                    options={aircraftTypeChips}
                                                    placeholder="Select Aircraft Type"
                                                />
                                            </div>
                                            <div>
                                                <FieldLabel required>Category</FieldLabel>
                                                <Select
                                                    value={form.category}
                                                    onChange={(v) => setForm((f) => ({ ...f, category: v }))}
                                                    options={categoryChips}
                                                    placeholder="Select Category"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ownership & Operation */}
                                    <div>
                                        <p className="text-sm text-[#364153]">Ownership &amp; Operation</p>
                                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                                            <div>
                                                <FieldLabel required>Owner</FieldLabel>
                                                <Input
                                                    value={form.owner}
                                                    onChange={(v) => setForm((f) => ({ ...f, owner: v }))}
                                                    placeholder="e.g., SkyWings Airlines"
                                                />
                                            </div>
                                            <div>
                                                <FieldLabel required>Operator</FieldLabel>
                                                <Input
                                                    value={form.operator}
                                                    onChange={(v) => setForm((f) => ({ ...f, operator: v }))}
                                                    placeholder="e.g., SkyWings Airlines"
                                                />
                                            </div>
                                            <div>
                                                <FieldLabel required>Current Location</FieldLabel>
                                                <Input
                                                    value={form.currentLocation}
                                                    onChange={(v) => setForm((f) => ({ ...f, currentLocation: v }))}
                                                    placeholder="e.g., JFK International Airport"
                                                />
                                            </div>
                                            <div>
                                                <FieldLabel required>Status</FieldLabel>
                                                <Select
                                                    value={form.status}
                                                    onChange={(v) => setForm((f) => ({ ...f, status: v as AircraftStatus }))}
                                                    options={statusOptions}
                                                    placeholder="Select Status"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {submitError && (
                                        <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
                                            {submitError}
                                        </div>
                                    )}
                                </div>
                            ) : registerTab === "maintenance" ? (
                                <div className="rounded-lg border border-[#e5e7eb] bg-white p-6 text-sm text-[#4a5565]">
                                    Maintenance Data (prototype tab). Wire fields when your data model is ready.
                                </div>
                            ) : (
                                <div className="rounded-lg border border-[#e5e7eb] bg-white p-6 text-sm text-[#4a5565]">
                                    Compliance (prototype tab). Wire fields when your compliance schema is ready.
                                </div>
                            )}
                        </div>

                        {/* Form Footer */}
                        <div className="mt-8 flex items-center justify-end gap-3 border-t border-[#e5e7eb] pt-6">
                            <button
                                type="button"
                                className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm text-[#0a0a0a] hover:bg-slate-50"
                                onClick={() => {
                                    setIsRegisterOpen(false);
                                    resetForm();
                                }}
                                disabled={submitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="flex items-center gap-2 rounded-lg bg-[#155dfc] px-4 py-2 text-sm text-white hover:bg-[#1447e6] disabled:opacity-60"
                                onClick={onRegisterAircraft}
                                disabled={submitting}
                            >
                                <img src={iconRegister} alt="" className="h-4 w-4" />
                                {submitting ? "Registering…" : "Register Aircraft"}
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Empty State when form is closed */
                    <div className="flex flex-col items-center py-8">
                        <img src={iconPlane} alt="" className="h-16 w-16 opacity-40" />
                        <p className="mt-4 text-center text-base text-[#6a7282]">
                            Click &quot;Add New Aircraft&quot; to register a new aircraft to the system
                        </p>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-6">

                {/* User Management Card */}
                <section className="lg:col-span-12 rounded-2xl border border-black/10 bg-white p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-normal text-[#0a0a0a]">User Management</h2>
                            <p className="text-sm text-[#4a5565]">Manage organization members and their roles</p>
                        </div>
                        <button
                            type="button"
                            className="flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-[#0a0a0a] hover:bg-slate-50 transition-colors"
                            onClick={openAddUser}
                        >
                            <img src={iconAddUser} alt="" className="h-4 w-4" />
                            Add User
                        </button>
                    </div>

                    <div className="mt-6 overflow-hidden rounded-xl border border-[#e5e7eb]">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-[#e5e7eb] bg-white">
                                <tr>
                                    <th className="px-4 py-3 text-sm font-semibold text-[#4a5565]">Name</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-[#4a5565]">Email</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-[#4a5565]">Role</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-[#4a5565]">Status</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-[#4a5565]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f3f4f6] bg-white">
                                {payload.users.map((u, idx) => (
                                    <tr key={`${u.email}-${idx}`} className="hover:bg-slate-50/50">
                                        <td className="px-4 py-4 text-[#0a0a0a]">{u.name}</td>
                                        <td className="px-4 py-4 text-[#0a0a0a]">{u.email}</td>
                                        <td className="px-4 py-4">
                                            <Pill label={u.role} tone={u.role === "Admin" ? "purple" : u.role === "Fleet Manager" ? "blue" : "slate"} />
                                        </td>
                                        <td className="px-4 py-4">
                                            <Pill label={u.status} tone={u.status === "Active" ? "green" : "slate"} />
                                        </td>
                                        <td className="px-4 py-4">
                                            <button
                                                type="button"
                                                className="rounded-lg px-3 py-1.5 text-sm text-[#0a0a0a] hover:bg-slate-100"
                                                onClick={() => openEditUser(u, idx)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {payload.users.length === 0 ? (
                                    <tr>
                                        <td className="px-4 py-6 text-sm text-[#6a7282]" colSpan={5}>
                                            No users found.
                                        </td>
                                    </tr>
                                ) : null}
                            </tbody>
                        </table>
                    </div>

                    {isUserModalOpen && (
                        <div className="mt-6 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-normal text-[#0a0a0a]">
                                        {userEditIndex === null ? "Add User" : "Edit User"}
                                    </h3>
                                    <p className="text-sm text-[#4a5565]">Update member details and access level</p>
                                </div>
                                <button
                                    type="button"
                                    className="flex h-8 w-9 items-center justify-center rounded-lg hover:bg-slate-100"
                                    onClick={() => {
                                        setIsUserModalOpen(false);
                                        resetUserForm();
                                    }}
                                    aria-label="Close"
                                >
                                    <img src={iconClose} alt="" className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                <div>
                                    <FieldLabel required>Name</FieldLabel>
                                    <Input
                                        value={userForm.name}
                                        onChange={(v) => setUserForm((prev) => ({ ...prev, name: v }))}
                                        placeholder="Full name"
                                    />
                                </div>
                                <div>
                                    <FieldLabel required>Email</FieldLabel>
                                    <Input
                                        value={userForm.email}
                                        onChange={(v) => setUserForm((prev) => ({ ...prev, email: v }))}
                                        placeholder="name@company.com"
                                    />
                                </div>
                                <div>
                                    <FieldLabel required>Role</FieldLabel>
                                    <Select
                                        value={userForm.role}
                                        onChange={(v) => setUserForm((prev) => ({ ...prev, role: v as AdminUser["role"] }))}
                                        options={userRoleOptions as string[]}
                                        placeholder="Select role"
                                    />
                                </div>
                                <div>
                                    <FieldLabel required>Status</FieldLabel>
                                    <Select
                                        value={userForm.status}
                                        onChange={(v) => setUserForm((prev) => ({ ...prev, status: v as AdminUser["status"] }))}
                                        options={userStatusOptions as string[]}
                                        placeholder="Select status"
                                    />
                                </div>
                            </div>

                            {userSubmitError && (
                                <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
                                    {userSubmitError}
                                </div>
                            )}

                            <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#e5e7eb] pt-6">
                                <button
                                    type="button"
                                    className="rounded-lg border border-black/10 bg-white px-4 py-2 text-sm text-[#0a0a0a] hover:bg-slate-50"
                                    onClick={() => {
                                        setIsUserModalOpen(false);
                                        resetUserForm();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="rounded-lg bg-[#155dfc] px-4 py-2 text-sm text-white hover:bg-[#1447e6]"
                                    onClick={onSaveUser}
                                >
                                    {userEditIndex === null ? "Add User" : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    )}
                </section>

                {/* System Configuration Card */}
                <section className="lg:col-span-12 rounded-2xl border border-black/10 bg-white p-6">
                    <h2 className="text-lg font-normal text-[#0a0a0a]">System Configuration</h2>

                    <div className="mt-10 grid gap-4 md:grid-cols-2">
                        {/* License Status */}
                        <div className="flex flex-col gap-2 rounded-xl border border-[#e5e7eb] p-4">
                            <p className="text-sm text-[#0a0a0a]">License Status</p>
                            <span
                                className={`inline-flex w-fit rounded-lg px-2 py-0.5 text-xs ${licenseStatus === "Active"
                                    ? "bg-[#dcfce7] text-[#008236]"
                                    : "bg-[#fee2e2] text-[#b42318]"
                                    }`}
                            >
                                {licenseStatus}
                            </span>
                            <p className="text-xs text-[#6a7282]">Expires: {licenseExpires}</p>
                        </div>

                        {/* Storage Usage */}
                        <div className="flex flex-col gap-2 rounded-xl border border-[#e5e7eb] p-4">
                            <p className="text-sm text-[#0a0a0a]">Storage Usage</p>
                            <p className="text-lg text-[#0a0a0a]">{used.toFixed(1)} GB / {total.toFixed(0)} GB</p>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-[#e5e7eb]">
                                <div className="h-full rounded-full bg-[#155dfc]" style={{ width: `${pct}%` }} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div >
    );
}

function getMaintenanceRecordCount(): number {
    if (typeof window === "undefined") return 0;
    try {
        const raw = window.localStorage.getItem("skymaintain.documentationSubmissions");
        if (!raw) return 0;
        const parsed = JSON.parse(raw) as MaintenanceSubmission[];
        if (!Array.isArray(parsed)) return 0;
        return parsed.filter((item) => item && typeof item.submittedAt === "string").length;
    } catch {
        return 0;
    }
}

function getSelectedAircraftRegistration(): string | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = window.localStorage.getItem("skymaintain.selectedAircraft");
        if (!raw) return null;
        const parsed = JSON.parse(raw) as SelectedAircraft;
        if (!parsed?.registration) return null;
        return parsed.registration;
    } catch {
        return null;
    }
}

function parseDateValue(value?: string): Date | null {
    if (!value) return null;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed;
}

function isWithinDays(date: Date, days: number): boolean {
    const now = Date.now();
    const delta = days * 24 * 60 * 60 * 1000;
    return date.getTime() >= now - delta && date.getTime() <= now;
}

function getComplianceRateForAircraft(registration: string | null): number {
    if (typeof window === "undefined") return 0;
    try {
        const raw = window.localStorage.getItem("skymaintain.documentationSubmissions");
        if (!raw) return 0;
        const parsed = JSON.parse(raw) as ComplianceSubmission[];
        if (!Array.isArray(parsed) || parsed.length === 0) return 0;
        const records = registration
            ? parsed.filter((item) => item?.aircraftRegistration === registration)
            : parsed;
        if (!records.length) return 0;
        const compliant = records.filter((item) => {
            const date = parseDateValue(item?.maintenanceDate);
            if (!date) return false;
            return isWithinDays(date, 365);
        }).length;
        return Math.round((compliant / records.length) * 100);
    } catch {
        return 0;
    }
}