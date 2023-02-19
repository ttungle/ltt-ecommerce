import { PaymentMethodData } from '@/models';
import { Stack, ToggleButton, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { TbCashBanknote } from 'react-icons/tb';
import { CustomInputField } from '../common/form-controls';

export interface PaymentMethodProps {
  form: FieldValues;
}

export function PaymentMethod({ form }: PaymentMethodProps) {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodData>('cash');

  const handleToggleChange = (event: React.MouseEvent<HTMLElement>, value: any) => {
    setSelectedPayment(value);
  };

  return (
    <>
      <ToggleButton
        color='primary'
        value='mastercard'
        selected={selectedPayment === 'mastercard'}
        onChange={handleToggleChange}
        size='small'
        sx={{
          '&.Mui-selected': { border: '1px solid', borderColor: 'primary.main' },
        }}
      >
        <Image src='/mastercard.svg' alt='mastercard-svg' width={72} height={32} />
      </ToggleButton>

      <ToggleButton
        color='primary'
        value='visa'
        selected={selectedPayment === 'visa'}
        onChange={handleToggleChange}
        size='small'
        sx={{
          ml: 2,
          '&.Mui-selected': { border: '1px solid', borderColor: 'primary.main' },
        }}
      >
        <Image src='/visa.svg' alt='visa-svg' width={72} height={32} />
      </ToggleButton>

      <ToggleButton
        color='primary'
        value='cash'
        selected={selectedPayment === 'cash'}
        onChange={handleToggleChange}
        size='small'
        sx={{
          ml: 2,
          px: 3.625,
          py: 1.125,
          '&.Mui-selected': { border: '1px solid', borderColor: 'primary.main' },
        }}
      >
        <TbCashBanknote style={{ fontSize: '1.75rem' }} />
      </ToggleButton>

      {['visa', 'mastercard'].includes(selectedPayment) && (
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          flexWrap='wrap'
          my={2}
        >
          <CustomInputField
            form={form}
            name='nameOnCart'
            placeholder='Name on card'
            label=''
            sx={{ width: { lg: '48%', xs: '100%' }, my: 2 }}
          />
          <CustomInputField
            form={form}
            name='cardNumber'
            placeholder='xxxx xxxx xxxx xxxx'
            label=''
            sx={{ width: { lg: '48%', xs: '100%' }, my: 2 }}
          />
          <CustomInputField
            form={form}
            name='ccv'
            placeholder='xxx'
            label=''
            sx={{ width: { lg: '48%', xs: '100%' }, my: 2 }}
          />
          <CustomInputField
            form={form}
            name='expire'
            placeholder='mm / yy'
            label=''
            sx={{ width: { lg: '48%', xs: '100%' }, my: 2 }}
          />
        </Stack>
      )}

      {selectedPayment === 'cash' && <Typography my={4}>Deliver and receive cash.</Typography>}
    </>
  );
}
