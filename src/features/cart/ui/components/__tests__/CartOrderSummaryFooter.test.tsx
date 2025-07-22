import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CartOrderSummaryFooter } from '../CartOrderSummaryFooter';

jest.mock('@expo/vector-icons/MaterialIcons', () => {
  const { Text } = require('react-native');
  return ({ name, size, color }: any) => <Text>{`${name}-${size}-${color}`}</Text>;
});

jest.mock('../../../../../ui/components/Logo', () => ({
  Logo: () => null,
}));

jest.mock('../../../../../ui/components/Text', () => {
  const { Text } = require('react-native');
  return { Text };
});

jest.mock('../../../../../ui/components/Button', () => {
  const { TouchableOpacity, Text } = require('react-native');
  return {
    Button: ({ children, onPress }: any) => (
      <TouchableOpacity onPress={onPress} testID="continue-btn">
        <Text>{children}</Text>
      </TouchableOpacity>
    ),
  };
});

jest.mock('../../../../../ui/theme/ThemeContext', () => ({
  useTheme: () => ({
    currentTheme: {
      colors: {
        surface: '#fff',
        border: '#ccc',
        secondary: '#00f',
        accent: '#f00',
        textPrimary: '#000',
      },
      logoIcon: 'logo.png',
    },
  }),
}));

jest.mock('../../../../../utils/formatters', () => ({
  formatCurrency: (value: number) => `$${value.toFixed(2)}`,
}));

describe('CartOrderSummaryFooter', () => {
  const defaultProps = {
    summaryTitle: 'Order Summary',
    subtotal: 100,
    subtotalText: 'Subtotal',
    productAmountText: '3 items',
    shipping: 5,
    shippingCostText: 'Shipping',
    shippingAmountText: 'Standard',
    buttonText: 'Continue',
    amount: 105,
    amountText: 'Total',
    onContinue: jest.fn(),
  };

  it('renders all main summary fields', () => {
    const { getByText } = render(<CartOrderSummaryFooter {...defaultProps} />);
    expect(getByText('Order Summary')).toBeTruthy();
    expect(getByText('Subtotal')).toBeTruthy();
    expect(getByText('3 items')).toBeTruthy();
    expect(getByText('$100.00')).toBeTruthy();
    expect(getByText('Shipping')).toBeTruthy();
    expect(getByText('Standard')).toBeTruthy();
    expect(getByText('$5.00')).toBeTruthy();
    expect(getByText('Total')).toBeTruthy();
    expect(getByText('$105.00')).toBeTruthy();
    expect(getByText('Continue')).toBeTruthy();
  });

  it('calls onContinue when button is pressed', () => {
    const onContinue = jest.fn();
    const { getByTestId } = render(
      <CartOrderSummaryFooter {...defaultProps} onContinue={onContinue} />,
    );
    fireEvent.press(getByTestId('continue-btn'));
    expect(onContinue).toHaveBeenCalled();
  });

  it('renders discount, healthPoints, extraPoints, and loyaltyLevel when provided', () => {
    const { getByText } = render(
      <CartOrderSummaryFooter
        {...defaultProps}
        discountText="Discount applied"
        healthPoints={10}
        healthPointsText="10 Health Points"
        extraPoints={5}
        extraPointsText="5 Extra Points"
        loyaltyLevel={2}
        loayaltyLevelText="Gold Member"
      />,
    );
    expect(getByText('Discount applied')).toBeTruthy();
    expect(getByText('10 Health Points')).toBeTruthy();
    expect(getByText('5 Extra Points')).toBeTruthy();
    expect(getByText('Gold Member')).toBeTruthy();
  });
});
