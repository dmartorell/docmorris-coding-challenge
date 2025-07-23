import { useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import Constants from 'expo-constants';
import HealthkitWriter, { MedicationData } from 'healthkit-writer';
import { useTranslations } from '../../../locales/useTranslations';
import { logger } from '../../../utils/logger';
import { CartItem } from '../../cart/data/models';
import { useTheme } from '../../../ui/theme/ThemeContext';
import { Theme } from '../../../ui/theme/themes';

interface UseMedicationHealthAppReturn {
  healthAppButtonText: string;
  writeMedication: (item: CartItem) => Promise<void>;
  currentTheme: Theme;
}

export const useMedicationHealthApp = (): UseMedicationHealthAppReturn => {
  const { t } = useTranslations();
  const { currentTheme } = useTheme();
  const appName = Constants.expoConfig?.name || 'DocMorris App';
  const healthAppButtonText = Platform.OS === 'ios' ? t('save_to_apple_health_app') : t('save_to_google_health_app');

  const writeMedication = useCallback(async (item: CartItem) => {
    if (Platform.OS === 'ios') {
      try {
        const authorized = await HealthkitWriter.requestMedicationAuthorization();
        if (!authorized) {
          Alert.alert(
            t('healthkit_permission_denied_title'),
            t('healthkit_permission_denied_message'),
          );
          return;
        }
      } catch (error: any) {
        logger.error('HealthKit authorization error:', error);
        Alert.alert(t('healthkit_authorization_error_title'), error.message);
        return;
      }
    } else {
      logger.warn('Attempted to save to Health App on Android. Google Health Connect not implemented.');
      return;
    }

    const medicationData: MedicationData = {
      name: item.tagLine,
      brand: item.brand,
      notes: `Ordered from ${appName}. Brand: ${item.brand || 'N/A'}. Price: ${item.price}€. Quantity: ${item.quantity}. Volume: ${item.volume}.`,
    };

    try {
      const success = await HealthkitWriter.writeMedication(medicationData);
      if (success) {
        Alert.alert(t('add_to_health_success_title'), t('add_to_health_success_message', { productName: item.tagLine }));
      } else {
        Alert.alert(t('add_to_health_failed_title'), t('add_to_health_failed_message', { productName: item.tagLine }));
      }
    } catch (error: any) {
      logger.error('HealthKit write error:', error);
      Alert.alert(t('add_to_health_error_title'), error.message);
    }
  }, [t, appName]);

  return {
    currentTheme,
    healthAppButtonText,
    writeMedication,
  };
};
