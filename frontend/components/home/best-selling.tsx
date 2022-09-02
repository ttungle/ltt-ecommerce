import { HomeBestSellingData } from '@/models';
import { Box, Container, Typography } from '@mui/material';
import { ProductSlider } from '../common/products/product-slider';

export interface HomeBestSellingProps {
  HomeBestSellingData: HomeBestSellingData;
}

export function HomeBestSelling({ HomeBestSellingData }: HomeBestSellingProps) {
  const { title, description, products } = HomeBestSellingData;

  return (
    <Container maxWidth='xl' sx={{ pb: 12 }}>
      <Box textAlign='center' sx={{ py: '64px' }}>
        <Typography
          fontSize='0.75rem'
          textTransform='uppercase'
          fontWeight={500}
          letterSpacing='0.2rem'
        >
          {description}
        </Typography>
        <Typography fontSize='2.5rem' fontFamily='Cormorant Garamond' fontWeight='600'>
          {title}
        </Typography>
      </Box>
      <ProductSlider productsData={products?.data ?? []} itemNumber={4} />
    </Container>
  );
}
