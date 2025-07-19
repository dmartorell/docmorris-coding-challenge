import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../ui/theme/ThemeContext';
import { HomeScreen } from '../features/home/ui/screens/HomeScreen';
import { useTranslations } from '../ui/useTranslations';
import { UserScreen } from '../features/user/ui/screens/UserScreen';
import { ExploreScreen } from '../features/explore/ui/screens/ExploreScreen';
import { CategoriesScreen } from '../features/categories/ui/screens/CategoriesScreen';
import { CartScreen } from '../features/cart/ui/screens/CartScreen';
import { getTabScreenOptions, getTabHeaderOptions } from './config';
import { TAB_ROUTES_NAMES } from './types';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const { currentTheme } = useTheme();
  const { t } = useTranslations();

  const homeLabel = t(TAB_ROUTES_NAMES.HOME);
  const categoriesLabel = t(TAB_ROUTES_NAMES.CATEGORIES);
  const exploreLabel = t(TAB_ROUTES_NAMES.EXPLORE);
  const cartLabel = t(TAB_ROUTES_NAMES.CART);
  const userLabel = t(TAB_ROUTES_NAMES.USER);

  return (
    <Tab.Navigator
      screenOptions={getTabScreenOptions(currentTheme)}
      initialRouteName={TAB_ROUTES_NAMES.CART}
    >
      <Tab.Screen
        name={TAB_ROUTES_NAMES.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: homeLabel,
          headerTitle: homeLabel,
          ...getTabHeaderOptions(currentTheme),
        }}
      />
      <Tab.Screen
        name={TAB_ROUTES_NAMES.CATEGORIES}
        component={CategoriesScreen}
        options={{
          tabBarLabel: categoriesLabel,
          headerTitle: categoriesLabel,
          ...getTabHeaderOptions(currentTheme),
        }}
      />
      <Tab.Screen
        name={TAB_ROUTES_NAMES.EXPLORE}
        component={ExploreScreen}
        options={{
          tabBarLabel: exploreLabel,
          headerTitle: exploreLabel,
          ...getTabHeaderOptions(currentTheme),
        }}
      />
      <Tab.Screen
        name={TAB_ROUTES_NAMES.CART}
        component={CartScreen}
        options={{
          tabBarLabel: cartLabel,
          headerTitle: cartLabel,
          ...getTabHeaderOptions(currentTheme),
        }}
      />
      <Tab.Screen
        name={TAB_ROUTES_NAMES.USER}
        component={UserScreen}
        options={{
          tabBarLabel: userLabel,
          headerTitle: userLabel,
          ...getTabHeaderOptions(currentTheme),
        }}
      />
    </Tab.Navigator>
  );
};
