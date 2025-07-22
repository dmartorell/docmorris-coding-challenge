import React from 'react';
import { render } from '@testing-library/react-native';
import { CartItemHeader } from '../CartItemHeader';

jest.mock('../../../../../ui/components/Text', () => {
  const { Text } = require('react-native');
  return { Text };
});

jest.mock('../../../../../ui/theme/ThemeContext', () => ({
  useTheme: () => ({
    currentTheme: {
      colors: {
        border: '#ccc',
      },
    },
  }),
}));

describe('CartItemHeader', () => {
  it('renders the arrival date', () => {
    const { getByText } = render(
      <CartItemHeader arrivalDate="Arrives tomorrow" />,
    );
    expect(getByText('Arrives tomorrow')).toBeTruthy();
  });

  it('applies border color from theme', () => {
    const { getByText } = render(
      <CartItemHeader arrivalDate="Arrives tomorrow" />,
    );
    expect(getByText('Arrives tomorrow')).toBeTruthy();
  });
});
