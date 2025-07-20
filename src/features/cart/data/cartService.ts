/* eslint-disable @typescript-eslint/no-unused-vars */
import { mockCartItems } from './mocks/mockCartItems';
import { ApiCartItem } from './models';

export const fetchCartItems = async (token: string | null, host: string): Promise<ApiCartItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCartItems as ApiCartItem[]);
    }, 800);
  });
};
