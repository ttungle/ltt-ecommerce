import { MediaData } from './common';

export interface ShopData {
  metadata: any;
  breadcrumb: BreadcrumbData;
  banner: BannerData;
  productListPageSize: number | null;
  sortTypeList: Array<sortTypeItemData>;
}

export interface BreadcrumbItemData {
  id: number;
  title: string;
  path: string;
  icon: string;
}

export interface BreadcrumbData {
  id: number;
  breadcrumbItem: Array<BreadcrumbItemData>;
}

export interface BannerData {
  id: number;
  bannerTitle: string | null;
  bannerDescription: string | null;
  textPosition: string | null;
  bannerImage: MediaData;
}

export interface PaginationData {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}

export interface sortTypeItemData {
  id: number;
  sortTypeItem: {
    label: string;
    field: string;
    direction: string;
  };
}
