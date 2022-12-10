import { ProductFiltersValue } from '@/models';
import { Box, Chip } from '@mui/material';
import { useMemo } from 'react';
import { FILTER_LIST } from './filters-viewer.routes';

export interface ShopFilterViewerProps {
  filters: any;
  onChange: (newFilters: ProductFiltersValue | undefined) => void;
}

export function ShopFilterViewer({ filters, onChange }: ShopFilterViewerProps) {
  const visibleFilters: any[] = FILTER_LIST.filter((filterItem) => filterItem.isVisible(filters));
  const chipLabelList = visibleFilters
    .map((filterItem) =>
      filterItem.getLabel(filters).map((filterValue: string) => `${filterItem.type}_${filterValue}`)
    )
    .flat();
  const chipLabelListLength = useMemo(() => chipLabelList.length || 0, [chipLabelList]);

  const handleDelete = (currentChipItem: string) => {
    if (!onChange) return;

    const currentFilters = { ...filters };

    const chipFilterValue = currentChipItem.split('_');
    const filter = FILTER_LIST.find((item) => item.type === chipFilterValue[0]);
    const newFilters = filter?.onRemove(currentFilters, chipFilterValue[1]);

    onChange(newFilters);
  };

  return (
    <Box sx={{ my: chipLabelListLength > 0 ? 3 : 6 }}>
      {chipLabelListLength > 0 &&
        chipLabelList.map((chipItem, index) => (
          <Chip
            key={index}
            label={chipItem.substring(chipItem.indexOf('_') + 1) ?? ''}
            size='small'
            onDelete={() => handleDelete(chipItem)}
            sx={{ mr: 1 }}
          />
        ))}
    </Box>
  );
}
