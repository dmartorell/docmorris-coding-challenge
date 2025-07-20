import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { RemoveButton } from '../RemoveButton';

jest.mock('../../theme/ThemeContext', () => ({
  useTheme: () => ({
    currentTheme: {
      colors: { textMuted: '#888' },
    },
  }),
}));

jest.mock('../Text', () => {
  const { Text } = require('react-native');
  return { Text };
});

jest.mock('@expo/vector-icons/MaterialIcons', () => {
  const { Text } = require('react-native');
  return ({ name, size, color }: any) => <Text>{`${name}-${size}-${color}`}</Text>;
});

describe('RemoveButton', () => {
  it('renders the label', () => {
    const { getByText } = render(
      <RemoveButton label="Remove" onPress={() => {}} />
    );
    expect(getByText('Remove')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <RemoveButton label="Delete" onPress={onPress} />
    );
    fireEvent.press(getByText('Delete'));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders icon with correct props', () => {
    const { getByText } = render(
      <RemoveButton label="Remove" onPress={() => {}} iconSize={20} />
    );
    // The icon mock renders as 'delete-outline-20-#888'
    expect(getByText(/delete-outline-20-#888/)).toBeTruthy();
  });
});
