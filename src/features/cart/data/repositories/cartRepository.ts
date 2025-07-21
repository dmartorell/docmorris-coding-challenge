import { fetchCartItems } from '../cartService';
import { mapApiCartItemsToDomain } from '../mappers';
import { CartItem } from '../models';

export const CartRepository = {
  getCartItems: async ({
    token,
    host,
  }: {
  token: string;
  host: string;
}): Promise<CartItem[]> => {
    try {
      const apiItems = await fetchCartItems(token, host);
      const domainItems = mapApiCartItemsToDomain(apiItems);
      return domainItems;
    } catch (error) {
      throw error;
    }
  },
};
