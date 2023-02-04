import { CartPageData } from '@/models';
import qs from 'qs';
import axiosClient from './axios-client';

export const cartApi = {
  getCartPage(): Promise<CartPageData> {
    const query = qs.stringify(
      {
        populate: ['cartTable', 'cartTotal'],
      },
      {
        encodeValuesOnly: true,
      }
    );

    const url = `/cart-page?${query}`;
    return axiosClient.get(url);
  },
};
