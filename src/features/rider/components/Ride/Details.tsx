import React from "react";
import {Image} from "react-native";
import {Avatar, Box, Button, ButtonIcon, HStack, PhoneIcon, Text, VStack} from "@gluestack-ui/themed";
import {scale} from "react-native-size-matters";
import {CancelRide} from "common/application/CancelRide";
import {RiderTrip} from "types/model/trip";
import {globalStyles} from "common/ui/styles";
import IconAwesome from "react-native-vector-icons/FontAwesome";

interface DetailsProps {
    trip?: RiderTrip;
    onCancel: () => void;
}

export const Details = ({trip, onCancel}: DetailsProps) => {

    if (!trip) return;

    return (
        <Box bg="white" width="100%" position="absolute" borderRadius="$xl">
            <HStack p="$4" justifyContent="space-between" px="$6" style={globalStyles.shadow}>
                <Text size="2xl" color="black" bold>
                    Meet at your pick-up stop
                </Text>
                <Box p="$2" bg="$blue500" justifyContent="center" alignItems="center">
                        <Text size="xl" color="white">{trip.eta}</Text>
                </Box>
            </HStack>
            <HStack justifyContent="space-between" alignItems="center" py="$4" px="$4">
                <VStack justifyContent="center"  >
                    <HStack>
                        <Avatar size="md" borderRadius={'$full'} borderColor="$warmGray200" borderWidth={2}>
                            <Image alt="uberxw"
                                   style={{width: scale(36), height: scale(36),}}
                                   borderRadius={30} source={require('../../../../../assets/user.png')}/>
                        </Avatar>
                        <Image alt="uberx"
                               style={{width: scale(55), height: scale(40), position: "relative"}}
                               source={require('../../../../../assets/uberx.png')}/>
                    </HStack>

                    <VStack  alignItems="center" justifyContent="center">
                        <Text size="sm" color="$warmGray500" >{trip.driver.name}</Text>
                        <HStack gap="$1" alignItems="center"  pl="$2" borderRadius="$lg">
                            <IconAwesome name="star" size={scale(12)}/>
                            <Text size="sm" color="$warmGray500" >{trip.driver.rate}</Text>
                        </HStack>
                    </VStack>
                </VStack>

                <VStack justifyContent="center" alignItems="center">
                    <Text size="md">{trip.driver.car.model}</Text>
                    <Text size="2xl" color="black" bold>{trip.driver.car.plate}</Text>
                </VStack>
            </HStack>

            <HStack justifyContent="space-between" px="$4" pb="$2" mb="$4">
                <Button
                    borderRadius="$full"
                    size="sm"
                    bg="$warmGray200"
                    borderColor="$warmGray200"
                >
                    <ButtonIcon as={PhoneIcon} color="black"/>
                </Button>
                <Box borderRadius="$full" p="$2" width="85%" bg="$warmGray200">
                    <Text> Any pick-up notes? </Text>
                </Box>
            </HStack>
            <Box mb="$8" px="$4">
                <CancelRide onCancel={onCancel}/>
            </Box>
        </Box>
    )
}