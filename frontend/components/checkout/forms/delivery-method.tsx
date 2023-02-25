import { CustomInputField } from '@/components/common/form-controls';
import { Stack } from '@mui/material';
import { FieldValues } from 'react-hook-form';
import { ShippingRadioField } from '../shipping-radio-field';

export interface DeliveryMethodFormProps {
  form: FieldValues;
}

export function DeliveryMethodForm({ form }: DeliveryMethodFormProps) {
  return (
    <>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='stretch'
        flexWrap='wrap'
        mt={2}
      >
        <CustomInputField
          form={form}
          name='city'
          placeholder='City'
          label=''
          sx={{ width: { lg: '48%', xs: '100%' }, my: 2 }}
        />
        <CustomInputField
          form={form}
          name='address'
          placeholder='Address'
          label=''
          sx={{ width: { lg: '48%', xs: '100%' }, my: 2 }}
        />
        <CustomInputField
          form={form}
          name='zipCode'
          placeholder='Zip Code'
          label=''
          sx={{ width: { lg: '48%', xs: '100%' }, my: 2 }}
        />
      </Stack>

      <ShippingRadioField form={form} name='shipping' />
    </>
  );
}
