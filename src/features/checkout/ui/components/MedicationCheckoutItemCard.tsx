import { FC } from 'react';
import { Image, View, ViewStyle } from 'react-native';
import { cssInterop } from 'nativewind';
import { logger } from '../../../../utils/logger';
import { Text } from '../../../../ui/components/Text';
import { Button } from '../../../../ui/components/Button';
import { Logo } from '../../../../ui/components/Logo';
import { CartItem } from '../../../cart/data/models';
import { useTheme } from '../../../../ui/theme/ThemeContext';

interface MedicationCheckoutItemCardProps {
  item: CartItem;
  healthAppButtonText: string;
  onSendToHealthApp: (item: CartItem) => void;
  style?: ViewStyle;
}

const StyledView = cssInterop(View, { className: 'style' });
const StyledImage = cssInterop(Image, { className: 'style' });

export const MedicationCheckoutItemCard: FC<MedicationCheckoutItemCardProps> = ({
  item,
  onSendToHealthApp,
  healthAppButtonText,
  style,
}) => {
  const { currentTheme } = useTheme();
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
              <Logo source={currentTheme.logoHealthkit} className='w-8 h-8 mr-2' />
              <Button variant='link' onPress={() => onSendToHealthApp(item)}>
                {healthAppButtonText}
              </Button>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};
