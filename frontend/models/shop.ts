import { SingleMediaData } from './common';

export enum FilterOperators {
  And = '$and',
  Or = '$or',
  In = '$in',
  Gte = '$gte',
  Lte = '$lte',
}

export interface ShopData {
  metadata: any;
  breadcrumb: BreadcrumbData;
  banner: BannerData;
  productListPageSize: number | null;
  sortTypeList: Array<sortTypeItemData>;
  multipleFilterList: any;
}

export interface ShopDetailsData {
  id: number;
  attributes: {
    metadata: any;
    sizeSelection: ShopDetailSizeSelectionData;
    productReviewSection: ShopDetailReviewSectionItemData;
  };
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
  bannerImage: SingleMediaData;
  textColor: 'black' | 'white' | null;
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

export interface ProductMultipleFilterItemValue {
  name: {
    [FilterOperators.In]: Array<string>;
  };
}

export interface MultipleFilterImageItemData {
  filterItemName: string | null;
  filterItemImage: SingleMediaData;
}

export interface MultipleFiltersImageData {
  id: number;
  filterName: string | null;
  filterProperty: string | null;
  filterType: 'multiple-choices' | 'price';
  multipleFilterByImages: Array<MultipleFilterImageItemData>;
  labelAndValue?: Array<FilterByPriceOption>;
}

interface FilterByPriceData {
  salePrice: {
    [FilterOperators.Gte]?: string | undefined;
    [FilterOperators.Lte]?: string | undefined;
  };
}

export interface ProductFiltersValue {
  category?: ProductMultipleFilterItemValue | undefined;
  material?: ProductMultipleFilterItemValue | undefined;
  [FilterOperators.And]?: Array<FilterByPriceData>;
}

export interface FilterByPriceOption {
  label: string;
  value: number;
}

export interface ShopDetailSizeSelectionData {
  id: number;
  title: string;
  sizeDescription: string;
}

export interface ShopDetailReviewSectionItemData {
  [key: string]: string;
}
