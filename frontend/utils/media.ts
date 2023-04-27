import { LOCAL_API_URL } from '@/constant';

export function getStrapiMedia(url: string) {
  if (url == null) {
    return null;
  }
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }
  return `${process.env.NEXT_PUBLIC_API_URL || LOCAL_API_URL}${url}`;
}

export function convertMarkdownImageSrc(text: string) {
  return text.replaceAll('/uploads', `${process.env.NEXT_PUBLIC_API_URL || LOCAL_API_URL}/uploads`);
}
