import { CustomInputField } from '@/components/common/form-controls';
import { CheckoutTextContentData } from '@/models';
import { Stack } from '@mui/material';
import { FieldValues } from 'react-hook-form';
import { ShippingRadioField } from '../shipping-radio-field';

export interface DeliveryMethodFormProps {
  form: FieldValues;
  textContent: CheckoutTextContentData;
}

export function DeliveryMethodForm({ form, textContent }: DeliveryMethodFormProps) {
  const radioData = [
    {
      label: textContent?.shippingRadio1 ?? 'Free shipping (5-15 business days)',
      value: '0',
    },
    {
      label: textContent?.shippingRadio2 ?? 'Fast shipping (1-5 business days)',
      value: '5',
    },
  ];

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

      <ShippingRadioField form={form} name='shipping' data={radioData} />
    </>
  );
}
