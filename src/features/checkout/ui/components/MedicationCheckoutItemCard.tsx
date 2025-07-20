import { FC } from 'react';
import { Image, View, ViewStyle } from 'react-native';
import { cssInterop } from 'nativewind';
import { CartItem } from '../../../cart/ui/components/CartItemCard';
import { useTheme } from '../../../../ui/theme/ThemeContext';
import { logger } from '../../../../utils/logger';
import { Text } from '../../../../ui/components/Text';
import { Button } from '../../../../ui/components/Button';
import { Logo } from '../../../../ui/components/Logo';
import { useTranslations } from '../../../../ui/useTranslations';

interface MedicationCheckoutItemCardProps {
  item: CartItem;
  // arrivalDate: string
  // onRemove: (itemId: string) => void;
  // onQuantityChange: (itemId: string, newQuantity: number) => void;
  style?: ViewStyle;
}

const StyledView = cssInterop(View, { className: 'style' });
const StyledImage = cssInterop(Image, { className: 'style' });

export const MedicationCheckoutItemCard: FC<MedicationCheckoutItemCardProps> = ({ item, style }) => {
  const { t } = useTranslations();
  const { currentTheme } = useTheme();

  return (
    <StyledView
      className="p-4 mb-5 rounded-md border"
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
            accessibilityLabel={item.brand}
            onError={(e) => logger.error(`Failed to load image for ${item.brand}:`, e.nativeEvent.error)}
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
              <Logo source={currentTheme.logoIcon}className='w-4 h-4 mr-2' />
              <Button variant='link' size='sm' onPress={() => null}>{t('send_to_health_app')}</Button>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};
