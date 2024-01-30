import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Spacer} from "common/ui/Spacer";
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: scale(20),
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'green',
        width: '100%',
        padding: scale(10),
    },
});
export default function History() {

    const historyData = ["US", "BR", "UK", "PT", "ES"];

    const renderFlatListItem = ({item}: { item: string }) => {
        return (<Text> {item} </Text>)
    }

    return (
        <View style={styles.container}>


            <FlatList
                stickyHeaderIndices={[0]}
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="interactive"
                data={historyData}
                renderItem={renderFlatListItem}
                ItemSeparatorComponent={() => <Spacer height={scale(17)}/>}
                contentContainerStyle={{
                    paddingBottom: scale(10),
                }}
                style={{width: '100%'}}
                ListHeaderComponent={
                    <View style={{
                        marginTop: 10,
                        marginBottom: 10,
                        width: 100,
                        alignItems: 'flex-start',
                        backgroundColor: 'red'
                    }}>
                        <Text style={{fontSize: 18}}>My Trips</Text>
                    </View>
                }
            />

        </View>
    );
}



