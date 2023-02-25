import { useAppSelector } from '@/app/hooks';
import { cartTotalSelector } from '@/app/selectors/cart-selector';
import { GLOBAL_PATHs } from '@/constant';
import { CartTotalData } from '@/models';
import { formatPrice } from '@/utils';
import DiscountIcon from '@mui/icons-material/Discount';
import { Button, Card, CardActions, CardContent, Divider, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { ContainedButton } from '../common/custom-button';
import { CustomInputField } from '../common/form-controls';

export interface CartTotalProps {
  cartTotalData: CartTotalData;
}

export function CartTotal({ cartTotalData }: CartTotalProps) {
  const router = useRouter();
  const [showPromotionInput, setShowPromotionInput] = useState(false);
  const cartItemTotalPrice = useAppSelector(cartTotalSelector);

  const form = useForm<FieldValues>({
    defaultValues: {
      promotion: '',
    },
  });
  const {
    handleSubmit,
    formState: { isDirty },
  } = form;

  const toggleShowPromotionInput = () => {
    setShowPromotionInput(!showPromotionInput);
  };

  const handlePromotionSubmit = (value: FieldValues) => {};

  const handleCheckoutClick = () => {
    router.push(GLOBAL_PATHs.checkout);
  };

  return (
    <>
      <Card sx={{ minWidth: 275, boxShadow: 'none', borderRadius: '2px' }}>
        <Typography component='h4' fontWeight={700} py={2.5} pl={2} fontSize='1rem'>
          {cartTotalData?.cartTotalTitle}
        </Typography>
        <Divider />

        <CardContent>
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Typography>{cartTotalData?.cartSubtotal}</Typography>
            <Typography fontWeight={600}>{formatPrice(cartItemTotalPrice)}</Typography>
          </Stack>

          <Stack direction='row' alignItems='center' justifyContent='space-between' mt={2}>
            <Typography>{cartTotalData?.cartPromotion}</Typography>
            <Button disableRipple startIcon={<DiscountIcon />} onClick={toggleShowPromotionInput}>
              {showPromotionInput
                ? cartTotalData?.cartPromotionButtonHide
                : cartTotalData?.cartPromotionButtonShow}
            </Button>
          </Stack>

          {showPromotionInput && (
            <Stack
              direction='row'
              component='form'
              onSubmit={handleSubmit(handlePromotionSubmit)}
              width='100%'
              mt={1}
            >
              <CustomInputField
                form={form}
                name='promotion'
                label=''
                placeholder='Enter promotion code'
                sx={{ p: 0 }}
              />
              <ContainedButton type='submit' disabled={!isDirty}>
                Apply
              </ContainedButton>
            </Stack>
          )}
        </CardContent>

        <Divider />

        <CardContent>
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Typography fontWeight={700}>{cartTotalData?.cartTotalPrice}</Typography>
            <Typography fontWeight={700} fontSize='1.125rem'>
              {formatPrice(cartItemTotalPrice)}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <ContainedButton fullWidth onClick={handleCheckoutClick} sx={{ py: 1.5, mx: 1, mb: 1 }}>
            {cartTotalData?.cartCheckoutButton}
          </ContainedButton>
        </CardActions>
      </Card>
    </>
  );
}
