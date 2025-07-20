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

  const loadPersistedTheme = async ({
    setBrandFn,
    setCurrentThemeFn,
    setIsLoadingThemeFn,
    loggerInstance,
  }: {
    setBrandFn: (brandId: BrandId) => void,
    setCurrentThemeFn: (theme: Theme) => void,
    setIsLoadingThemeFn: (isLoading: boolean) => void,
    loggerInstance: typeof logger,
  }) => {
    try {
      let appBrandId: BrandId | null = null;

      const storedBrandId = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (storedBrandId === BRAND_ID.HEIM_APO || storedBrandId === BRAND_ID.SMART_PILL) {
        appBrandId = storedBrandId;
      }

      if (!appBrandId) {
        const identifier = Application.applicationId || '';
        const brandMap: Record<string, BrandId> = {
          [BUNDLE_ID.HEIM_APO]: BRAND_ID.HEIM_APO,
          [BUNDLE_ID.SMART_PILL]: BRAND_ID.SMART_PILL,
        };
        appBrandId = BRAND_ID.HEIM_APO;

        !(brandMap[identifier]) &&
          loggerInstance.warn(`Unknown app identifier: ${identifier}. Defaulting to HeimApo.`);
      }

      if (appBrandId) {
        setBrandFn(appBrandId);
        loggerInstance.log(`App brand ID determined: ${appBrandId}`);
      } else {
        loggerInstance.error('Could not determine app brand ID. Defaulting to HeimApo.');
        await AsyncStorage.setItem(THEME_STORAGE_KEY, BRAND_ID.HEIM_APO);
        setCurrentThemeFn(heimApoTheme);
      }
    } catch (error) {
      loggerInstance.error('Failed to load theme from AsyncStorage or determine brand:', error);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, BRAND_ID.HEIM_APO);
      setCurrentThemeFn(heimApoTheme);
    } finally {
      setIsLoadingThemeFn(false);
    }
  };

  useEffect(() => {
    loadPersistedTheme({
      setBrandFn: setBrand,
      setCurrentThemeFn: setCurrentTheme,
      setIsLoadingThemeFn: setIsLoadingTheme,
      loggerInstance: logger,
    });
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
