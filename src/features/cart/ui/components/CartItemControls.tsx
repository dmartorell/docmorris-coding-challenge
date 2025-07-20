import React, { FC } from 'react';
import { View } from 'react-native';
import { cssInterop } from 'nativewind';
import { Text } from '../../../../ui/components/Text';
import { QuantitySelector } from '../../../../ui/components/QuantitySelector';
import { formatCurrency } from '../../../../utils/formatters';

const StyledView = cssInterop(View, { className: 'style' });

interface CartItemControlsProps {
  quantity: number;
  price: number;
  onChangeQuantity: (newQuantity: number) => void;
}

export const CartItemControls: FC<CartItemControlsProps> = ({
  price,
  quantity,
  onChangeQuantity,
}) => {
  return (
    <StyledView className="flex-row items-center justify-between mt-2">
      <QuantitySelector
        quantity={quantity}
        onChangeQuantity={onChangeQuantity}
      />
      <Text variant="body1" weight="semiBold" colorVariant="textPrimary">
        {formatCurrency(price * quantity)}
      </Text>
    </StyledView>
  );
};
