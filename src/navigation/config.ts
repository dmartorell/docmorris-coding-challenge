import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Theme } from '../ui/theme/themes';

export const getDefaultHeaderOptions = (currentTheme: Theme): NativeStackNavigationOptions => {
  return {
    headerStyle: {
      backgroundColor: currentTheme.colors.surface,
    },
    headerTitleStyle: {
      color: currentTheme.colors.textSecondary,
      fontFamily: currentTheme.typography.weights.semiBold,
      fontSize: currentTheme.typography.sizes.title2.fontSize,
    },
    headerShadowVisible: false,
    headerTitleAlign: 'left',
  };
};
