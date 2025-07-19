import React from 'react';
import { View, Pressable, ViewStyle } from 'react-native';
import { cssInterop } from 'nativewind';
import { useTheme } from '../theme/ThemeContext';
import { logger } from '../../utils/logger';
import { Text } from './Text';

const StyledView = cssInterop(View, { className: 'style' });
const StyledPressable = cssInterop(Pressable, { className: 'style' });

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  minQuantity?: number;
  maxQuantity?: number;
  className?: string;
  style?: ViewStyle;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  style,
  onQuantityChange,
  minQuantity = 1,
  maxQuantity,
  className = '',
}) => {
  const { currentTheme } = useTheme();

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    if (maxQuantity !== undefined && newQuantity > maxQuantity) {
      logger.warn(`Cannot increment quantity beyond maximum: ${maxQuantity}`);
      return;
    }
    onQuantityChange(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = quantity - 1;
    if (newQuantity < minQuantity) {
      return;
    }
    onQuantityChange(newQuantity);
  };

  return (
    <StyledView
      className={`flex-row items-center border rounded-md ${className}`}
      style={[
        { borderColor: currentTheme.colors.border },
        style,
      ]}
    >
      <StyledPressable onPress={handleDecrement} className="px-2 py-1">
        <Text variant="body2" colorVariant="textPrimary">-</Text>
      </StyledPressable>
      <Text variant="body2" colorVariant="textPrimary" className="px-2">
        {quantity}
      </Text>
      <StyledPressable onPress={handleIncrement} className="px-2 py-1">
        <Text variant="body2" colorVariant="textPrimary">+</Text>
      </StyledPressable>
    </StyledView>
  );
};
