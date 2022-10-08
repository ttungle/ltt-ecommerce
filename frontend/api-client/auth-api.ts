import { AuthenticationResultData, LoginPayloadData, RegisterPayloadData } from '@/models';
import Cookies from 'js-cookie';
import axiosClient from './axios-client';

export const authApi = {
  register(payload: RegisterPayloadData) {
    const url = '/auth/local/register';
    return axiosClient.post(url, payload);
  },

  login(payload: LoginPayloadData) {
    const url = '/auth/local';
    return axiosClient.post(url, payload);
  },

  getProfile() {
    const url = '/users/me?populate=avatar';
    return axiosClient.get(url, {
      headers: {
        Authorization: Cookies.get('auth_token') ? `Bearer ${Cookies.get('auth_token')}` : false,
      },
    });
  },
};
