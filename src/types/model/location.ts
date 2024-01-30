export interface LatLng {
    latitude: number
    longitude: number
}

export interface Location {
    name?: string
    description?: string
    latLong: LatLng
}

export type TripMarkers = {
    origin: Location
    destination: Location
}