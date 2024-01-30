import {Place} from "types/dto/place";
import {LatLng, Location} from "types/model/location";
import {TripMarkers} from "types/model/trip";
import {Region} from "react-native-maps";

export interface ILocationService {
    findAllPlaces(input: string, current?: LatLng): Promise<Place[]>;

    getAddressFromCoordinates(lat: number, lng: number): Promise<string>;

    calculateDistance(origin: Location, destination: Location): number;

    generateRandomPoint(center: Location, radius: number): Promise<Location>;

    getTravelTime(origin: LatLng, destination: LatLng): Promise<{
        text: string;
        value: number;
    }>;

    calculateRegionForCoordinates(userLocation?: Location): Region;
}
