import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skymaintain.ai";

    // Public pages that should be indexed
    const publicRoutes = [
        "",
        "/about",
        "/platform",
        "/platform-features",
        "/pricing",
        "/enterprise",
        "/security",
        "/compliance",
        "/privacy",
        "/terms",
        "/contact",
        "/careers",
        "/brand",
        "/become-partner",
        "/demo",
    ];

    return publicRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : route === "/platform" ? 0.9 : 0.7,
    }));
}
