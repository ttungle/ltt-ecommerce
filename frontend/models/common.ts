import { EmotionCache } from '@emotion/react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { GlobalData } from './global';

export interface LayoutProps {
  children: ReactNode;
  global: GlobalData;
}

export type NextPageWithLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

export interface ProductData {
  id: number;
  attributes: {
    name: string | null;
    description?: number | null;
    originalPrice: number | null;
    salePrice?: number | null;
    salePercentage?: number | null;
    colors?: Array<String>;
    isSale: boolean;
    isFreeShip: boolean;
    isSoldOut: boolean;
    isBestSeller: boolean;
    code: number | null;
    thumbnails?: {
      data: Array<MediaContentData>;
    };
    path: string;
  };
}

export interface MediaContentData {
  id: number;
  attributes: {
    name?: string | null;
    width?: number | null;
    height?: number | null;
    url: string;
  };
}

export interface SingleMediaData {
  data: MediaContentData;
}
