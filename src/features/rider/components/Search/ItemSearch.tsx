import {HStack, Image, Pressable, Text, VStack} from "@gluestack-ui/themed";
import {Place} from "types/dto/place";
import {scale} from "react-native-size-matters";

interface ItemSearchProps {
    item: Place
    onItemPress: (place: Place) => void
}

export const ItemSearch = ({item, onItemPress}: ItemSearchProps) => {
    return (
        <Pressable p="$5" onPress={() => onItemPress(item)}   sx={{":active": {bg: "$warmGray200"}}}>
            <HStack space="md" alignItems="center">
                <Image alt={item.name} source={{uri: item.icon}}
                       style={{width: scale(15), height: scale(15), tintColor: 'black'}}/>
                <VStack>
                    <Text
                        color="$coolGray800"
                        fontWeight="$bold"
                        $dark-color="$warmGray100"
                    >
                        {item.name}
                    </Text>
                    <Text color="$coolGray600" $dark-color="$warmGray200">
                        {item.formatted_address}
                    </Text>
                </VStack>
            </HStack>
        </Pressable>)
}