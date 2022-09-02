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
    <Grid container>
      {productsData &&
        productsData.map((product) => (
          <Grid item key={product?.id as React.Key} md={grid}>
            <Link href={`shop/${product?.attributes?.path}`}>
              <Box component='a'>
                <Product productData={product} />
              </Box>
            </Link>
          </Grid>
        ))}
    </Grid>
  );
}
