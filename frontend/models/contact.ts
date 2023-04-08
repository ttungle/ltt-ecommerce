import { SeoData } from './common';

export interface ContactPageData {
  seo: SeoData;
  pageHeader: string | null;
  mapSource: string | null;
  helpInfo: HelpInformationData;
}

export interface HelpInformationData {
  id: number;
  header: string | null;
  helpItems: Array<HelpInformationItemData>;
}

interface HelpInformationItemData {
  id: number;
  title: string;
  description: string;
}
