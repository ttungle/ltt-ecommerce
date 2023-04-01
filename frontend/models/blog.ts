import { SingleMediaData, StrapiData } from './common';

export interface BlogDataContent {
  title: string;
  author: string;
  publishedAt: string;
  thumbnail: SingleMediaData;
  content: string;
  blogCategory: BlogCategory;
  blogTags: BlogTag;
  path: string;
}

export interface BlogCategory {
  data: BlogCategoryData;
}

export interface BlogTag {
  data: BlogTagData;
}

export type BlogCategoryData = Array<StrapiData<BlogCategoryItemData>>;
export type BlogTagData = Array<StrapiData<BlogTagItemData>>;

interface BlogCategoryItemData {
  name: string;
  path: string;
  locale?: 'en' | 'vi';
}

interface BlogTagItemData {
  tagName: string;
  locale?: 'en' | 'vi';
}
