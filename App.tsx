import { useEffect } from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import './global.css';

import { ThemeProvider } from './src/ui/theme/ThemeContext';
import { AppNavigator } from './src/navigation/AppNavigator';

SplashScreen.preventAutoHideAsync();

export const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('./assets/common/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/common/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./assets/common/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./assets/common/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </View>
  );
};
