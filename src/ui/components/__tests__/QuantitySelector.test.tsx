import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { QuantitySelector } from '../QuantitySelector';

jest.mock('../../theme/ThemeContext', () => ({
  useTheme: () => ({
    currentTheme: {
      colors: { border: '#ccc' },
    },
  }),
}));

jest.mock('../Text', () => {
  const { Text } = require('react-native');
  return { Text };
});

jest.mock('../../../utils/logger', () => ({
  logger: {
    warn: jest.fn(),
  },
}));

describe('QuantitySelector', () => {
  it('renders the quantity', () => {
    const { getByText } = render(
      <QuantitySelector quantity={2} onChangeQuantity={() => {}} />,
    );
    expect(getByText('2')).toBeTruthy();
  });

  it('calls onChangeQuantity with incremented value', () => {
    const onChangeQuantity = jest.fn();
    const { getByText } = render(
      <QuantitySelector quantity={2} onChangeQuantity={onChangeQuantity} />,
    );
    fireEvent.press(getByText('+'));
    expect(onChangeQuantity).toHaveBeenCalledWith(3);
  });

  it('calls onChangeQuantity with decremented value', () => {
    const onChangeQuantity = jest.fn();
    const { getByText } = render(
      <QuantitySelector quantity={2} onChangeQuantity={onChangeQuantity} />,
    );
    fireEvent.press(getByText('-'));
    expect(onChangeQuantity).toHaveBeenCalledWith(1);
  });

  it('does not decrement below minQuantity', () => {
    const onChangeQuantity = jest.fn();
    const { getByText } = render(
      <QuantitySelector quantity={1} onChangeQuantity={onChangeQuantity} minQuantity={1} />,
    );
    fireEvent.press(getByText('-'));
    expect(onChangeQuantity).not.toHaveBeenCalled();
  });

  it('does not increment above maxQuantity and logs warning', () => {
    const onChangeQuantity = jest.fn();
    const { getByText } = render(
      <QuantitySelector quantity={5} onChangeQuantity={onChangeQuantity} maxQuantity={5} />,
    );
    fireEvent.press(getByText('+'));
    expect(onChangeQuantity).not.toHaveBeenCalled();
    const { logger } = require('../../../utils/logger');
    expect(logger.warn).toHaveBeenCalledWith('Cannot increment quantity beyond maximum: 5');
  });
});
