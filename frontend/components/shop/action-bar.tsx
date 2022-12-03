import { PaginationData, sortTypeItemData } from '@/models';
import Looks3OutlinedIcon from '@mui/icons-material/Looks3Outlined';
import Looks4OutlinedIcon from '@mui/icons-material/Looks4Outlined';
import LooksTwoOutlinedIcon from '@mui/icons-material/LooksTwoOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { memo, useMemo } from 'react';
import { CustomIconButton } from '../common/custom-button/icon-button';

export interface ShopActionBarProps {
  sortTypeList: Array<sortTypeItemData>;
  productPagination: PaginationData;
  onToggleFilterDrawer: (open: boolean) => void;
  onSortChange: (value: string) => void;
}

function ShopActionBarMemo(props: ShopActionBarProps) {
  const { sortTypeList, productPagination, onToggleFilterDrawer, onSortChange } = props;

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

  return (
    <>
      <Stack direction='row' justifyContent='space-between' alignItems='center' my={6}>
        <CustomIconButton
          color='text.primary'
          properties={{ size: 'small' }}
          onClick={() => handleToggleFiltersDrawer(true)}
        >
          <TuneIcon />
        </CustomIconButton>

        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography variant='body2' mr={1.5} sx={{ color: 'text.primary' }}>
            {productPagination?.page}/{productPagination?.pageCount}
          </Typography>

          <Box sx={{ border: '1px solid #ccc' }}>
            <IconButton sx={{ borderRadius: '2px' }} size='small'>
              <LooksTwoOutlinedIcon />
            </IconButton>
            <IconButton sx={{ borderRadius: '2px' }} size='small'>
              <Looks3OutlinedIcon />
            </IconButton>
            <IconButton sx={{ borderRadius: '2px' }} size='small'>
              <Looks4OutlinedIcon />
            </IconButton>
          </Box>

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
