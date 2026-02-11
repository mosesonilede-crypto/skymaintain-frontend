export function getPublicSiteUrl(): string {
    const envUrl = process.env.NEXT_PUBLIC_SITE_URL
        || process.env.NEXT_PUBLIC_APP_URL
        || process.env.NEXT_PUBLIC_DEPLOYMENT_URL
        || process.env.NEXT_PUBLIC_VERCEL_URL
        || process.env.VERCEL_URL
        || "";

    const normalize = (value: string) => {
        if (!value) return "";
        if (value.startsWith("http://") || value.startsWith("https://")) {
            return value.replace(/\/$/, "");
        }
        return `https://${value.replace(/\/$/, "")}`;
    };

    if (typeof window !== "undefined") {
        return normalize(envUrl) || window.location.origin;
    }

    return normalize(envUrl);
}
