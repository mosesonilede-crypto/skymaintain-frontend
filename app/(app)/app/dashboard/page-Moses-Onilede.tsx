/**
 * @skymain.design
 * fileKey: qz3ERP8jfbTpTHQrdPSawI
 * nodeId: 2:1439
 * specHash: sha256:main-dashboard-v1
 */

"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
    Activity,
    AlertTriangle,
    Bell,
    Bot,
    Calendar,
    CalendarClock,
    ChevronDown,
    ClipboardCheck,
    Clock,
    Cog,
    DollarSign,
    ExternalLink,
    EyeOff,
    MapPin,
    Menu,
    Plane,
    Printer,
    Settings,
    User,
    Wrench,
    Building2,
} from "lucide-react";

export default function DashboardPage() {
    const [privacyMode, setPrivacyMode] = useState(false);
    const [showAircraftSelector, setShowAircraftSelector] = useState(false);
    const [selectedAircraft, setSelectedAircraft] = useState({ registration: "N123AB", type: "Boeing 737-800" });
    const [showNotifications, setShowNotifications] = useState(false);
    const router = useRouter();

    // Available aircraft for selection
    const availableAircraft = [
        { registration: "N123AB", type: "Boeing 737-800" },
        { registration: "N456CD", type: "Airbus A320" },
        { registration: "N789EF", type: "Boeing 787-9" },
        { registration: "N321GH", type: "Embraer E190" },
    ];

    // Sample notifications
    const notifications = [
        { id: 1, title: "Critical Alert", message: "Hydraulic system pressure low on N123AB", time: "2 mins ago", type: "critical" },
        { id: 2, title: "Maintenance Due", message: "Scheduled inspection for N456CD in 3 days", time: "15 mins ago", type: "warning" },
        { id: 3, title: "Document Expiring", message: "Airworthiness certificate renewal needed", time: "1 hour ago", type: "warning" },
        { id: 4, title: "Task Completed", message: "Engine inspection signed off by technician", time: "2 hours ago", type: "info" },
        { id: 5, title: "System Update", message: "AI model updated to v2.1.0", time: "3 hours ago", type: "info" },
    ];

    // Handle aircraft selection
    const handleSelectAircraft = useCallback((aircraft: { registration: string; type: string }) => {
        setSelectedAircraft(aircraft);
        setShowAircraftSelector(false);
    }, []);

    // Handle notification click
    const handleNotificationClick = useCallback(() => {
        // Navigate to alerts page
        router.push("/app/alerts");
        setShowNotifications(false);
    }, [router]);

    return (
        <div className="flex min-h-screen flex-col" data-name="SkyMaintain Main Dashboard" data-node-id="2:1439">
            {/* Dashboard Header Bar - Matches node 2:2031 */}
            <header
                className="flex items-center justify-between border-b px-6 py-4"
                style={{ borderColor: "#e5e7eb", backgroundColor: "#fff" }}
                data-name="App"
                data-node-id="2:2031"
            >
                <div className="flex items-center gap-4" data-name="Container" data-node-id="2:2033">
                    {/* Menu Button */}
                    <Link
                        href="/app"
                        className="flex h-8 items-center gap-2 rounded-lg border px-3 text-sm"
                        style={{ borderColor: "rgba(0,0,0,0.1)", color: "#0a0a0a" }}
                        data-name="Button"
                        data-node-id="2:2034"
                    >
                        <Menu className="h-4 w-4" aria-hidden="true" />
                        <span>Menu</span>
                    </Link>

                    {/* Airline Info */}
                    <div
                        className="flex items-center gap-2 border-r pr-4"
                        style={{ borderColor: "#e5e7eb" }}
                        data-name="Container"
                        data-node-id="2:2040"
                    >
                        <Building2 className="h-4 w-4 text-[#155dfc]" aria-hidden="true" />
                        <div>
                            <p className="text-sm" style={{ color: "#0a0a0a" }}>SkyWings Airlines</p>
                            <p className="text-xs" style={{ color: "#6a7282" }}>License: Active</p>
                        </div>
                    </div>

                    {/* Aircraft Selector */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowAircraftSelector(!showAircraftSelector)}
                            className="flex items-center gap-3 rounded-[10px] border px-4 py-2"
                            style={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb" }}
                            data-name="Button"
                            data-node-id="2:2054"
                        >
                            <Plane className="h-5 w-5 text-[#155dfc]" aria-hidden="true" />
                            <div className="text-left">
                                <p className="text-sm" style={{ color: "#0a0a0a" }}>{selectedAircraft.registration}</p>
                                <p className="text-xs" style={{ color: "#6a7282" }}>{selectedAircraft.type}</p>
                            </div>
                            <ChevronDown
                                className={`h-4 w-4 transition-transform ${showAircraftSelector ? "rotate-180" : ""}`}
                                aria-hidden="true"
                            />
                        </button>
                        {/* Aircraft Dropdown */}
                        {showAircraftSelector && (
                            <div
                                className="absolute left-0 top-full z-50 mt-2 w-64 rounded-lg border bg-white shadow-lg"
                                style={{ borderColor: "#e5e7eb" }}
                            >
                                <div className="p-2">
                                    <p className="px-3 py-2 text-xs font-medium" style={{ color: "#6a7282" }}>Select Aircraft</p>
                                    {availableAircraft.map((aircraft) => (
                                        <button
                                            key={aircraft.registration}
                                            type="button"
                                            onClick={() => handleSelectAircraft(aircraft)}
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-[#f9fafb] transition-colors"
                                            style={{
                                                backgroundColor: selectedAircraft.registration === aircraft.registration ? "#eff6ff" : "transparent",
                                            }}
                                        >
                                            <Plane className="h-4 w-4 text-[#155dfc]" aria-hidden="true" />
                                            <div>
                                                <p className="text-sm" style={{ color: "#0a0a0a" }}>{aircraft.registration}</p>
                                                <p className="text-xs" style={{ color: "#6a7282" }}>{aircraft.type}</p>
                                            </div>
                                            {selectedAircraft.registration === aircraft.registration && (
                                                <span className="ml-auto text-[#155dfc]">✓</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Header Actions */}
                <div className="flex items-center gap-3" data-name="Container" data-node-id="2:2064">
                    {/* Print Report Button */}
                    <Link
                        href="/app/print-report"
                        className="flex h-8 items-center gap-2 rounded-lg border px-3 text-xs"
                        style={{ borderColor: "rgba(0,0,0,0.1)", color: "#0a0a0a" }}
                        data-name="Button"
                        data-node-id="2:2065"
                    >
                        <Printer className="h-4 w-4" aria-hidden="true" />
                        <span>Print Report</span>
                    </Link>

                    {/* Privacy Mode Button */}
                    <button
                        type="button"
                        onClick={() => setPrivacyMode(!privacyMode)}
                        className="flex h-8 items-center gap-2 rounded-lg border px-3 text-xs"
                        style={{
                            borderColor: "rgba(0,0,0,0.1)",
                            color: "#0a0a0a",
                            backgroundColor: privacyMode ? "#eff6ff" : "#fff",
                        }}
                        data-name="Button"
                        data-node-id="2:2072"
                    >
                        <EyeOff className="h-4 w-4" aria-hidden="true" />
                        <span>Privacy Mode</span>
                    </button>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative flex h-8 w-9 items-center justify-center rounded-lg border"
                            style={{ borderColor: "rgba(0,0,0,0.1)" }}
                            data-name="Button"
                            data-node-id="2:2080"
                        >
                            <Bell className="h-4 w-4" aria-hidden="true" />
                            <span
                                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white"
                                style={{ backgroundColor: "#e7000b" }}
                            >
                                {notifications.length}
                            </span>
                        </button>
                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div
                                className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border bg-white shadow-lg"
                                style={{ borderColor: "#e5e7eb" }}
                            >
                                <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: "#e5e7eb" }}>
                                    <p className="font-medium" style={{ color: "#0a0a0a" }}>Notifications</p>
                                    <Link
                                        href="/app/alerts"
                                        className="text-xs hover:underline"
                                        style={{ color: "#155dfc" }}
                                        onClick={() => setShowNotifications(false)}
                                    >
                                        View All
                                    </Link>
                                </div>
                                <div className="max-h-80 overflow-auto">
                                    {notifications.map((notification) => (
                                        <button
                                            key={notification.id}
                                            type="button"
                                            onClick={handleNotificationClick}
                                            className="flex w-full items-start gap-3 border-b px-4 py-3 text-left hover:bg-[#f9fafb] transition-colors"
                                            style={{ borderColor: "#e5e7eb" }}
                                        >
                                            <div
                                                className="mt-1 h-2 w-2 shrink-0 rounded-full"
                                                style={{
                                                    backgroundColor: notification.type === "critical" ? "#e7000b" :
                                                        notification.type === "warning" ? "#f59e0b" : "#155dfc"
                                                }}
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium" style={{ color: "#0a0a0a" }}>{notification.title}</p>
                                                <p className="text-xs" style={{ color: "#4a5565" }}>{notification.message}</p>
                                                <p className="mt-1 text-xs" style={{ color: "#6a7282" }}>{notification.time}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <div className="border-t px-4 py-2" style={{ borderColor: "#e5e7eb" }}>
                                    <Link
                                        href="/app/settings?section=notifications"
                                        className="block w-full text-center text-xs hover:underline"
                                        style={{ color: "#6a7282" }}
                                        onClick={() => setShowNotifications(false)}
                                    >
                                        Notification Settings
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6" style={{ backgroundColor: "#f9fafb" }}>
                {/* Stats Cards Row - Matches node 2:1444 */}
                <div className="mb-6 grid grid-cols-3 gap-6" data-name="Container" data-node-id="2:1444">
                    {/* Active Alerts Card */}
                    <div
                        className="flex flex-col gap-3 rounded-[10px] border bg-white p-5 shadow-sm"
                        style={{ borderColor: "#e5e7eb" }}
                        data-name="Container"
                        data-node-id="2:1445"
                    >
                        <div className="flex items-center justify-between">
                            <div
                                className="flex h-9 w-9 items-center justify-center rounded-[10px]"
                                style={{ backgroundColor: "#fef2f2" }}
                            >
                                <AlertTriangle className="h-5 w-5 text-[#f54900]" aria-hidden="true" />
                            </div>
                            <span
                                className="rounded-lg px-2 py-1 text-xs"
                                style={{ backgroundColor: "#ffe2e2", color: "#c10007" }}
                            >
                                Critical
                            </span>
                        </div>
                        <p className="text-2xl" style={{ color: "#0a0a0a" }}>
                            {privacyMode ? "•••" : "0"}
                        </p>
                        <p className="text-sm" style={{ color: "#4a5565" }}>Active Alerts</p>
                    </div>

                    {/* Upcoming Tasks Card */}
                    <div
                        className="flex flex-col gap-3 rounded-[10px] border bg-white p-5 shadow-sm"
                        style={{ borderColor: "#e5e7eb" }}
                        data-name="Container"
                        data-node-id="2:1458"
                    >
                        <div className="flex items-center justify-between">
                            <div
                                className="flex h-9 w-9 items-center justify-center rounded-[10px]"
                                style={{ backgroundColor: "#fefce8" }}
                            >
                                <CalendarClock className="h-5 w-5 text-[#155dfc]" aria-hidden="true" />
                            </div>
                            <span
                                className="rounded-lg px-2 py-1 text-xs"
                                style={{ backgroundColor: "#fef9c2", color: "#a65f00" }}
                            >
                                Scheduled
                            </span>
                        </div>
                        <p className="text-2xl" style={{ color: "#0a0a0a" }}>
                            {privacyMode ? "•••" : "0"}
                        </p>
                        <p className="text-sm" style={{ color: "#4a5565" }}>Upcoming Tasks</p>
                    </div>

                    {/* Aircraft Health Card */}
                    <div
                        className="flex flex-col gap-3 rounded-[10px] border bg-white p-5 shadow-sm"
                        style={{ borderColor: "#e5e7eb" }}
                        data-name="Container"
                        data-node-id="2:1473"
                    >
                        <div className="flex items-center justify-between">
                            <div
                                className="flex h-9 w-9 items-center justify-center rounded-[10px]"
                                style={{ backgroundColor: "#f0fdf4" }}
                            >
                                <Activity className="h-5 w-5 text-[#00a63e]" aria-hidden="true" />
                            </div>
                            <span
                                className="rounded-lg px-2 py-1 text-xs"
                                style={{ backgroundColor: "#dcfce7", color: "#008236" }}
                            >
                                Good
                            </span>
                        </div>
                        <p className="text-2xl" style={{ color: "#0a0a0a" }}>
                            {privacyMode ? "•••" : "95%"}
                        </p>
                        <p className="text-sm" style={{ color: "#4a5565" }}>Aircraft Health</p>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="flex flex-col gap-6">
                        {/* Aircraft Details Card */}
                        <div
                            className="rounded-[10px] border bg-white"
                            style={{ borderColor: "#e5e7eb" }}
                            data-name="Card"
                            data-node-id="2:1489"
                        >
                            {/* Card Header */}
                            <div className="flex items-center justify-between p-6 pb-0">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                                        style={{ backgroundColor: "#eff6ff" }}
                                    >
                                        <Plane className="h-6 w-6 text-[#155dfc]" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold" style={{ color: "#0a0a0a" }}>
                                            Aircraft Details
                                        </h3>
                                        <p className="text-sm" style={{ color: "#6a7282" }}>
                                            Current Selection Overview
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href="/app/settings/aircraft-fleet"
                                    className="flex h-8 items-center gap-2 rounded-lg border px-3 text-sm"
                                    style={{ borderColor: "rgba(0,0,0,0.1)", color: "#0a0a0a" }}
                                >
                                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                                    Full Details
                                </Link>
                            </div>

                            {/* Registration Info */}
                            <div className="mx-6 mt-6 rounded-[10px] border p-4" style={{ borderColor: "#e5e7eb" }}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs" style={{ color: "#6a7282" }}>Registration Number</p>
                                        <p className="text-xl font-semibold" style={{ color: "#0a0a0a" }}>
                                            {privacyMode ? "••••••" : "N123AB"}
                                        </p>
                                    </div>
                                    <span
                                        className="rounded-lg px-2 py-1 text-xs"
                                        style={{ backgroundColor: "#dcfce7", color: "#008236" }}
                                    >
                                        Active
                                    </span>
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs" style={{ color: "#6a7282" }}>Model:</p>
                                        <p className="text-sm" style={{ color: "#0a0a0a" }}>Boeing 737-800</p>
                                    </div>
                                    <div>
                                        <p className="text-xs" style={{ color: "#6a7282" }}>Serial Number:</p>
                                        <p className="text-sm" style={{ color: "#0a0a0a" }}>
                                            {privacyMode ? "••••••••••" : "B737-30234"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Overall Health Status */}
                            <div className="m-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Activity className="h-4 w-4 text-[#00a63e]" aria-hidden="true" />
                                        <span className="text-sm" style={{ color: "#0a0a0a" }}>Overall Health Status</span>
                                    </div>
                                    <span className="text-xl font-semibold" style={{ color: "#008236" }}>
                                        {privacyMode ? "••" : "95%"}
                                    </span>
                                </div>
                                <div className="mt-2 h-3 w-full overflow-hidden rounded-full" style={{ backgroundColor: "#e5e7eb" }}>
                                    <div
                                        className="h-full rounded-full"
                                        style={{ width: "95%", backgroundColor: "#22c55e" }}
                                    />
                                </div>
                                <p className="mt-2 text-xs" style={{ color: "#6a7282" }}>
                                    Excellent condition - all systems nominal
                                </p>
                            </div>

                            {/* Location & Status Grid */}
                            <div className="mx-6 mb-6 grid grid-cols-2 gap-4">
                                <div className="rounded-[10px] border p-4" style={{ borderColor: "#e5e7eb" }}>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" aria-hidden="true" />
                                        <span className="text-xs" style={{ color: "#6a7282" }}>Location</span>
                                    </div>
                                    <p className="mt-2 text-sm" style={{ color: "#0a0a0a" }}>
                                        {privacyMode ? "••••••••••••" : "JFK International Airport"}
                                    </p>
                                </div>
                                <div className="rounded-[10px] border p-4" style={{ borderColor: "#e5e7eb" }}>
                                    <div className="flex items-center gap-2">
                                        <Plane className="h-4 w-4 text-[#155dfc]" aria-hidden="true" />
                                        <span className="text-xs" style={{ color: "#6a7282" }}>Status</span>
                                    </div>
                                    <p className="mt-2 text-sm" style={{ color: "#0a0a0a" }}>On Ground</p>
                                </div>
                                <div className="rounded-[10px] border p-4" style={{ borderColor: "#e5e7eb" }}>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" aria-hidden="true" />
                                        <span className="text-xs" style={{ color: "#6a7282" }}>Total Hours</span>
                                    </div>
                                    <p className="mt-2 text-sm" style={{ color: "#0a0a0a" }}>
                                        {privacyMode ? "••••••" : "24,680 hrs"}
                                    </p>
                                </div>
                                <div className="rounded-[10px] border p-4" style={{ borderColor: "#e5e7eb" }}>
                                    <div className="flex items-center gap-2">
                                        <Settings className="h-4 w-4" aria-hidden="true" />
                                        <span className="text-xs" style={{ color: "#6a7282" }}>Total Cycles</span>
                                    </div>
                                    <p className="mt-2 text-sm" style={{ color: "#0a0a0a" }}>
                                        {privacyMode ? "••••••" : "12,450"}
                                    </p>
                                </div>
                            </div>

                            {/* Engine Health */}
                            <div className="mx-6 mb-6 rounded-[10px] border p-4" style={{ borderColor: "#e5e7eb" }}>
                                <div className="flex items-center gap-2">
                                    <Cog className="h-4 w-4" aria-hidden="true" />
                                    <span className="text-sm font-semibold" style={{ color: "#0a0a0a" }}>Engine Health</span>
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs" style={{ color: "#6a7282" }}>Health Score:</p>
                                        <p className="text-lg font-semibold" style={{ color: "#008236" }}>
                                            {privacyMode ? "••" : "94%"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs" style={{ color: "#6a7282" }}>Status:</p>
                                        <span
                                            className="mt-1 inline-block rounded-lg px-2 py-1 text-xs"
                                            style={{ backgroundColor: "#dcfce7", color: "#008236" }}
                                        >
                                            Normal
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs" style={{ color: "#6a7282" }}>Temperature:</p>
                                        <p className="text-sm" style={{ color: "#0a0a0a" }}>450°C</p>
                                    </div>
                                    <div>
                                        <p className="text-xs" style={{ color: "#6a7282" }}>Oil Pressure:</p>
                                        <p className="text-sm" style={{ color: "#0a0a0a" }}>45 PSI</p>
                                    </div>
                                </div>
                            </div>

                            {/* Upcoming Maintenance */}
                            <div
                                className="mx-6 mb-6 rounded-[10px] p-4"
                                style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe" }}
                            >
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" aria-hidden="true" />
                                    <span className="text-sm font-semibold" style={{ color: "#1447e6" }}>
                                        Upcoming Maintenance
                                    </span>
                                </div>
                                <p className="mt-2 text-sm" style={{ color: "#0a0a0a" }}>March 15, 2026</p>
                                <p className="text-xs" style={{ color: "#6a7282" }}>A-Check due in 50 days</p>
                            </div>
                        </div>

                        {/* System Health Panel */}
                        <div
                            className="rounded-[10px] border bg-white p-6"
                            style={{ borderColor: "#e5e7eb" }}
                            data-name="Card"
                            data-node-id="2:1614"
                        >
                            <h3 className="mb-6 text-lg font-semibold" style={{ color: "#0a0a0a" }}>
                                System Health
                            </h3>
                            <div className="flex flex-col gap-4">
                                {[
                                    { name: "Engine", health: 94 },
                                    { name: "Landing Gear", health: 96 },
                                    { name: "Hydraulic System", health: 88 },
                                    { name: "Fuel System", health: 97 },
                                    { name: "Avionics", health: 100 },
                                    { name: "Electrical System", health: 93 },
                                    { name: "APU", health: 91 },
                                ].map((system) => (
                                    <div key={system.name}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Settings className="h-4 w-4" aria-hidden="true" />
                                                <span className="text-sm" style={{ color: "#0a0a0a" }}>{system.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm" style={{ color: "#6a7282" }}>
                                                    {privacyMode ? "••" : `${system.health}%`}
                                                </span>
                                                <span
                                                    className="rounded-lg px-2 py-1 text-xs"
                                                    style={{ backgroundColor: "#dcfce7", color: "#008236" }}
                                                >
                                                    OPERATIONAL
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: "#e5e7eb" }}>
                                            <div
                                                className="h-full rounded-full"
                                                style={{ width: `${system.health}%`, backgroundColor: "#22c55e" }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Maintenance Details */}
                    <div
                        className="rounded-[10px] border bg-white"
                        style={{ borderColor: "#e5e7eb" }}
                        data-name="Card"
                        data-node-id="2:1722"
                    >
                        {/* Card Header */}
                        <div className="flex items-center gap-4 p-6 pb-0">
                            <div
                                className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                                style={{ backgroundColor: "#fef2f2" }}
                            >
                                <Wrench className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold" style={{ color: "#0a0a0a" }}>
                                    Maintenance Details
                                </h3>
                                <p className="text-sm" style={{ color: "#6a7282" }}>
                                    Tasks, Alerts & Schedule
                                </p>
                            </div>
                        </div>

                        {/* Critical Alerts Section */}
                        <div className="m-6 rounded-[10px] border p-4" style={{ borderColor: "#e5e7eb" }}>
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-[#f54900]" aria-hidden="true" />
                                <span className="text-sm font-semibold" style={{ color: "#0a0a0a" }}>Critical Alerts</span>
                                <span
                                    className="flex h-5 w-5 items-center justify-center rounded-full text-xs text-white"
                                    style={{ backgroundColor: "#e7000b" }}
                                >
                                    1
                                </span>
                            </div>
                            <div className="mt-4 rounded-lg p-4" style={{ backgroundColor: "#fef2f2" }}>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm" style={{ color: "#0a0a0a" }}>
                                        Hydraulic System - Left Main Gear
                                    </span>
                                    <span
                                        className="rounded-lg px-2 py-1 text-xs text-white"
                                        style={{ backgroundColor: "#f59e0b" }}
                                    >
                                        78%
                                    </span>
                                </div>
                                <p className="mt-2 text-xs" style={{ color: "#6a7282" }}>
                                    Seal failure likely within 200 flight hours
                                </p>
                                <div className="mt-2 flex items-center gap-2">
                                    <Clock className="h-3 w-3" aria-hidden="true" />
                                    <span className="text-xs" style={{ color: "#6a7282" }}>Timeframe: 2-3 months</span>
                                </div>
                                <div className="mt-2 rounded-lg p-2" style={{ backgroundColor: "#fff7ed" }}>
                                    <span className="text-xs font-semibold" style={{ color: "#c2410c" }}>Action: </span>
                                    <span className="text-xs" style={{ color: "#c2410c" }}>
                                        Schedule hydraulic seal replacement during next maintenance window
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Scheduled Maintenance */}
                        <div className="mx-6 mb-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" aria-hidden="true" />
                                <span className="text-sm font-semibold" style={{ color: "#0a0a0a" }}>
                                    Upcoming Scheduled Maintenance
                                </span>
                            </div>
                            <div className="mt-4 flex flex-col gap-4">
                                {[
                                    { check: "A-CHECK", nextDue: "3/14/2026", daysUntil: 50, remaining: "425 hours / 190 cycles" },
                                    { check: "B-CHECK", nextDue: "8/19/2026", daysUntil: 208, remaining: "1850 hours / 720 cycles" },
                                    { check: "C-CHECK", nextDue: "5/14/2027", daysUntil: 476, remaining: "4200 hours / 1650 cycles" },
                                ].map((item) => (
                                    <div key={item.check} className="rounded-lg border p-4" style={{ borderColor: "#e5e7eb" }}>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-semibold" style={{ color: "#0a0a0a" }}>{item.check}</span>
                                            <span
                                                className="rounded-lg px-2 py-1 text-xs"
                                                style={{ backgroundColor: "#eff6ff", color: "#1447e6" }}
                                            >
                                                Current
                                            </span>
                                        </div>
                                        <div className="mt-2 grid grid-cols-2 gap-2">
                                            <div>
                                                <p className="text-xs" style={{ color: "#6a7282" }}>Next Due:</p>
                                                <p className="text-xs" style={{ color: "#0a0a0a" }}>{item.nextDue}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs" style={{ color: "#6a7282" }}>Days Until Due:</p>
                                                <p className="text-xs" style={{ color: "#0a0a0a" }}>{item.daysUntil} days</p>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-xs" style={{ color: "#6a7282" }}>{item.remaining} remaining</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Maintenance Tasks */}
                        <div className="mx-6 mb-6">
                            <div className="flex items-center gap-2">
                                <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
                                <span className="text-sm font-semibold" style={{ color: "#0a0a0a" }}>
                                    Recent Maintenance Tasks
                                </span>
                            </div>
                            <div className="mt-4 flex flex-col gap-4">
                                {/* Task 1 */}
                                <div className="rounded-lg border p-4" style={{ borderColor: "#e5e7eb" }}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm" style={{ color: "#0a0a0a" }}>A-Check Inspection</span>
                                            <span
                                                className="rounded-lg px-2 py-1 text-xs"
                                                style={{ backgroundColor: "#dcfce7", color: "#008236" }}
                                            >
                                                Completed
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm" style={{ color: "#0a0a0a" }}>
                                                {privacyMode ? "•••••" : "$8,500"}
                                            </p>
                                            <p className="text-xs" style={{ color: "#6a7282" }}>18h</p>
                                        </div>
                                    </div>
                                    <p className="mt-1 text-xs" style={{ color: "#6a7282" }}>12/9/2025</p>
                                    <p className="mt-2 text-xs" style={{ color: "#6a7282" }}>
                                        Complete A-Check including visual inspection, lubrication, and minor repairs
                                    </p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <User className="h-3 w-3" aria-hidden="true" />
                                        <span className="text-xs" style={{ color: "#6a7282" }}>By: John Anderson</span>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-xs font-semibold" style={{ color: "#0a0a0a" }}>Parts Replaced:</p>
                                        <div className="mt-1 flex items-center justify-between">
                                            <span className="text-xs" style={{ color: "#6a7282" }}>• Brake Pad Assembly (x4)</span>
                                            <span className="text-xs" style={{ color: "#6a7282" }}>
                                                {privacyMode ? "••••" : "$1200"}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs" style={{ color: "#6a7282" }}>• Oil Filter (x2)</span>
                                            <span className="text-xs" style={{ color: "#6a7282" }}>
                                                {privacyMode ? "••" : "$85"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Task 2 */}
                                <div className="rounded-lg border p-4" style={{ borderColor: "#e5e7eb" }}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm" style={{ color: "#0a0a0a" }}>Avionics Software Update</span>
                                            <span
                                                className="rounded-lg px-2 py-1 text-xs"
                                                style={{ backgroundColor: "#dcfce7", color: "#008236" }}
                                            >
                                                Completed
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm" style={{ color: "#0a0a0a" }}>
                                                {privacyMode ? "•••••" : "$1,200"}
                                            </p>
                                            <p className="text-xs" style={{ color: "#6a7282" }}>4h</p>
                                        </div>
                                    </div>
                                    <p className="mt-1 text-xs" style={{ color: "#6a7282" }}>11/4/2025</p>
                                    <p className="mt-2 text-xs" style={{ color: "#6a7282" }}>
                                        Critical avionics software update for FMS and TCAS systems
                                    </p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <User className="h-3 w-3" aria-hidden="true" />
                                        <span className="text-xs" style={{ color: "#6a7282" }}>By: Sarah Williams</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Stats */}
                        <div className="mx-6 mb-6 grid grid-cols-2 gap-4">
                            <div className="rounded-[10px] border p-4" style={{ borderColor: "#e5e7eb" }}>
                                <div className="flex items-center gap-2">
                                    <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                                    <span className="text-xs" style={{ color: "#6a7282" }}>Total Tasks</span>
                                </div>
                                <p className="mt-2 text-xl font-semibold" style={{ color: "#0a0a0a" }}>2</p>
                            </div>
                            <div className="rounded-[10px] border p-4" style={{ borderColor: "#e5e7eb" }}>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" aria-hidden="true" />
                                    <span className="text-xs" style={{ color: "#6a7282" }}>Total Cost</span>
                                </div>
                                <p className="mt-2 text-xl font-semibold" style={{ color: "#0a0a0a" }}>
                                    {privacyMode ? "••••••" : "$9,700"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer - Matches node 2:1919 */}
            <footer
                className="border-t py-4 text-center text-xs"
                style={{ borderColor: "#e5e7eb", color: "#6a7282" }}
                data-name="Footer"
                data-node-id="2:1919"
            >
                © 2026 <span style={{ color: "#1447e6" }}>SkyMaintain</span> - All Rights Reserved | Regulatory-Compliant Aircraft Maintenance Platform
            </footer>

            {/* AI Assistant Floating Button - Matches node 2:2086 */}
            <Link
                href="/app/insights"
                className="fixed bottom-6 right-6 flex h-10 items-center gap-2 rounded-full px-4 shadow-lg"
                style={{ backgroundColor: "#1447e6", color: "#fff" }}
                data-name="Button"
                data-node-id="2:2086"
            >
                <div className="relative">
                    <Bot className="h-6 w-6" aria-hidden="true" />
                    <span
                        className="absolute -right-1 -top-1 h-3 w-3 rounded-full"
                        style={{ backgroundColor: "#22c55e" }}
                    />
                </div>
                <span className="text-sm">AI Assistant</span>
            </Link>
        </div>
    );
}
