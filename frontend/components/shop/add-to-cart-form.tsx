import { Box, Divider, Typography, Stack, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import { ContainedButton, OutLinedButton } from '../common/custom-button';
import { QuantityField } from '../common/form-controls';
import { SizeSelectField } from '../common/form-controls/size-select-field';
import { ProductSizeSelection } from './product-size-selection';
import SquareFootIcon from '@mui/icons-material/SquareFoot';

export interface AddToCartFormProps {
  onSubmit: (value: any) => void;
}

export function AddToCartForm({ onSubmit }: AddToCartFormProps) {
  const form = useForm<FieldValues>({
    defaultValues: {
      quantity: 1,
      size: '',
    },
  });

  const { handleSubmit } = form;

  const handleFormSubmit = (value: FieldValues) => {
    if (!onSubmit) return;

    onSubmit(value);
  };

  return (
    <Box component='form' onSubmit={handleSubmit(handleFormSubmit)}>
      <Divider sx={{ mb: 1 }} />
      <ProductSizeSelection form={form} label='Select Size' name='size' placeholder='' />
      <Divider sx={{ mt: 1, mb: 1 }} />

      <Stack
        direction='row'
        justifyContent='flex-end'
        alignItems='center'
        sx={{ mb: 1, '&:hover': { cursor: 'pointer', color: 'primary.main' } }}
      >
        <SquareFootIcon sx={{ fontSize: '1.25rem', mr: 0.5 }} />
        <Typography fontSize='0.875rem' sx={{ my: 'auto' }}>
          Size Guide
        </Typography>
      </Stack>

      <QuantityField
        form={form}
        label=''
        name='quantity'
        placeholder=''
        sx={{ width: '72px', mb: 2 }}
      />

      <ContainedButton
        type='submit'
        fullWidth
        sx={{ py: 1.5, fontSize: { md: '0.875rem', xs: '0.75rem' } }}
      >
        Add To Cart
      </ContainedButton>
      <OutLinedButton
        fullWidth
        sx={{
          mt: 2,
          py: 1.5,
          fontSize: { md: '0.875rem', xs: '0.75rem' },
          borderColor: 'common.black',
          color: 'common.black',
        }}
      >
        Buy Now
      </OutLinedButton>
    </Box>
  );
}
