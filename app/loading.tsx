export default function Loading() {
    return (
        <div className="flex min-h-dvh items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                {/* Animated logo spinner */}
                <div className="relative h-16 w-16">
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
                    <div className="absolute inset-2 flex items-center justify-center">
                        <svg viewBox="0 0 100 130" className="h-8 w-8 text-blue-600" fill="currentColor">
                            <path d="M50 0L100 25V60C100 90 75 115 50 130C25 115 0 90 0 60V25L50 0Z" opacity="0.2" />
                            <path d="M25 60L42 77L75 44" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                    </div>
                </div>
                <p className="text-sm text-slate-500">Loading...</p>
            </div>
        </div>
    );
}
