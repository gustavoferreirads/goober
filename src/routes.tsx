import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "features/home/HomeScreen";
import RiderScreen from "features/rider/RiderScreen";
import DriverScreen from "features/driver/DriverScreen";

const Stack = createNativeStackNavigator();

const hideHeaderOptions = {
    title: '',
    header: () => null,
    headerBackVisible: false,
    headerShadowVisible: false
};
export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={hideHeaderOptions}/>
                <Stack.Screen name="Rider" component={RiderScreen} options={hideHeaderOptions}/>
                <Stack.Screen name="Driver" component={DriverScreen} options={hideHeaderOptions}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}