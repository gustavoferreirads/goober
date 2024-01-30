import {IDriverService} from "types/service/IDriver";
import {DriverService} from "service/Driver";
import {Location} from "types/model/location";
import {DriverTrip, DriverTripStatus, RiderTrip, Trip, TripMarkers} from "types/model/trip";
import {convertFromMetersToMiles, formatTime} from "utils/format";
import {generateFakeName, generateRandomRating} from "utils/random";
import {ILocationService} from "types/service/ILocation";
import {LocationService} from "service/Location";
import {RIDE_TYPES} from "mock/data";
import {RiderTripSection} from "types/dto/tripSection";
import {CalculationService} from "service/Calculation";
import {ICalculationService} from "types/service/ICalculation";
import {ITripService} from "types/service/ITripService";
import uuid from 'react-native-uuid';

export class TripService implements ITripService {
    private driverService: IDriverService = new DriverService()
    private locationService: ILocationService = new LocationService()
    private calculationService: ICalculationService | undefined;

    constructor() {
        this.driverService.getDrivers().then((drivers)=>{
            const supply = drivers.length
            const demand = 1;
            this.calculationService = new CalculationService(demand, supply)
        })
    }

    async getRideTripOptions(userLocation: Location, destination: Location): Promise<RiderTripSection[]> {
        const sectionMap = new Map<string, RiderTrip[]>();

        for (let z = 0; z < RIDE_TYPES.length; z++) {
            const rideType = RIDE_TYPES[z];

            const driver = await this.driverService.findDriver(rideType, userLocation)
            if (!driver || !driver?.location) continue;

            const distance = this.locationService.calculateDistance(userLocation, destination);
            const distanceFromDriver = this.locationService.calculateDistance(userLocation, driver.location);

            const duration = (await this.locationService.getTravelTime(userLocation.latLong, destination.latLong))

            const price = this.calculationService?.calculateTripCost({rideType, distanceInMeters: distance, duration: duration.value}) || 0;

            const trip: RiderTrip = {
                id: String(uuid.v4()),
                driver: {
                    ...driver,
                    eta: (await this.locationService.getTravelTime(driver.location.latLong, userLocation.latLong))?.text,
                    distance: convertFromMetersToMiles(distanceFromDriver),
                },
                distance: convertFromMetersToMiles(distance),
                eta: duration.text,
                locations: {
                    origin: userLocation,
                    destination
                },
                rideType: rideType,
                price
            }

            if (!sectionMap.has(rideType.section)) {
                sectionMap.set(rideType.section, []);
            }

            sectionMap.get(rideType.section)?.push(trip);
        }
        const rideSections: RiderTripSection[] = Array.from(sectionMap, ([title, data]) => ({title, data}));
        return rideSections;
    };

    async getNextDriverTrip(center: Location): Promise<DriverTrip> {
        const originRadiusMiles = 4 * 1609.34;
        const destinationRadiusMiles = 10 * 1609.34;

        const origin = await this.locationService.generateRandomPoint(center, originRadiusMiles);
        const destination = await this.locationService.generateRandomPoint(center, destinationRadiusMiles);

        const tripMarkers: TripMarkers = {origin, destination};
        const distanceInMeters = this.locationService.calculateDistance(origin, destination);
        const passengerDistance = this.locationService.calculateDistance(center, origin);

        const travelTimeToPassenger = await this.locationService.getTravelTime(center.latLong, origin.latLong)
        const travelTime = await this.locationService.getTravelTime(origin.latLong, destination.latLong)

        const rideType = RIDE_TYPES[Math.round(generateRandomRating(0, RIDE_TYPES.length-1))];
        const price = this.calculationService?.calculateTripCost({rideType, distanceInMeters, duration: travelTime.value}) || 0;
        return {
            id: String(uuid.v4()),
            locations: tripMarkers,
            rideType,
            price,
            distance:  Math.round(convertFromMetersToMiles(distanceInMeters)),
            eta: travelTime.text,
            status: DriverTripStatus.PENDING,
            passenger: {
                id: String(uuid.v4()),
                name: generateFakeName(),
                location: origin,
                rate: generateRandomRating(1, 5),
                eta: travelTimeToPassenger.text,
                distance: Math.round(convertFromMetersToMiles(passengerDistance))
            },
        };
    }
}

