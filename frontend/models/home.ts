import { SingleMediaData, SeoData } from './common';
import { ProductData } from './product';

export interface SliderData {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  image: SingleMediaData;
}

export interface HomeCategoryData {
  title: String;
  description: String;
  backgroundImage: any;
  homeCategoryImage: Array<HomeCategoryImageData>;
}

export interface HomeCategoryImageData {
  id: number;
  buttonText: string | null;
  path: string | null;
  image: SingleMediaData;
}

export interface HomeBestSellingData {
  title: String;
  description: String;
  products: {
    data: Array<ProductData>;
  };
}

export interface BackGroundVideoData {
  id: number;
  title: string;
  buttonText: string;
  videoUrl: string;
}

export interface AboutSummaryData {
  title: string;
  description: string;
  buttonText: string;
  thumbnail: any;
  path: string;
}

export interface InspiredData {
  title: string;
  description: string;
  blogs: any;
}

export interface ShipmentItemData {
  id: number;
  icon: SingleMediaData;
  title: string;
  description: string;
}

export interface ShipmentData {
  shipmentItem: Array<ShipmentItemData>;
  backgroundImage: SingleMediaData | null;
}

export interface HomeData {
  seo: SeoData;
  sliders: SliderData;
  homeCategory: HomeCategoryData;
  homeBestSelling: HomeBestSellingData;
  backgroundVideo: BackGroundVideoData;
  homeHotList: HomeBestSellingData;
  aboutSummary: AboutSummaryData;
  inspired: InspiredData;
  shipment: ShipmentData;
}
