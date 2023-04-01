import { SingleMediaData, StrapiData } from './common';

export interface BlogDataContent {
  title: string;
  author: string;
  publishedAt: string;
  thumbnail: SingleMediaData;
  content: string;
  blogCategory: BlogCategory;
  blogTags: BlogTagList;
  path: string;
}

interface BlogCategory {
  data: StrapiData<BlogCategoryItemData>;
}

export interface BlogCategoryList {
  data: BlogCategoryData;
}

export interface BlogTagList {
  data: BlogTagData;
}

export interface Blog {
  data: BlogData;
}

export type BlogCategoryData = Array<StrapiData<BlogCategoryItemData>>;
export type BlogTagData = Array<StrapiData<BlogTagItemData>>;
export type BlogData = StrapiData<BlogDataContent>;

interface BlogCategoryItemData {
  name: string;
  path: string;
  locale?: 'en' | 'vi';
}

interface BlogTagItemData {
  tagName: string;
  locale?: 'en' | 'vi';
}
