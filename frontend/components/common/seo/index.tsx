import { getStrapiMedia } from '@/utils';
import { NextSeo } from 'next-seo';

export interface SeoProps {
  metadata: any;
}

export function Seo({ metadata }: SeoProps) {
  return (
    <NextSeo
      title={metadata?.metaTitle}
      description={metadata?.metaDescription}
      openGraph={{
        title: metadata?.metaTitle,
        description: metadata?.metaDescription,
        images: [
          {
            ...metadata?.metaImage?.data?.attributes,
            url: getStrapiMedia(metadata?.metaImage?.data?.attributes?.url) ?? '',
          },
        ],
      }}
      twitter={{ cardType: 'summary_large_image' }}
    />
  );
}
