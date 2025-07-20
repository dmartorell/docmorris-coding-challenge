import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { CheckoutScreen } from '../features/checkout/ui/screens/CheckoutScreen';
import { useTranslations } from '../locales/useTranslations';
import { useTheme } from '../ui/theme/ThemeContext';
import { TabNavigator } from './TabNavigator';
import { SCREENS } from './types';
import { getScreenHeaderOptions } from './config';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { currentTheme } = useTheme();
  const { t } = useTranslations();

  const checkoutLabel = t('screen_header_checkout');

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.MAIN_TABS}
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.CHECKOUT_SCREEN}
          component={CheckoutScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name="close" size={24} color={currentTheme.colors.textMuted} />
              </TouchableOpacity>
            ),
            presentation: 'fullScreenModal',
            headerTitle: checkoutLabel,
            ...getScreenHeaderOptions(currentTheme),
          })}

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
