import React from 'react';
import { render } from '@testing-library/react-native';
import { CartItemImage } from '../CartItemImage';

jest.mock('../../../../../ui/theme/ThemeContext', () => ({
  useTheme: () => ({
    currentTheme: {
      colors: {
        border: '#ccc',
      },
    },
  }),
}));

jest.mock('../../../../../utils/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

describe('CartItemImage', () => {
  it('renders image with correct source and accessibilityLabel', () => {
    const { getByLabelText } = render(
      <CartItemImage imageUrl="https://example.com/image.jpg" accessibilityLabel="Product image" />,
    );
    const image = getByLabelText('Product image');
    expect(image.props.source).toEqual({ uri: 'https://example.com/image.jpg' });
    expect(image.props.accessibilityLabel).toBe('Product image');
  });

  it('calls logger.error on image load error', () => {
    const { getByLabelText } = render(
      <CartItemImage imageUrl="https://example.com/image.jpg" accessibilityLabel="Product image" />,
    );
    const image = getByLabelText('Product image');
    image.props.onError({ nativeEvent: { error: '404' } });
    const { logger } = require('../../../../../utils/logger');
    expect(logger.error).toHaveBeenCalledWith(
      'Failed to load image for Product image:',
      '404',
    );
  });
});
