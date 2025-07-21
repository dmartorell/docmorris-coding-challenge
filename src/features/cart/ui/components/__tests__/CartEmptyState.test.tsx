import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CartEmptyState } from '../CartEmptyState';

jest.mock('../../../../../ui/useTranslations', () => ({
  useTranslations: () => ({ t: (key: string) => key }),
}));

jest.mock('../../../../../ui/components/Text', () => ({
  Text: ({ children, ...props }: any) => {
    const { Text } = require('react-native');
    return <Text {...props}>{children}</Text>;
  },
}));

jest.mock('../../../../../ui/components/Button', () => ({
  Button: ({ children, onPress, ...props }: any) => {
    const { Text } = require('react-native');
    return <Text onPress={onPress}>{children}</Text>;
  },
}));

jest.mock('nativewind/', () => ({
  cssInterop: () => (Component: any) => Component,
}));

describe('CartEmptyState', () => {
  it('renders description and button', () => {
    const { getByText } = render(<CartEmptyState onPress={() => {}} />);
    expect(getByText('cart_empty_state_description')).toBeTruthy();
    expect(getByText('start_shopping_button_label')).toBeTruthy();
  });

  it('calls onPress when button is pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<CartEmptyState onPress={onPressMock} />);
    fireEvent.press(getByText('start_shopping_button_label'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
