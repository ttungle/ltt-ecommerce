import { ProductData } from '@/models';
import { Box, Grid } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
import { Product } from './product';

export interface ProductListProps {
  grid: number;
  productsData: Array<ProductData>;
}

export function ProductList({ productsData, grid }: ProductListProps) {
  return (
    <Grid container spacing={3}>
      {productsData &&
        productsData.map((product) => (
          <Grid item key={product?.id as React.Key} md={grid} mb={5}>
            <Link href={`/shop/product/${product?.attributes?.path}?pid=${product?.id}`}>
              <Box component='a'>
                <Product productData={product} />
              </Box>
            </Link>
          </Grid>
        ))}
    </Grid>
  );
}
