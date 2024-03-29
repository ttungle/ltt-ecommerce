import { CircularLoader } from '@/components/common/loader';
import { MultipleFiltersImageData, ProductFiltersValue } from '@/models';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Divider, IconButton, Stack, SwipeableDrawer } from '@mui/material';
import { useRouter } from 'next/router';
import React, { memo, useMemo } from 'react';
import { FilterByMultipleImages } from './filter-by-multiple-images';
import { FilterByPrice } from './filter-by-price';
import { BOTTOM_NAV_HEIGHT } from '@/constant';

export interface ShopFiltersDrawerProps {
  isLoading: boolean;
  multipleFilterList: Array<MultipleFiltersImageData>;
  showFiltersDrawer: boolean;
  onFiltersChange: (value: ProductFiltersValue | undefined) => void;
  onToggleFiltersDrawerClick: (open: boolean) => void;
}

const ShopFiltersDrawerMemo = (props: ShopFiltersDrawerProps) => {
  const {
    isLoading,
    showFiltersDrawer,
    multipleFilterList,
    onFiltersChange,
    onToggleFiltersDrawerClick,
  } = props;
  const router = useRouter();

  const isFilterExist = useMemo(() => Boolean(router?.query?.filters), [router.query]);

  const handleToggleFiltersDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      )
        return;

      onToggleFiltersDrawerClick(open);
    };

  const handleFiltersChange = (value: ProductFiltersValue | undefined) => {
    if (!onFiltersChange) return;
    onFiltersChange(value);
  };

  return (
    <SwipeableDrawer
      anchor='left'
      open={showFiltersDrawer}
      onClose={handleToggleFiltersDrawer(false)}
      onOpen={handleToggleFiltersDrawer(true)}
    >
      <Stack
        direction='column'
        justifyContent='space-between'
        alignItems='flex-start'
        sx={{
          width: { lg: '30vw', xs: '90vw' },
          height: '100%',
          pb: { lg: 0, xs: BOTTOM_NAV_HEIGHT },
        }}
        role='presentation'
      >
        <Stack
          direction='row'
          justifyContent='flex-end'
          alignItems='center'
          px={1}
          pt={1}
          ml='auto'
        >
          <IconButton onClick={handleToggleFiltersDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Box px={5} pb={{ lg: 0 }} flex={1} sx={{ flex: 1, overflowY: 'auto', width: '100%' }}>
          {multipleFilterList.map((filterItem) => (
            <React.Fragment key={filterItem.id}>
              {filterItem.filterType === 'multiple-choices' && (
                <>
                  <FilterByMultipleImages
                    onFilterByMultipleImagesChange={handleFiltersChange}
                    filterData={filterItem}
                  />
                  <Divider />
                </>
              )}

              {filterItem.filterType === 'price' && (
                <FilterByPrice
                  filterName={filterItem?.filterName}
                  filterPriceList={filterItem?.labelAndValue ?? []}
                  onPriceFilterChange={handleFiltersChange}
                />
              )}
            </React.Fragment>
          ))}
        </Box>

        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          mt={5}
          width='100%'
        >
          <Button
            variant='contained'
            size='large'
            fullWidth
            onClick={() => handleFiltersChange({})}
            disabled={!isFilterExist}
            sx={{
              p: 1.5,
              bgcolor: 'common.white',
              color: 'common.black',
              borderRadius: 0,
              borderTop: '1px solid #ddd',
              fontSize: '0.875rem',
            }}
          >
            Clear All
          </Button>

          <Button
            variant='contained'
            size='large'
            fullWidth
            onClick={handleToggleFiltersDrawer(false)}
            sx={{
              p: 1.5,
              bgcolor: 'common.black',
              color: 'common.white',
              borderRadius: 0,
              fontSize: '0.875rem',
            }}
          >
            Result
          </Button>
        </Stack>
      </Stack>

      {isLoading && (
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }}>
          <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            height='100%'
            sx={{ background: 'rgba(0, 0, 0, 0.2)' }}
          >
            <CircularLoader loaderContent='' />
          </Stack>
        </Box>
      )}
    </SwipeableDrawer>
  );
};

export const ShopFiltersDrawer = memo(ShopFiltersDrawerMemo);
