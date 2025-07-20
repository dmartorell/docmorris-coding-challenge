import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { ScreenTemplate } from '../../../../ui/templates/ScreenTemplate';
import { MedicationCheckoutItemCard } from '../components/MedicationCheckoutItemCard';
import { useTranslations } from '../../../../locales/useTranslations';
import { CartOrderSummaryFooter } from '../../../cart/ui/components/CartOrderSummaryFooter';
import { useTheme } from '../../../../ui/theme/ThemeContext';
import { CartItem } from '../../../cart/data/models';

type CheckoutScreenRouteParams = {
  cartItems: CartItem[];
};

const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const CheckoutScreen = () => {
  const { t } = useTranslations();
  const { currentTheme } = useTheme();
  const { params } = useRoute();
  const { cartItems } = params as CheckoutScreenRouteParams;
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  const medicationItems = cartItems.filter(item => item.type === 'medication');

  const renderOrderSummary = () => (
    <CartOrderSummaryFooter
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
      style={{ paddingBottom: currentTheme.spacing.md * 2 }}
    >
      {!!cartItems.length && (
        <FlatList
          data={medicationItems}
          renderItem={renderMedicationItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderOrderSummary}
          bounces={false}
        />
      )}
    </ScreenTemplate>
  );
};
