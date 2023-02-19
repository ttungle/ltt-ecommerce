import { DeliveryMethodData } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { DeliveryMethodToggle } from './delivery-method-toggle';
import { ContactInformationForm } from './forms/contact-information-form';
import { DeliveryMethodForm } from './forms/delivery-method-form';
import { PaymentMethod } from './payment-method';

export interface CheckoutFormProps {}

export function CheckoutForm(props: CheckoutFormProps) {
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryMethodData>('delivery');

  const schema = yup.object({
    name: yup.string().required('Please enter your name.'),
    phone: yup.string().required('Please enter your phone number.'),
    email: yup
      .string()
      .email('Please enter your valid email.')
      .required('Please provide your email.'),
    city:
      selectedDelivery === 'delivery' ? yup.string().required('Please enter city') : yup.string(),
    address:
      selectedDelivery === 'delivery'
        ? yup.string().required('Please enter your address.')
        : yup.string(),
  });

  const form = useForm<FieldValues>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      city: '',
      address: '',
      zipCode: '',
      shipping: '0',
    },
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = form;

  const handleFormSubmit = (values: FieldValues) => {
    console.log('>>> Checkout values: ', values);
  };

  const handleDeliveryMethodSelect = (value: DeliveryMethodData) => {
    setSelectedDelivery(value);
  };

  return (
    <>
      <Typography variant='h6' component='h6' fontWeight={500} mb={2}>
        1. Contact Information
      </Typography>

      <Box id='checkout-form' component='form' onSubmit={handleSubmit(handleFormSubmit)}>
        <ContactInformationForm form={form} />

        <Typography variant='h6' component='h6' fontWeight={500} mt={2} mb={4}>
          2. Delivery Method
        </Typography>

        <DeliveryMethodToggle selected={selectedDelivery} onSelected={handleDeliveryMethodSelect} />
        {selectedDelivery === 'store' && (
          <Typography my={4}>Receive at store: 1 District, Ho Chi Minh city, Vietnam</Typography>
        )}
        {selectedDelivery === 'delivery' && <DeliveryMethodForm form={form} />}

        <Typography variant='h6' component='h6' fontWeight={500} mt={2} mb={4}>
          3. Payment Method
        </Typography>

        <PaymentMethod form={form} />
      </Box>
    </>
  );
}
