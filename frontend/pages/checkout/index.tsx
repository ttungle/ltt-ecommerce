import { checkoutApi } from '@/api-client/checkout-api';
import { CheckoutForm } from '@/components/checkout';
import { OrderSummary } from '@/components/checkout/order-summary';
import { CircularLoader } from '@/components/common/loader';
import { GLOBAL_PATHs } from '@/constant';
import { Backdrop, Container, Grid, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FieldValues } from 'react-hook-form';

export interface CheckoutPageProps {}

export default function CheckoutPage(props: CheckoutPageProps) {
  const router = useRouter();

  const checkoutPageQuery = useQuery({
    queryKey: ['checkoutPage'],
    queryFn: async () => checkoutApi.getCheckoutPage(),
  });

  const { data: checkoutPage, isLoading } = checkoutPageQuery;

  const mutation = useMutation({
    mutationFn: (values: FieldValues) => {
      return checkoutApi.createCheckoutSession(values);
    },
    onSuccess: (data) => {
      if (data?.stripeSession?.url) {
        window.open(data.stripeSession.url, '_self');
      }

      if (!data?.stripeSession && data?.status === 'success') {
        router.push(GLOBAL_PATHs.checkoutSuccess);
      }
    },
    onError: (error) => {
      router.push(GLOBAL_PATHs.checkoutError);
    },
  });

  const handleCheckoutSubmit = async (payload: FieldValues) => {
    mutation.mutate(payload);
  };

  return (
    <>
      <Container>
        <Grid container spacing={{ lg: 12, xs: 1 }}>
          <Grid item lg={8} xs={12}>
            <Typography component='h2' variant='h5' my={5} fontWeight={700}>
              {checkoutPage?.data?.attributes?.checkoutContent?.checkoutHeader ?? 'Checkout'}
            </Typography>
            <CheckoutForm
              onSubmit={handleCheckoutSubmit}
              textContent={checkoutPage?.data?.attributes?.checkoutContent}
            />
          </Grid>
          <Grid item lg={4} xs={12}>
            <OrderSummary textContent={checkoutPage?.data?.attributes?.checkoutContent} />
          </Grid>
        </Grid>
      </Container>

      <Backdrop sx={{ color: 'common.white' }} open={mutation?.isLoading || isLoading}>
        <CircularLoader loaderContent='Processing' />
      </Backdrop>
    </>
  );
}
