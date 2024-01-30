import {Location} from "types/model/location";
import {RiderTripSection} from "types/dto/tripSection";
import {DriverTrip} from "types/model/trip";

export interface ITripService {
    getRideTripOptions (userLocation: Location, destination: Location): Promise<RiderTripSection[]>
    getNextDriverTrip(center: Location): Promise<DriverTrip>;
}