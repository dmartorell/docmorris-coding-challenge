import React, { FC } from 'react';
import { Image, View } from 'react-native';
import { cssInterop } from 'nativewind';
import { useTheme } from '../../../../ui/theme/ThemeContext';
import { logger } from '../../../../utils/logger';

const StyledView = cssInterop(View, { className: 'style' });
const StyledImage = cssInterop(Image, { className: 'style' });

interface CartItemImageProps {
  imageUrl: string;
  accessibilityLabel: string;
}

export const CartItemImage: FC<CartItemImageProps> = ({
  imageUrl,
  accessibilityLabel,
}) => {
  const { currentTheme } = useTheme();

  return (
    <StyledView className="w-24 h-40 mr-4 overflow-hidden"
      style={{ borderColor: currentTheme.colors.border }}
    >
      <StyledImage
        source={{ uri: imageUrl }}
        className="w-full h-full"
        style={{ resizeMode: 'cover' }}
        accessibilityLabel={accessibilityLabel}
        onError={(e) => logger.error(`Failed to load image for ${accessibilityLabel}:`, e.nativeEvent.error)}
      />
    </StyledView>
  );
};
