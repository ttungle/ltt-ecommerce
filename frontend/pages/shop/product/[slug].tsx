import { shopApi } from '@/api-client';
import {
  ProductAddToCartForm,
  ProductDetailDescription,
  ProductDetailThumbnail,
  ProductInformation,
  ProductMoreDetailButton,
  ProductReviews,
  RelatedProduct,
} from '@/components/shop';
import { ProductData, ShopDetailsData } from '@/models';
import { addToCart, CartItemState } from '@/stores/cart-slice';
import { useAppDispatch } from '@/stores/hooks';
import { fetchAPI } from '@/utils';
import { Container, Grid, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useCallback } from 'react';
import { FieldValues } from 'react-hook-form/dist/types';
import { toast } from 'react-toastify';

export interface ProductDetailPageProps {
  shopDetails: ShopDetailsData;
  product: ProductData;
}

export default function ProductDetailPage({ shopDetails, product }: ProductDetailPageProps) {
  const dispatch = useAppDispatch();

  const relatedProductListQuery = useQuery({
    queryKey: [`getRelatedProduct`],
    queryFn: async () =>
      product?.attributes?.category?.data?.id &&
      (await shopApi.getProductByCatagory(product?.attributes?.category?.data?.id)),
    enabled: Boolean(product?.attributes?.category?.data?.id),
  });

  const { data: relatedProductList } = relatedProductListQuery;

  const handleAddToCartSubmit = useCallback(
    (value: FieldValues) => {
      const cartItem = {
        ...value,
        id: product.id,
        product: product.attributes,
      } as CartItemState;

      const action = addToCart(cartItem);

      dispatch(action);
    },
    [product]
  );

  const handleReviewFormSubmit = async (values: FieldValues) => {
    try {
      const payload = {
        ...values,
        product: product?.id,
      };

      await shopApi.createProductReviewComment(payload);
      toast.success('Your review has been submitted. Thank you.');
    } catch (error) {
      console.log(error);
      toast.success('Opps! Something went wrong. Please try again.');
    }
  };

  return (
    <>
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
              <ProductAddToCartForm
                categoryData={product?.attributes?.category}
                sizeSelectionData={shopDetails?.attributes?.sizeSelection}
                onSubmit={handleAddToCartSubmit}
              />
              <ProductMoreDetailButton />
            </Stack>
          </Grid>
        </Grid>

        <ProductDetailDescription data={product?.attributes?.detailDescription ?? ''} />
        {relatedProductList && (
          <RelatedProduct
            relatedProductList={relatedProductList?.data?.attributes?.products?.data}
          />
        )}
        <ProductReviews
          productReviewSectionData={shopDetails?.attributes?.productReviewSection ?? []}
          productReviewsList={product?.attributes?.productReviews?.data ?? []}
          onReviewFormSubmit={handleReviewFormSubmit}
        />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;

  const productData = await fetchAPI(`/products/${query.pid}`, {
    populate: ['thumbnails', 'category.sizeSelectionList', 'productReviews.reviewer'],
  });
  const shopDetailsPage = await fetchAPI(`/shop-details-page`, {
    populate: ['metadata.shareImage', 'sizeSelection', 'productReviewSection'],
  });

  const product = productData.data;
  const shopDetails = shopDetailsPage.data;

  if (!product || !shopDetails) {
    return {
      notFound: true,
    };
  }

  return { props: { product, shopDetails } };
};
