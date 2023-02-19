import { CheckoutForm } from '@/components/checkout';
import { OrderSummary } from '@/components/checkout/order-summary';
import { Container, Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';

export interface CheckoutPageProps {}

export default function CheckoutPage(props: CheckoutPageProps) {
  return (
    <Container>
      <Grid container spacing={{ lg: 12, xs: 1 }}>
        <Grid item lg={8} xs={12}>
          <Typography component='h2' variant='h5' my={5} fontWeight={700}>
            Checkout
          </Typography>
          <CheckoutForm />
        </Grid>
        <Grid item lg={4} xs={12}>
          <OrderSummary />
        </Grid>
      </Grid>
    </Container>
  );
}
