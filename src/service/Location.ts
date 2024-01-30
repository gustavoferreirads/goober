import {Place} from "types/dto/place";
import * as ExpoLocation from "expo-location";
import {LatLng, Location} from "types/model/location";
import {ILocationService} from "types/service/ILocation";
import {Region} from "react-native-maps";
import {TripMarkers} from "types/model/trip";


const MAPS_API_URL = 'https://maps.googleapis.com/maps/api/';
const API_KEY = 'AIzaSyDiHxQkWaRbVNZrKBkhZWd3rI2TRI_ET6A';

export class LocationService implements ILocationService {
    async findAllPlaces(input: string, current?: LatLng): Promise<Place[]> {
        const encodedQuery = encodeURIComponent(input);
        const location = `${current?.latitude},${current?.longitude}`;
        const query = `${encodedQuery}&${location ? `location=${location}` : ''}&key=${API_KEY}`;

        try {
            const response = await fetch(`${MAPS_API_URL}place/textsearch/json?query=${query}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return (await response.json()).results as Place[];
        } catch (error) {
            console.error('Fetching search results failed:', error);
        }
        return [];
    };

    async getAddressFromCoordinates(lat: number, lng: number): Promise<string> {
        try {
            const results = await ExpoLocation.reverseGeocodeAsync({latitude: lat, longitude: lng});
            if (results.length > 0) {
                const {street, name, city, region} = results[0];
                const addressParts = [street, name, city, region].filter(part => part).join(', ');

                return addressParts.length > 0 ? addressParts : 'Unknown location';
            }
            return 'Unknown location'; // Fallback if no address found
        } catch (error) {
            console.error(error);
            return 'Error getting address';
        }
    }

    calculateDistance(origin: Location, destination: Location): number {
        const R = 6371e3; // metres
        const φ1 = origin.latLong.latitude * Math.PI / 180;
        const φ2 = destination.latLong.latitude * Math.PI / 180;
        const Δφ = (destination.latLong.latitude - origin.latLong.latitude) * Math.PI / 180;
        const Δλ = (destination.latLong.longitude - origin.latLong.longitude) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c; // in meters
        return distance;
    }

    async generateRandomPoint(center: Location, radius: number = 15): Promise<Location> {
        const y0 = center.latLong.latitude;
        const x0 = center.latLong.longitude;
        const rd = radius / 111300; // about 111300 meters in one degree
        const u = Math.random();
        const v = Math.random();
        const w = rd * Math.sqrt(u);
        const t = 2 * Math.PI * v;
        const x = w * Math.cos(t);
        const y = w * Math.sin(t);

        // Adjust the x-coordinate for the shrinking of the east-west distances
        const xp = x / Math.cos(y0);

        const latitude = y + y0;
        const longitude = xp + x0;
        const address = await new LocationService().getAddressFromCoordinates(latitude, longitude);
        return {
            name: address,
            latLong: {
                latitude,
                longitude
            }
        };
    }

    async getTravelTime(origin: LatLng, destination: LatLng): Promise<{
        text: string;
        value: number;
    }> {
        
        const originLatLong = `${origin.latitude},${origin.longitude}`
        const destLatLong = `${destination.latitude},${destination.longitude}`
        const url = `${MAPS_API_URL}directions/json?origin=${encodeURIComponent(originLatLong)}&destination=${encodeURIComponent(destLatLong)}&key=${API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error_message || 'Failed to fetch travel time.');
            }

            const route = data.routes[0];
            const duration = route.legs[0].duration;
            return duration;
        } catch (error) {
            console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
            return {text: '', value: 0};
        }
    }

    calculateRegionForCoordinates(userLocation?: Location): Region {
        const LATITUDE_DELTA = 0.22;
        const LONGITUDE_DELTA = 0.5;

         const point = userLocation?.latLong || {longitude: 0, latitude: 0};

        return {
            latitude:  point?.latitude,
            longitude: point?.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        };
    }


}
