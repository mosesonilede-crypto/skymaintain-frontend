/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import AppSidebarNav from "@/components/app/AppSidebarNav";

// Figma assets for sidebar (node 2:1304)
const imageManager = "https://www.figma.com/api/mcp/asset/33f59d94-828a-4bdd-9b3c-ed6a7bee9d45";
const iconLogoVector = "https://www.figma.com/api/mcp/asset/68dd531d-abf9-4e4c-99cc-9c18277e8bc9";
const iconClose = "https://www.figma.com/api/mcp/asset/eee31f60-7f3c-4651-b928-9ead5dd273b2";
const iconDashboard = "https://www.figma.com/api/mcp/asset/d977b676-f352-4481-8c41-164bb86ea5f6";
const iconDocs = "https://www.figma.com/api/mcp/asset/208c63e8-727c-413b-bf69-c41c01799eb7";
const iconAlerts = "https://www.figma.com/api/mcp/asset/6d4b154a-efd3-4ce6-bd27-62e8225bbb25";
const iconLogs = "https://www.figma.com/api/mcp/asset/2739dbf9-3109-4830-8e78-ab9e6106bcd7";
const iconReports = "https://www.figma.com/api/mcp/asset/4b7c76e7-7ecd-417b-a918-088c3d086e23";
const iconCompliance = "https://www.figma.com/api/mcp/asset/e9d6fedb-8bc9-4733-bf54-213016039ee5";
const iconInsights = "https://www.figma.com/api/mcp/asset/09c2464d-9aa9-4676-9fbf-5a4334ffdac8";
const iconSettings = "https://www.figma.com/api/mcp/asset/5b34140e-ca1f-4431-8422-6f868881b54f";
const iconAdmin = "https://www.figma.com/api/mcp/asset/6d7cf294-c515-4b9a-a6e3-e35eccb279e9";
const iconLogout = "https://www.figma.com/api/mcp/asset/92fe6bd1-e788-46bf-96ab-d7ff41a9ccc1";

const navItems = [
    { href: "/app/dashboard", label: "Dashboard", icon: <img alt="" className="h-5 w-5" src={iconDashboard} /> },
    { href: "/app/docs", label: "Documentation", icon: <img alt="" className="h-5 w-5" src={iconDocs} /> },
    { href: "/app/alerts", label: "Predictive Alerts", icon: <img alt="" className="h-5 w-5" src={iconAlerts} /> },
    { href: "/app/logs", label: "Maintenance Logs", icon: <img alt="" className="h-5 w-5" src={iconLogs} /> },
    { href: "/app/reports", label: "Reports", icon: <img alt="" className="h-5 w-5" src={iconReports} /> },
    { href: "/app/compliance", label: "Regulatory Compliance", icon: <img alt="" className="h-5 w-5" src={iconCompliance} />, tall: true },
    { href: "/app/insights", label: "AI Insights", icon: <img alt="" className="h-5 w-5" src={iconInsights} /> },
    { href: "/app/settings", label: "Settings", icon: <img alt="" className="h-5 w-5" src={iconSettings} /> },
    { href: "/app/admin-panel", label: "Admin Panel", icon: <img alt="" className="h-5 w-5" src={iconAdmin} /> },
];

type AppShellClientProps = {
    children: React.ReactNode;
};

export default function AppShellClient({ children }: AppShellClientProps) {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    return (
        <div className="min-h-dvh bg-white text-[#0a0a0a]">
            <div className="flex min-h-dvh">
                {sidebarVisible && (
                    <aside className="w-64 shrink-0 border-r border-[#e5e7eb] bg-white">
                        <div className="border-b border-[#e5e7eb]">
                            <div className="px-6 pt-6 pb-[0.8px]">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="size-9 rounded-[10px] shadow-lg" style={{ background: "linear-gradient(135deg, #155dfc 0%, #1447e6 100%)" }}>
                                            <div className="flex h-full w-full items-center justify-center">
                                                <img src={iconLogoVector} alt="" className="h-5 w-5" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-[18px] leading-7 text-[#0a0a0a]">SkyMaintain</div>
                                            <div className="text-[12px] leading-4 text-[#6a7282]">v1.0</div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSidebarVisible(false)}
                                        className="h-8 w-9 rounded-[8px] flex items-center justify-center"
                                        aria-label="Collapse sidebar"
                                    >
                                        <img src={iconClose} alt="" className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <AppSidebarNav items={navItems} />

                        <div className="mt-auto border-t border-[#e5e7eb]">
                            <div className="px-4 pt-[16.8px]">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 overflow-hidden rounded-full">
                                        <img src={imageManager} alt="" className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="text-[14px] leading-5 text-[#0a0a0a]">manager</div>
                                        <div className="text-[12px] leading-4 text-[#6a7282]">Fleet Manager</div>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="mt-3 flex h-8 w-full items-center justify-center gap-2 rounded-[8px] border border-black/10 bg-white text-[14px] text-[#0a0a0a]"
                                >
                                    <img src={iconLogout} alt="" className="h-4 w-4" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </aside>
                )}

                <div className="relative flex min-w-0 flex-1 bg-[#f9fafb]">
                    {!sidebarVisible && (
                        <button
                            type="button"
                            onClick={() => setSidebarVisible(true)}
                            className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-[10px] border border-[#e5e7eb] bg-white px-3 py-2 text-[12px] text-[#0a0a0a] shadow-sm"
                            aria-label="Open sidebar"
                        >
                            <img src={iconLogoVector} alt="" className="h-4 w-4" />
                            Menu
                        </button>
                    )}
                    <div
                        className="flex w-full items-center justify-center"
                        style={{ background: "linear-gradient(143deg, #f3f4f6 0%, #e5e7eb 100%)" }}
                    >
                        <div className="w-full max-w-[907.2px] px-6 py-6">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
