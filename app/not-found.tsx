import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-dvh flex-col items-center justify-center bg-white px-6 text-center">
            <div className="mx-auto max-w-md">
                {/* 404 Icon */}
                <div className="mb-8 flex justify-center">
                    <svg
                        className="h-24 w-24 text-slate-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>

                <h1 className="text-6xl font-bold text-slate-900">404</h1>
                <h2 className="mt-4 text-xl font-semibold text-slate-700">Page Not Found</h2>
                <p className="mt-3 text-slate-600">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href="/"
                        className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        Go to Homepage
                    </Link>
                    <Link
                        href="/contact"
                        className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>

            <p className="mt-16 text-xs text-slate-400">
                SkyMaintain &bull; Aircraft Maintenance Intelligence
            </p>
        </div>
    );
}
