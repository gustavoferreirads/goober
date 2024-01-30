import {RideRequest} from "features/driver/components/RideRequest";
import {Trip} from "features/driver/components/Trip";
import {StatusButton} from "features/driver/components/StatusButton";
import {useDriver} from "features/driver/hooks/useDriver";
import MapPreview from "common/application/MapPreview";
import {BackButton} from "common/application/BackButton";
import {VStack} from "@gluestack-ui/themed";
import {useNavigation} from "@react-navigation/native";

export const Container = () => {
    const {data, operation} = useDriver()

    const navigator = useNavigation();
    const onBack = () => {
        navigator.goBack();
    }
    return (
        <VStack justifyContent={"flex-end"}>
            <BackButton isVisible={!data.isTripConfirmed} onPress={onBack}/>

            <MapPreview mapRef={data.mapRef} markers={data.markers} initialRegion={data.initialRegion} isVisible/>

            <RideRequest isVisible={!data.isTripConfirmed}
                         progress={data.progress}
                         trip={data.driverTrip}
                         onConfirm={operation.onAccept}/>

            <Trip isVisible={data.isTripConfirmed} trip={data.driverTrip} onCancel={operation.onFinish} />

            <StatusButton
                status={data.status}
                isVisible={!data.isTripConfirmed}
                onPress={operation.toggleStatus}/>
        </VStack>

    )
}