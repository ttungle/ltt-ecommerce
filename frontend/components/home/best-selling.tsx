import { HomeBestSellingData } from '@/models';
import { Box, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ProductSlider } from '../common/products/product-slider';

export interface HomeBestSellingProps {
  HomeBestSellingData: HomeBestSellingData;
}

export function HomeBestSelling({ HomeBestSellingData }: HomeBestSellingProps) {
  const { title, description, products } = HomeBestSellingData;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Container maxWidth='xl' sx={{ pb: { lg: 12, xs: 3 } }}>
      <Box textAlign='center' sx={{ py: { lg: '64px', xs: '50px' } }}>
        <Typography
          fontSize='0.75rem'
          textTransform='uppercase'
          fontWeight={500}
          letterSpacing='0.2rem'
        >
          {description}
        </Typography>
        <Typography
          fontSize={{ lg: '2.5rem', xs: '2rem' }}
          fontFamily='Cormorant Garamond'
          fontWeight='600'
        >
          {title}
        </Typography>
      </Box>
      <ProductSlider
        identifier={title.replace(/\s/g, '')}
        productsData={products?.data ?? []}
        itemNumber={isMobile ? 2 : 4}
      />
    </Container>
  );
}
