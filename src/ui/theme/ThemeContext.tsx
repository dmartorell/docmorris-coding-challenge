import React, {
  FC,
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Application from 'expo-application';
import { BRAND_ID, BrandId, BUNDLE_ID, THEME_STORAGE_KEY } from '../../utils/constants';
import { logger } from '../../utils/logger';
import { heimApoTheme, smartPillTheme, Theme } from './themes';

interface ThemeContextType {
  currentTheme: Theme;
  isLoadingTheme: boolean;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(heimApoTheme);
  const [isLoadingTheme, setIsLoadingTheme] = useState(true);

  const setBrand = async (brandId: BrandId) => {
    const newTheme = brandId === BRAND_ID.HEIM_APO ? heimApoTheme : smartPillTheme;
    setCurrentTheme(newTheme);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, brandId);
    } catch (error) {
      logger.error('Failed to save theme to AsyncStorage:', error);
    }
  };

  const loadPersistedTheme = async () => {
    try {
      const storedBrandId = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (storedBrandId === BRAND_ID.HEIM_APO || storedBrandId === BRAND_ID.SMART_PILL) {
        const themeToApply = storedBrandId === BRAND_ID.HEIM_APO ? heimApoTheme : smartPillTheme;
        setCurrentTheme(themeToApply);
        return;
      }

      const identifier = Application.applicationId || '';
      const brandMap: Record<string, BrandId> = {
        [BUNDLE_ID.HEIM_APO]: BRAND_ID.HEIM_APO,
        [BUNDLE_ID.SMART_PILL]: BRAND_ID.SMART_PILL,
      };

      const brandFromIdentifier = brandMap[identifier];

      setBrand(brandFromIdentifier || BRAND_ID.HEIM_APO);
    } catch (error) {
      logger.error('Failed to load or determine theme, defaulting to HeimApo:', error);
      setBrand(BRAND_ID.HEIM_APO);
    } finally {
      setIsLoadingTheme(false);
    }
  };

  useEffect(() => {
    loadPersistedTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, isLoadingTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
