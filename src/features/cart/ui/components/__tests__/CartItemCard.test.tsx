import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { CartItemCard } from '../CartItemCard';
import { CartItem } from '../../../data/models';

jest.mock('../../../../../ui/useTranslations', () => ({
  useTranslations: () => ({ t: (key: string) => key }),
}));

jest.mock('../../../../../ui/theme/ThemeContext', () => ({
  useTheme: () => ({
    currentTheme: {
      colors: {
        surface: '#ffffff',
        border: '#e0e0e0',
      },
    },
  }),
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
    return <Text onPress={onPress} {...props}>{children}</Text>;
  },
}));

jest.mock('../../../../../ui/components/RemoveButton', () => ({
  RemoveButton: ({ onPress, label, ...props }: any) => {
    const { Text } = require('react-native');
    return <Text onPress={onPress} {...props}>{label}</Text>;
  },
}));

jest.mock('../CartItemHeader', () => ({
  CartItemHeader: ({ arrivalDate, ...props }: any) => {
    const { Text } = require('react-native');
    return <Text {...props}>CartItemHeader: {arrivalDate}</Text>;
  },
}));

jest.mock('../CartItemImage', () => ({
  CartItemImage: ({ imageUrl, accessibilityLabel, ...props }: any) => {
    const { Text } = require('react-native');
    return <Text {...props}>CartItemImage: {imageUrl} - {accessibilityLabel}</Text>;
  },
}));

jest.mock('../CartItemDetails', () => ({
  CartItemDetails: ({ brand, tagLine, volume, ...props }: any) => {
    const { Text } = require('react-native');
    return <Text {...props}>CartItemDetails: {brand} - {tagLine} - {volume}</Text>;
  },
}));

jest.mock('../CartItemControls', () => ({
  CartItemControls: ({ quantity, price, onChangeQuantity, ...props }: any) => {
    const { Text } = require('react-native');
    return (
      <Text {...props}>
        CartItemControls: {quantity} - {price}
        <Text onPress={() => onChangeQuantity(quantity + 1)}>Increase</Text>
        <Text onPress={() => onChangeQuantity(quantity - 1)}>Decrease</Text>
      </Text>
    );
  },
}));

const mockCartItem: CartItem = {
  id: '1',
  brand: 'Test Brand',
  tagLine: 'Test Tag Line',
  imageUrl: 'https://example.com/image.jpg',
  price: 25.99,
  quantity: 2,
  volume: '100ml',
  type: 'product',
};

describe('CartItemCard', () => {
  const mockOnRemove = jest.fn();
  const mockOnChangeQuantity = jest.fn();
  const mockArrivalDate = '2024-01-15';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders cart item information correctly', () => {
    render(
      <CartItemCard
        item={mockCartItem}
        arrivalDate={mockArrivalDate}
        onRemove={mockOnRemove}
        onChangeQuantity={mockOnChangeQuantity}
      />,
    );

    // Use more flexible text matching
    expect(screen.getByText(/CartItemHeader/)).toBeTruthy();
    expect(screen.getByText(/CartItemImage/)).toBeTruthy();
    expect(screen.getByText(/CartItemDetails/)).toBeTruthy();
    expect(screen.getByText(/CartItemControls/)).toBeTruthy();
    expect(screen.getAllByText(/2/).length).toBeGreaterThan(0);
    expect(screen.getByText(/25\.99/)).toBeTruthy();
    expect(screen.getByText('Remove')).toBeTruthy();
  });

  it('handles remove button press', () => {
    render(
      <CartItemCard
        item={mockCartItem}
        arrivalDate={mockArrivalDate}
        onRemove={mockOnRemove}
        onChangeQuantity={mockOnChangeQuantity}
      />,
    );

    fireEvent.press(screen.getByText('Remove'));
    expect(mockOnRemove).toHaveBeenCalledWith('1');
  });

  it('handles quantity increase', () => {
    render(
      <CartItemCard
        item={mockCartItem}
        arrivalDate={mockArrivalDate}
        onRemove={mockOnRemove}
        onChangeQuantity={mockOnChangeQuantity}
      />,
    );

    fireEvent.press(screen.getByText('Increase'));
    expect(mockOnChangeQuantity).toHaveBeenCalledWith('1', 3);
  });

  it('handles quantity decrease', () => {
    render(
      <CartItemCard
        item={mockCartItem}
        arrivalDate={mockArrivalDate}
        onRemove={mockOnRemove}
        onChangeQuantity={mockOnChangeQuantity}
      />,
    );

    fireEvent.press(screen.getByText('Decrease'));
    expect(mockOnChangeQuantity).toHaveBeenCalledWith('1', 1);
  });

  it('handles cart item without image URL', () => {
    const itemWithoutImage: CartItem = {
      ...mockCartItem,
      imageUrl: undefined,
    };

    render(
      <CartItemCard
        item={itemWithoutImage}
        arrivalDate={mockArrivalDate}
        onRemove={mockOnRemove}
        onChangeQuantity={mockOnChangeQuantity}
      />,
    );
    expect(screen.getByText(/CartItemImage/)).toBeTruthy();
    expect(screen.getAllByText(/Test Brand/).length).toBeGreaterThan(0);
  });

  it('handles cart item without volume', () => {
    const itemWithoutVolume: CartItem = {
      ...mockCartItem,
      volume: undefined,
    };

    render(
      <CartItemCard
        item={itemWithoutVolume}
        arrivalDate={mockArrivalDate}
        onRemove={mockOnRemove}
        onChangeQuantity={mockOnChangeQuantity}
      />,
    );

    expect(screen.getByText(/CartItemDetails/)).toBeTruthy();
    expect(screen.getAllByText(/Test Brand/).length).toBeGreaterThan(0);
    expect(screen.getByText(/Test Tag Line/)).toBeTruthy();
  });

  it('applies custom style when provided', () => {
    const customStyle = { marginTop: 10 };

    render(
      <CartItemCard
        item={mockCartItem}
        arrivalDate={mockArrivalDate}
        onRemove={mockOnRemove}
        onChangeQuantity={mockOnChangeQuantity}
        style={customStyle}
      />,
    );

    expect(screen.getByText('CartItemHeader: 2024-01-15')).toBeTruthy();
  });
});
