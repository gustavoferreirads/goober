import {useEffect, useRef, useState} from "react";
import MapView from "react-native-maps";
import {useUserLocationContext} from "context/LocationContext";
import {TripMarkers} from "types/model/location";
import {Place} from "types/dto/place";
import {DriverService} from "service/Driver";
import {ILocationService} from "types/service/ILocation";
import {LocationService} from "service/Location";

const locationService: ILocationService = new LocationService();

export default function useRidePreview() {
    const mapRef = useRef<MapView>(null);
    const [isRidePreviewVisible, setIsRidePreviewVisible] = useState<boolean>(false)
    const [marker, setMapMarker] = useState<TripMarkers | undefined>();
    const {userLocation} = useUserLocationContext();
    const initialRegion = locationService.calculateRegionForCoordinates(userLocation);
    const onSelectDestination = (place: Place) => {
        if (!userLocation?.latLong) return
        const { geometry } = place
        setMapMarker({
            origin: userLocation,
            destination: {
                name: place.name,
                description: place.formatted_address,
                latLong: {
                    latitude: geometry.location.lat,
                    longitude: geometry.location.lng,
                }
            }
        });
    };

    useEffect(() => {
        if (marker?.destination && marker?.origin) {
            setIsRidePreviewVisible(true);
        }
    }, [marker])

    useEffect(() => {
        if (!isRidePreviewVisible || !marker) return;
        setTimeout(()=>{
            mapRef.current?.animateToRegion(initialRegion, 4000);
        },2000)

    }, [isRidePreviewVisible])

    const onBack = () => {
        setIsRidePreviewVisible(false);
        setMapMarker(undefined);
    }

    useEffect(() => {
        if(!userLocation) return
        new DriverService().generateDrivers(userLocation)
    }, [userLocation]);

    return {
        data: {
            mapRef,
            marker,
            isRidePreviewVisible,
            initialRegion
        },
        actions: {
            onSelectDestination,
            onBack
        }
    }
}