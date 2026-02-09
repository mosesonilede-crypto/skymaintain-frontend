/**
 * Simple in-memory rate limiter for API routes
 * Uses a sliding window approach
 */

type RateLimitEntry = {
    count: number;
    resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

// Clean up old entries periodically
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
        if (entry.resetAt < now) {
            store.delete(key);
        }
    }
}, 60000); // Clean every minute

export type RateLimitConfig = {
    windowMs: number;  // Time window in milliseconds
    maxRequests: number;  // Max requests per window
};

export const RATE_LIMITS = {
    // Strict limits for auth-related endpoints
    auth: { windowMs: 15 * 60 * 1000, maxRequests: 10 },  // 10 per 15 min
    twoFa: { windowMs: 5 * 60 * 1000, maxRequests: 5 },   // 5 per 5 min

    // Standard API limits
    api: { windowMs: 60 * 1000, maxRequests: 60 },        // 60 per minute

    // Contact form
    contact: { windowMs: 60 * 60 * 1000, maxRequests: 5 }, // 5 per hour
} as const;

export function checkRateLimit(
    identifier: string,
    config: RateLimitConfig
): { allowed: boolean; remaining: number; resetIn: number } {
    const now = Date.now();
    const key = identifier;

    let entry = store.get(key);

    if (!entry || entry.resetAt < now) {
        // Create new window
        entry = {
            count: 1,
            resetAt: now + config.windowMs,
        };
        store.set(key, entry);

        return {
            allowed: true,
            remaining: config.maxRequests - 1,
            resetIn: config.windowMs,
        };
    }

    // Check if within limit
    if (entry.count >= config.maxRequests) {
        return {
            allowed: false,
            remaining: 0,
            resetIn: entry.resetAt - now,
        };
    }

    // Increment and allow
    entry.count++;

    return {
        allowed: true,
        remaining: config.maxRequests - entry.count,
        resetIn: entry.resetAt - now,
    };
}

export function getRateLimitHeaders(result: ReturnType<typeof checkRateLimit>, config: RateLimitConfig) {
    return {
        "X-RateLimit-Limit": String(config.maxRequests),
        "X-RateLimit-Remaining": String(result.remaining),
        "X-RateLimit-Reset": String(Math.ceil(result.resetIn / 1000)),
    };
}
