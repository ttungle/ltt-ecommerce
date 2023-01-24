import axiosClient from './axios-client';
import qs from 'qs';
import { FieldValues } from 'react-hook-form';

export const shopApi = {
  getAllProducts(params: any): Promise<any> {
    const query = qs.stringify(
      {
        pagination: {
          page: params.page,
          pageSize: params.pageSize,
        },
        sort: params.sort,
        filters: params.filters,
        populate: ['thumbnails', 'category'],
      },
      {
        encodeValuesOnly: true,
      }
    );

    const url = `/products?${query}`;
    return axiosClient.get(url);
  },
  createProductReviewComment(payload: FieldValues): Promise<any> {
    const reqBody = {
      data: payload,
    };

    const url = '/product-reviews';
    return axiosClient.post(url, reqBody);
  },
  getProductByCatagory(categoryId: number) {
    const query = qs.stringify(
      {
        pagination: {
          page: 1,
          pageSize: 8,
        },
        populate: ['products', 'products.thumbnails'],
      },
      {
        encodeValuesOnly: true,
      }
    );

    const url = `/categories/${categoryId}?${query}`;
    return axiosClient.get(url);
  },
};
