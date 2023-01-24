import { SingleMediaData, ProductData } from './common';
import { MetaData } from './global';
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

export interface ShipmentData {
  icon: SingleMediaData;
  title: string;
  description: string;
}

export interface HomeData {
  metadata: MetaData;
  sliders: SliderData;
  homeCategory: HomeCategoryData;
  homeBestSelling: HomeBestSellingData;
  backgroundVideo: BackGroundVideoData;
  homeHotList: HomeBestSellingData;
  aboutSummary: AboutSummaryData;
  inspired: InspiredData;
  shipment: ShipmentData;
}
