import { useAppDispatch } from '@/app/hooks';
import { setShippingFee } from '@/app/slices/checkout-slice';
import { ShippingOptionRadioData } from '@/models';
import { FormControl, FormControlLabel, Radio, RadioGroup, SxProps } from '@mui/material';
import * as React from 'react';
import { Controller, FieldValues } from 'react-hook-form';

export interface ShippingRadioFieldProps {
  form: FieldValues;
  name: string;
  disabled?: boolean;
  sx?: SxProps;
  data: Array<ShippingOptionRadioData>;
}

export function ShippingRadioField(props: ShippingRadioFieldProps) {
  const { name, form, disabled = false, sx = {}, data } = props;
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
              {data.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={item?.value}
                  control={<Radio />}
                  label={item?.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      />
    </>
  );
}
