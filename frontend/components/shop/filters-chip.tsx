import * as React from 'react';
import { Box, Chip } from '@mui/material';

export interface ShopFilterChipProps {}

export function ShopFilterChip(props: ShopFilterChipProps) {
  const handleDelete = () => {};
  return (
    <Box sx={{ my: 3 }}>
      <Chip label='Deletable' size='small' onDelete={handleDelete} sx={{ mr: 1 }} />
    </Box>
  );
}
