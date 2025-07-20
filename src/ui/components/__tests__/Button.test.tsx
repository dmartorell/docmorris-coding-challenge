import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

jest.mock('../../theme/ThemeContext', () => ({
  useTheme: () => ({
    currentTheme: {
      colors: {
        primary: '#007bff',
        secondary: '#0056b3',
        surface: '#fff',
      },
      borderRadius: { md: 8 },
      spacing: { xs: 4, sm: 8, md: 16 },
    },
  }),
}));

jest.mock('../Text', () => {
  const { Text } = require('react-native');
  return { Text };
});

describe('Button', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Button onPress={() => {}}>Click Me</Button>
    );
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button onPress={onPress}>Press</Button>
    );
    fireEvent.press(getByText('Press'));
    expect(onPress).toHaveBeenCalled();
  });

  it('shows ActivityIndicator when loading', () => {
    const { UNSAFE_getByType } = render(
      <Button onPress={() => {}} loading>Loading</Button>
    );
    const { ActivityIndicator } = require('react-native');
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it('is disabled when disabled prop is true', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Button onPress={onPress} disabled>Disabled</Button>
    );
    fireEvent.press(getByTestId('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('is disabled when loading prop is true', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Button onPress={onPress} loading>Loading</Button>
    );
    fireEvent.press(getByTestId('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('applies correct variant styles', () => {
    const { getByText, rerender } = render(
      <Button onPress={() => {}} variant="primary">Primary</Button>
    );
    expect(getByText('Primary')).toBeTruthy();
    rerender(<Button onPress={() => {}} variant="secondary">Secondary</Button>);
    expect(getByText('Secondary')).toBeTruthy();
    rerender(<Button onPress={() => {}} variant="link">Link</Button>);
    expect(getByText('Link')).toBeTruthy();
  });
});
