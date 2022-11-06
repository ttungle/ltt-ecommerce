import axiosClient from './axios-client';
import qs from 'qs';

export const shopApi = {
  getAllProducts(params: any): Promise<any> {
    console.log(params.page);
    const query = qs.stringify(
      {
        pagination: {
          page: params.page,
        },
        populate: ['thumbnails', 'category'],
      },
      {
        encodeValuesOnly: true,
      }
    );

    const url = `/products?${query}`;
    return axiosClient.get(url);
  },
};
