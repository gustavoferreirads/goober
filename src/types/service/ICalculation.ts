import {RideType} from "types/model/rideType";

export type CalculationInput = {
    rideType: RideType,
    distanceInMeters: number,
    duration: number
}
export interface ICalculationService {
    calculateDriverScore(distance: number, acceptanceRate: number, cancellationRate: number): number
    calculateTripCost(costInput: CalculationInput): number
}
