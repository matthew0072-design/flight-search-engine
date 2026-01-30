export interface Flight  {
    id: string
    airline: string
    price: number
    stops: number
    duration: string
    departureTime: string
}
export interface AmadeusFlightOffersResponse {
    data: AmadeusFlightOffer[]
    meta?: {
        count: number
        links?: {
            self: string
        }
    }
    dictionaries?: {
        carriers?: Record<string, string>
        aircraft?: Record<string, string>
        locations?: Record<string, AmadeusLocation>
    }
}

export interface AmadeusFlightOffer {
    id: string
    type: string
    source: string
    instantTicketingRequired: boolean
    nonHomogeneous: boolean
    oneWay: boolean
    lastTicketingDate: string
    numberOfBookableSeats: number
    itineraries: AmadeusItinerary[]
    price: AmadeusPrice
    pricingOptions: {
        fareType: string[]
        includedCheckedBagsOnly: boolean
    }
    validatingAirlineCodes: string[]
    travelerPricings: AmadeusTravelerPricing[]
}

export interface AmadeusItinerary {
    duration: string
    segments: AmadeusSegment[]
}

export interface AmadeusSegment {
    departure: AmadeusLocation
    arrival: AmadeusLocation
    carrierCode: string
    number: string
    aircraft: {
        code: string
    }
    operating?: {
        carrierCode: string
    }
    duration: string
    id: string
    numberOfStops: number
    blacklistedInEU: boolean
}

export interface AmadeusLocation {
    iataCode: string
    terminal?: string
    at: string
}

export interface AmadeusPrice {
    currency: string
    total: string
    base: string
    fees?: AmadeusFee[]
    grandTotal: string
}

export interface AmadeusFee {
    amount: string
    type: string
}

export interface AmadeusTravelerPricing {
    travelerId: string
    fareOption: string
    travelerType: string
    price: {
        currency: string
        total: string
        base: string
    }
    fareDetailsBySegment: AmadeusFareDetail[]
}

export interface AmadeusFareDetail {
    segmentId: string
    cabin: string
    fareBasis: string
    class: string
    includedCheckedBags: {
        quantity: number
    }
}