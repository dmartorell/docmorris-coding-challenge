import React, { FC, useState, useMemo } from 'react';
import { FlatList, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartItem, CartItemCard } from '../components/CartItemCard';
import { CartScreenNavigationProp, SCREENS } from '../../../../navigation/types';
import { ScreenTemplate } from '../../../../ui/components/ScreenTemplate';
import { Text } from '../../../../ui/components/Text';
import { Button } from '../../../../ui/components/Button';
import { OrderSummary } from '../components/OrderSummary';
import { useTranslations } from '../../../../ui/useTranslations';
import { initialMockCartItems } from '../../mocks/initialMockCartItems';

export const CartScreen: FC = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const rootNavigation = useNavigation<any>();
  const { t } = useTranslations();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialMockCartItems);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const handleRemoveItem = (itemId: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
          },
        },
      ],
    );
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleContinueToCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart Empty', 'Please add items to your cart before checking out.');
      return;
    }
    navigation.navigate(SCREENS.CHECKOUT_SCREEN);
  };

  const arrivalString = 'Delivery expected between Monday 22nd and Tuesday 23rd';

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <CartItemCard
      item={item}
      arrivalDate={arrivalString}
      onRemove={handleRemoveItem}
      onQuantityChange={handleQuantityChange}
      style={{ marginHorizontal: 16 }}
    />
  );

  const renderEmptyCart = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text variant="body1" colorVariant="textMuted">{t('cart_empty_message')}</Text>
      <Button
        onPress={() => rootNavigation.navigate(SCREENS.HOME_TAB, { screen: SCREENS.HOME_SCREEN })}
      >
        {t('cart_start_shopping')}
      </Button>
    </View>
  );

  const renderOrderSummary = () => (
    <OrderSummary
      shipping={3.99}
      amount={totalPrice + 3.99}
      healthPoints={502}
      extraPoints={100}
      loyaltyLevel={2}
      summaryTitle={t('cart_order_summary')}
      subtotal={totalPrice}
      onContinue={handleContinueToCheckout}
      productAmountText={t('cart_order_summary_product_count', { count: totalItems })}
      subtotalText={t('cart_order_summary_subtotal')}
      buttonText={t('cart_order_summary_continue_to_checkout')}
      discountText={t('cart_order_summary_discount')}
      shippingCostText={t('cart_order_summary_shipping_cost')}
      shippingAmountText={t('cart_order_summary_shipping_count', { count: 4 })}
      amountText={t('cart_order_summary_total')}
      healthPointsText={t('cart_order_summary_health_points', { healthPoints: 702 })}
      extraPointsText={t('cart_order_summary_extra_points', { extraPoints: 100 })}
      loayaltyLevelText={t('cart_order_summary_loyalty_level', { level: 6 })}
    />
  );

  return (
    <ScreenTemplate>
      {!!cartItems.length && (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderOrderSummary}
        />
      )}
      {cartItems.length === 0 &&
        renderEmptyCart()}
    </ScreenTemplate>
  );
};
