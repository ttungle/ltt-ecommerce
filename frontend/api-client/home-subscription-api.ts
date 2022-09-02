import { SubscriptionValueData } from '@/models';
import axiosClient from './axios-client';

export const subscriptionApi = {
  send(payload: { data: SubscriptionValueData }) {
    return axiosClient.post('/subscription-forms', payload);
  },
};
