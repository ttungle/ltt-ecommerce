import { useAppSelector } from '@/app/hooks';
import { cartTotalSelector } from '@/app/selectors/cart-selector';
import { shippingFeeSelector } from '@/app/selectors/checkout-selector';
import { CheckoutTextContentData } from '@/models';
import { formatPrice } from '@/utils';
import { Card, CardActions, CardContent, Divider, Paper, Stack, Typography } from '@mui/material';
import { MdOutlineArrowRightAlt } from 'react-icons/md';
import { ContainedButton } from '../common/custom-button';

export interface OrderSummaryProps {
  textContent: CheckoutTextContentData;
}

export function OrderSummary({ textContent }: OrderSummaryProps) {
  const cartItemTotalPrice = useAppSelector(cartTotalSelector);
  const shippingFee = useAppSelector(shippingFeeSelector);
  const discount = 0;
  const total = Number(shippingFee) + Number(cartItemTotalPrice) - Number(discount);
  return (
    <Paper sx={{ my: { lg: 5, xs: 0 }, mb: { xs: 5 } }} variant='outlined'>
      <Card sx={{ minWidth: 275, boxShadow: 'none', borderRadius: '2px' }}>
        <Typography component='h4' fontWeight={700} py={2.5} pl={2} fontSize='1.125rem'>
          {textContent?.orderHeader ?? 'Order'}
        </Typography>

        <Divider />

        <CardContent>
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Typography>Subtotal</Typography>
            <Typography fontWeight={600}>{formatPrice(cartItemTotalPrice)}</Typography>
          </Stack>

          <Stack direction='row' alignItems='center' justifyContent='space-between' my={2}>
            <Typography>Discount</Typography>
            <Typography fontWeight={600}>{formatPrice(discount)}</Typography>
          </Stack>

          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Typography>Shipping</Typography>
            <Typography fontWeight={600}>{formatPrice(shippingFee)}</Typography>
          </Stack>
        </CardContent>

        <Divider />

        <CardContent>
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Typography fontWeight={700}>Total due</Typography>
            <Typography fontWeight={700} fontSize='1.125rem'>
              {formatPrice(total)}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <ContainedButton
            type='submit'
            form='checkout-form'
            fullWidth
            sx={{ py: 1.5, mx: 1, mb: 1 }}
          >
            {textContent?.orderButton ?? 'Place Order'}
            <MdOutlineArrowRightAlt style={{ marginLeft: '8px', fontSize: '1.25rem' }} />
          </ContainedButton>
        </CardActions>
      </Card>
    </Paper>
  );
}
