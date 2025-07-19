import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from '../ui/components/Text';
import { useTheme } from '../ui/theme/ThemeContext';
import { HomeScreen } from '../features/home/ui/screens/HomeScreen';
import { useTranslations } from '../ui/useTranslations';
import { getTabScreenOptions, getTabHeaderOptions } from './config';
import { TAB_ICON_NAMES } from './types';

const Tab = createBottomTabNavigator();

const CategoriesScreen = () => <Text>Categories</Text>;
const ExploreScreen = () => <Text>Explore</Text>;
const CartScreen = () => <Text>Cart</Text>;
const UserScreen = () => <Text>User</Text>;

export const TabNavigator = () => {
  const { currentTheme } = useTheme();
  const { t } = useTranslations();
  return (
    <Tab.Navigator
      screenOptions={getTabScreenOptions(currentTheme)}
    >
      <Tab.Screen
        name={TAB_ICON_NAMES.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: t('home'),
          ...getTabHeaderOptions(currentTheme),
        }}
      />
      <Tab.Screen
        name={TAB_ICON_NAMES.CATEGORIES}
        component={CategoriesScreen}
        options={{
          tabBarLabel: t('categories'),
          ...getTabHeaderOptions(currentTheme),
        }}
      />
      <Tab.Screen
        name={TAB_ICON_NAMES.EXPLORE}
        component={ExploreScreen}
        options={{
          tabBarLabel: t('explore'),
          ...getTabHeaderOptions(currentTheme),
        }}
      />
      <Tab.Screen
        name={TAB_ICON_NAMES.CART}
        component={CartScreen}
        options={{
          tabBarLabel: t('cart'),
          ...getTabHeaderOptions(currentTheme),
        }}
      />
      <Tab.Screen
        name={TAB_ICON_NAMES.USER}
        component={UserScreen}
        options={{
          tabBarLabel: t('user'),
          ...getTabHeaderOptions(currentTheme),
        }}
      />
    </Tab.Navigator>
  );
};
