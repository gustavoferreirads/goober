import {
    ArrowUpIcon,
    Fab,
    FabIcon,
    FabLabel,
    HStack,
    Icon,
    MessageCircleIcon,
    PhoneIcon,
    Text,
    VStack
} from "@gluestack-ui/themed";
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import {CancelRide} from "common/application/CancelRide";
import {DriverTrip} from "types/model/trip";

interface TripProps {
    trip?: DriverTrip;
    isVisible: boolean;
    onCancel: ()=> void
}
export const Trip = ({isVisible, trip, onCancel}: TripProps) => {
    if (!isVisible) return;
    return (
        <>
            <Fab size="md" placement="bottom right" mb="$40" bg="$blue500" sx={{":active": {bg: "$warmGray500"}}}>
                <FabIcon as={ArrowUpIcon} mr="$1"/>
                <FabLabel>Navigate</FabLabel>
            </Fab>

        <VStack bg="white" width="100%" position="absolute" borderRadius={20} p={"$4"}>
            <HStack justifyContent={"space-between"} alignItems={"center"} py={"$4"}>
                <Icon as={PhoneIcon} m="$2" w="$8" h="$8"/>
                <VStack gap={"$1"}  alignItems={"center"}>
                    <HStack justifyContent="center" alignItems={"center"} gap={"$2"} >
                        <Text size="2xl" bold> {trip?.passenger.eta}</Text>
                        <IconAwesome name="user-circle" size={20} color="black"/>
                        <Text size="2xl" bold> {trip?.passenger.distance} miles </Text>
                    </HStack>
                    <Text size="lg">
                        Picking up {trip?.passenger.name}
                    </Text>
                </VStack>
                <Icon as={MessageCircleIcon}m="$2" w="$10" h="$10"/>
            </HStack>
            <CancelRide onCancel={onCancel}/>
        </VStack>
        </>
    )
}


