import { mapApiCartItemsToDomain } from '../mappers';

describe('mapApiCartItemsToDomain', () => {
  it('should correctly map a single ApiCartItem to CartItem', () => {
    const apiItem = [{
      id: '1',
      product_type: 'medication',
      tag_line: 'Ibuprofen 400mg',
      brand: 'Ratiopharm',
      image_url: 'https://picsum.photos/201',
      price: 5.99,
      quantity_in_cart: 2,
      product_volume: '20 caplets',
    }];
    const expected = [{
      id: '1',
      type: 'medication',
      tagLine: 'Ibuprofen 400mg',
      brand: 'Ratiopharm',
      imageUrl: 'https://picsum.photos/201',
      price: 5.99,
      quantity: 2,
      volume: '20 caplets',
    }];
    expect(mapApiCartItemsToDomain(apiItem)).toEqual(expected);
  });

  it('should correctly map an array of ApiCartItem to CartItem[]', () => {
    const apiItem = [
      {
        id: '4',
        product_type: 'medication',
        tag_line: 'Paracetamol 500mg Caplets',
        brand: 'Hexal',
        image_url: 'https://picsum.photos/200',
        price: 9.99,
        quantity_in_cart: 1,
        product_volume: '16 caplets',
      },
      {
        id: '2',
        product_type: 'product',
        tag_line: 'Eucerin Sun Cream SPF 50+',
        brand: 'Eucerin',
        image_url: 'https://picsum.photos/200',
        price: 14.99,
        quantity_in_cart: 1,
        product_volume: '50ml',
      },
    ];
    const expected = [
      {
        id: '4',
        type: 'medication',
        tagLine: 'Paracetamol 500mg Caplets',
        brand: 'Hexal',
        imageUrl: 'https://picsum.photos/200',
        price: 9.99,
        quantity: 1,
        volume: '16 caplets',
      },
      {
        id: '2',
        type: 'product',
        tagLine: 'Eucerin Sun Cream SPF 50+',
        brand: 'Eucerin',
        imageUrl: 'https://picsum.photos/200',
        price: 14.99,
        quantity: 1,
        volume: '50ml',
      },
    ];
    expect(mapApiCartItemsToDomain(apiItem)).toEqual(expected);
  });

  it('should handle missing optional fields gracefully', () => {
    const apiItem = [{
      id: '3',
      product_type: 'medication',
      tag_line: 'Aspirin',
      brand: 'Bayer',
      price: 3.99,
      quantity_in_cart: 1,
    }];
    const expected = [{
      id: '3',
      type: 'medication',
      tagLine: 'Aspirin',
      brand: 'Bayer',
      imageUrl: '',
      price: 3.99,
      quantity: 1,
      volume: undefined,
    }];
    expect(mapApiCartItemsToDomain(apiItem)).toEqual(expected);
  });
});
