import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from '../Text';

jest.mock('../../theme/ThemeContext', () => ({
  useTheme: () => ({
    currentTheme: {
      typography: {
        sizes: {
          body1: { fontSize: 16, lineHeight: 24 },
          caption2: { fontSize: 12, lineHeight: 16 },
        },
        weights: {
          regular: 'RegularFont',
          medium: 'MediumFont',
        },
      },
      colors: {
        textPrimary: '#000',
        textMuted: '#888',
      },
    },
  }),
}));

describe('Text', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Text>Sample Text</Text>,
    );
    expect(getByText('Sample Text')).toBeTruthy();
  });

  it('applies correct styles for variant and weight', () => {
    const { getByText } = render(
      <Text variant="caption2" weight="medium">Styled Text</Text>,
    );
    const text = getByText('Styled Text');
    expect(text.props.style).toEqual(
      expect.objectContaining({
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'MediumFont',
        color: '#000',
      }),
    );
  });

  it('applies colorVariant', () => {
    const { getByText } = render(
      <Text colorVariant="textMuted">Muted</Text>,
    );
    const text = getByText('Muted');
    expect(text.props.style).toEqual(
      expect.objectContaining({ color: '#888' }),
    );
  });

  it('applies className and style props', () => {
    const customStyle = { fontSize: 20 };
    const { getByText } = render(
      <Text className="custom-class" style={customStyle}>Custom</Text>,
    );
    const text = getByText('Custom');
    expect(text.props.style).toEqual(
      expect.objectContaining({ fontSize: 20 }),
    );
  });
});
