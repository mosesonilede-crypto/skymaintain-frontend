import AppShellClient from "@/components/app/AppShellClient";
import { AircraftProvider } from "@/lib/AircraftContext";
import { AuthProvider } from "@/lib/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <ProtectedRoute>
                <AircraftProvider>
                    <AppShellClient>{children}</AppShellClient>
                </AircraftProvider>
            </ProtectedRoute>
        </AuthProvider>
    );
}
