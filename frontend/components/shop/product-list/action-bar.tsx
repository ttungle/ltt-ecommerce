import { CustomIconButton } from '@/components/common/custom-button';
import { PaginationData, sortTypeItemData } from '@/models';
import TuneIcon from '@mui/icons-material/Tune';
import { FormControl, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { memo, useMemo } from 'react';

export interface ShopActionBarProps {
  sortTypeList: Array<sortTypeItemData>;
  productPagination: PaginationData;
  layoutValue: string;
  onSortChange: (value: string) => void;
  onLayoutChange: (value: string) => void;
  onToggleFilterDrawer: (open: boolean) => void;
}

function ShopActionBarMemo(props: ShopActionBarProps) {
  const {
    sortTypeList,
    productPagination,
    layoutValue,
    onSortChange,
    onLayoutChange,
    onToggleFilterDrawer,
  } = props;

  const router = useRouter();

  const sortValue = useMemo(() => {
    if (router?.query?.sort) return router?.query?.sort.toString();
    if (Array.isArray(sortTypeList) && sortTypeList.length > 0)
      return `${sortTypeList[0].sortTypeItem.field}${sortTypeList[0].sortTypeItem.direction}`;

    return 'updatedAt:desc';
  }, [router.query, sortTypeList]);

  const handleToggleFiltersDrawer = (open: boolean) => {
    onToggleFilterDrawer(open);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    if (!onSortChange) return;
    onSortChange(event.target.value);
  };

  const handleLayoutChange = (event: SelectChangeEvent) => {
    if (!onLayoutChange) return;
    onLayoutChange(event.target.value);
  };

  return (
    <>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <CustomIconButton
          color='text.primary'
          size='small'
          onClick={() => handleToggleFiltersDrawer(true)}
        >
          <TuneIcon />
        </CustomIconButton>

        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography variant='body2' mr={1.5} sx={{ color: 'text.primary' }}>
            {productPagination?.page}/{productPagination?.pageCount}
          </Typography>

          <FormControl
            sx={{ m: 1, minWidth: 80, display: { xs: 'none', md: 'block' } }}
            size='small'
          >
            <Select
              value={layoutValue}
              label=''
              onChange={handleLayoutChange}
              sx={{ fontSize: '0.875rem', borderRadius: '2px' }}
            >
              <MenuItem value={6} sx={{ fontSize: '0.875rem' }}>
                2 items
              </MenuItem>
              <MenuItem value={4} sx={{ fontSize: '0.875rem' }}>
                3 items
              </MenuItem>
              <MenuItem value={3} sx={{ fontSize: '0.875rem' }}>
                4 items
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ ml: 1, minWidth: 80 }} size='small'>
            <Select
              value={sortValue}
              onChange={handleSortChange}
              autoWidth
              label=''
              sx={{ fontSize: '0.875rem', borderRadius: '2px' }}
            >
              {sortTypeList.length > 0 &&
                sortTypeList.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={`${item.sortTypeItem.field}${item.sortTypeItem.direction}`}
                    sx={{ fontSize: '0.875rem' }}
                  >
                    {item.sortTypeItem.label}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </>
  );
}

export const ShopActionBar = memo(ShopActionBarMemo);
