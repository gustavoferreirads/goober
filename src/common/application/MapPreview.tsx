import MapView, {Marker, PROVIDER_GOOGLE, Region, UserLocationChangeEvent} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {Dimensions, StyleSheet} from "react-native";
import mapStyle from '../../config/map_style.json';
import {useUserLocationContext} from "context/LocationContext";
import {HStack, Text, VStack} from "@gluestack-ui/themed";
import {scale} from "react-native-size-matters";
import {Circle} from "common/ui/Circle";
import {Square} from "common/ui/Square";
import React from "react";
import {TripMarkers} from "types/model/location";
import {LocationService} from "service/Location";
// import {GOOGLE_MAPS_API_KEY} from '@env';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height + scale(15),
    },
});

type RidePreviewProps = {
    isVisible: boolean
    markers: TripMarkers[]
    initialRegion: Region,
    mapRef: any,
    onDirectionsReady?: () => void
}

export default function MapPreview(props: RidePreviewProps) {
    const {markers, onDirectionsReady, mapRef, isVisible, initialRegion} = props;
    const {userLocation, setUserLocation} = useUserLocationContext();
    const onUserLocationChange = ({nativeEvent: {coordinate}}: UserLocationChangeEvent) => {
        if (coordinate &&
            coordinate.latitude != userLocation?.latLong.latitude
            && coordinate.longitude != userLocation?.latLong.longitude) {

            setUserLocation({
                ...userLocation,
                latLong: {
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                },
            });
        }
    };

    if (!isVisible) return null

    return (
        <MapView
            ref={mapRef}
            style={isVisible ? styles.map : {}}
            customMapStyle={mapStyle}
            initialRegion={initialRegion}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            onUserLocationChange={onUserLocationChange}>
            {markers.map(({origin, destination}, index) => (
                <React.Fragment key={`marker-group-${index}`}>
                    <Marker coordinate={origin.latLong}>
                        <VStack alignItems={"center"}>
                            <Text >
                                {origin.name}
                            </Text>
                            <Circle/>
                        </VStack>
                    </Marker>

                    <Marker coordinate={destination.latLong}>
                        <VStack alignItems={"center"}>
                        <Text>
                            {destination.name}
                        </Text>
                        <Square/>
                        </VStack>
                    </Marker>

                    <MapViewDirections
                        origin={origin.latLong}
                        destination={destination.latLong}
                        apikey={'AIzaSyDiHxQkWaRbVNZrKBkhZWd3rI2TRI_ET6A'}
                        strokeColor={index === 0 ? "black" : "gray"}
                        strokeWidth={3}
                        onReady={onDirectionsReady}
                    />
                </React.Fragment>
            ))}
        </MapView>
    );


}