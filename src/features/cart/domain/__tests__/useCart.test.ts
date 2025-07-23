import { renderHook, act } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { useCart } from '../useCart';
import { CartItem } from '../../data/models';

jest.mock('expo-localization', () => ({
  locale: 'en',
  locales: ['en'],
  timezone: 'Europe/Berlin',
  isRTL: false,
  getLocales: () => [{ languageCode: 'en' }],
  region: 'DE',
}));

jest.mock('../../data/repositories/CartRepository');
jest.mock('../../../../ui/useTranslations', () => ({ useTranslations: () => ({ t: (key: string) => key }) }));
jest.mock('../../../../utils/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

const mockItems: CartItem[] = [
  { id: '1', brand: 'Test', imageUrl: '', price: 10, quantity: 2, tagLine: 'Test', type: 'product', volume: '100ml' },
  { id: '2', brand: 'Test2', imageUrl: '', price: 5, quantity: 1, tagLine: 'Test2', type: 'medication', volume: '50ml' },
];

beforeEach(() => {
  jest.clearAllMocks();

  const { CartRepository } = require('../../data/repositories/CartRepository');
  jest.spyOn(CartRepository, 'getCartItems').mockResolvedValue(mockItems);
});

describe('useCart', () => {
  it('should fetch and set cart items on mount', async () => {
    const { result } = renderHook(() => useCart());

    expect(result.current.loadingItems).toBe(true);

    await waitFor(() => {
      expect(result.current.loadingItems).toBe(false);
    }, { timeout: 3000 });

    expect(result.current.cartItems).toEqual(mockItems);
  });

  it('should calculate total price and total items', async () => {
    const { result } = renderHook(() => useCart());

    await waitFor(() => {
      expect(result.current.loadingItems).toBe(false);
    }, { timeout: 3000 });

    expect(result.current.totalPrice).toBe(25);
    expect(result.current.totalItems).toBe(3);
  });

  it('should remove an item from cart', async () => {
    const { result } = renderHook(() => useCart());

    await waitFor(() => {
      expect(result.current.loadingItems).toBe(false);
    }, { timeout: 3000 });

    expect(result.current.cartItems).toHaveLength(2);

    act(() => {
      result.current.onRemoveItem('1');
    });

    expect(Alert.alert).toHaveBeenCalled();

    const alertCall = (Alert.alert as jest.Mock).mock.calls[0];
    const removeButton = alertCall[2][1];
    act(() => {
      removeButton.onPress();
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].id).toBe('2');
  });

  it('should change item quantity', async () => {
    const { result } = renderHook(() => useCart());

    await waitFor(() => {
      expect(result.current.loadingItems).toBe(false);
    }, { timeout: 3000 });

    expect(result.current.cartItems.find((i: CartItem) => i.id === '1')?.quantity).toBe(2);

    act(() => {
      result.current.onChangeQuantity('1', 5);
    });

    expect(result.current.cartItems.find((i: CartItem) => i.id === '1')?.quantity).toBe(5);
  });
});
