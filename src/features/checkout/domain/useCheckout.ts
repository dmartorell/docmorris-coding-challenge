import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import { CartItem } from '../../cart/data/models';
import { logger } from '../../../utils/logger';
import { PRODUCT_TYPE } from '../../products/data/models';

type CheckoutScreenRouteParams = {
  cartItems: CartItem[];
};

const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface UseCheckoutResult {
  isLoadingData: boolean;
  medicationItems: CartItem[];
  handleSendToHealthKit: (item: CartItem) => void;
  onContinueCheckoutPress: () => void;
}

export const useCheckout = (): UseCheckoutResult => {
  const { params } = useRoute();
  const { cartItems } = params as CheckoutScreenRouteParams;
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  const medicationItems = useMemo(() => {
    return cartItems.filter(item => item.type === PRODUCT_TYPE.MEDICATION);
  }, [cartItems]);

  useEffect(() => {
    simulateDelay(2000)
      .then(() => setIsLoadingData(false));
  }, []);

  const handleSendToHealthKit = useCallback((item: CartItem) => {
    logger.log(`Medication "${item.tagLine}" sent to HealthKit confirmed.`);
  }, []);

  return {
    medicationItems,
    isLoadingData,
    handleSendToHealthKit,
    onContinueCheckoutPress: () => null,
  };
};
