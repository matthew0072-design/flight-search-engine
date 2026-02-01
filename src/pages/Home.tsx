import { useState, useEffect } from 'react'
import type { SearchParams } from "../api/amadeus.ts";
import { SearchForm } from '../components/SearchForm'
import { FlightSkeleton} from "../components/FlightSkeleton";
import { useFlights } from '../hooks/useFlights'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts'
import { Plane, Filter, TrendingDown, Clock, MapPin } from 'lucide-react'

export function Home() {
    const [searchParams, setSearchParams] = useState<SearchParams | null>(null)
    const CHART_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4']

    const { data: flights, isLoading, error } = useFlights(searchParams)

    const [maxStops, setMaxStops] = useState<number>(2)
    const [maxPrice, setMaxPrice] = useState<number>(1000)
    const [selectedAirlines, setSelectedAirlines] = useState<string[]>([])
    const [showFilters, setShowFilters] = useState<boolean>(false)
    const isDisabled = isLoading

    // Close mobile drawer when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setShowFilters(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Prevent body scroll when mobile drawer is open
    useEffect(() => {
        if (showFilters && window.innerWidth < 768) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [showFilters])

    // Filter flights
    const filteredFlights = flights?.filter((f) => {
        const matchesStops = f.stops <= maxStops
        const matchesPrice = f.price <= maxPrice
        const matchesAirline =
            selectedAirlines.length === 0 || selectedAirlines.includes(f.airline)
        return matchesStops && matchesPrice && matchesAirline
    }) || []

    // Sort by price
    const sortedFlights = [...filteredFlights].sort((a, b) => a.price - b.price)

    // price data - Average price by airline
    const priceData = Object.entries(
        sortedFlights.reduce((acc, f) => {
            if (!acc[f.airline]) acc[f.airline] = { total: 0, count: 0 }
            acc[f.airline].total += f.price
            acc[f.airline].count += 1
            return acc
        }, {} as Record<string, { total: number; count: number }>)
    ).map(([airline, data], index: number) => ({
        airline,
        avgPrice: Math.round(data.total / data.count),
        flights: data.count,
        fill: CHART_COLORS[index % CHART_COLORS.length]
    }))

    // Get unique airlines from results
    const availableAirlines = [...new Set(flights?.map(f => f.airline) || [])]

    const toggleAirline = (airline: string) => {
        setSelectedAirlines((prev) =>
            prev.includes(airline)
                ? prev.filter((a) => a !== airline)
                : [...prev, airline]
        )
    }

    const formatDuration = (duration: string) => {
        const match = duration.match(/PT(\d+)H?(\d+)?M/)
        if (!match) return duration
        const hours = match[1] || '0'
        const minutes = match[2] || '0'
        return `${hours}h ${minutes}m`
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Hero Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-indigo-600 text-white py-12 px-4 shadow-lg">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <Plane className="w-10 h-10" />
                        <h1 className="text-4xl font-bold">Flight Finder</h1>
                    </div>
                    <p className="text-blue-100 text-lg">
                        Compare prices, filter by preferences, and book your perfect flight
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 -mt-8">
                {/* Search Form - Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8">
                    <SearchForm onSearch={(params) => setSearchParams(params)} />
                </div>

                {/* Stats Bar */}
                {sortedFlights.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-xl p-4 shadow-md">
                            <div className="text-gray-500 text-sm mb-1">Total Flights</div>
                            <div className="text-2xl font-bold text-gray-800">{sortedFlights.length}</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-md">
                            <div className="text-gray-500 text-sm mb-1">Best Price</div>
                            <div className="text-2xl font-bold text-green-600">
                                ${sortedFlights[0]?.price || 0}
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-md">
                            <div className="text-gray-500 text-sm mb-1">Avg Price</div>
                            <div className="text-2xl font-bold text-blue-600">
                                ${Math.round(sortedFlights.reduce((sum, f) => sum + f.price, 0) / sortedFlights.length) || 0}
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-md">
                            <div className="text-gray-500 text-sm mb-1">Airlines</div>
                            <div className="text-2xl font-bold text-purple-600">
                                {availableAirlines.length}
                            </div>
                        </div>
                    </div>
                )}

                {/* Mobile Filter Toggle */}
                <button
                    className="md:hidden w-full mb-4 px-6 py-3 bg-white rounded-xl shadow-md flex items-center justify-center gap-2 font-semibold text-gray-700 hover:shadow-lg transition-shadow"
                    onClick={() => setShowFilters((prev) => !prev)}
                >
                    <Filter className="w-5 h-5" />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>

                {/* Filters - Desktop always visible, Mobile drawer */}
                <div className="mb-6">
                    {/* Mobile Overlay */}
                    {showFilters && (
                        <div
                            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={() => setShowFilters(false)}
                        />
                    )}

                    {/* Filter Content */}
                    <div
                        className={`
                            ${showFilters ? 'translate-x-0' : '-translate-x-full'}
                            md:translate-x-0
                            fixed md:relative
                            top-0 left-0
                            w-4/5 md:w-full
                            h-full md:h-auto
                            bg-white
                            p-6 md:p-0
                            shadow-2xl md:shadow-none
                            overflow-y-auto
                            transition-transform duration-300 ease-in-out
                            z-50 md:z-0
                        `}
                    >
                        <div className="bg-white rounded-2xl md:shadow-lg p-6">
                            {/* Mobile Close Button */}
                            <div className="flex items-center justify-between mb-4 md:mb-0">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Filter className="w-5 h-5" />
                                    Filters
                                </h2>
                                <button
                                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                                    onClick={() => setShowFilters(false)}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Stops Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Number of Stops
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { value: 0, label: 'Non-stop' },
                                        { value: 1, label: '1 Stop' },
                                        { value: 2, label: '2+ Stops' }
                                    ].map(({ value, label }) => (
                                        <button
                                            disabled={isDisabled}
                                            key={value}
                                            className={`px-4 py-2 rounded-lg border-2 font-medium transition-all 
                                            ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                            ${
                                                maxStops === value
                                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                                            }`}
                                            onClick={() => setMaxStops(value)}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Maximum Price
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { value: 300, label: 'Under $300' },
                                        { value: 600, label: 'Under $600' },
                                        { value: 1000, label: 'Under $1000' }
                                    ].map(({ value, label }) => (
                                        <button
                                            disabled={isDisabled}
                                            key={value}
                                            className={`px-4 py-2 rounded-lg border-2 font-medium transition-all 
                                            ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                            ${
                                                maxPrice === value
                                                    ? 'bg-green-600 text-white border-green-600 shadow-md'
                                                    : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                                            }`}
                                            onClick={() => setMaxPrice(value)}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Airline Filter */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Airlines
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {availableAirlines.length > 0 ? (
                                        availableAirlines.map((airline) => (
                                            <button
                                                disabled={isDisabled}
                                                key={airline}
                                                className={`px-4 py-2 rounded-lg border-2 font-medium transition-all
                                                 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                                 ${
                                                    selectedAirlines.includes(airline)
                                                        ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:border-purple-400'
                                                }`}
                                                onClick={() => toggleAirline(airline)}
                                            >
                                                {airline}
                                            </button>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 text-sm">Search for flights to see airlines</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Price Graph */}
                {priceData.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <TrendingDown className="w-5 h-5 text-blue-600" />
                            Average Price by Airline
                        </h2>
                        <div className="h-64 w-full">
                            <ResponsiveContainer>
                                <BarChart data={priceData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="airline" />
                                    <YAxis />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            padding: '8px'
                                        }}
                                    />
                                    <Bar dataKey="avgPrice" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <FlightSkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
                        <p className="text-red-600 font-semibold">Error fetching flights</p>
                        <p className="text-red-500 text-sm mt-2">Please try again later</p>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && sortedFlights.length === 0 && searchParams && (
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-12 text-center">
                        <Plane className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 font-semibold text-lg">No flights found</p>
                        <p className="text-gray-500 mt-2">Try adjusting your filters or search criteria</p>
                    </div>
                )}

                {/* Flight List */}
                {!isLoading && sortedFlights.length > 0 && (
                    <div className="space-y-4">
                        {sortedFlights.map((f, index) => (
                            <div
                                key={f.id}
                                className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 ${
                                    index === 0
                                        ? 'border-2 border-green-400 ring-2 ring-green-200'
                                        : 'border border-gray-200'
                                }`}
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    {/* Airline & Best Deal Badge */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                            {f.airline.substring(0, 2)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-lg text-gray-800">
                                                {f.airline}
                                            </div>
                                            {index === 0 && (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                                    <TrendingDown className="w-3 h-3" />
                                                    Best Deal
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Flight Details */}
                                    <div className="flex flex-wrap gap-6 text-sm">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Clock className="w-4 h-4" />
                                            <span>{new Date(f.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <MapPin className="w-4 h-4" />
                                            <span>{f.stops === 0 ? 'Non-stop' : `${f.stops} stop${f.stops > 1 ? 's' : ''}`}</span>
                                        </div>
                                        <div className="text-gray-600">
                                            <span>{formatDuration(f.duration)}</span>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className="text-3xl font-bold text-gray-800">
                                                ${f.price}
                                            </div>
                                            <div className="text-xs text-gray-500">per person</div>
                                        </div>
                                        <button className="px-6 cursor-pointer py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
                                            Book
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer Spacing */}
            <div className="h-16" />
        </div>
    )
}