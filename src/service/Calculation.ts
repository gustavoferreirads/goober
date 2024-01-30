import {CalculationInput, ICalculationService} from "types/service/ICalculation";
import {convertFromMetersToMiles} from "utils/format";

export class CalculationService implements ICalculationService {
    private static BASE_FARE: number = 2.00;

    constructor(readonly demand: number = 0, readonly supply: number = 0) {
    }

    calculateTripCost(costInput: CalculationInput): number {
        const {duration, distanceInMeters, rideType} = costInput;
        const timeCost: number = duration * (rideType.price?.perMinute || 0);
        const distanceCost: number = Math.round(convertFromMetersToMiles(distanceInMeters)) * (rideType.price?.perMile || 0);
        const surgeMultiplier = this._calculateSurgeMultiplier();
        const totalCost: number = (CalculationService.BASE_FARE + timeCost + distanceCost) * surgeMultiplier;
        return totalCost;
    }

    _calculateSurgeMultiplier(): number {
        if (this.supply === 0) return 0.01;
        const ratio = this.demand / this.supply;
        if (ratio <= 0.01) return 0.01;

        if (ratio > 0.01 && ratio <= 0.08) {
            return 0.05;
        }
        return 0.08;
    }

    calculateDriverScore(distance: number, acceptanceRate: number, cancellationRate: number): number {
        const distanceScore = 1 / (1 + distance); // Higher score for closer drivers
        const acceptanceScore = acceptanceRate / 100; // Normalize to 0-1
        const cancellationPenalty = cancellationRate / 100; // Normalize to 0-1
        const totalScore = distanceScore + acceptanceScore - cancellationPenalty;
        return totalScore;
    }
}



