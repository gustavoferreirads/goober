import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogContent,
    Divider,
    HStack,
    Pressable,
    Progress,
    ProgressFilledTrack,
    Text,
    VStack
} from "@gluestack-ui/themed";
import IconAwesome from "react-native-vector-icons/FontAwesome";

import {Decorators} from "common/application/Decorators";
import {DriverTrip} from "types/model/trip";
import {formatCurrency} from "utils/format";

interface RideRequestProps {
    trip?: DriverTrip;
    progress: number;
    onConfirm: () => void;
    isVisible: boolean;
}

export const RideRequest = ({trip, isVisible, progress, onConfirm}: RideRequestProps) => {

    if(!trip) return

    return (
        <AlertDialog isOpen={isVisible} >
            <AlertDialogBackdrop/>

            <AlertDialogContent>
                <Pressable onPress={onConfirm}>
                    <VStack justifyContent="center" alignItems="center" p="$4" gap="$2">
                        <HStack bg="$primary900" borderRadius="$full" px="$4" py="$3" gap="$2" alignItems="center">
                            <IconAwesome name="user" size={20} color="white"/>
                            <Text size="xl" color="white">
                                {trip.rideType.type}
                            </Text>
                        </HStack>
                        <Text size="5xl" bold color="$black">
                            {formatCurrency(trip.price)}
                        </Text>

                        <HStack gap="$1" alignItems="center" bg="$warmGray200" p="$2" borderRadius="$lg">
                            <IconAwesome name="star" size={15}/>
                            <Text size="sm">
                                {trip.passenger.rate }
                            </Text>
                        </HStack>

                        <Divider my="$1"/>
                        <HStack justifyContent="flex-start" width="$full" gap="$2" py="$1">
                            <Decorators/>

                            <VStack justifyContent="space-between">
                                <VStack>
                                    <Text size="md" color="black">{trip.passenger.eta} ({trip.passenger.distance} miles) away</Text>
                                    <Text size="md">{trip.locations.origin.name}</Text>
                                </VStack>
                                <VStack>
                                    <Text size="md" color="black">{trip.eta} ({trip.distance} miles) away</Text>
                                    <Text size="md">{trip.locations.destination.name}</Text>
                                </VStack>
                            </VStack>
                        </HStack>
                        <Progress value={progress} size="xs" mt="$4">
                            <ProgressFilledTrack/>
                        </Progress>
                    </VStack>
                </Pressable>
            </AlertDialogContent>

        </AlertDialog>
    )
}