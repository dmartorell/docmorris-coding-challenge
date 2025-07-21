import * as Mappers from '../../mappers';
import { ApiCartItem, CartItem } from '../../models';
import { CartRepository } from '../CartRepository';

describe('CartRepository', () => {
  const mockAuthToken = 'test-token';
  const mockHost = 'http://localhost';
  const mockApiItems: ApiCartItem[] = [{ id: 'api1', brand: 'Test Product', image_url: '', price: 10, quantity_in_cart: 1, tag_line: 'Test Tag', product_type: 'product', product_volume: '100ml' }];
  const mockDomainItems: CartItem[] = [{ id: 'api1', brand: 'Test Product', imageUrl: '', price: 10, quantity: 1, tagLine: 'Test Tag', type: 'product', volume: '100ml' }];

  let fetchCartItemsSpy: jest.SpyInstance;
  let mapApiCartItemsToDomainSpy: jest.SpyInstance;

  beforeEach(() => {
    fetchCartItemsSpy = jest.spyOn(require('../../cartService'), 'fetchCartItems').mockResolvedValue(mockApiItems);
    mapApiCartItemsToDomainSpy = jest.spyOn(Mappers, 'mapApiCartItemsToDomain').mockReturnValue(mockDomainItems);
  });

  afterEach(() => {
    fetchCartItemsSpy.mockRestore();
    mapApiCartItemsToDomainSpy.mockRestore();
  });

  describe('getCartItems', () => {
    it('should fetch items from service and map them to domain models', async () => {
      const result = await CartRepository.getCartItems({ token: mockAuthToken, host: mockHost });
      expect(fetchCartItemsSpy).toHaveBeenCalledWith(mockAuthToken, mockHost);
      expect(mapApiCartItemsToDomainSpy).toHaveBeenCalledWith(mockApiItems);
      expect(result).toEqual(mockDomainItems);
    });
  });
});
