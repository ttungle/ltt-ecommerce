import { Url } from 'url';

export interface LinkData {
  id: number;
  href: Url | String | null;
  label: string;
  target: string | null;
  icon?: string | null;
}

interface FooterSocialData {
  id: number;
  link: string;
  icon: string;
}

export interface FooterSmallTextData {
  id: number;
  copyRight: string;
  policyLinks: Array<LinkData>;
  social: Array<FooterSocialData>;
}

interface FooterColumnItemData {
  id: number;
  title: string;
  links: Array<LinkData>;
}

interface FooterFormData {
  id: number;
  title: string;
  description: string;
  formPlaceholder: string;
}

export interface NavigationData {
  links: Array<Partial<LinkData>>;
  rightButton: Array<Partial<LinkData>>;
  leftButton: Array<Partial<LinkData>>;
}

export interface FooterData {
  id: number;
  footerForm: FooterFormData;
  footerColumns: Array<FooterColumnItemData>;
}

export interface rightButton {}

export interface GlobalData {
  navigation: NavigationData;
  footer: FooterData;
  smallText: FooterSmallTextData;
  locale: String;
}

export interface SubscriptionValueData {
  email: string;
}

