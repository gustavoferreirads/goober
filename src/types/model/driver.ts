import {User} from "types/model/user";
import {Car} from "types/model/car";
import {Location} from "types/model/location";

export interface Driver extends User {
    rate: number
    car: Car
    location?: Location
    cancellationRate: number
    acceptanceRate: number
}

