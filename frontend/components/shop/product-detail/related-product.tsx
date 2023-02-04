import { ProductSlider } from '@/components/common/products/product-slider';
import { Box, Divider, Typography, useMediaQuery } from '@mui/material';

export interface RelatedProductProps {
  relatedProductList: any;
}

export function RelatedProduct({ relatedProductList }: RelatedProductProps) {
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  return (
    <>
      <Typography
        component='h5'
        fontSize={{ md: '1.125rem', xs: '1rem' }}
        fontWeight={600}
        mt={22}
        mb={2}
      >
        Create the perfect pair
      </Typography>

      <Divider />

      <Box sx={{ mt: 5, overflow: { xs: 'hidden', md: 'visible' } }}>
        <ProductSlider productsData={relatedProductList ?? []} itemNumber={matches ? 4 : 2} />
      </Box>
    </>
  );
}
