"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/lib/AuthContext";
import { RoleSelector } from "@/components/onboarding/RoleSelector";
// GuidedWalkthrough will be used when tour is implemented with actual dashboard elements
// import { GuidedWalkthrough } from "@/components/onboarding/GuidedWalkthrough";

type OnboardingStep = "role" | "walkthrough" | "complete";

export default function OnboardingPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [currentStep, setCurrentStep] = useState<OnboardingStep>("role");
    const [, setSelectedRole] = useState<UserRole | null>(null);

    // Check if user has already completed onboarding
    useEffect(() => {
        if (user?.hasCompletedOnboarding) {
            router.push("/app");
        }
    }, [user, router]);

    const handleRoleSelected = (role: UserRole) => {
        setSelectedRole(role);

        // Store the role preference
        if (typeof window !== "undefined") {
            localStorage.setItem("skymaintain.userRole", role);
        }

        // Move to walkthrough
        setCurrentStep("walkthrough");
    };

    const handleSkipRole = () => {
        // Default to technician if skipped
        setSelectedRole("technician");
        if (typeof window !== "undefined") {
            localStorage.setItem("skymaintain.userRole", "technician");
        }
        setCurrentStep("walkthrough");
    };

    const handleWalkthroughComplete = () => {
        // Mark onboarding as complete
        if (typeof window !== "undefined") {
            localStorage.setItem("skymaintain.onboardingComplete", "true");
        }
        setCurrentStep("complete");

        // Redirect to dashboard after a brief moment
        setTimeout(() => {
            router.push("/app");
        }, 1500);
    };

    const handleSkipWalkthrough = () => {
        if (typeof window !== "undefined") {
            localStorage.setItem("skymaintain.onboardingComplete", "true");
        }
        router.push("/app");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl">
                {/* Progress indicator */}
                <div className="mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <StepIndicator
                            step={1}
                            label="Your Role"
                            isActive={currentStep === "role"}
                            isComplete={currentStep !== "role"}
                        />
                        <div className="w-12 h-0.5 bg-slate-200" />
                        <StepIndicator
                            step={2}
                            label="Quick Tour"
                            isActive={currentStep === "walkthrough"}
                            isComplete={currentStep === "complete"}
                        />
                        <div className="w-12 h-0.5 bg-slate-200" />
                        <StepIndicator
                            step={3}
                            label="Ready!"
                            isActive={currentStep === "complete"}
                            isComplete={false}
                        />
                    </div>
                </div>

                {/* Content card */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
                    {currentStep === "role" && (
                        <RoleSelector
                            onSelectRole={handleRoleSelected}
                            showSkip
                            onSkip={handleSkipRole}
                        />
                    )}

                    {currentStep === "walkthrough" && (
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold text-slate-900">
                                Let&apos;s take a quick tour
                            </h2>
                            <p className="mt-2 text-slate-600">
                                We&apos;ll show you the key workflows in about 2 minutes.
                            </p>
                            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                                <button
                                    type="button"
                                    onClick={handleWalkthroughComplete}
                                    className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
                                >
                                    Start Tour
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSkipWalkthrough}
                                    className="rounded-xl border border-slate-200 px-8 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
                                >
                                    Skip for now
                                </button>
                            </div>
                            <p className="mt-4 text-xs text-slate-500">
                                You can restart the tour anytime from Settings.
                            </p>
                        </div>
                    )}

                    {currentStep === "complete" && (
                        <div className="text-center py-8">
                            <div className="text-5xl mb-4">🎉</div>
                            <h2 className="text-2xl font-semibold text-slate-900">
                                You&apos;re all set!
                            </h2>
                            <p className="mt-2 text-slate-600">
                                Taking you to your personalized dashboard...
                            </p>
                            <div className="mt-6">
                                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer help text */}
                <p className="mt-6 text-center text-sm text-slate-500">
                    Need help? Contact support at{" "}
                    <a href="mailto:support@skymaintain.com" className="text-blue-600 hover:underline">
                        support@skymaintain.com
                    </a>
                </p>
            </div>
        </div>
    );
}

function StepIndicator({
    step,
    label,
    isActive,
    isComplete
}: {
    step: number;
    label: string;
    isActive: boolean;
    isComplete: boolean;
}) {
    return (
        <div className="flex flex-col items-center gap-1">
            <div
                className={[
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition",
                    isComplete
                        ? "bg-emerald-500 text-white"
                        : isActive
                            ? "bg-blue-600 text-white"
                            : "bg-slate-200 text-slate-500",
                ].join(" ")}
            >
                {isComplete ? "✓" : step}
            </div>
            <span className={`text-xs ${isActive ? "text-blue-600 font-medium" : "text-slate-500"}`}>
                {label}
            </span>
        </div>
    );
}
