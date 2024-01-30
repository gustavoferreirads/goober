import {StyleSheet, View} from 'react-native';
import ModalSearch from "features/rider/components/Search/ModalSearch";
import MapPreview from "common/application/MapPreview";
import useRidePreview from "features/rider/hooks/useRidePreview";
import {RideContent} from "features/rider/components/Ride/Content";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});
export default function Container() {
    const {data, actions} = useRidePreview()
    const {isRidePreviewVisible, mapRef, marker, initialRegion} = data;
    const {onBack} = actions;
    return (
        <View style={styles.container}>
            <ModalSearch isVisible={!isRidePreviewVisible}
                         handleSelectDestination={actions.onSelectDestination}/>

            <MapPreview mapRef={mapRef}
                        onDirectionsReady={() => {}}
                        initialRegion={initialRegion}
                        isVisible={isRidePreviewVisible}
                        markers={marker ? [marker] : []}/>

            <RideContent tripMarkers={marker}  isVisible={isRidePreviewVisible} onBack={onBack}/>
        </View>
    );
}



