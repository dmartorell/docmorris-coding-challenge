import { ApiCartItem, CartItem } from '../models';

export const mapApiCartItemsToDomain = (apiCartItems: ApiCartItem[]): CartItem[] => {
  return apiCartItems.map((item) => ({
    id: item.id,
    type: item.product_type,
    tagLine: item.tag_line,
    brand: item.brand,
    imageUrl: item.image_url,
    price: item.price,
    quantity: item.quantity_in_cart,
    volume: item.product_volume,
  }));
};
