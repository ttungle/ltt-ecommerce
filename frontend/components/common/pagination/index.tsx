import * as React from 'react';
import { Stack, Pagination } from '@mui/material';
import { PaginationData } from '@/models';

export interface ListPaginationProps {
  pagination: PaginationData;
  onPageChange: (value: number) => void;
}

export function ListPagination({ pagination, onPageChange }: ListPaginationProps) {
  const { page = 0, pageCount } = pagination;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    if (!onPageChange) return;
    onPageChange(value);
  };

  return (
    <Stack direction='row' justifyContent='center' alignItems='center' spacing={2} mt={8} mb={12}>
      <Pagination count={pageCount} page={page} shape='rounded' onChange={handleChange} />
    </Stack>
  );
}
