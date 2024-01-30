import {Driver} from "types/model/driver";
import {RIDE_TYPES} from "mock/data";
import {generateFakeName, generateRandomCar, generateRandomRating} from "utils/random";
import {ILocationService} from "types/service/ILocation";
import {LocationService} from "service/Location";
import {Location} from "types/model/location";
import uuid from 'react-native-uuid';
import {IStorageService} from "types/service/IStorage";
import {StorageService} from "service/Storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IDriverService} from "types/service/IDriver";
import {RideType} from "types/model/rideType";
import {ICalculationService} from "types/service/ICalculation";
import {CalculationService} from "service/Calculation";

export class DriverService implements IDriverService {
    private locationService: ILocationService = new LocationService()
    private storage: IStorageService = new StorageService();
    private calculation: ICalculationService = new CalculationService();
    async generateDrivers(userLocation: Location) {
        if((await this.getDrivers()).length > 0) return;
        const drivers: Driver[] =  await this._createDriversForRideType(userLocation)
        const jsonValue = JSON.stringify(drivers);
        await this.storage.save('drivers', jsonValue);
    }

    async getDrivers(): Promise<Driver[]> {
        const jsonValue = await AsyncStorage.getItem('drivers');
        if (jsonValue) {
            return JSON.parse(jsonValue);
        }
        return [];
    }

    async findDriver( rideType: RideType, riderLocation: Location): Promise<Driver | null> {
        let selectedDriver: Driver | null = null;
        let highestScore: number = -Infinity;
        const drivers = await this.getDrivers();

        drivers.filter(d=> d.car.rideTypeId === rideType.id).forEach(driver => {
                if(!driver.location) return;
                const distance = this.locationService.calculateDistance(riderLocation, driver.location);
                const score = this.calculation.calculateDriverScore(distance, driver.acceptanceRate, driver.cancellationRate)

                if (score > highestScore) {
                    highestScore = score;
                    selectedDriver = driver;
                }
            });

        return selectedDriver;
    }

    async _createDriversForRideType (userLocation: Location): Promise<Driver[]> {
        const drivers: Driver[] = [];
        const destinationRadiusMiles = 10 * 1609.34;

        for (let z = 0; z < RIDE_TYPES.length; z++) {
            const rideType =  RIDE_TYPES[z]
            for (let i = 0; i < 3; i++) { // Create 3 drivers for each ride type

                const location = await this.locationService.generateRandomPoint(userLocation, destinationRadiusMiles);
                drivers.push({
                    id: String(uuid.v4()),
                    acceptanceRate: 0,
                    cancellationRate: 0,
                    location,
                    name: generateFakeName(),
                    rate: generateRandomRating(),
                    car: {
                        ...generateRandomCar(),
                        rideTypeId: rideType.id
                    }
                });


            }
        }

        return drivers;
    };




}