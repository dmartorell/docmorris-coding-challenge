// src/features/checkout/ui/components/MedicationCheckoutItemCard.tsx (UPDATED for HealthKit Integration)

import { FC } from 'react';
import { Image, View, ViewStyle, Alert } from 'react-native';
import { cssInterop } from 'nativewind';
import { useTheme } from '../../../../ui/theme/ThemeContext';
import { logger } from '../../../../utils/logger';
import appConfig from '../../../../../app.json';
import { Text } from '../../../../ui/components/Text';
import { Button } from '../../../../ui/components/Button';
import { Logo } from '../../../../ui/components/Logo';
import { useTranslations } from '../../../../locales/useTranslations';
import { CartItem } from '../../../cart/data/models';
import HealthKitWriter, { MedicationData } from '../../../../../modules/healthkit-writer/src';

interface MedicationCheckoutItemCardProps {
  item: CartItem;
  onSendToHealthKit: (item: CartItem) => void;
  style?: ViewStyle;
}

const StyledView = cssInterop(View, { className: 'style' });
const StyledImage = cssInterop(Image, { className: 'style' });

export const MedicationCheckoutItemCard: FC<MedicationCheckoutItemCardProps> = ({ item, style, onSendToHealthKit }) => {
  const { t } = useTranslations();
  const { currentTheme } = useTheme();

  const appName = appConfig.expo?.name || 'App';

  // --- NEW: Handle "Save to Health App" ---
  const handleSaveToHealthApp = async () => {
    // 1. Request HealthKit Authorization
    try {
      const authorized = await HealthKitWriter.requestMedicationAuthorization();
      if (!authorized) {
        Alert.alert(
          t('healthkit_permission_denied_title'),
          t('healthkit_permission_denied_message')
        );
        return;
      }
    } catch (error: any) {
      Alert.alert(t('healthkit_authorization_error_title'), error.message);
      return;
    }

    // 2. Prepare MedicationData for HealthKit
    // Map your CartItem data to the MedicationData interface expected by the native module
    const medicationData: MedicationData = {
      name: item.tagLine,
      dosage: item.volume,
      form: item.type, 
      frequency: 'daily',
      notes: `Ordered from ${appName}. Brand: ${item.brand || 'N/A'}. Original price: ${item.price}€. Quantity: ${item.quantity}.`,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Example: 2 days from now
    };

    // 3. Write Medication to HealthKit
    try {
      const success = await HealthKitWriter.writeMedication(medicationData);
      if (success) {
        Alert.alert(t('add_to_health_success_title'), t('add_to_health_success_message', { productName: item.tagLine }));
        onSendToHealthKit(item);
      } else {
        Alert.alert(t('add_to_health_failed_title'), t('add_to_health_failed_message', { productName: item.tagLine }));
      }
    } catch (error: any) {
      Alert.alert(t('add_to_health_error_title'), error.message);
    }
  };

  return (
    <StyledView
      className="p-4 mb-5 rounded-md border w-full"
      style={[{
        backgroundColor: currentTheme.colors.surface,
        borderColor: currentTheme.colors.border,
      }, style,
      ]}
    >
      <StyledView className="flex-row">
        <StyledView className="w-24 h-40 mr-4 overflow-hidden"
          style={{ borderColor: currentTheme.colors.border }}
        >
          <StyledImage
            source={{ uri: item.imageUrl }}
            className="w-full h-full"
            style={{ resizeMode: 'cover' }}
            accessibilityLabel={item.brand || item.tagLine}
            onError={(e) => logger.error(`Failed to load image for ${item.tagLine}:`, e.nativeEvent.error)}
          />
        </StyledView>
        <StyledView className="flex-1 flex-col justify-between">
          <StyledView>
            <Text variant="caption1" weight="regular" colorVariant="textSecondary">
              {item.brand}
            </Text>
            <Text variant="body3" weight="regular" colorVariant="textPrimary">
              {item.tagLine}
            </Text>
            {!!item.volume && (
              <Text variant="body3" weight="regular" colorVariant="textPrimary">
                {item.volume}
              </Text>
            )}
          </StyledView>
          <StyledView className="self-start mt-6">
            <StyledView className="flex-row items-center">
              <Logo source={currentTheme.logoIcon} className='w-4 h-4 mr-2' />
              <Button variant='link' onPress={handleSaveToHealthApp}>
                {t('save_to_health_app')}
              </Button>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};