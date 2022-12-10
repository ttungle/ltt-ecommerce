import { ProductFiltersValue } from '@/models';
import { formatPrice } from '@/utils';

export const FILTER_LIST = [
  {
    type: 'category',
    getLabel: (filters: ProductFiltersValue) => filters?.category?.name?.$in,
    isVisible: (filters: ProductFiltersValue) => Boolean(filters?.category?.name?.$in),
    onRemove: (
      filters: ProductFiltersValue,
      currentItem: string | undefined
    ): ProductFiltersValue => {
      const newFilter = { ...filters };
      if (
        newFilter?.category?.name?.$in &&
        Array.isArray(newFilter?.category?.name?.$in) &&
        newFilter.category.name.$in.length > 1
      ) {
        newFilter.category.name.$in = newFilter.category.name.$in.filter(
          (item) => item !== currentItem
        );
      } else {
        delete newFilter['category'];
      }
      return newFilter;
    },
  },
  {
    type: 'material',
    getLabel: (filters: ProductFiltersValue) => filters?.material?.name?.$in,
    isVisible: (filters: ProductFiltersValue) => Boolean(filters?.material?.name?.$in),
    onRemove: (
      filters: ProductFiltersValue,
      currentItem: string | undefined
    ): ProductFiltersValue => {
      const newFilter = { ...filters };
      if (
        newFilter?.material?.name?.$in &&
        Array.isArray(newFilter?.material?.name?.$in) &&
        newFilter.material.name.$in.length > 1
      ) {
        newFilter.material.name.$in = newFilter.material.name.$in.filter(
          (item) => item !== currentItem
        );
      } else {
        delete newFilter['material'];
      }
      return newFilter;
    },
  },
  {
    type: 'salePrice',
    getLabel: (filters: ProductFiltersValue) =>
      filters?.$and && [
        `${formatPrice(Number(filters?.$and[0]?.salePrice.$gte), 'en')} - ${formatPrice(
          Number(filters?.$and[1]?.salePrice.$lte),
          'en'
        )}`,
      ],
    isVisible: (filters: ProductFiltersValue) =>
      Boolean(filters?.$and && filters?.$and[0]?.salePrice && filters?.$and[1]?.salePrice),
    onRemove: (
      filters: ProductFiltersValue,
      currentItem: string | undefined
    ): ProductFiltersValue => {
      const newFilter = { ...filters };
      if (filters?.$and && Array.isArray(filters?.$and) && filters?.$and.length > 0) {
        delete newFilter['$and'];
      }
      return newFilter;
    },
  },
];
