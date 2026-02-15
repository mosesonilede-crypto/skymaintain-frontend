import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute requiredRoles={["admin"]} redirectTo="/app/welcome">
            {children}
        </ProtectedRoute>
    );
}
