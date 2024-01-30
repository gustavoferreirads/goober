import {Driver} from "types/model/driver";
import {Location} from "types/model/location";
import {User} from "types/model/user";
import {RideType} from "types/model/rideType";

export type TripMarkers = {
    origin: Location
    destination: Location
}
export interface Trip {
    id: string,
    locations: TripMarkers
    rideType: Partial<RideType>;
    price: number
    eta: string;
    distance?: number;
}
export interface RiderTrip extends Trip {
    driver: Driver & { eta: string, distance?: number}
}
export interface DriverTrip extends Trip {
    status: DriverTripStatus
    passenger: User & { location: Location, rate: number, distance: number, eta: string }
}
export enum DriverTripStatus {
    PENDING,
    CONFIRMED
}
