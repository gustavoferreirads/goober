import {useEffect, useState} from 'react';

import {Place} from "types/dto/place";
import {useUserLocationContext} from "context/LocationContext";
import {useSearchHistory} from "features/rider/hooks/useSearchHistory";
import {LocationService} from "service/Location";
import {ILocationService} from "types/service/ILocation";

type UsePlaceSearch = {
    handleSelectDestination: (place: Place) => void
};

const locationService: ILocationService = new LocationService();

export const usePlaceSearch = ({handleSelectDestination}: UsePlaceSearch) => {
    const {userLocation} = useUserLocationContext();
    const [placeInput, setPlaceInput] = useState<string>('');
    const [places, setPlaces] = useState<Place[]>([]);


    useEffect(() => {
        const timerId = setTimeout(() => {
            if (placeInput) {
                locationService.findAllPlaces(placeInput, userLocation?.latLong).then((results: Place[]) => {
                    setPlaces(results as Place[]);
                }).catch(e => {
                    console.log("ERROR", e)
                });
            }
        }, 500);
        return () => clearTimeout(timerId);
    }, [placeInput])


    const {searchHistory, addItemToSearchHistory} = useSearchHistory(
        'places',
        'place_id',
    );

    const onItemPress = (item: Place) => {
        handleSelectDestination(item);
        addItemToSearchHistory(item);
    };

    const onInputTextChange = (value: string) => {
        setPlaceInput(value);
    };

    return {
        data: {
            placeInput,
            places: places.length ===0 ? searchHistory : places,
        },
        actions: {
            onItemPress,
            onInputTextChange,
        },
    };
};
