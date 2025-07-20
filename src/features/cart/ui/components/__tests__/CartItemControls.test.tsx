import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CartItemControls } from '../CartItemControls';

jest.mock('../../../../../ui/components/Text', () => {
  const { Text } = require('react-native');
  return { Text };
});

jest.mock('../../../../../ui/components/QuantitySelector', () => ({
  QuantitySelector: ({ quantity, onChangeQuantity }: any) => {
    const { TouchableOpacity, Text } = require('react-native');
    return (
      <>
        <TouchableOpacity onPress={() => onChangeQuantity(quantity + 1)}>
          <Text>Increase</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onChangeQuantity(quantity - 1)}>
          <Text>Decrease</Text>
        </TouchableOpacity>
        <Text>{quantity}</Text>
      </>
    );
  }
}));

jest.mock('../../../../../utils/formatters', () => ({
  formatCurrency: (value: number) => `$${value.toFixed(2)}`
}));

describe('CartItemControls', () => {
  it('renders quantity and formatted price', () => {
    const { getByText } = render(
      <CartItemControls quantity={2} price={10} onChangeQuantity={() => {}} />
    );
    expect(getByText('2')).toBeTruthy();
    expect(getByText('$20.00')).toBeTruthy();
  });

  it('calls onChangeQuantity when Increase/Decrease is pressed', () => {
    const onChangeQuantity = jest.fn();
    const { getByText } = render(
      <CartItemControls quantity={2} price={10} onChangeQuantity={onChangeQuantity} />
    );
    fireEvent.press(getByText('Increase'));
    expect(onChangeQuantity).toHaveBeenCalledWith(3);
    fireEvent.press(getByText('Decrease'));
    expect(onChangeQuantity).toHaveBeenCalledWith(1);
  });
});
