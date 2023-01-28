import { CartList, CartTotal } from '@/components/cart';
import { Box, Container, Grid, Typography } from '@mui/material';

export interface CartPageProps {}

export default function CartPage(props: CartPageProps) {
  return (
    <>
      <Container>
        <Typography component='h2' variant='h5' my={5} fontWeight={600}>
          Shopping Cart
        </Typography>

        <Grid container spacing={10}>
          <Grid item xs={9}>
            <CartList />
          </Grid>
          <Grid item xs={3}>
            <CartTotal />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
