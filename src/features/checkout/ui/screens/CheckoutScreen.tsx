import { FlatList } from 'react-native';
import { ScreenTemplate } from '../../../../ui/templates/ScreenTemplate';
import { MedicationCheckoutItemCard } from '../components/MedicationCheckoutItemCard';
import { useTranslations } from '../../../../locales/useTranslations';
import { CartOrderSummaryFooter } from '../../../cart/ui/components/CartOrderSummaryFooter';
import { useTheme } from '../../../../ui/theme/ThemeContext';
import { CartItem } from '../../../cart/data/models';
import { useCheckout } from '../../domain/useCheckout';
import { useMedicationHealthApp } from '../../domain/useMedicationHealthApp';

export const CheckoutScreen = () => {
  const { t } = useTranslations();
  const { currentTheme } = useTheme();
  const { medicationItems, isLoadingData, onContinueCheckoutPress } = useCheckout();
  const { healthAppButtonText, writeMedication } = useMedicationHealthApp();

  return (
    <ScreenTemplate
      isLoading={isLoadingData}
      style={{ paddingBottom: currentTheme.spacing.md * 2 }}
    >
      {!!medicationItems.length && (
        <FlatList
          data={medicationItems}
          renderItem={({ item }: { item: CartItem }) => (
            <MedicationCheckoutItemCard
              item={item}
              style={{ marginHorizontal: currentTheme.spacing.md }}
              onSendToHealthApp={() => writeMedication(item)}
              healthAppButtonText={healthAppButtonText}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            <CartOrderSummaryFooter
              shipping={3.99}
              amount={40 + 3.99}
              summaryTitle={t('cart_order_summary')}
              subtotal={120}
              onContinue={onContinueCheckoutPress}
              productAmountText={t('cart_order_summary_product_count', { count: 5 })}
              subtotalText={t('cart_order_summary_subtotal')}
              buttonText={t('cart_order_summary_continue_to_checkout')}
              shippingCostText={t('cart_order_summary_shipping_cost')}
              shippingAmountText={t('cart_order_summary_shipping_count', { count: 4 })}
              amountText={t('cart_order_summary_total')}
            />)
          }
          bounces={false}
        />
      )}
    </ScreenTemplate>
  );
};
