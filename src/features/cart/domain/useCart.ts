import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { BottomTabParamList, CartStackParamList, SCREENS } from '../../../navigation/types';
import { useTranslations } from '../../../locales/useTranslations';
import { logger } from '../../../utils/logger';
import { CartItem } from '../data/models';
import { CartRepository } from '../data/repositories/cartRepository';

interface ContinueToCheckoutParams {
  navigation: NavigationProp<CartStackParamList>;
  checkoutScreenName: typeof SCREENS.CHECKOUT_SCREEN;
  tFunction?: (key: string, options?: any) => string;
}

interface StartShoppingParams {
  rootNavigation: NavigationProp<BottomTabParamList>;
  homeTabName: typeof SCREENS.HOME_TAB;
  homeScreenName: typeof SCREENS.HOME_SCREEN;
}

interface UseCartReturn {
  cartItems: CartItem[];
  totalPrice: number;
  totalItems: number;
  onRemoveItem: (itemId: string) => void;
  onChangeQuantity: (itemId: string, newQuantity: number) => void;
  onContinueToCheckout: ({
    navigation,
    checkoutScreenName,
    tFunction,
  }: ContinueToCheckoutParams) => void;
  onStartShopping: ({
    rootNavigation,
    homeTabName,
    homeScreenName,
  }: StartShoppingParams) => void;
  loadingItems: boolean;
}

export const useCart = (): UseCartReturn => {
  const { t } = useTranslations();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loadingItems, setLoadingItems] = useState<boolean>(true);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const onRemoveItem = useCallback((itemId: string) => {
    Alert.alert(
      t('remove_item_alert_title'),
      t('remove_item_alert_message'),
      [
        { text: t('cancel_button_label'), style: 'cancel' },
        {
          text: t('remove_button_label'),
          style: 'destructive',
          onPress: () => {
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
          },
        },
      ],
    );
  }, [t]);

  const onChangeQuantity = useCallback((itemId: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  }, []);

  const onStartShopping = useCallback(({
    rootNavigation,
    homeTabName = SCREENS.HOME_TAB,
    homeScreenName = SCREENS.HOME_SCREEN,
  }: StartShoppingParams) => {
    rootNavigation.navigate(homeTabName, { screen: homeScreenName });
  }, []);

  const onContinueToCheckout = useCallback(({
    navigation,
    checkoutScreenName,
    tFunction = t,
  }: {
    navigation: NavigationProp<CartStackParamList>;
    checkoutScreenName: typeof SCREENS.CHECKOUT_SCREEN;
    tFunction?: (key: string, options?: any) => string;
  }) => {
    if (cartItems.length === 0) {
      Alert.alert(tFunction('cart_empty_alert_title'), tFunction('cart_empty_alert_message'));
      return;
    }
    navigation.navigate(checkoutScreenName, { cartItems });
  }, [cartItems]);

  const getCartItems = async (): Promise<void> => {
    try {
      setLoadingItems(true);
      const items = await CartRepository.getCartItems({ token: '1234', host: 'BASE_URL_PRODUCTION' });
      setCartItems(items);
    } catch (error) {
      logger.error('Failed to fetch cart items:', error);
    } finally {
      setLoadingItems(false);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return {
    cartItems,
    totalPrice,
    totalItems,
    onRemoveItem,
    onChangeQuantity,
    onContinueToCheckout,
    onStartShopping,
    loadingItems,
  };
};
