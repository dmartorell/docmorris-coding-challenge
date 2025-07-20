import React, { FC } from 'react';
import { View } from 'react-native';
import { cssInterop } from 'nativewind';
import { Text } from '../../../../ui/components/Text';

const StyledView = cssInterop(View, { className: 'style' });

interface CartItemDetailsProps {
  brand: string;
  tagLine: string;
  volume?: string;
}

export const CartItemDetails: FC<CartItemDetailsProps> = ({
  brand,
  tagLine,
  volume,
}) => {
  return (
    <StyledView>
      <Text variant="caption1" weight="regular" colorVariant="textSecondary">
        {brand}
      </Text>
      <Text variant="body3" weight="regular" colorVariant="textPrimary">
        {tagLine}
      </Text>
      {!!volume && (
        <Text variant="body3" weight="regular" colorVariant="textPrimary">
          {volume}
        </Text>
      )}
    </StyledView>
  );
};
