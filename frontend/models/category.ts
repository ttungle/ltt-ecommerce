export interface CategoryData {
  data: {
    id: number;
    attributes: {
      name: string;
      slug: string;
      locale: string;
      sizeSelectionList: Array<SizeSelectionItemData>;
    };
  };
}

export interface SizeSelectionItemData {
  id: number;
  title: string;
  value: string;
  status: string;
}
