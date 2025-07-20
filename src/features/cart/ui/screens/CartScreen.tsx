import React, { FC } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ScreenTemplate } from '../../../../ui/components/ScreenTemplate';
import { CartEmptyState } from '../components/CartEmptyState';
import { CartOrderSummaryFooter } from '../components/CartOrderSummaryFooter';
import { useCart } from '../../domain/useCart';
import { CartItemCard } from '../components/CartItemCard';
import { BottomTabParamList, CartScreenNavigationProp, SCREENS } from '../../../../navigation/types';
import { useTranslations } from '../../../../ui/useTranslations';

export const CartScreen: FC = () => {
  const { t } = useTranslations();
  const rootNavigation = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();
  const navigation = useNavigation<CartScreenNavigationProp>();

  const {
    cartItems,
    totalPrice,
    totalItems,
    onRemoveItem,
    onChangeQuantity,
    onStartShopping,
    onContinueToCheckout,
    loadingItems: isLoadingItems,
  } = useCart();

  return (
    <ScreenTemplate isLoading={isLoadingItems}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartItemCard
            item={item}
            arrivalDate={t('cart_item_arrival_date')}
            onRemove={onRemoveItem}
            onChangeQuantity={onChangeQuantity}
            style={{ marginHorizontal: 16 }}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => {
          return (
            <CartEmptyState onPress={() => onStartShopping({
              rootNavigation,
              homeTabName: SCREENS.HOME_TAB,
              homeScreenName: SCREENS.HOME_SCREEN,
            })}
            />
          );
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
                onContinue={() => onContinueToCheckout({
                  navigation,
                  checkoutScreenName: SCREENS.CHECKOUT_SCREEN,
                  tFunction: t,
                })}
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
        bounces={false}
      />
    </ScreenTemplate>
  );
};
