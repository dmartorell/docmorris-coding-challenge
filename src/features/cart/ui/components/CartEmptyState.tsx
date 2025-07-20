import React, { FC } from 'react';
import { View } from 'react-native';
import { useTranslations } from '../../../../ui/useTranslations';
import { Text } from '../../../../ui/components/Text';
import { Button } from '../../../../ui/components/Button';

interface CartEmptyStateProps {
  onPress: () => void;
}
export const CartEmptyState: FC<CartEmptyStateProps> = ({ onPress }) => {
  const { t } = useTranslations();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text variant="body1" colorVariant="textMuted">{t('cart_empty_message')}</Text>
      <Button onPress={onPress} variant="link" className="mt-4">
        {t('start_shopping_button_label')}
      </Button>
    </View>
  );
};
