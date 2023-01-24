import { UserData } from '@/models';
import { CategoryData } from './category';
import { MediaContentData } from './common';

interface ProductReviewerData {
  data: {
    id: number;
    attributes: UserData;
  };
}

export interface ProductData {
  id: number;
  attributes: ProductAttributeData;
}

export interface ProductAttributeData {
  name: string | null;
  description: string | null;
  detailDescription: string | null;
  originalPrice: number | null;
  salePrice?: number | null;
  salePercentage?: number | null;
  colors?: Array<String>;
  isSale: boolean;
  isFreeShip: boolean;
  isSoldOut: boolean;
  isBestSeller: boolean;
  code: number | null;
  category?: CategoryData;
  productReviews: ProductReviewData;
  thumbnails?: {
    data: Array<MediaContentData>;
  };
  path: string;
}

export interface ProductReviewData {
  data: Array<ProductReviewItemData>;
}

export interface ProductReviewItemData {
  id: number;
  attributes: {
    title: string;
    reviewContent: string;
    updatedAt: string;
    locale: string;
    bottomLine: string;
    rating: number;
    reviewer: ProductReviewerData;
  };
}
