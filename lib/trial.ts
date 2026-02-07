const TRIAL_STORAGE_KEY = "skymaintain.trial";

export type TrialStatus = {
    startedAt: number;
    expiresAt: number;
    expired: boolean;
    daysRemaining: number;
};

const TRIAL_LENGTH_DAYS = 14;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

function safeParse(raw: string | null) {
    if (!raw) return null;
    try {
        return JSON.parse(raw) as { startedAt?: number; expiresAt?: number };
    } catch {
        return null;
    }
}

export function startTrialIfMissing(now = Date.now()) {
    if (typeof window === "undefined") return;
    const existing = safeParse(window.localStorage.getItem(TRIAL_STORAGE_KEY));
    if (existing?.startedAt && existing?.expiresAt) return;

    const startedAt = now;
    const expiresAt = startedAt + TRIAL_LENGTH_DAYS * MS_PER_DAY;
    window.localStorage.setItem(TRIAL_STORAGE_KEY, JSON.stringify({ startedAt, expiresAt }));
}

export function getTrialStatus(now = Date.now()): TrialStatus | null {
    if (typeof window === "undefined") return null;
    const existing = safeParse(window.localStorage.getItem(TRIAL_STORAGE_KEY));
    if (!existing?.startedAt || !existing?.expiresAt) return null;

    const expired = now >= existing.expiresAt;
    const daysRemaining = Math.max(0, Math.ceil((existing.expiresAt - now) / MS_PER_DAY));

    return {
        startedAt: existing.startedAt,
        expiresAt: existing.expiresAt,
        expired,
        daysRemaining,
    };
}

export function clearTrial() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(TRIAL_STORAGE_KEY);
}
