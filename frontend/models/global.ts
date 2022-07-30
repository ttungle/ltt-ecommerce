import { Url } from 'url';

export interface LinkData {
  id: number;
  href: Url | String | null;
  label: string;
  target: string | null;
  icon?: string | null;
}

export interface NavigationData {
  links: Array<Partial<LinkData>>;
  rightButton: Array<Partial<LinkData>>;
  leftButton: Array<Partial<LinkData>>;
}

export interface Footer {}

export interface rightButton {}

export interface GlobalData {
  navigation: NavigationData;
  footer: Object;
  locale: String;
}
