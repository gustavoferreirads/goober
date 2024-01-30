import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import * as ExpoLocationService from 'expo-location';
import {Location} from "types/model/location";
import {ILocationService} from "types/service/ILocation";
import {LocationService} from "service/Location";
import {DriverService} from "service/Driver";

const locationService: ILocationService = new LocationService();

type UserLocationContextValue = {
    userLocation?: Location
    setUserLocation: (location: Location) => void
}

const UserLocationContext =
    createContext<UserLocationContextValue | null>(null);


export const UserLocationContextProvider = ({children}: { children: ReactNode }) => {
    const [userLocation, setUserLocation] = useState<Location>();
    return (
        <UserLocationContext.Provider value={{userLocation, setUserLocation}}>
            {children}
        </UserLocationContext.Provider>
    );
};

export const useUserLocationContext = () => {
    const context = useContext(UserLocationContext);

    useEffect(() => {
        if (!context?.userLocation) {
            (async () => {
                let {status} = await ExpoLocationService.requestForegroundPermissionsAsync();

                if (status !== 'granted') {
                    console.log('Permission to access location was denied');
                    return;
                }
                const location = await ExpoLocationService.getCurrentPositionAsync({});
                const {latitude,longitude} = location.coords;
                let formattedAddress = await locationService.getAddressFromCoordinates(latitude,longitude);
                context?.setUserLocation({
                    latLong: {latitude,longitude},
                    name: formattedAddress
                });

            })();
            return
        }

    }, [context?.userLocation])

    if (!context) {
        throw new Error(
            "useUserLocationContext must be used inside UserLocationContextProvider"
        );
    }

    return context;
};
