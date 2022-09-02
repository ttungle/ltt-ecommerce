import { MediaData, ProductData } from './common';

export interface SliderData {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  image: MediaData;
}

export interface HomeCategoryData {
  title: String;
  description: String;
  backgroundImage: any;
  homeCategoryImage: any;
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
