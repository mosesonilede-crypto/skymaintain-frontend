/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useCallback } from "react";

// Figma asset URLs
const imgIconShield = "https://www.figma.com/api/mcp/asset/03ab655d-5b8f-4cb4-b21b-455fe8c6c12b";
const imgIconDocument = "https://www.figma.com/api/mcp/asset/41164b43-d9c1-4907-80cb-8066db468f7d";
const imgIconCheck = "https://www.figma.com/api/mcp/asset/26efef6a-2c2b-46fe-b784-0aa1af228b96";
const imgIconGlobe = "https://www.figma.com/api/mcp/asset/70c2f5cc-4b59-4ccf-b88b-2c5696cf9e9c";
const imgIconExternal = "https://www.figma.com/api/mcp/asset/965bf07d-0ef3-4d36-a401-f565755bf7be";
const imgIconInfo = "https://www.figma.com/api/mcp/asset/a1dcda6c-fb4e-405d-8742-2b592379dbec";
const imgIconRefresh = "https://www.figma.com/api/mcp/asset/214dc006-89ca-4d46-9ea6-9f0a0b82c444";
const imgIconBell = "https://www.figma.com/api/mcp/asset/653d6b8d-a67a-4d00-a4bd-451bc6ed83c8";
const imgIconFileAD = "https://www.figma.com/api/mcp/asset/99a58be3-b88d-41d0-b105-d51f4a669260";
const imgIconChevronDown = "https://www.figma.com/api/mcp/asset/317679c0-3699-4430-8d19-afe76b330e3c";
const imgIconCheckCircle = "https://www.figma.com/api/mcp/asset/dd740ebc-25e8-4887-a94b-5468aed78608";
const imgIconFileSB = "https://www.figma.com/api/mcp/asset/0b8b19e8-855f-4a17-83e1-90654a441f59";
const imgIconCertificate = "https://www.figma.com/api/mcp/asset/46f23e7c-bc9a-48b7-b96c-72a8917eacba";
const imgIconExternalGreen = "https://www.figma.com/api/mcp/asset/f24d5d2a-8034-4d92-93c0-de9e5a415a79";
const imgIconUSA = "https://www.figma.com/api/mcp/asset/2dd23a3e-9853-4c4f-8243-afa5dbb9bb13";
const imgIconEU = "https://www.figma.com/api/mcp/asset/1d920532-92f1-4c92-bfdf-6af2f5438eee";

// External regulatory URLs
const FAA_AD_DATABASE = "https://rgl.faa.gov/Regulatory_and_Guidance_Library/rgAD.nsf/MainFrame?OpenFrameSet";
const FAA_REGULATORY_LIBRARY = "https://www.faa.gov/regulations_policies/rulemaking/recently_published";
const FAA_AD_SEARCH = "https://rgl.faa.gov/Regulatory_and_Guidance_Library/rgAD.nsf/adSearch!OpenForm";
const FAA_SAFETY_ALERTS = "https://www.faa.gov/newsroom/safety-briefing";
const EASA_AD_PORTAL = "https://ad.easa.europa.eu/";
const EASA_AD_LIBRARY = "https://ad.easa.europa.eu/ad-listing";
const EASA_SAFETY_PUBLICATIONS = "https://www.easa.europa.eu/en/document-library/safety-publications";
const EASA_SAFETY_MANAGEMENT = "https://www.easa.europa.eu/en/domains/safety-management";
const ICAO_SAFETY_STANDARDS = "https://www.icao.int/safety/Pages/default.aspx";

// Data types
interface RegulatoryUpdate {
    type: "AD" | "SB";
    date: string;
    effectiveDate: string;
    title: string;
    description: string;
    id?: string;
}

interface AirworthinessDirective {
    id: string;
    description: string;
    authority: string;
    effectiveDate: string;
    complianceDate: string;
    status: "Compliant" | "Pending" | "Overdue";
}

interface ServiceBulletin {
    id: string;
    description: string;
    priority: "Mandatory" | "Recommended";
    issueDate: string;
    complianceDate?: string;
    status: "Compliant" | "Pending";
}

interface Certificate {
    name: string;
    number: string;
    expires: string;
    authority: string;
    status: "Valid" | "Expiring Soon" | "Expired";
}

// Sample data
const regulatoryUpdates: RegulatoryUpdate[] = [
    {
        type: "AD",
        date: "2026-01-20",
        effectiveDate: "2026-02-15",
        title: "New Airworthiness Directive FAA-2026-0124",
        description: "Wing spar inspection requirement for Boeing 737-800 series",
        id: "FAA-2026-0124",
    },
    {
        type: "SB",
        date: "2026-01-18",
        effectiveDate: "2026-02-01",
        title: "Service Bulletin Update: Hydraulic System Enhancement",
        description: "Updated procedures for hydraulic seal replacement",
        id: "SB-737-HYD-2026",
    },
];

const airworthinessDirectives: AirworthinessDirective[] = [
    {
        id: "FAA-2025-0234",
        description: "Wing Spar Inspection",
        authority: "FAA",
        effectiveDate: "4/14/2025",
        complianceDate: "4/11/2025",
        status: "Compliant",
    },
];

const serviceBulletins: ServiceBulletin[] = [
    {
        id: "SB-737-32-1234",
        description: "Hydraulic System Enhancement",
        priority: "Mandatory",
        issueDate: "6/14/2025",
        complianceDate: "8/19/2025",
        status: "Compliant",
    },
    {
        id: "SB-737-28-5678",
        description: "Fuel Tank Access Panel Inspection",
        priority: "Recommended",
        issueDate: "10/31/2025",
        status: "Pending",
    },
];

const certificates: Certificate[] = [
    {
        name: "Airworthiness Certificate",
        number: "AWC-2018-N123AB",
        expires: "6/14/2026",
        authority: "FAA",
        status: "Valid",
    },
    {
        name: "Registration Certificate",
        number: "REG-N123AB",
        expires: "6/9/2029",
        authority: "FAA",
        status: "Valid",
    },
    {
        name: "Insurance Certificate",
        number: "INS-SKY-2025-1234",
        expires: "12/31/2025",
        authority: "SkyInsure LLC",
        status: "Expiring Soon",
    },
];

export default function RegulatoryCompliancePage() {
    // State for collapsible sections
    const [showUpdates, setShowUpdates] = useState(true);
    const [expandedADs, setExpandedADs] = useState(true);
    const [expandedSBs, setExpandedSBs] = useState(true);
    const [expandedCerts, setExpandedCerts] = useState(true);
    const [lastChecked, setLastChecked] = useState("1/30/2026 at 2:44:37 PM");
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Handler for refreshing regulatory data
    const handleRefresh = useCallback(() => {
        setIsRefreshing(true);
        // Simulate API call
        setTimeout(() => {
            const now = new Date();
            setLastChecked(now.toLocaleDateString() + " at " + now.toLocaleTimeString());
            setIsRefreshing(false);
        }, 1500);
    }, []);

    // Handler for viewing update details
    const handleViewDetails = useCallback((update: RegulatoryUpdate) => {
        // Navigate to detail page or open modal
        const baseUrl = update.type === "AD" ? FAA_AD_DATABASE : FAA_REGULATORY_LIBRARY;
        window.open(baseUrl, "_blank", "noopener,noreferrer");
    }, []);

    // Handler for creating a task from an update
    const handleCreateTask = useCallback((update: RegulatoryUpdate) => {
        // Create task data for navigation to task creation page
        const taskData = {
            title: update.title,
            type: update.type,
            dueDate: update.effectiveDate,
            description: update.description,
        };
        // In production, this would navigate to the tasks page with pre-filled data
        console.log("Creating task:", taskData);
        alert(`Task created for: ${update.title}\nEffective Date: ${update.effectiveDate}`);
    }, []);

    // Handler for opening external links
    const handleExternalLink = useCallback((url: string) => {
        window.open(url, "_blank", "noopener,noreferrer");
    }, []);

    return (
        <div className="min-h-screen bg-[#f9fafb]">
            <div className="p-6 space-y-6">
                {/* Page Title */}
                <h1 className="text-2xl font-normal text-[#0a0a0a]">Regulatory Compliance</h1>

                {/* Main Card */}
                <div className="bg-white rounded-[14px] border border-[rgba(0,0,0,0.1)] shadow-sm p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-start gap-3">
                        <div
                            className="w-12 h-12 rounded-[14px] flex items-center justify-center shadow-lg"
                            style={{
                                backgroundImage: "linear-gradient(135deg, rgb(0, 166, 62) 0%, rgb(0, 153, 102) 100%)",
                            }}
                        >
                            <img src={imgIconShield} alt="" className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-normal text-[#0a0a0a]">Regulatory Compliance</h2>
                                <span className="px-2 py-0.5 bg-[#00a63e] text-white text-xs rounded-lg">
                                    Live Status
                                </span>
                            </div>
                            <p className="text-sm text-[#4a5565]">Aircraft: N123AB • Boeing 737-800</p>
                        </div>
                    </div>

                    {/* Airworthiness Status Section */}
                    <div
                        className="rounded-[14px] border-[1.6px] border-[#bedbff] p-6 space-y-4"
                        style={{
                            backgroundImage: "linear-gradient(163deg, rgb(239, 246, 255) 0%, rgb(238, 242, 255) 100%)",
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#155dfc] rounded-[10px] flex items-center justify-center">
                                <img src={imgIconDocument} alt="" className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-normal text-[#0a0a0a]">Airworthiness Status</h3>
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#00a63e] text-white text-xs rounded-lg">
                                        <img src={imgIconCheck} alt="" className="w-3 h-3" />
                                        Airworthy
                                    </span>
                                    <span className="text-xs text-[#4a5565]">Certificate: AWC-2018-N123AB</span>
                                </div>
                            </div>
                        </div>

                        {/* Status Cards */}
                        <div className="grid grid-cols-4 gap-4">
                            <div className="bg-white border border-[#dbeafe] rounded-[10px] p-3 text-center">
                                <p className="text-xs text-[#4a5565] mb-2">Certificate Status</p>
                                <span className="px-2 py-0.5 bg-[#dcfce7] text-[#008236] text-xs rounded-lg">
                                    Valid
                                </span>
                            </div>
                            <div className="bg-white border border-[#dbeafe] rounded-[10px] p-3 text-center">
                                <p className="text-xs text-[#4a5565] mb-1">Certificate Expiry</p>
                                <p className="text-sm text-[#0a0a0a]">6/14/2026</p>
                            </div>
                            <div className="bg-white border border-[#dbeafe] rounded-[10px] p-3 text-center">
                                <p className="text-xs text-[#4a5565] mb-2">Registration</p>
                                <span className="px-2 py-0.5 bg-[#dbeafe] text-[#1447e6] text-xs rounded-lg">
                                    Valid
                                </span>
                            </div>
                            <div className="bg-white border border-[#dbeafe] rounded-[10px] p-3 text-center">
                                <p className="text-xs text-[#4a5565] mb-2">Annual Inspection</p>
                                <span className="px-2 py-0.5 bg-[#dcfce7] text-[#008236] text-xs rounded-lg">
                                    Current
                                </span>
                            </div>
                        </div>

                        {/* Authority Info */}
                        <div className="bg-white border border-[#dbeafe] rounded-[10px] px-3 py-2 flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-[#4a5565]">Issuing Authority:</span>
                                <span className="text-xs text-[#0a0a0a]">FAA</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-[#4a5565]">Next Renewal:</span>
                                <span className="text-xs text-[#0a0a0a]">6/9/2026</span>
                            </div>
                        </div>
                    </div>

                    {/* Live Regulatory Authority Updates */}
                    <div
                        className="rounded-[14px] border-[1.6px] border-[#e5e7eb] p-5 space-y-4"
                        style={{
                            backgroundImage: "linear-gradient(to right, rgb(249, 250, 251) 0%, rgb(248, 250, 252) 100%)",
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <img src={imgIconGlobe} alt="" className="w-5 h-5" />
                            <h4 className="text-sm font-bold text-[#0a0a0a]">Live Regulatory Authority Updates</h4>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#155dfc] text-white text-xs rounded-lg">
                                <img src={imgIconCheck} alt="" className="w-3 h-3" />
                                Official Sources
                            </span>
                        </div>

                        {/* FAA and EASA Cards */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* FAA Card */}
                            <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-4 space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-[#dbeafe] rounded-[10px] flex items-center justify-center">
                                        <img src={imgIconUSA} alt="" className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#0a0a0a]">FAA (Federal Aviation Administration)</p>
                                        <p className="text-xs text-[#4a5565]">United States</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => handleExternalLink(FAA_AD_DATABASE)}
                                        className="w-full bg-[#eff6ff] border border-[#bedbff] rounded px-2 py-2 flex items-center justify-between hover:bg-[#dbeafe] transition-colors cursor-pointer"
                                    >
                                        <span className="text-xs text-[#0a0a0a]">Airworthiness Directives Database</span>
                                        <img src={imgIconExternal} alt="" className="w-3 h-3" />
                                    </button>
                                    <button
                                        onClick={() => handleExternalLink(FAA_REGULATORY_LIBRARY)}
                                        className="w-full bg-[#eff6ff] border border-[#bedbff] rounded px-2 py-2 flex items-center justify-between hover:bg-[#dbeafe] transition-colors cursor-pointer"
                                    >
                                        <span className="text-xs text-[#0a0a0a]">Regulatory &amp; Guidance Library</span>
                                        <img src={imgIconExternal} alt="" className="w-3 h-3" />
                                    </button>
                                    <button
                                        onClick={() => handleExternalLink(FAA_AD_SEARCH)}
                                        className="w-full bg-[#eff6ff] border border-[#bedbff] rounded px-2 py-2 flex items-center justify-between hover:bg-[#dbeafe] transition-colors cursor-pointer"
                                    >
                                        <span className="text-xs text-[#0a0a0a]">AD Search Tool</span>
                                        <img src={imgIconExternal} alt="" className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>

                            {/* EASA Card */}
                            <div className="bg-white border border-[#e5e7eb] rounded-[10px] p-4 space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-[#dcfce7] rounded-[10px] flex items-center justify-center">
                                        <img src={imgIconEU} alt="" className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#0a0a0a]">EASA (European Aviation Safety Agency)</p>
                                        <p className="text-xs text-[#4a5565]">European Union</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => handleExternalLink(EASA_AD_PORTAL)}
                                        className="w-full bg-[#f0fdf4] border border-[#b9f8cf] rounded px-2 py-2 flex items-center justify-between hover:bg-[#dcfce7] transition-colors cursor-pointer"
                                    >
                                        <span className="text-xs text-[#0a0a0a]">Airworthiness Directives Portal</span>
                                        <img src={imgIconExternalGreen} alt="" className="w-3 h-3" />
                                    </button>
                                    <button
                                        onClick={() => handleExternalLink(EASA_AD_LIBRARY)}
                                        className="w-full bg-[#f0fdf4] border border-[#b9f8cf] rounded px-2 py-2 flex items-center justify-between hover:bg-[#dcfce7] transition-colors cursor-pointer"
                                    >
                                        <span className="text-xs text-[#0a0a0a]">AD Document Library</span>
                                        <img src={imgIconExternalGreen} alt="" className="w-3 h-3" />
                                    </button>
                                    <button
                                        onClick={() => handleExternalLink(EASA_SAFETY_PUBLICATIONS)}
                                        className="w-full bg-[#f0fdf4] border border-[#b9f8cf] rounded px-2 py-2 flex items-center justify-between hover:bg-[#dcfce7] transition-colors cursor-pointer"
                                    >
                                        <span className="text-xs text-[#0a0a0a]">Safety Publications</span>
                                        <img src={imgIconExternalGreen} alt="" className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Other Resources */}
                        <div className="bg-[#eef2ff] border border-[#c6d2ff] rounded-[10px] p-3">
                            <div className="flex items-start gap-2">
                                <img src={imgIconInfo} alt="" className="w-4 h-4 mt-0.5" />
                                <div>
                                    <p className="text-xs font-bold text-[#312c85]">Other Regulatory Resources</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <a
                                            href={FAA_SAFETY_ALERTS}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-[#432dd7] underline hover:text-[#312c85] transition-colors"
                                        >
                                            FAA Safety Alerts
                                        </a>
                                        <span className="text-[#99a1af]">•</span>
                                        <a
                                            href={EASA_SAFETY_MANAGEMENT}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-[#432dd7] underline hover:text-[#312c85] transition-colors"
                                        >
                                            EASA Safety Management
                                        </a>
                                        <span className="text-[#99a1af]">•</span>
                                        <a
                                            href={ICAO_SAFETY_STANDARDS}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-[#432dd7] underline hover:text-[#312c85] transition-colors"
                                        >
                                            ICAO Safety Standards
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Last Updated and Refresh */}
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-[#6a7282]">🔄 Last checked: {lastChecked}</span>
                            <button
                                onClick={handleRefresh}
                                disabled={isRefreshing}
                                className="flex items-center gap-1 px-2 py-1 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg text-xs text-[#0a0a0a] hover:bg-[#f9fafb] transition-colors disabled:opacity-50"
                            >
                                <img
                                    src={imgIconRefresh}
                                    alt=""
                                    className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`}
                                />
                                {isRefreshing ? 'Refreshing...' : 'Refresh'}
                            </button>
                        </div>
                    </div>

                    {/* Overall Compliance Score */}
                    <div
                        className="rounded-[10px] border-[1.6px] border-[#b9f8cf] p-6 space-y-4"
                        style={{
                            backgroundImage: "linear-gradient(to right, rgb(240, 253, 244) 0%, rgb(236, 253, 245) 100%)",
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-[#0a0a0a]">Overall Compliance Score</p>
                            <span className="text-4xl text-[#e7000b]">67%</span>
                        </div>
                        <div className="w-full h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
                            <div className="h-full bg-[#e7000b] w-[67%]" />
                        </div>
                        <div className="grid grid-cols-3 text-center">
                            <div>
                                <p className="text-sm text-[#00a63e]">2</p>
                                <p className="text-xs text-[#4a5565]">Compliant</p>
                            </div>
                            <div>
                                <p className="text-sm text-[#d08700]">1</p>
                                <p className="text-xs text-[#4a5565]">Pending</p>
                            </div>
                            <div>
                                <p className="text-sm text-[#e7000b]">0</p>
                                <p className="text-xs text-[#4a5565]">Overdue</p>
                            </div>
                        </div>
                    </div>

                    {/* Applicable Regulatory Updates */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <img src={imgIconBell} alt="" className="w-5 h-5" />
                                <span className="text-sm text-[#0a0a0a]">Applicable Regulatory Updates for Boeing 737-800</span>
                                <span className="px-2 py-0.5 bg-[#155dfc] text-white text-xs rounded-lg">2 New</span>
                            </div>
                            <button
                                onClick={() => setShowUpdates(!showUpdates)}
                                className="text-sm text-[#0a0a0a] px-3 py-1 hover:bg-[#f9fafb] rounded-lg transition-colors"
                            >
                                {showUpdates ? 'Hide' : 'Show'}
                            </button>
                        </div>

                        {/* Update Cards */}
                        {showUpdates && regulatoryUpdates.map((update, index) => (
                            <div
                                key={index}
                                className={`rounded-[10px] border p-4 space-y-2 ${update.type === "AD"
                                    ? "bg-[#fef2f2] border-[#ffc9c9]"
                                    : "bg-[#fefce8] border-[#fff085]"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`px-2 py-0.5 text-white text-xs rounded-lg ${update.type === "AD" ? "bg-[#e7000b]" : "bg-[#d08700]"
                                                }`}
                                        >
                                            {update.type === "AD" ? "New AD" : "SB Update"}
                                        </span>
                                        <span className="text-xs text-[#4a5565]">{update.date}</span>
                                    </div>
                                    <span className="px-2 py-0.5 border border-[rgba(0,0,0,0.1)] text-xs text-[#0a0a0a] rounded-lg">
                                        Effective: {update.effectiveDate}
                                    </span>
                                </div>
                                <h5 className="text-sm text-[#0a0a0a]">{update.title}</h5>
                                <p className="text-xs text-[#364153]">{update.description}</p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleViewDetails(update)}
                                        className="px-3 py-2 bg-[#155dfc] text-white text-xs rounded-lg hover:bg-[#1447e6] transition-colors"
                                    >
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => handleCreateTask(update)}
                                        className="px-3 py-2 bg-white border border-[rgba(0,0,0,0.1)] text-[#0a0a0a] text-xs rounded-lg hover:bg-[#f9fafb] transition-colors"
                                    >
                                        Create Task
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Airworthiness Directives (ADs) */}
                    <div className="border-t border-[#e5e7eb] pt-4 space-y-3">
                        <button
                            onClick={() => setExpandedADs(!expandedADs)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#f9fafb] transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <img src={imgIconFileAD} alt="" className="w-4 h-4" />
                                <span className="text-sm text-[#0a0a0a]">Airworthiness Directives (ADs)</span>
                                <span className="px-2 py-0.5 bg-[#e5e7eb] text-[#364153] text-xs rounded-lg">1</span>
                            </div>
                            <img
                                src={imgIconChevronDown}
                                alt=""
                                className={`w-4 h-4 transition-transform ${expandedADs ? 'rotate-0' : '-rotate-90'}`}
                            />
                        </button>

                        {expandedADs && airworthinessDirectives.map((ad, index) => (
                            <div
                                key={index}
                                className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[10px] p-3 space-y-2"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-[#0a0a0a]">{ad.id}</p>
                                        <p className="text-xs text-[#4a5565]">{ad.description}</p>
                                    </div>
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#dcfce7] text-[#008236] text-xs rounded-lg">
                                        <img src={imgIconCheckCircle} alt="" className="w-3 h-3" />
                                        {ad.status}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-xs text-[#4a5565]">
                                    <div>
                                        <span>Authority: </span>
                                        <span>{ad.authority}</span>
                                    </div>
                                    <div>
                                        <span>Effective: </span>
                                        <span>{ad.effectiveDate}</span>
                                    </div>
                                </div>
                                <div className="text-xs text-[#4a5565]">
                                    <span>Compliance Date: </span>
                                    <span>{ad.complianceDate}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Service Bulletins (SBs) */}
                    <div className="border-t border-[#e5e7eb] pt-4 space-y-3">
                        <button
                            onClick={() => setExpandedSBs(!expandedSBs)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#f9fafb] transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <img src={imgIconFileSB} alt="" className="w-4 h-4" />
                                <span className="text-sm text-[#0a0a0a]">Service Bulletins (SBs)</span>
                                <span className="px-2 py-0.5 bg-[#e5e7eb] text-[#364153] text-xs rounded-lg">2</span>
                            </div>
                            <img
                                src={imgIconChevronDown}
                                alt=""
                                className={`w-4 h-4 transition-transform ${expandedSBs ? 'rotate-0' : '-rotate-90'}`}
                            />
                        </button>

                        {expandedSBs && serviceBulletins.map((sb, index) => (
                            <div
                                key={index}
                                className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[10px] p-3 space-y-2"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-[#0a0a0a]">{sb.id}</span>
                                            <span
                                                className={`px-2 py-0.5 border text-xs rounded-lg ${sb.priority === "Mandatory"
                                                    ? "border-[#ffa2a2] text-[#c10007]"
                                                    : "border-[#ffdf20] text-[#a65f00]"
                                                    }`}
                                            >
                                                {sb.priority}
                                            </span>
                                        </div>
                                        <p className="text-xs text-[#4a5565]">{sb.description}</p>
                                    </div>
                                    <span
                                        className={`px-2 py-0.5 text-xs rounded-lg ${sb.status === "Compliant"
                                            ? "bg-[#dcfce7] text-[#008236]"
                                            : "bg-[#fef9c2] text-[#a65f00]"
                                            }`}
                                    >
                                        {sb.status}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-xs text-[#4a5565]">
                                    <div>
                                        <span>Issue Date: </span>
                                        <span>{sb.issueDate}</span>
                                    </div>
                                    {sb.complianceDate && (
                                        <div>
                                            <span>Compliance: </span>
                                            <span>{sb.complianceDate}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Certificates & Inspections */}
                    <div className="border-t border-[#e5e7eb] pt-4 space-y-3">
                        <button
                            onClick={() => setExpandedCerts(!expandedCerts)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#f9fafb] transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <img src={imgIconCertificate} alt="" className="w-4 h-4" />
                                <span className="text-sm text-[#0a0a0a]">Certificates &amp; Inspections</span>
                                <span className="px-2 py-0.5 bg-[#f54900] text-white text-xs rounded-lg">1 Expiring</span>
                            </div>
                            <img
                                src={imgIconChevronDown}
                                alt=""
                                className={`w-4 h-4 transition-transform ${expandedCerts ? 'rotate-0' : '-rotate-90'}`}
                            />
                        </button>

                        {expandedCerts && (
                            <div className="space-y-4">
                                {/* Active Certificates */}
                                <div className="space-y-2">
                                    <p className="text-xs text-[#4a5565]">Active Certificates</p>
                                    {certificates.map((cert, index) => (
                                        <div
                                            key={index}
                                            className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[10px] p-3 space-y-2"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-[#0a0a0a]">{cert.name}</span>
                                                <span
                                                    className={`px-2 py-0.5 text-xs rounded-lg ${cert.status === "Valid"
                                                        ? "bg-[#dcfce7] text-[#008236]"
                                                        : cert.status === "Expiring Soon"
                                                            ? "bg-[#ffedd4] text-[#ca3500]"
                                                            : "bg-[#fef2f2] text-[#e7000b]"
                                                        }`}
                                                >
                                                    {cert.status}
                                                </span>
                                            </div>
                                            <div className="text-xs text-[#4a5565] space-y-1">
                                                <p>Number: {cert.number}</p>
                                                <p>Expires: {cert.expires}</p>
                                                <p>Authority: {cert.authority}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Annual Inspection */}
                                <div className="space-y-2">
                                    <p className="text-xs text-[#4a5565]">Annual Inspection</p>
                                    <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[10px] p-3 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-[#0a0a0a]">Annual Inspection Status</span>
                                            <span className="px-2 py-0.5 bg-[#dcfce7] text-[#008236] text-xs rounded-lg">
                                                Current
                                            </span>
                                        </div>
                                        <div className="text-xs text-[#4a5565] space-y-1">
                                            <p>Last: 6/9/2025</p>
                                            <p>Next Due: 6/9/2026</p>
                                            <p>Inspector: Michael Roberts (FAA IA-45678)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
