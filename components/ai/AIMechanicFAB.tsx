"use client";

import { useEffect, useState } from "react";
import AIMechanicPanel from "./AIMechanicPanel";

function cx(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}

// AI Mechanic Bot Icon
const iconBot = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2C9.44772 2 9 2.44772 9 3V4H11V3C11 2.44772 10.5523 2 10 2Z" fill="white" />
        <path d="M3 10C3 7.79086 4.79086 6 7 6H13C15.2091 6 17 7.79086 17 10V14C17 16.2091 15.2091 18 13 18H7C4.79086 18 3 16.2091 3 14V10Z" fill="white" />
        <circle cx="7.5" cy="11" r="1.25" fill="#155dfc" />
        <circle cx="12.5" cy="11" r="1.25" fill="#155dfc" />
        <path d="M8.5 14H11.5" stroke="#155dfc" strokeWidth="1.25" strokeLinecap="round" />
        <path d="M1 12V10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M19 12V10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export default function AIMechanicFAB({
    className,
    bottomOffset = 84,
    rightOffset = 24,
}: {
    className?: string;
    bottomOffset?: number;
    rightOffset?: number;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [initialQuery, setInitialQuery] = useState<string | undefined>(undefined);
    const [context, setContext] = useState<string | undefined>(undefined);

    useEffect(() => {
        const handler = (event: Event) => {
            const detail = (event as CustomEvent<{ query?: string; context?: string }>).detail;
            setInitialQuery(detail?.query);
            setContext(detail?.context);
            setIsOpen(true);
        };
        window.addEventListener("ai-mechanic:open", handler as EventListener);
        return () => window.removeEventListener("ai-mechanic:open", handler as EventListener);
    }, []);

    return (
        <>
            {/* FAB Button */}
            <div
                className={cx("fixed z-[61]", className)}
                style={{ right: `${rightOffset}px`, bottom: `${bottomOffset}px` }}
            >
                <button
                    type="button"
                    className={cx(
                        "inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold shadow-lg transition-all",
                        isOpen
                            ? "bg-slate-900 text-white"
                            : "text-white hover:opacity-90"
                    )}
                    style={{
                        background: isOpen
                            ? "#1e293b"
                            : "linear-gradient(135deg, #155dfc 0%, #9810fa 100%)",
                    }}
                    onClick={() => setIsOpen((v) => !v)}
                    title="AI Mechanic"
                    aria-label="AI Mechanic"
                >
                    {iconBot}
                    AI Mechanic
                </button>
            </div>

            {/* AI Mechanic Panel */}
            <AIMechanicPanel
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onMinimize={() => setIsOpen(false)}
                initialQuery={initialQuery}
                context={context}
            />
        </>
    );
}
