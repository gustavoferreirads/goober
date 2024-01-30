import RideOptions from "features/rider/components/Ride/Options";
import {Details} from "features/rider/components/Ride/Details";
import {useRide} from "features/rider/hooks/useRide";
import {BackButton} from "common/application/BackButton";
import {TripMarkers} from "types/model/location";

interface RideContentProps {
    onBack: () => void;
    isVisible: boolean
    tripMarkers?: TripMarkers
}

export const RideContent = ({onBack, isVisible, tripMarkers}: RideContentProps) => {
    const {data, operations} = useRide(onBack, tripMarkers);

    if(!isVisible) return ;

    return (
        <>
            <Details trip={data.selected} onCancel={operations.onCancel}/>
            <RideOptions isVisible={data.isOptionsVisible} riderTripSectionData={data.rides}
                         onConfirm={operations.onSelectRide}/>
            <BackButton isVisible={data.isOptionsVisible} onPress={operations.onBack}/>
        </>
    )

}