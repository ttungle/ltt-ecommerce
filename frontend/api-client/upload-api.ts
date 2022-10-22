import Cookies from 'js-cookie';
import axiosClient from './axios-client';

export const uploadApi = {
  uploadFile(payload: any) {
    const url = '/upload';
    return axiosClient.post(url, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: Cookies.get('auth_token') ? `Bearer ${Cookies.get('auth_token')}` : false,
      },
    });
  },
};
