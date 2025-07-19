import { FC } from 'react';
import { View, Image, ViewStyle } from 'react-native';
import { cssInterop } from 'nativewind/';
import { useTheme } from '../../../../ui/theme/ThemeContext';
import { logger } from '../../../../utils/logger';
import { Text } from '../../../../ui/components/Text';
import { RemoveButton } from '../../../../ui/components/RemoveButton';
import { useTranslations } from '../../../../ui/useTranslations';
import { QuantitySelector } from '../../../../ui/components/QuantitySelector';
import { formatCurrency } from '../../../../utils/formatters';

const StyledView = cssInterop(View, { className: 'style' });
const StyledImage = cssInterop(Image, { className: 'style' });

export interface CartItem {
  id: string;
  brand: string;
  tagLine: string;
  imageUrl: string;
  price: number;
  quantity: number;
  volume?: string;
}

interface CartItemCardProps {
  item: CartItem;
  arrivalDate: string
  onRemove: (itemId: string) => void;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  style?: ViewStyle;
}

export const CartItemCard: FC<CartItemCardProps> = ({
  item,
  arrivalDate,
  onRemove,
  onQuantityChange,
  style,
}) => {
  const { t } = useTranslations();
  const { currentTheme } = useTheme();

  const handleRemovePress = () => {
    onRemove(item.id);
  };

  return (
    <StyledView
      className="p-4 mb-5 rounded-md border"
      style={[{
        backgroundColor: currentTheme.colors.surface,
        borderColor: currentTheme.colors.border,
      }, style,
      ]}
    >
      <StyledView className="border-b py-4 mb-8 -mx-4" style={{ borderBottomColor: currentTheme.colors.border }}>
        <Text variant="body2" weight="regular" colorVariant="textPrimary" className='px-4'>
          {arrivalDate}
        </Text>
      </StyledView>
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
          <StyledView className="flex-row items-center justify-between mt-2">
            <QuantitySelector
              quantity={item.quantity}
              onQuantityChange={(newQuantity) => onQuantityChange(item.id, newQuantity)}
            />
            <Text variant="body1" weight="semiBold" colorVariant="textPrimary">
              {formatCurrency(item.price * item.quantity)}
            </Text>
          </StyledView>
          <RemoveButton onPress={handleRemovePress} label={t('remove')}/>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};
