import {useEffect, useState} from "react";
import {RiderTrip} from "types/model/trip";
import {TripService} from "service/Trip";
import {ITripService} from "types/service/ITripService";
import {TripMarkers} from "types/model/location";
import {RiderTripSection} from "types/dto/tripSection";

const tripService: ITripService = new TripService()
export const useRide = (onBack: () => void, tripMarkers?: TripMarkers) => {
    const [selected, onSelectRide] = useState<RiderTrip | undefined>();
    const [rides, setRides] = useState<RiderTripSection[]>([]);


    useEffect(() => {
        if (!tripMarkers) return
        tripService.getRideTripOptions(tripMarkers.origin, tripMarkers.destination).then((sections) => {
            setRides(sections)
        })

    }, [tripMarkers]);

    const onCancel = () => {
        onSelectRide(undefined)
    }


    return {
        data: {selected, isOptionsVisible: !selected, rides},
        operations: {
            onSelectRide, onCancel, onBack: () => {
                setRides([])
                onBack();
            }
        }
    }
}
