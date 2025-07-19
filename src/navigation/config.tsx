import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Theme } from '../ui/theme/themes';
import { TAB_ROUTES_NAMES } from './types';

const TAB_HEIGHT = 80;

export const getTabScreenOptions = (currentTheme: Theme): (
  ({ route }: { route: { name: string } }) => BottomTabNavigationOptions) =>
  ({ route }) => ({
    tabBarActiveTintColor: currentTheme.colors.secondary,
    tabBarInactiveTintColor: currentTheme.colors.textMuted,
    tabBarStyle: { backgroundColor: currentTheme.colors.surface, height: TAB_HEIGHT },
    tabBarIcon: ({ color, size }: { color: string; size: number }) => {
      switch (route.name) {
      case TAB_ROUTES_NAMES.HOME:
        return <MaterialIcons name="home" size={size} color={color} />;
      case TAB_ROUTES_NAMES.CATEGORIES:
        return <MaterialIcons name="explore" size={size} color={color} />;
      case TAB_ROUTES_NAMES.EXPLORE:
        return <MaterialIcons name="favorite" size={size} color={color} />;
      case TAB_ROUTES_NAMES.CART:
        return <MaterialIcons name="shopping-cart" size={size} color={color} />;
      case TAB_ROUTES_NAMES.USER:
        return <MaterialIcons name="person" size={size} color={color} />;
      default:
        return null;
      }
    },
  });

export const getTabHeaderOptions = (currentTheme: Theme): BottomTabNavigationOptions => ({
  headerStyle: {
    backgroundColor: currentTheme.colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 9,
    elevation: 2,
  },
  headerTitleStyle: {
    color: currentTheme.colors.textSecondary,
    fontFamily: currentTheme.typography.weights.semiBold,
    fontSize: currentTheme.typography.sizes.title2.fontSize,
  },
  headerTitleAlign: 'left',
  headerShadowVisible: true,
});

export const getScreenHeaderOptions = (currentTheme: Theme): NativeStackNavigationOptions => ({
  headerStyle: {
    backgroundColor: currentTheme.colors.surface,
  },
  headerTitleStyle: {
    color: currentTheme.colors.textSecondary,
    fontFamily: currentTheme.typography.weights.semiBold,
    fontSize: currentTheme.typography.sizes.title2.fontSize,
  },
  headerTitleAlign: 'left',
  headerShadowVisible: true,
});
