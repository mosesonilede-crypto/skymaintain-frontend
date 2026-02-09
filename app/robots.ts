import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skymaintain.ai";

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",
                    "/app/",
                    "/2fa/",
                    "/signin/",
                    "/signup/",
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
