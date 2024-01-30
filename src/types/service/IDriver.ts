import { Driver } from "types/model/driver";
import { Location } from "types/model/location";
import {RideType} from "types/model/rideType";

export interface IDriverService {
    generateDrivers(userLocation: Location): Promise<void>;
    getDrivers(): Promise<Driver[]>;
    findDriver( rideType: RideType, riderLocation: Location): Promise<Driver | null>;
}
