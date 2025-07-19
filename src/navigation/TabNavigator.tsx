import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from '../ui/components/Text';
import { useTheme } from '../ui/theme/ThemeContext';
import { HomeScreen } from '../features/home/ui/screens/HomeScreen';
import { getTabScreenOptions, getTabHeaderOptions } from './config';

const Tab = createBottomTabNavigator();

const CategoriesScreen = () => <Text>Categories</Text>;
const ExploreScreen = () => <Text>Explore</Text>;
const CartScreen = () => <Text>Cart</Text>;
const UserScreen = () => <Text>User</Text>;

export const TabNavigator = () => {
  const { currentTheme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={getTabScreenOptions(currentTheme)}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          ...getTabHeaderOptions(currentTheme),
        }}
      />
      <Tab.Screen name="Categories" component={CategoriesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Explore" component={ExploreScreen} options={{ headerShown: false }} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          ...getTabHeaderOptions(currentTheme),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          ...getTabHeaderOptions(currentTheme),
        }}
      />
    </Tab.Navigator>
  );
};
