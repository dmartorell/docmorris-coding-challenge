import React, { useState, useMemo } from 'react';
import { FlatList, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartItem, CartItemCard } from '../components/CartItemCard';
import { CartScreenNavigationProp, SCREENS } from '../../../../navigation/types';
import { ScreenTemplate } from '../../../../ui/components/ScreenTemplate';
import { Text } from '../../../../ui/components/Text';
import { Button } from '../../../../ui/components/Button';
import { useTranslations } from '../../../../ui/useTranslations';
import i18n from '../../../../locales';

const startDate = new Date(2025, 6, 22); // July 22, 2025
const endDate = new Date(2025, 6, 23); // July 23, 2025

const locale = i18n.language || 'en-EN';

const startDay = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(startDate);
const startDayNum = startDate.getDate();
const endDay = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(endDate);
const endDayNum = endDate.getDate();

// --- Mock Cart Items Data ---
// In a real app, this would come from global state (e.g., Redux) or an API.
// For this demo, we'll manage it locally with useState.
const initialMockCartItems: CartItem[] = [
  {
    id: '1',
    tagLine: 'Eucerin Sun Cream SPF 50+',
    brand: 'Eucerin',
    imageUrl: 'https://picsum.photos/200',
    price: 14.99,
    quantity: 1,
    volume: '50ml',
  },
  {
    id: '2',
    tagLine: 'La Roche-Posay Baby Sunscreen',
    brand: 'La Roche-Posay',
    imageUrl: 'https://picsum.photos/200',
    price: 17.49,
    quantity: 1,
    volume: '100ml',
  },
  {
    id: '3',
    tagLine: 'Weleda Calendula Baby Oil',
    brand: 'Weleda',
    imageUrl: 'https://picsum.photos/200',
    price: 9.99,
    quantity: 1,
    volume: '200ml',
  },
  {
    id: '4',
    tagLine: 'Vichy Liftactiv Serum',
    brand: 'Vichy',
    imageUrl: 'https://picsum.photos/200',
    price: 29.99,
    quantity: 1,
    volume: '30ml',
  },
  {
    id: '5',
    tagLine: 'Bepanthol Baby Cream',
    brand: 'Bepanthol',
    imageUrl: 'https://picsum.photos/200',
    price: 8.49,
    quantity: 1,
    volume: '100g',
  },
  {
    id: '6',
    tagLine: 'Herbalife Chamomile Tea',
    brand: 'Herbalife',
    imageUrl: 'https://picsum.photos/200',
    price: 5.99,
    quantity: 1,
    volume: '20 bags',
  },
  {
    id: '7',
    tagLine: 'Avène Thermal Spring Water',
    brand: 'Avène',
    imageUrl: 'https://picsum.photos/200',
    price: 7.99,
    quantity: 1,
    volume: '150ml',
  },
  {
    id: '8',
    tagLine: 'Dr. Hauschka Rose Day Cream',
    brand: 'Dr. Hauschka',
    imageUrl: 'https://picsum.photos/200',
    price: 21.99,
    quantity: 1,
    volume: '30ml',
  },
];

const CartScreen: React.FC = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const rootNavigation = useNavigation<any>();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialMockCartItems);
  const { t } = useTranslations();

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
    />
  );

  return (
    <ScreenTemplate className="px-4">
      {!!cartItems.length && (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        />
      )}
      {cartItems.length === 0 && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text variant="body1" colorVariant="textMuted">Your cart is empty.</Text>
          <Button
            onPress={() => rootNavigation.navigate(SCREENS.HOME_TAB, { screen: SCREENS.HOME_SCREEN })}
          >
            Start Shopping
          </Button>
        </View>
      )}
    </ScreenTemplate>
  );
};

export default CartScreen;
