import { ProductInformation, AddToCartForm } from '@/components/shop';
import { ProductDetailThumbnail } from '@/components/shop/product-detail-thumbnail';
import { Container, Grid, Box, Typography, Divider, Stack } from '@mui/material';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { fetchAPI } from '@/utils';
import { ProductData } from '@/models';
import { FieldValues } from 'react-hook-form/dist/types';
import { ProductMoreDetailButton } from '@/components/shop/product-more-details-btn';

export interface ProductDetailPageProps {
  product: ProductData;
}

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  const handleAddToCartSubmit = (value: FieldValues) => {
    console.log('>>> Check value', {
      ...value,
      id: product.id,
      name: product.attributes.name,
      path: product.attributes.path,
    });
  };

  return (
    <Box>
      <Container sx={{ mt: 6 }}>
        <Grid container spacing={12}>
          <Grid item md={6} xs={12}>
            <ProductDetailThumbnail
              productThumbnails={product?.attributes?.thumbnails?.data ?? []}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Stack
              direction='column'
              justifyContent='center'
              height='100%'
              sx={{ transform: 'translateY(-10%)', maxWidth: '500px', margin: 'auto' }}
            >
              <ProductInformation product={product ?? {}} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
              <ProductMoreDetailButton />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;

  const productData = await fetchAPI(`/products/${query.pid}`, {
    populate: ['thumbnails'],
  });

  const product = productData.data;

  if (!product) {
    return {
      notFound: true,
    };
  }

  return { props: { product } };
};
