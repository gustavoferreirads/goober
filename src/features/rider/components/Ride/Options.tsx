import {Box, Button, ButtonText, Divider, HStack, Pressable, Spinner, Text, VStack,} from "@gluestack-ui/themed";
import {Image, SectionList} from 'react-native'
import BottomSheet from "@gorhom/bottom-sheet";
import {scale} from "react-native-size-matters";
import {formatCurrency} from "utils/format";
import {RiderTrip} from "types/model/trip";
import {RiderTripSection} from "types/dto/tripSection";
import {useRideOptions} from "features/rider/hooks/useRideOptions";
import IconAwesome from "react-native-vector-icons/FontAwesome";

interface RideItemProps {
    item: RiderTrip,
    selected: boolean
    onSelect: (item: RiderTrip) => void

}

export const RideOptionItem = ({item, onSelect, selected}: RideItemProps) => {
    return (
        <Pressable onPress={() => onSelect(item)}>
            <HStack space="md" alignItems="center" px="$2" py="$4" justifyContent="space-between" borderColor="$black"
                    borderRadius="$2xl"
                    borderWidth={selected ? "$2" : "$0"}>
                <HStack justifyContent="space-between" maxWidth="70%">
                    <VStack justifyContent="center">
                        <Image alt="uberx" style={{width: scale(60), height: scale(40)}}
                               source={require('../../../../../assets/uberx.png')}/>
                    </VStack>
                    <VStack height="$full" px="$3">
                        <HStack  alignItems={"center"}>
                            <Text
                                color="$coolGray800"
                                fontWeight="$bold"
                                size="lg"
                                $dark-color="$warmGray100">
                                {item.rideType.type}
                            </Text>

                            <Box ml={"$2"} mr={"$1"}>
                                <IconAwesome name="user" size={scale(10)} color="black" />
                            </Box>

                            <Text
                                color="$coolGray800"
                                size="sm"
                                $dark-color="$warmGray100">
                                {item.rideType.maxPassengers}
                            </Text>
                        </HStack>

                        <Text color="$coolGray800" $dark-color="$warmGray200">
                            {item.driver.distance} miles * {item.driver.eta} away
                        </Text>
                        <Text color="$coolGray600" size="sm" $dark-color="$warmGray200">
                            {item.rideType.description}
                        </Text>
                    </VStack>
                </HStack>
                <VStack height="$full" justifyContent="flex-start">
                    <Text
                        fontSize="$xl"
                        color="black"
                        $dark-color="$warmGray100">
                        {formatCurrency(item.price)}
                    </Text>
                </VStack>
            </HStack>
        </Pressable>
    )
}

interface RideOptionsProps {
    onConfirm: (selected?: RiderTrip) => void;
    riderTripSectionData?: RiderTripSection[];
    isVisible?: boolean;
}

const RideOptions = ({onConfirm, riderTripSectionData, isVisible}: RideOptionsProps) => {

    const {data, operations} = useRideOptions(riderTripSectionData);

    const renderItem = ({item}: { item: RiderTrip }) => (<RideOptionItem item={item}
                                                                         onSelect={operations.onSelectRide}
                                                                         selected={item.id === data.selected?.id}/>);
    if (!isVisible) return null

    return (
        <BottomSheet
            ref={data.bottomSheetRef}
            index={1}
            snapPoints={data.snapPoints}
            onChange={operations.handleSheetChanges}>
            <VStack borderRadius={20} alignItems="center">
                <Text size="xl" color="black" mb="$2">
                    Choose a ride
                </Text>
                <Divider mb="$1"/>

                {riderTripSectionData?.length === 0 && (
                    <Spinner size="large" my={"$8"}/>
                )}

                <Box width="$full" px="$2" mt="$1">
                    {(!!riderTripSectionData && riderTripSectionData?.length > 0) && (
                        <SectionList
                            sections={riderTripSectionData as any}
                            scrollEnabled={true}
                            style={{height: data.sheetIndex == 1 ? '80%' : '60%'}}
                            keyExtractor={(item, index) => item.id + index}
                            renderItem={renderItem}
                            stickySectionHeadersEnabled={false}
                            renderSectionHeader={({section: {title}}) => (
                                <Text fontWeight="bold" bg="white" px="$2">{title}</Text>
                            )}
                        />
                    )}

                </Box>
                <Box width="$full" p="$4">
                    <Button
                        action="primary"
                        width="$full"
                        isDisabled={!data.selected}
                        onPress={() => onConfirm(data.selected)}>
                        <ButtonText color="white">Choose {data.selected?.rideType.type}</ButtonText>
                    </Button>
                </Box>
            </VStack>
        </BottomSheet>
    )
}


export default RideOptions