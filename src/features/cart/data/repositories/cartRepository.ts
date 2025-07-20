import { logger } from '../../../../utils/logger';
import { fetchCartItems } from '../cartService';
import { mapApiCartItemsToDomain } from '../mappers';
import { CartItem } from '../models';

export const cartRepository = {
  GetCartItems: async ({
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
      logger.error('CartRepository: Error fetching cart items', error);
      throw error;
    }
  },
};
