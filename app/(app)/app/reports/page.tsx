import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "SkyMaintain — Reports & Analytics",
};

// System health data
const systemHealthData = [
    { name: "Engine", value: 94 },
    { name: "Landing Gear", value: 96 },
    { name: "Hydraulic", value: 88 },
    { name: "Fuel System", value: 97 },
    { name: "Avionics", value: 100 },
    { name: "Electrical", value: 93 },
    { name: "APU", value: 91 },
];

export default function ReportsPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Page Header */}
            <h1 className="text-[24px] leading-8 text-[#0a0a0a]">
                Reports &amp; Analytics - N123AB
            </h1>

            {/* Top Cards Row */}
            <div className="grid grid-cols-2 gap-6">
                {/* Aircraft Overview Card */}
                <div className="flex flex-col gap-4 rounded-[10px] border border-[#e5e7eb] bg-white p-6">
                    <h2 className="text-[18px] leading-7 text-[#0a0a0a]">
                        Aircraft Overview
                    </h2>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[16px] leading-6 text-[#4a5565]">
                                Registration:
                            </span>
                            <span className="text-[16px] leading-6 text-[#0a0a0a]">
                                N123AB
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[16px] leading-6 text-[#4a5565]">
                                Model:
                            </span>
                            <span className="text-[16px] leading-6 text-[#0a0a0a]">
                                Boeing 737-800
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[16px] leading-6 text-[#4a5565]">
                                Health Status:
                            </span>
                            <span className="rounded-lg bg-[#dcfce7] px-2 py-[3px] text-[12px] leading-4 text-[#008236]">
                                95%
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[16px] leading-6 text-[#4a5565]">
                                Flight Hours:
                            </span>
                            <span className="text-[16px] leading-6 text-[#0a0a0a]">
                                N/A
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[16px] leading-6 text-[#4a5565]">
                                Total Cycles:
                            </span>
                            <span className="text-[16px] leading-6 text-[#0a0a0a]">
                                N/A
                            </span>
                        </div>
                    </div>
                </div>

                {/* Maintenance Summary Card */}
                <div className="flex flex-col gap-4 rounded-[10px] border border-[#e5e7eb] bg-white p-6">
                    <h2 className="text-[18px] leading-7 text-[#0a0a0a]">
                        Maintenance Summary
                    </h2>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[16px] leading-6 text-[#4a5565]">
                                Active Alerts:
                            </span>
                            <span className="rounded-lg bg-[#ffe2e2] px-2 py-[3px] text-[12px] leading-4 text-[#c10007]">
                                0
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[16px] leading-6 text-[#4a5565]">
                                Upcoming Tasks:
                            </span>
                            <span className="rounded-lg bg-[#fef9c2] px-2 py-[3px] text-[12px] leading-4 text-[#a65f00]">
                                0
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[16px] leading-6 text-[#4a5565]">
                                Last Inspection:
                            </span>
                            <span className="text-[16px] leading-6 text-[#0a0a0a]">
                                N/A
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[16px] leading-6 text-[#4a5565]">
                                Next Service:
                            </span>
                            <span className="text-[16px] leading-6 text-[#0a0a0a]">
                                N/A
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* System Health Breakdown Card */}
            <div className="flex flex-col gap-4 rounded-[10px] border border-[#e5e7eb] bg-white p-6">
                <h2 className="text-[18px] leading-7 text-[#0a0a0a]">
                    System Health Breakdown
                </h2>

                <div className="grid grid-cols-4 gap-4">
                    {systemHealthData.map((system) => (
                        <div
                            key={system.name}
                            className="flex flex-col items-center gap-2 rounded-[10px] bg-[#f9fafb] px-4 py-4"
                        >
                            <span className="text-center text-[14px] leading-5 text-[#4a5565]">
                                {system.name}
                            </span>
                            <span className="text-center text-[24px] leading-8 text-[#00a63e]">
                                {system.value}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
