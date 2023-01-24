import { ProductSlider } from '@/components/common/products/product-slider';
import { Box, Divider, Typography } from '@mui/material';

export interface RelatedProductProps {
  relatedProductList: any;
}

export function RelatedProduct({ relatedProductList }: RelatedProductProps) {
  return (
    <>
      <Typography component='h5' fontSize='1.125rem' fontWeight={600} mt={22} mb={2}>
        Create the perfect pair
      </Typography>

      <Divider />

      <Box sx={{ mt: 5 }}>
        <ProductSlider productsData={relatedProductList ?? []} itemNumber={4} />
      </Box>
    </>
  );
}
