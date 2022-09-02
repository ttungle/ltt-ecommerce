import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import * as React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

export interface ProductActionsProps {}

export function ProductActions(props: ProductActionsProps) {
  return (
    <Stack
      className='product-buttons'
      direction='column'
      alignItems='center'
      justifyContent='space-between'
      sx={{
        display: 'none',
        position: 'absolute',
        bottom: '12%',
        right: 0,
        p: 1,
        zIndex: 1,
      }}
    >
      <Tooltip title='Add to favorite' placement='right-start'>
        <IconButton
          size='large'
          sx={{
            borderRadius: '2px',
            bgcolor: 'common.white',
            mb: 1,
            transform: 'scale(0.9)',
            opacity: 0.75,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1)',
              opacity: 1,
              bgcolor: 'common.white',
            },
          }}
        >
          <FavoriteIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title='Add to cart' placement='right-start'>
        <IconButton
          size='large'
          sx={{
            borderRadius: '2px',
            bgcolor: 'common.white',
            transform: 'scale(0.9)',
            opacity: 0.75,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1)',
              opacity: 1,
              bgcolor: 'common.white',
            },
          }}
        >
          <ShoppingBagIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
