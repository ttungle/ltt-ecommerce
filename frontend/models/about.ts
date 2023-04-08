import { SeoData, SingleMediaData, StrapiData } from './common';
import { HomeCategoryImageData, ShipmentData } from './home';

export interface HeroSectionData {
  heroImage: SingleMediaData;
  title: string;
  description: string;
}

export interface AboutUsPageData {
  id: number;
  attributes: AboutUsPageAttributeData;
}

interface AboutUsPageAttributeData {
  seo: SeoData;
  hero: HeroSectionData;
  categoryList: CategoryListData;
  contentSection: Array<CategoryListData>;
  shipmentInformation: ShipmentData;
  commonReviews: CommonReviewData;
}

export interface CategoryListData {
  id: number;
  title: string;
  description: string;
  backgroundColor: string | null;
  homeCategoryImage: Array<HomeCategoryImageData>;
  backgroundImage: SingleMediaData;
}

export interface ContentSectionItemData {
  id: number;
  title: string | null;
  description: string | null;
}

export interface CommonReviewData {
  data: StrapiData<CommonReviewItemAttributeData>[];
}

interface CommonReviewItemAttributeData {
  title: string | null;
  description: string | null;
  rating: number | null;
  username: string | null;
  avatar: SingleMediaData;
}
