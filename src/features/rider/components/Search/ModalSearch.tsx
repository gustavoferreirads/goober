import {FlatList, View} from 'react-native';
import {usePlaceSearch} from "features/rider/hooks/usePlaceSearch";
import {scale} from "react-native-size-matters";
import {Divider} from "@gluestack-ui/themed";
import {ItemSearch} from "features/rider/components/Search/ItemSearch";
import {HeaderSearch} from "features/rider/components/Search/HeaderSearch";
import {Place} from "types/dto/place";

export interface DestinationSearchProps {
    isVisible?: boolean
    handleSelectDestination: (place: Place) => void
}

const ModalSearch = ({isVisible, handleSelectDestination}: DestinationSearchProps) => {
    const {data, actions} = usePlaceSearch({handleSelectDestination})

    if (!isVisible) return

    return (
        <View style={{flex: 1}}>

            <HeaderSearch onInputTextChange={actions.onInputTextChange} inputValue={data.placeInput}/>

            <Divider/>

            <FlatList
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="interactive"
                keyExtractor={(item) => item.place_id}
                data={data.places}
                ItemSeparatorComponent={() => <Divider my={"$0.5"}/>}
                contentContainerStyle={{paddingBottom: scale(10)}}
                renderItem={(data) => <ItemSearch item={data.item} onItemPress={actions.onItemPress}/>}
            />
        </View>
    );
}

export default ModalSearch;