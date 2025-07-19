import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Theme } from '../ui/theme/themes';

export const getTabScreenOptions = (currentTheme: Theme): (
  ({ route }: { route: { name: string } }) => BottomTabNavigationOptions) =>
  ({ route }) => ({
    tabBarActiveTintColor: currentTheme.colors.secondary,
    tabBarInactiveTintColor: currentTheme.colors.textSecondary,
    tabBarStyle: { backgroundColor: currentTheme.colors.background },
    tabBarIcon: ({ color, size }: { color: string; size: number }) => {
      switch (route.name) {
      case 'home':
        return <MaterialIcons name="home" size={size} color={color} />;
      case 'categories':
        return <MaterialIcons name="explore" size={size} color={color} />;
      case 'explore':
        return <MaterialIcons name="favorite" size={size} color={color} />;
      case 'cart':
        return <MaterialIcons name="shopping-cart" size={size} color={color} />;
      case 'user':
        return <MaterialIcons name="person" size={size} color={color} />;
      default:
        return null;
      }
    },
  });

export const getTabHeaderOptions = (currentTheme: Theme): BottomTabNavigationOptions => ({
  headerStyle: { backgroundColor: currentTheme.colors.surface },
  headerTitleStyle: {
    color: currentTheme.colors.textSecondary,
    fontFamily: currentTheme.typography.weights.semiBold,
    fontSize: currentTheme.typography.sizes.title2.fontSize,
  },
  headerTitleAlign: 'left',
});
