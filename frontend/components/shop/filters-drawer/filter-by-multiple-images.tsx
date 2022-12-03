import { MultipleFiltersImageData, ProductFiltersValue } from '@/models';
import { getStrapiMedia } from '@/utils';
import { Avatar, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import qs from 'qs';
import { useMemo } from 'react';

export interface FilterByMultipleImagesProps {
  filterData: MultipleFiltersImageData;
  onFilterByMultipleImagesChange: (value: ProductFiltersValue | undefined) => void;
}

export function FilterByMultipleImages({
  filterData,
  onFilterByMultipleImagesChange,
}: FilterByMultipleImagesProps) {
  const { filterName, filterProperty, multipleFilterByImages } = filterData;
  const router = useRouter();

  const MultipleFilterImagesValues: string[] = useMemo(() => {
    let MultipleFilterImages = {} as any;

    if (router?.query?.filters) MultipleFilterImages = qs.parse(router?.query?.filters + '');

    return MultipleFilterImages[`${filterProperty}`]?.name?.$in ?? [];
  }, [router.query?.filters]);

  const handleMaterialClick = (value: string) => {
    if (!onFilterByMultipleImagesChange) return;
    let newArray: string[] = [];
    let filterValue: ProductFiltersValue = {};

    if (MultipleFilterImagesValues.includes(value)) {
      newArray = MultipleFilterImagesValues.filter((x) => x !== value);
    } else {
      newArray = [...MultipleFilterImagesValues, value];
    }

    const currentFilters = router?.query?.filters ? qs.parse(router.query.filters + '') : {};

    if (newArray.length === 0) {
      if (Object.hasOwn(currentFilters, `${filterProperty}`))
        delete currentFilters[`${filterProperty}`];
      filterValue = { ...currentFilters };
    } else {
      filterValue = {
        ...currentFilters,
        [`${filterProperty}`]: {
          name: {
            $in: newArray,
          },
        },
      };
    }

    onFilterByMultipleImagesChange(filterValue);
  };

  return (
    <>
      <Typography textTransform='uppercase' fontSize='0.875rem' fontWeight={600} pt={3}>
        {filterName}
      </Typography>

      <Grid container py={5} rowSpacing={3} columnSpacing={1}>
        {multipleFilterByImages.map((filterItem: any) => (
          <Grid
            key={filterItem.id}
            item
            xs={4}
            sx={{ cursor: 'pointer' }}
            onClick={() => handleMaterialClick(filterItem.filterItemName)}
          >
            <Avatar
              alt={filterItem.filterItemName}
              src={getStrapiMedia(filterItem?.filterItemImage?.data?.attributes?.url) ?? ''}
              sx={{
                margin: 'auto',
                border: MultipleFilterImagesValues.includes(filterItem.filterItemName)
                  ? '2px solid #222'
                  : 'none',
                width: 56,
                height: 56,
              }}
            />
            <Typography fontSize='0.875rem' textAlign='center'>
              {filterItem.filterItemName}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
