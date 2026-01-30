// import { useState } from 'react'
// import type {SearchParams} from '../api/amadeus'
//
// type Props = {
//     onSearch: (params: SearchParams) => void
// }
//
// export function SearchForm({ onSearch }: Props) {
//     const [origin, setOrigin] = useState('')
//     const [destination, setDestination] = useState('')
//     const [departureDate, setDepartureDate] = useState('')
//
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault()
//         if (!origin || !destination || !departureDate) return
//         onSearch({ origin, destination, departureDate })
//     }
//
//     return (
//         <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded">
//             <div className="flex flex-col md:flex-row gap-4">
//                 <input
//                     type="text"
//                     placeholder="Origin (e.g., NYC)"
//                     value={origin}
//                     onChange={e => setOrigin(e.target.value.toUpperCase())}
//                     className="border p-2 rounded flex-1"
//                     required
//                 />
//                 <input
//                     type="text"
//                     placeholder="Destination (e.g., LAX)"
//                     value={destination}
//                     onChange={e => setDestination(e.target.value.toUpperCase())}
//                     className="border p-2 rounded flex-1"
//                     required
//                 />
//                 <input
//                     type="date"
//                     value={departureDate}
//                     onChange={e => setDepartureDate(e.target.value)}
//                     className="border p-2 rounded flex-1"
//                     required
//                 />
//             </div>
//             <button
//                 type="submit"
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
//             >
//                 Search Flights
//             </button>
//         </form>
//     )
// }

import { useState } from 'react'
import type { SearchParams } from '../api/amadeus'
import { Search, Calendar, MapPin } from 'lucide-react'

type Props = {
    onSearch: (params: SearchParams) => void
}

export function SearchForm({ onSearch }: Props) {
    const [origin, setOrigin] = useState('')
    const [destination, setDestination] = useState('')
    const [departureDate, setDepartureDate] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!origin || !destination || !departureDate) return
        onSearch({ origin, destination, departureDate })
    }

    // Get today's date in YYYY-MM-DD format for min date
    const today = new Date().toISOString().split('T')[0]

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Origin Input */}
                <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        From
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="JFK, LAX, ORD..."
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                            required
                            maxLength={3}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">3-letter airport code</p>
                </div>

                {/* Destination Input */}
                <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        To
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="CDG, LHR, DXB..."
                            value={destination}
                            onChange={(e) => setDestination(e.target.value.toUpperCase())}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                            required
                            maxLength={3}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">3-letter airport code</p>
                </div>

                {/* Date Input */}
                <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Departure Date
                    </label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="date"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                            min={today}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Search Button */}
            <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
                <Search className="w-5 h-5" />
                Search Flights
            </button>
        </form>
    )
}