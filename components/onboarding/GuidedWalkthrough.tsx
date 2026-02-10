"use client";

import { useState, useEffect } from "react";

type WalkthroughStep = {
    id: number;
    title: string;
    description: string;
    action: string;
    target?: string; // Optional CSS selector for highlighting
    position?: "top" | "bottom" | "left" | "right";
};

const WALKTHROUGH_STEPS: WalkthroughStep[] = [
    {
        id: 1,
        title: "Welcome to SkyMaintain",
        description: "We'll show you how to accomplish your first maintenance task in under 3 minutes. Let's get started!",
        action: "Begin Tour",
    },
    {
        id: 2,
        title: "Log a Discrepancy",
        description: "When you notice an issue during inspection, click here to create a new maintenance log entry.",
        action: "Next",
        target: "[data-tour='new-entry']",
        position: "bottom",
    },
    {
        id: 3,
        title: "View AI Insights (Optional)",
        description: "After logging, our AI assistant can suggest relevant references and similar past cases. This is advisory only—final decisions remain with certified personnel.",
        action: "Next",
        target: "[data-tour='ai-panel']",
        position: "left",
    },
    {
        id: 4,
        title: "Close the Action",
        description: "Once work is complete, select the outcome and sign off. Your entry is now part of the maintenance record.",
        action: "Next",
        target: "[data-tour='close-action']",
        position: "bottom",
    },
    {
        id: 5,
        title: "You're Ready!",
        description: "That's it! You now know the core workflow. Explore at your own pace, and find help anytime using the floating button.",
        action: "Finish Tour",
    },
];

interface GuidedWalkthroughProps {
    onComplete: () => void;
    onSkip: () => void;
}

export function GuidedWalkthrough({ onComplete, onSkip }: GuidedWalkthroughProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const step = WALKTHROUGH_STEPS[currentStep];
    const isLastStep = currentStep === WALKTHROUGH_STEPS.length - 1;
    const isFirstStep = currentStep === 0;

    const handleNext = () => {
        if (isLastStep) {
            setIsVisible(false);
            onComplete();
        } else {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (!isFirstStep) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSkip = () => {
        setIsVisible(false);
        onSkip();
    };

    // Highlight target element if specified
    useEffect(() => {
        if (step.target) {
            const element = document.querySelector(step.target);
            if (element) {
                element.classList.add("tour-highlight");
                element.scrollIntoView({ behavior: "smooth", block: "center" });
                return () => element.classList.remove("tour-highlight");
            }
        }
    }, [step.target]);

    if (!isVisible) return null;

    return (
        <>
            {/* Backdrop overlay */}
            <div className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm" />

            {/* Walkthrough card */}
            <div className="fixed inset-x-4 bottom-8 z-50 mx-auto max-w-lg sm:inset-x-auto sm:right-8 sm:bottom-8">
                <div className="rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
                    {/* Progress bar */}
                    <div className="h-1 bg-slate-100">
                        <div
                            className="h-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${((currentStep + 1) / WALKTHROUGH_STEPS.length) * 100}%` }}
                        />
                    </div>

                    <div className="p-6">
                        {/* Step indicator */}
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-semibold text-xs">
                                {currentStep + 1}
                            </span>
                            <span>of {WALKTHROUGH_STEPS.length}</span>
                            <span className="text-slate-300">•</span>
                            <span>~{Math.ceil((WALKTHROUGH_STEPS.length - currentStep) * 0.5)} min remaining</span>
                        </div>

                        {/* Content */}
                        <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                        <p className="mt-2 text-slate-600 leading-relaxed">{step.description}</p>

                        {/* Actions */}
                        <div className="mt-6 flex items-center justify-between">
                            <button
                                type="button"
                                onClick={handleSkip}
                                className="text-sm text-slate-500 hover:text-slate-700 transition"
                            >
                                Skip tour
                            </button>
                            <div className="flex gap-2">
                                {!isFirstStep && (
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 transition"
                                    >
                                        Back
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                                >
                                    {step.action}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global styles for tour highlighting */}
            <style jsx global>{`
                .tour-highlight {
                    position: relative;
                    z-index: 45;
                    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.4), 0 0 0 8px rgba(59, 130, 246, 0.1);
                    border-radius: 8px;
                    animation: tour-pulse 2s ease-in-out infinite;
                }
                @keyframes tour-pulse {
                    0%, 100% { box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.4), 0 0 0 8px rgba(59, 130, 246, 0.1); }
                    50% { box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.3), 0 0 0 12px rgba(59, 130, 246, 0.05); }
                }
            `}</style>
        </>
    );
}

export { WALKTHROUGH_STEPS };
