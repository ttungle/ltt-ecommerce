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
