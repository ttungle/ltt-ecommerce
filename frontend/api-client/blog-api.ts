import qs from 'qs';
import axiosClient from './axios-client';
import { BlogCategory, BlogTag } from '@/models';

export const blogApi = {
  getAllBlogs(params: any): Promise<any> {
    const query = qs.stringify(
      {
        pagination: {
          page: params?.page,
          pageSize: params?.pageSize,
        },
        filters: params?.filters,
        populate: ['thumbnail'],
      },
      {
        encodeValuesOnly: true,
      }
    );

    const url = `/blogs?${query}`;
    return axiosClient.get(url);
  },
  getAllBlogCategories(): Promise<BlogCategory> {
    const url = '/blog-categories';
    return axiosClient.get(url);
  },
  getAllBlogTags(): Promise<BlogTag> {
    const url = '/blog-tags';
    return axiosClient.get(url);
  },
};
