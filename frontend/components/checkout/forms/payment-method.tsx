import { PaymentMethodData } from '@/models';
import { ToggleButton, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { TbCashBanknote } from 'react-icons/tb';

export interface PaymentMethodProps {
  form: FieldValues;
}

export function PaymentMethod({ form }: PaymentMethodProps) {
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodData>('cash');

  const handleToggleChange = (event: React.MouseEvent<HTMLElement>, value: any) => {
    setSelectedPayment(value);
    form.setValue('paymentMethod', value);
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

      {selectedPayment === 'cash' && <Typography my={4}>Deliver and receive cash.</Typography>}
    </>
  );
}
