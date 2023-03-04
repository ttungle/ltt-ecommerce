import axiosClient from './axios-client';
import { FieldValues } from 'react-hook-form';
import qs from 'qs';

export const checkoutApi = {
  getCheckoutPage() {
    const query = qs.stringify({
      populate: ['checkoutStatus.image', 'checkoutContent'],
    });
    const url = `/checkout-page?${query}`;
    return axiosClient.get(url);
  },
  createCheckoutSession(payload: FieldValues): Promise<any> {
    const url = `/orders`;
    return axiosClient.post(url, payload);
  },
};
