import { FilterByPriceOption, ProductFiltersValue } from '@/models';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import qs from 'qs';
import { useEffect, useMemo, useState } from 'react';

export interface FilterByPriceProps {
  filterName: string | null;
  filterPriceList: Array<FilterByPriceOption>;
  onPriceFilterChange: (value: ProductFiltersValue | undefined) => void;
}

export function FilterByPrice({
  filterName = 'Price',
  filterPriceList,
  onPriceFilterChange,
}: FilterByPriceProps) {
  const router = useRouter();
  const [fromPriceValue, setFromPriceValue] = useState<FilterByPriceOption | null>(
    () => filterPriceList[0]
  );
  const [toPriceValue, setToPriceValue] = useState<FilterByPriceOption | null>(
    () => filterPriceList[filterPriceList.length - 1]
  );

  useEffect(() => {
    let filterByPriceValues = {} as ProductFiltersValue;

    if (router?.query?.filters) filterByPriceValues = qs.parse(router?.query?.filters + '');

    if (Array.isArray(filterByPriceValues['$and']) && filterByPriceValues['$and'].length > 0) {
      const priceArrayValues = filterByPriceValues['$and'].map(
        (filterItem) => filterItem.salePrice['$gte'] || filterItem.salePrice['$lte']
      );

      const priceArray: any[] = priceArrayValues.map((value) =>
        filterPriceList.find((x) => x.value.toString() === value)
      );

      setFromPriceValue(priceArray[0]);
      setToPriceValue(priceArray[1]);
    } else {
      setFromPriceValue(filterPriceList[0]);
      setToPriceValue(filterPriceList[filterPriceList.length - 1]);
    }
  }, [router, filterPriceList]);

  const fromPriceOptions = useMemo(
    () =>
      filterPriceList.filter((x) =>
        toPriceValue?.value ? x.value < toPriceValue.value : filterPriceList
      ),
    [toPriceValue]
  );

  const toPriceOptions = useMemo(
    () =>
      filterPriceList.filter((x) =>
        fromPriceValue?.value ? x.value > fromPriceValue.value : filterPriceList
      ),
    [fromPriceValue]
  );

  const handlePriceFilterChange = (
    fromValue: FilterByPriceOption | null,
    toValue: FilterByPriceOption | null
  ) => {
    if (!onPriceFilterChange || !fromValue || !toValue) return;

    const currentFilters = router?.query?.filters ? qs.parse(router.query.filters + '') : {};

    let filterValue = {
      $and: [
        {
          salePrice: {
            $gte: `${fromValue?.value}`,
          },
        },
        {
          salePrice: {
            $lte: `${toValue?.value}`,
          },
        },
      ],
    };

    onPriceFilterChange({ ...currentFilters, ...filterValue });
  };

  const handleFromPriceChange = (event: any, value: FilterByPriceOption | null) => {
    handlePriceFilterChange(value, toPriceValue);
  };

  const handleToPriceChange = (event: any, value: FilterByPriceOption | null) => {
    handlePriceFilterChange(fromPriceValue, value);
  };

  return (
    <>
      <Typography textTransform='uppercase' fontSize='0.875rem' fontWeight={600} pt={3}>
        {filterName}
      </Typography>

      <Autocomplete
        disablePortal
        options={fromPriceOptions}
        value={fromPriceValue}
        onChange={handleFromPriceChange}
        sx={{
          width: '80%',
          mb: 3,
          '& label': { fontSize: '0.875rem' },
          '& input': { fontSize: '0.875rem' },
        }}
        renderInput={(params) => (
          <TextField {...params} label='From' size='small' variant='standard' />
        )}
      />

      <Autocomplete
        disablePortal
        options={toPriceOptions}
        value={toPriceValue}
        onChange={handleToPriceChange}
        sx={{
          width: '80%',
          '& label': { fontSize: '0.875rem' },
          '& input': { fontSize: '0.875rem' },
        }}
        renderInput={(params) => (
          <TextField {...params} label='To' size='small' variant='standard' />
        )}
      />
    </>
  );
}
