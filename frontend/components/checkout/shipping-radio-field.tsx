import { useAppDispatch } from '@/app/hooks';
import { setShippingFee } from '@/app/slices/checkout-slice';
import { FormControl, FormControlLabel, Radio, RadioGroup, SxProps } from '@mui/material';
import * as React from 'react';
import { Controller, FieldValues } from 'react-hook-form';

export interface ShippingRadioFieldProps {
  form: FieldValues;
  name: string;
  disabled?: boolean;
  sx?: SxProps;
}

export function ShippingRadioField(props: ShippingRadioFieldProps) {
  const { name, form, disabled = false, sx = {} } = props;
  const dispatch = useAppDispatch();
  const { control } = form;

  const handleChange = (event: any) => {
    form.setValue(name, event.target?.value);
    dispatch(setShippingFee({ shippingFee: event.target?.value }));
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState, formState }) => (
          <FormControl onChange={handleChange} disabled={disabled} sx={{ ...sx }}>
            <RadioGroup row {...field} value={form.getValues(name.toString())}>
              <FormControlLabel
                value='0'
                control={<Radio />}
                label='Free shipping (5-15 business days)'
              />
              <FormControlLabel
                value='5'
                control={<Radio />}
                label='Fast shipping (1-5 business days)'
              />
            </RadioGroup>
          </FormControl>
        )}
      />
    </>
  );
}
