import React, { FC, useState, useMemo } from 'react';
import { FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartItem, CartItemCard } from '../components/CartItemCard';
import { CartScreenNavigationProp, SCREENS } from '../../../../navigation/types';
import { ScreenTemplate } from '../../../../ui/components/ScreenTemplate';
import { useTranslations } from '../../../../ui/useTranslations';
import { mockCartItems } from '../../data/mockCartItems';
import { CartEmptyState } from '../components/CartEmptyState';
import { CartOrderSummaryFooter } from '../components/CartOrderSummaryFooter';

export const CartScreen: FC = () => {
  const { t } = useTranslations();
  const navigation = useNavigation<CartScreenNavigationProp>();
  const rootNavigation = useNavigation<any>();

  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
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

  const onStartShopping = () => {
    rootNavigation.navigate(SCREENS.HOME_TAB, { screen: SCREENS.HOME_SCREEN });
  };

  const onContinueToCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart Empty', 'Please add items to your cart before checking out.');
      return;
    }
    navigation.navigate(SCREENS.CHECKOUT_SCREEN, { cartItems });
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <CartItemCard
      item={item}
      arrivalDate={t('cart_item_arrival_date')}
      onRemove={handleRemoveItem}
      onQuantityChange={handleQuantityChange}
      style={{ marginHorizontal: 16 }}
    />
  );

  return (
    <ScreenTemplate>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => {
          return <CartEmptyState onPress={onStartShopping} />;
        }}
        ListFooterComponent={() => {
          return (
            cartItems.length > 0 &&
              <CartOrderSummaryFooter
                shipping={3.99}
                amount={totalPrice + 3.99}
                healthPoints={502}
                extraPoints={100}
                loyaltyLevel={2}
                summaryTitle={t('cart_order_summary')}
                subtotal={totalPrice}
                onContinue={onContinueToCheckout}
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
        }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      />
    </ScreenTemplate>
  );
};
