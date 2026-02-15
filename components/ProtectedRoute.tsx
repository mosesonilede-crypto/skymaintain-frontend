"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";

function normalizeRole(role?: string) {
    return String(role || "")
        .trim()
        .toLowerCase()
        .replace(/[\s-]+/g, "_");
}

export function ProtectedRoute({
    children,
    requiredRoles,
    redirectTo = "/signin",
}: {
    children: React.ReactNode;
    requiredRoles?: string[];
    redirectTo?: string;
}) {
    const router = useRouter();
    const { isAuthenticated, isLoading, user } = useAuth();

    const isRoleAllowed =
        !requiredRoles ||
        requiredRoles.length === 0 ||
        requiredRoles.map((role) => normalizeRole(role)).includes(normalizeRole(user?.role));

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace(redirectTo);
            return;
        }
        if (!isLoading && isAuthenticated && !isRoleAllowed) {
            router.replace(redirectTo);
        }
    }, [isAuthenticated, isLoading, isRoleAllowed, redirectTo, router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#155dfc]"></div>
                    <p className="mt-4 text-[#4a5565]">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    if (!isRoleAllowed) {
        return null;
    }

    return <>{children}</>;
}
