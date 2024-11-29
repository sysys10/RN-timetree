import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigations/root/RootNavigator';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './src/api/queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <RootNavigator />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
