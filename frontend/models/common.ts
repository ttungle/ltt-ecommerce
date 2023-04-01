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

export interface SeoData {
  id: number;
  metaTitle: string;
  metaDescription: string;
  metaImage: SingleMediaData;
  metaSocial: Array<any>;
  metaRobots?: any;
  metaViewport?: any;
  structuredData?: any;
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}
