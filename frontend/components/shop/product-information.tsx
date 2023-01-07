import * as React from 'react';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { ProductData } from '@/models';
import { formatPrice } from '@/utils';
import { useRouter } from 'next/router';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export interface ProductInformationProps {
  product: ProductData;
}

export function ProductInformation({ product }: ProductInformationProps) {
  const { name, code, salePrice, originalPrice, description } = product.attributes;
  const router = useRouter();
  return (
    <>
      {product && (
        <>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Typography fontSize='0.875rem' fontWeight={500}>
              {code}
            </Typography>
            <IconButton size='small'>
              <FavoriteBorderIcon sx={{ fontSize: '1.25rem' }} />
            </IconButton>
          </Stack>

          <Typography fontSize={{ md: '1.75rem', xs: '1.25rem' }} fontWeight={500} mb={1}>
            {name}
          </Typography>

          <Typography mb={2} fontSize='0.875rem'>
            {description}
          </Typography>

          <Typography fontSize='1.125rem' fontWeight={600} mb={2}>
            {formatPrice(Number(salePrice), router?.locale ?? 'en')}
          </Typography>
        </>
      )}
    </>
  );
}
