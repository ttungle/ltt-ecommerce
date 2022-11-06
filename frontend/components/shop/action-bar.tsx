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
import * as React from 'react';
import { CustomIconButton } from '../common/custom-button/icon-button';

export interface ShopActionBarProps {}

export function ShopActionBar(props: ShopActionBarProps) {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
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
            value={age}
            onChange={handleChange}
            autoWidth
            label=''
            sx={{ fontSize: '0.875rem', borderRadius: '2px' }}
          >
            <MenuItem value={0} sx={{ fontSize: '0.875rem' }}>
              Default Sorting
            </MenuItem>
            <MenuItem value={1} sx={{ fontSize: '0.875rem' }}>
              Sort By Popularity
            </MenuItem>
            <MenuItem value={2} sx={{ fontSize: '0.875rem' }}>
              Sort By Average Rating
            </MenuItem>
            <MenuItem value={3} sx={{ fontSize: '0.875rem' }}>
              Sort By Latest
            </MenuItem>
            <MenuItem value={4} sx={{ fontSize: '0.875rem' }}>
              Sort By Price: Low To High
            </MenuItem>
            <MenuItem value={5} sx={{ fontSize: '0.875rem' }}>
              Sort By Price: High To Low
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
}
