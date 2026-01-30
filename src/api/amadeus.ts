import type { Flight, AmadeusFlightOffersResponse } from '../types/flight'
import { normalizeFlights } from '../utils/normalizeFlights'

const BASE_URL = 'https://test.api.amadeus.com/v2'
let accessToken: string | undefined

interface AmadeusTokenResponse {
    access_token: string
    type: string
    expires_in: number
    state?: string
}

async function getAccessToken(): Promise<string> {
    if (accessToken) return accessToken

    const res = await fetch(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: import.meta.env.VITE_AMADEUS_KEY,
                client_secret: import.meta.env.VITE_AMADEUS_SECRET
            })
        }
    )

    if (!res.ok) {
        throw new Error(`Failed to get access token: ${res.status}`)
    }

    const data = await res.json() as AmadeusTokenResponse
    accessToken = data.access_token
    return accessToken
}

export async function searchFlights(params: SearchParams): Promise<Flight[]> {
    try {
        const token = await getAccessToken()

        const query = new URLSearchParams({
            originLocationCode: params.origin,
            destinationLocationCode: params.destination,
            departureDate: params.departureDate,
            adults: '1',
            max: '50' // Optional: limit results
        })

        const res = await fetch(
            `${BASE_URL}/shopping/flight-offers?${query.toString()}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        if (!res.ok) {
            throw new Error(`Amadeus API error: ${res.status}`)
        }

        const data = await res.json() as AmadeusFlightOffersResponse
        return normalizeFlights(data)
    } catch (error) {
        console.error('Flight search error:', error)
        throw error
    }
}

export interface SearchParams {
    origin: string
    destination: string
    departureDate: string
}