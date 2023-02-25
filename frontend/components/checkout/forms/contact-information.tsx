import { CustomInputField } from '@/components/common/form-controls';
import { Stack } from '@mui/material';
import * as React from 'react';
import { FieldValues } from 'react-hook-form';

export interface ContactInformationFormProps {
  form: FieldValues;
}

export function ContactInformationForm({ form }: ContactInformationFormProps) {
  return (
    <>
      <Stack direction='row' justifyContent='space-between' alignItems='center' flexWrap='wrap'>
        <CustomInputField
          form={form}
          name='name'
          placeholder='Name'
          label=''
          sx={{ width: { lg: '48%', xs: '100%' }, my: 2 }}
        />
        <CustomInputField
          form={form}
          name='phone'
          placeholder='Phone'
          label=''
          sx={{ width: { lg: '48%', xs: '100%' }, my: 2 }}
        />
        <CustomInputField
          form={form}
          name='email'
          placeholder='Email'
          label=''
          sx={{ width: { lg: '48%', xs: '100%' }, my: 2 }}
        />
      </Stack>
    </>
  );
}
