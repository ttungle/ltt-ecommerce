import { cartApi } from '@/api-client/cart-api';
import { useAppSelector } from '@/app/hooks';
import { cartItemCountSelector } from '@/app/selectors/cart-selector';
import { CartList, CartTotal } from '@/components/cart';
import { ContainedButton } from '@/components/common/custom-button';
import { GLOBAL_PATHs } from '@/constant';
import { Container, Grid, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function CartPage() {
  const router = useRouter();
  const cartItemTotalCount = useAppSelector(cartItemCountSelector);

  const cartPageQuery = useQuery({
    queryKey: [`getCartPage`],
    queryFn: async () => await cartApi.getCartPage(),
  });

  const { data: cartPageData, isLoading } = cartPageQuery;

  return (
    <>
      {!isLoading && cartPageData && (
        <Container>
          <Typography
            component='h2'
            fontSize={{ lg: '1.4rem', xs: '1.125rem' }}
            my={{ lg: 5, xs: 3 }}
            fontWeight={700}
          >
            {`${cartPageData?.data?.attributes?.pageHeader ?? ''}`}
            {cartItemTotalCount > 0 ? ` (${cartItemTotalCount})` : ''}
          </Typography>

          {cartItemTotalCount > 0 && (
            <Grid container spacing={5}>
              <Grid item lg={8.5} xs={12}>
                <CartList cartTableData={cartPageData?.data?.attributes?.cartTable} />
              </Grid>
              <Grid item lg={3.5} xs={12} mb={5}>
                <CartTotal cartTotalData={cartPageData?.data?.attributes?.cartTotal} />
              </Grid>
            </Grid>
          )}

          {cartItemTotalCount <= 0 && (
            <Stack direction='column' alignItems='center' justifyContent='center'>
              <Typography fontSize='1rem' my={3}>
                There are no products in your shopping cart.
              </Typography>
              <ContainedButton size='large' onClick={() => router.push(GLOBAL_PATHs.shop)}>
                Continue shopping
              </ContainedButton>
            </Stack>
          )}
        </Container>
      )}

      {!isLoading && !cartPageData && (
        <Typography>Opps! Something went wrong. Please contact admin.</Typography>
      )}
    </>
  );
}
