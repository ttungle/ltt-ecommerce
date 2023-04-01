import { Blog, BlogCategoryList, BlogTagList } from '@/models';
import qs from 'qs';
import axiosClient from './axios-client';

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
  getAllBlogCategories(): Promise<BlogCategoryList> {
    const url = '/blog-categories';
    return axiosClient.get(url);
  },
  getAllBlogTags(): Promise<BlogTagList> {
    const url = '/blog-tags';
    return axiosClient.get(url);
  },
  getBlog(path: string): Promise<Blog> {
    const query = qs.stringify(
      {
        populate: ['thumbnail', 'blogCategory', 'blogTags'],
      },
      {
        encodeValuesOnly: true,
      }
    );

    const url = `/blogs/${path}?${query}`;
    return axiosClient.get(url);
  },
};
