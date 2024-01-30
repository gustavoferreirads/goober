import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Button, ButtonText, Text, VStack} from "@gluestack-ui/themed";

export default function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    return (
        <VStack backgroundColor="black"
                height="$full"
                gap="$8"
                alignItems="center"
                justifyContent="center"
                padding="$4">

            <Text color="white" size="5xl" bold>Goober</Text>

            <VStack width="$full" gap="$4">
                <Button
                    borderRadius="$3xl"
                    action="secondary"
                    variant="outline"
                    onPress={() => {
                        navigation.navigate('Rider')
                    }}>
                    <ButtonText color="white">I'm a Rider </ButtonText>
                </Button>

                <Button variant="outline"
                        action="secondary"
                        borderRadius="$3xl"
                        onPress={() => {
                            navigation.navigate('Driver')
                        }}>
                    <ButtonText color="white">I'm a Driver </ButtonText>
                </Button>
            </VStack>
        </VStack>

    );
}
