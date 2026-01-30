import type { Flight, AmadeusFlightOffersResponse } from '../types/flight'

export function normalizeFlights(apiResponse: AmadeusFlightOffersResponse): Flight[] {
    if (!apiResponse?.data) return []

    return apiResponse.data.map((offer, index) => {
        const itinerary = offer.itineraries?.[0]
        const segments = itinerary?.segments || []

        const stops = Math.max(segments.length - 1, 0)

        return {
            id: offer.id ?? String(index),
            airline: segments[0]?.carrierCode ?? 'Unknown',
            price: Number(offer.price?.total ?? 0),
            stops,
            duration: itinerary?.duration ?? 'PT0M',
            departureTime: segments[0]?.departure?.at ?? ''
        }
    })
}