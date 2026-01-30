import { useQuery } from '@tanstack/react-query'
import { searchFlights, type SearchParams } from '../api/amadeus'
import type {Flight} from '../types/flight'

export function useFlights(params: SearchParams | null) {
    return useQuery<Flight[]>({
        queryKey: ['flights', params],
        queryFn: () => searchFlights(params as SearchParams),
        enabled: !!params
    })
}
