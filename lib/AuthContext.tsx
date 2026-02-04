"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
    email: string;
    orgName: string;
    role?: "fleet_manager" | "maintenance_engineer";
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("SKYMAINTAIN_USER");
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                setUser(userData);
            } catch (e) {
                console.error("Failed to parse stored user data", e);
                localStorage.removeItem("SKYMAINTAIN_USER");
            }
        }
        setIsLoading(false);
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("SKYMAINTAIN_USER", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("SKYMAINTAIN_USER");
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: user !== null,
        isLoading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
