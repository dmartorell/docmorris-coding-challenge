import { FC } from 'react';
import { View, ViewStyle } from 'react-native';
import { cssInterop } from 'nativewind/';
import { useTheme } from '../../../../ui/theme/ThemeContext';
import { RemoveButton } from '../../../../ui/components/RemoveButton';
import { useTranslations } from '../../../../locales/useTranslations';
import { CartItem } from '../../data/models';
import { CartItemHeader } from './CartItemHeader';
import { CartItemImage } from './CartItemImage';
import { CartItemDetails } from './CartItemDetails';
import { CartItemControls } from './CartItemControls';

const StyledView = cssInterop(View, { className: 'style' });

interface CartItemCardProps {
  item: CartItem;
  arrivalDate: string
  onRemove: (itemId: string) => void;
  onChangeQuantity: (itemId: string, newQuantity: number) => void;
  style?: ViewStyle;
}

export const CartItemCard: FC<CartItemCardProps> = ({
  item,
  arrivalDate,
  onRemove,
  onChangeQuantity,
  style,
}) => {
  const { t } = useTranslations();
  const { currentTheme } = useTheme();

  const onRemoveItem = () => {
    onRemove(item.id);
  };

  return (
    <StyledView
      className="p-4 mb-5 rounded-md border"
      style={[{
        backgroundColor: currentTheme.colors.surface,
        borderColor: currentTheme.colors.border,
      }, style,
      ]}
    >
      <CartItemHeader arrivalDate={arrivalDate} />
      <StyledView className="flex-row">
        <CartItemImage
          imageUrl={item.imageUrl ?? ''}
          accessibilityLabel={item.brand}
        />
        <StyledView className="flex-1 flex-col justify-between">
          <CartItemDetails
            brand={item.brand}
            tagLine={item.tagLine}
            volume={item.volume}
          />
          <CartItemControls
            quantity={item.quantity}
            price={item.price}
            onChangeQuantity={(newQuantity) => onChangeQuantity(item.id, newQuantity)}
          />
          <RemoveButton onPress={onRemoveItem} label={t('remove')}/>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};
