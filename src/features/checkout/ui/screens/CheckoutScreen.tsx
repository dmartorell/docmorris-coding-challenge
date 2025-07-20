import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { ScreenTemplate } from '../../../../ui/components/ScreenTemplate';
import { CartItem } from '../../../cart/ui/components/CartItemCard';
import { MedicationCheckoutItemCard } from '../components/MedicationCheckoutItemCard';
import { OrderSummary } from '../../../cart/ui/components/OrderSummary';
import { useTranslations } from '../../../../ui/useTranslations';

type CheckoutScreenRouteParams = {
  cartItems: CartItem[];
};

const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const CheckoutScreen = () => {
  const { params } = useRoute();
  const { t } = useTranslations();
  const { cartItems } = params as CheckoutScreenRouteParams;
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  const medicationItems = cartItems.filter(item => item.type === 'medication');

  const renderOrderSummary = () => (
    <OrderSummary
      shipping={3.99}
      amount={40 + 3.99}
      summaryTitle={t('cart_order_summary')}
      subtotal={120}
      onContinue={() => null}
      productAmountText={t('cart_order_summary_product_count', { count: 5 })}
      subtotalText={t('cart_order_summary_subtotal')}
      buttonText={t('cart_order_summary_continue_to_checkout')}
      shippingCostText={t('cart_order_summary_shipping_cost')}
      shippingAmountText={t('cart_order_summary_shipping_count', { count: 4 })}
      amountText={t('cart_order_summary_total')}
    />
  );
  const renderMedicationItem = ({ item }: { item: CartItem }) => (
    <MedicationCheckoutItemCard
      item={item}
      style={{ marginHorizontal: 16 }}

      // arrivalDate={arrivalString}
      // onRemove={handleRemoveItem}
      // onQuantityChange={handleQuantityChange}
    />
  );

  useEffect(() => {
    simulateDelay(2000)
      .then(() => setIsLoadingData(false));
  }, []);

  return (
    <ScreenTemplate
      isLoading={isLoadingData}
      className='mb-8 '
    >
      {!!cartItems.length && (
        <FlatList
          data={medicationItems}
          renderItem={renderMedicationItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderOrderSummary}
        />
      )}
    </ScreenTemplate>
  );
};
