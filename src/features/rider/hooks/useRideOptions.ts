import {useCallback, useMemo, useRef, useState} from "react";
import {RiderTrip} from "types/model/trip";
import BottomSheet from "@gorhom/bottom-sheet";
import {RiderTripSection} from "types/dto/tripSection";

export const useRideOptions = (    data?: RiderTripSection[]) => {
    const [selected, setSelected] = useState<RiderTrip>();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [sheetIndex, setSheetIndex] = useState<number>(0);


    const snapPoints = useMemo(() =>{
        if(data?.length === 0) return ['30%','30%']
        return ['50%', '70%']
    }, [data]);


    const handleSheetChanges = useCallback((index: number) => {
        setSheetIndex(index);
    }, []);

    const onSelectRide = useCallback((trip: RiderTrip) => {
        setSelected(trip);
    }, []);


    return {
        data: {
            selected,
            bottomSheetRef,
            sheetIndex,
            snapPoints
        },
        operations: {
            onSelectRide,
            handleSheetChanges
        }
    }
};
