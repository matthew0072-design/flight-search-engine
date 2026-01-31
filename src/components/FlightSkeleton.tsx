export function FlightSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Airline */}
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 skeleton rounded-lg" />
                    <div className="space-y-2">
                        <div className="h-4 w-32 skeleton rounded" />
                        <div className="h-3 w-20 skeleton rounded" />
                    </div>
                </div>

                {/* Flight details */}
                <div className="flex gap-6">
                    <div className="h-4 w-24 skeleton rounded" />
                    <div className="h-4 w-20 skeleton rounded" />
                    <div className="h-4 w-16 skeleton rounded" />
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                    <div className="space-y-2 text-right">
                        <div className="h-6 w-20 skeleton rounded" />
                        <div className="h-3 w-16 skeleton rounded" />
                    </div>
                    <div className="h-10 w-24 skeleton rounded-lg" />
                </div>
            </div>
        </div>
    )
}
