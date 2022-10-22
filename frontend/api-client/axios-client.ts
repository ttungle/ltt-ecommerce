import { AuthURLList } from '@/models';
import { getStrapiURL } from '@/utils';
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosClient = axios.create({
  baseURL: getStrapiURL('/api'),
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async function (config) {
    config.headers = {
      Authorization: Cookies.get('auth_token') ? `Bearer ${Cookies.get('auth_token')}` : '',
    };

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const { config, status, data } = error.response;
    const URLs = Object.values(AuthURLList);

    if (URLs.includes(config.url) && status === 400) {
      const errorMessage = data?.error?.message ?? '';

      throw new Error(errorMessage);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
