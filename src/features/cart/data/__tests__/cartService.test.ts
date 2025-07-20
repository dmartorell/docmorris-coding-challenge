import { fetchCartItems } from '../cartService';
import { mockCartItems } from '../mocks/mockCartItems';

describe('fetchCartItems', () => {
  it('should resolve with mockCartItems', async () => {
    const result = await fetchCartItems('dummy-token', 'dummy-host');
    expect(result).toEqual(mockCartItems);
  });

  it('should return an array of ApiCartItem objects', async () => {
    const result = await fetchCartItems(null, 'localhost');
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('product_type');
    expect(result[0]).toHaveProperty('tag_line');
    expect(result[0]).toHaveProperty('brand');
    expect(result[0]).toHaveProperty('image_url');
    expect(result[0]).toHaveProperty('price');
    expect(result[0]).toHaveProperty('quantity_in_cart');
    expect(result[0]).toHaveProperty('product_volume');
  });

  it('should successfully fetch cart items after a delay', async () => {
    const start = Date.now();
    const result = await fetchCartItems('token', 'host');
    const end = Date.now();
    expect(result).toEqual(mockCartItems);
    expect(end - start).toBeGreaterThanOrEqual(800);
  });
});
