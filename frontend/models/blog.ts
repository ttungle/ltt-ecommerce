import { SingleMediaData } from './common';

interface BlogDataContent {
  title: string;
  author: string;
  publishedAt: string;
  thumbnail: SingleMediaData;
  content: string;
  blogCategory: BlogCategoryData;
  blogTags: BlogTagData;
  path: string;
}

export interface BlogData {
  id: string;
  attributes: BlogDataContent;
}

export interface BlogCategoryData {
  data: {
    attributes: {
      name: string;
      path: string;
      blogs: Array<BlogData>;
    };
  };
}

export interface BlogTagData {
  tagName: string;
  blogs: Array<BlogData>;
}
