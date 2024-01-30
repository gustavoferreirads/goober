import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Routes from "routes";
import {UserLocationContextProvider} from "context/LocationContext";
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {gooberConfig} from "config/gluestack-ui.config";

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
          <UserLocationContextProvider>
              <GluestackUIProvider config={gooberConfig}>
                <Routes />
              </GluestackUIProvider>
          </UserLocationContextProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

