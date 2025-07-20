import React, { FC } from 'react';
import { View } from 'react-native';
import { cssInterop } from 'nativewind';
import { useTheme } from '../../../../ui/theme/ThemeContext';
import { Text } from '../../../../ui/components/Text';

const StyledView = cssInterop(View, { className: 'style' });

interface CartItemHeaderProps {
  arrivalDate: string;
}

export const CartItemHeader: FC<CartItemHeaderProps> = ({ arrivalDate }) => {
  const { currentTheme } = useTheme();

  return (
    <StyledView
      className="border-b py-4 mb-8 -mx-4"
      style={{ borderBottomColor: currentTheme.colors.border }}
    >
      <Text
        variant="body2"
        weight="regular"
        colorVariant="textPrimary"
        className='px-4'
      >
        {arrivalDate}
      </Text>
    </StyledView>
  );
};
