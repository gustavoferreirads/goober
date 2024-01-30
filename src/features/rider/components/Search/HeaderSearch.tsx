import {Box, HStack, Input, InputField, Text, VStack} from "@gluestack-ui/themed";
import {Decorators} from "common/application/Decorators";
import {globalStyles} from "common/ui/styles";
import {BackButton} from "common/application/BackButton";
import {useNavigation} from "@react-navigation/native";
import {Dimensions} from "react-native";
import {scale} from "react-native-size-matters";

const {width} = Dimensions.get('window')

interface HeaderSearchProps {
    onInputTextChange: (value: string) => void
    inputValue: string,
}


export const HeaderSearch = ({inputValue, onInputTextChange}: HeaderSearchProps) => {
    const navigator = useNavigation();
    const onBack = () => {
        navigator.goBack();
    }

    return (
        <VStack py="$4" pt={"$32"} gap="$4" width={width} style={globalStyles.shadow}>
            <BackButton isVisible onPress={onBack} />

            <Text size="md" bold textAlign={"center"}>Tell us where you would like to go</Text>

            <HStack pr={"$4"} >
                <Box width="10%" justifyContent="center" alignItems={"center"}>
                    <Decorators size={scale(40)} />
                </Box>

            <VStack gap="$4" width="90%">
                <Input
                    variant="outline"
                    size="md"
                    isDisabled
                    width="$full"
                    backgroundColor="$backgroundDark50">
                    <InputField type="text" placeholder="Current Location"/>
                </Input>

                <Input
                    variant="outline"
                    size="md"
                    backgroundColor="$backgroundDark50"
                >
                    <InputField type="text" placeholder="Where to?" value={inputValue}
                                onChangeText={onInputTextChange}/>
                </Input>
            </VStack>
            </HStack>
        </VStack>
    )

}