import { CartItemState, setQuantity } from '@/stores/cart-slice';
import { useAppDispatch } from '@/stores/hooks';
import { Box } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { QuantityField } from '../common/form-controls';

export interface CartQuantityFormProps {
  productCartData: CartItemState;
}

export function CartQuantityForm({ productCartData }: CartQuantityFormProps) {
  const dispatch = useAppDispatch();
  const form = useForm<FieldValues>({
    defaultValues: {
      quantity: productCartData?.quantity,
    },
  });

  const handleQuantityChange = (value: number) => {
    console.log('>>> Check values: ', value);
    const actionPayload: CartItemState = {
      ...productCartData,
      id: productCartData?.id,
      quantity: value,
      size: productCartData?.size,
    };

    const action = setQuantity(actionPayload);
    dispatch(action);
  };

  return (
    <Box component='form'>
      <QuantityField
        form={form}
        name='quantity'
        label=''
        placeholder=''
        maxQuantity={1000}
        onQuantityChange={handleQuantityChange}
        sx={{ '& input': { maxWidth: '38px' } }}
      />
    </Box>
  );
}
