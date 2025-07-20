import React, { FC } from 'react';
import { View, ViewStyle } from 'react-native';
import { cssInterop } from 'nativewind';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../../../ui/theme/ThemeContext';
import { Text } from '../../../../ui/components/Text';
import { Button } from '../../../../ui/components/Button';
import { formatCurrency } from '../../../../utils/formatters';
import { Logo } from '../../../../ui/components/Logo';

const StyledView = cssInterop(View, { className: 'style' });

interface OrderSummaryProps {
  summaryTitle: string;
  subtotal: number;
  subtotalText: string;
  productAmountText: string;
  shipping: number;
  shippingCostText: string;
  shippingAmountText: string;
  buttonText: string;
  discountText?: string;
  amount: number;
  amountText?: string;
  healthPoints?: number;
  healthPointsText?: string;
  extraPoints?: number;
  extraPointsText?: string;
  loyaltyLevel?: number;
  loayaltyLevelText?: string;
  onContinue: () => void;
  className?: string;
  style?: ViewStyle;
}

export const OrderSummary: FC<OrderSummaryProps> = ({
  summaryTitle,
  subtotal,
  subtotalText,
  buttonText,
  productAmountText,
  shipping,
  shippingCostText,
  shippingAmountText,
  discountText,
  amount,
  amountText,
  healthPoints,
  healthPointsText,
  extraPoints,
  extraPointsText,
  loyaltyLevel,
  loayaltyLevelText,
  onContinue,
}) => {
  const { currentTheme } = useTheme();

  const formattedAmount = formatCurrency(amount);
  const formattedShippingCount = formatCurrency(shipping);
  const fomattedSubtotal = formatCurrency(subtotal);

  return (
    <StyledView
      className="bg-white rounded-xl p-4"
      style={[{ backgroundColor: currentTheme.colors.surface }]}
    >
      <Text variant="title2" weight="semiBold" colorVariant="textPrimary" className="mb-4">
        {summaryTitle}
      </Text>
      <StyledView className="flex-row justify-between mb-2">
        <StyledView className="flex-row gap-2 items-baseline">
          <Text variant="body1" colorVariant="textPrimary">{subtotalText}</Text>
          <Text variant="caption1" colorVariant="textPrimary">{productAmountText}</Text>
        </StyledView>
        <Text variant="body1" colorVariant="textPrimary">{fomattedSubtotal}</Text>
      </StyledView>
      <StyledView className="border-b border-gray-200 my-4" />
      <StyledView className="flex-row justify-between mb-2">
        <StyledView className="flex-row gap-2 items-baseline">
          <Text variant="body1" colorVariant="textPrimary">{shippingCostText}</Text>
          <Text variant="caption1" colorVariant="textPrimary">{shippingAmountText}</Text>
        </ StyledView>
        <Text variant="body1" colorVariant="textPrimary">{formattedShippingCount}</Text>
      </StyledView>
      {discountText && (
        <Text variant="body3" colorVariant="secondary" className="mb-2">
          {discountText}
        </Text>
      )}
      <StyledView className="flex-row justify-between mb-4 mt-2">
        <Text variant="title1" weight="semiBold" colorVariant="textPrimary">{amountText}</Text>
        <Text variant="title1" weight="semiBold" colorVariant="textPrimary">{formattedAmount}</Text>
      </StyledView>
      {healthPoints && (
        <StyledView className="flex-row items-center mb-2 gap-2">
          <Logo source={currentTheme.logoIcon} className="w-4 h-4" />
          <Text variant="caption1" colorVariant="textPrimary" className='flex-1'>
            {healthPointsText}
          </Text>
        </StyledView>
      )}
      {extraPoints && (
        <StyledView className="flex-row items-center mb-2 gap-2">
          <MaterialIcons name="check" size={20} color={currentTheme.colors.secondary} />
          <Text variant="caption1" colorVariant="accent" className='flex-1'>
            {extraPointsText}
          </Text>
        </StyledView>
      )}
      {loyaltyLevel && (
        <StyledView className="flex-row items-center mb-2 gap-2">
          <MaterialIcons name="check" size={20} color={currentTheme.colors.secondary} />
          <Text variant="caption1" colorVariant="textPrimary" className='flex-1'>
            {loayaltyLevelText}
          </Text>
        </StyledView>
      )}
      <Button size='sm' variant="primary" className="mt-4 w-full" onPress={onContinue}>
        {buttonText}
      </Button>
    </StyledView>
  );
};
