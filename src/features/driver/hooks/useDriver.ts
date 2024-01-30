import {useEffect, useRef, useState} from "react";
import {Status} from "types/dto/status";
import MapView from "react-native-maps";
import {useUserLocationContext} from "context/LocationContext";
import {DriverTrip, DriverTripStatus} from "types/model/trip";
import {useProgressFill} from "features/driver/hooks/useProgressFill";
import {ITripService} from "types/service/ITripService";
import {TripService} from "service/Trip";
import {ILocationService} from "types/service/ILocation";
import {LocationService} from "service/Location";

const locationService: ILocationService = new LocationService();
export const useDriver = () => {
    const mapRef = useRef<MapView>(null);
    const {userLocation} = useUserLocationContext();
    const [driverTrip, setDriverTrip] = useState<DriverTrip | undefined>()
    const [status, setStatus] = useState(Status.OFFLINE)
    const {progress, startProcess, cancelProcess} = useProgressFill();

    const markers = !driverTrip ? [] : [driverTrip.locations, {
        origin: driverTrip.passenger.location,
        destination: userLocation,
    }] as any[]

    const initialRegion = locationService.calculateRegionForCoordinates(userLocation);

    const tripService: ITripService = new TripService();
    const toggleStatus = () => {
        setStatus(status === Status.ONLINE ? Status.OFFLINE : Status.ONLINE)
        if (status === Status.ONLINE) onFinish();
    }

    const onFinish = () => {
        setDriverTrip(undefined)
    }

    const generateRide = (): number => setTimeout(async () => {
        if (!userLocation) return;

        const t = await tripService.getNextDriverTrip(userLocation);
        setDriverTrip(t);
        startProcess(onFinish);
    }, 5000);

    useEffect(() => {
        if (status === Status.OFFLINE || driverTrip) return;
        const timer = generateRide();
        return () => clearTimeout(timer);
    }, [status, driverTrip]);

    useEffect(() => {

        setTimeout(()=>{
            mapRef.current?.animateToRegion(initialRegion, 4000);
        },2000)

    }, [driverTrip])

    const onAccept = () => {
        if (!driverTrip) return;
        cancelProcess();
        setDriverTrip({...driverTrip, status: DriverTripStatus.CONFIRMED})
    }

    return {
        data: {
            mapRef,
            status,
            driverTrip,
            markers,
            initialRegion,
            progress,
            isStatusBtnVisible: !driverTrip,
            isTripConfirmed: driverTrip?.status === DriverTripStatus.CONFIRMED
        },
        operation: {
            toggleStatus,
            onAccept,
            onFinish
        }
    }
}