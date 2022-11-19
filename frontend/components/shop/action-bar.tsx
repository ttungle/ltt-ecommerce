import { sortTypeItemData } from '@/models';
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
} from '@mui/material';
import { useRouter } from 'next/router';
import { memo, useMemo } from 'react';
import { CustomIconButton } from '../common/custom-button/icon-button';

export interface ShopActionBarProps {
  sortTypeList: Array<sortTypeItemData>;
  onChange: (value: string) => void;
}

function ShopActionBarMemo({ sortTypeList, onChange }: ShopActionBarProps) {
  const router = useRouter();

  const sortValue = useMemo(() => {
    if (router?.query?.sort) return router?.query?.sort.toString();

    if (Array.isArray(sortTypeList) && sortTypeList.length > 0)
      return `${sortTypeList[0].sortTypeItem.field}${sortTypeList[0].sortTypeItem.direction}`;

    return 'updatedAt:desc';
  }, [router.query, sortTypeList]);

  const handleSortChange = async (event: SelectChangeEvent) => {
    if (!onChange) return;
    await onChange(event.target.value);
  };

  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ my: 6 }}>
      <CustomIconButton color='text.primary' properties={{ size: 'small' }}>
        <TuneIcon />
      </CustomIconButton>

      <Stack direction='row' alignItems='center' justifyContent='space-between'>
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

        <FormControl sx={{ m: 1, minWidth: 80 }} size='small'>
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
  );
}

export const ShopActionBar = memo(ShopActionBarMemo);
