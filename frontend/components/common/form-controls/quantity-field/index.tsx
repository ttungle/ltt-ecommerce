import { FormControl, OutlinedInput, Stack, SxProps, Theme } from '@mui/material';
import { useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types';
import { OutLinedButton } from '../../custom-button';

export interface QuantityFieldProps {
  name: string;
  label: string;
  form: UseFormReturn<FieldValues, object>;
  disabled?: boolean;
  placeholder: string;
  maxQuantity?: number;
  onQuantityChange?: (value: number) => void;
  sx?: SxProps<Theme>;
}

export function QuantityField(props: QuantityFieldProps) {
  const {
    name,
    label,
    placeholder,
    form,
    disabled = false,
    sx = {},
    maxQuantity,
    onQuantityChange,
  } = props;
  const { control, getValues, setValue } = form;
  // const [displayValue, setDisplayValue] = useState<number | undefined>(
  //   () => getValues('quantity') * 1
  // );

  const handleIncreaseQuantity = (name: string, value: string) => {
    let quantityValue = Number.parseInt(value) ? Number.parseInt(value) + 1 : 1;
    if (maxQuantity && quantityValue > maxQuantity) quantityValue = maxQuantity;
    setValue(name, quantityValue);
    if (onQuantityChange) onQuantityChange(quantityValue);
  };

  const handleDecreaseQuantity = (name: string, value: string) => {
    const quantityValue = Number.parseInt(value) ? Number.parseInt(value) - 1 : 1;
    if (quantityValue < 1) return;
    setValue(name, quantityValue);
    if (onQuantityChange) onQuantityChange(quantityValue);
  };

  const handleQuantityChange = (event: any) => {
    let positiveValue;
    if (Boolean(event.target.value)) {
      positiveValue = Math.abs(Number.parseInt(event.target.value));
      if (maxQuantity && positiveValue > maxQuantity) positiveValue = maxQuantity;
    }

    setValue(name, positiveValue ? positiveValue : 1);
    if (onQuantityChange) onQuantityChange(positiveValue ? positiveValue : 1);
  };

  // Set value to 1 if value in input invalid.
  const handleQuantityBlur = (event: any) => {
    const value = Number.parseInt(event.target.value);
    if (!Boolean(value) || value < 1) {
      setValue(name, 1);
    }
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState, formState }) => (
          <Stack direction='row' justifyContent='flex-start' alignItems='center' sx={{ ...sx }}>
            <OutLinedButton
              disabled={Number.parseInt(field.value) <= 1}
              onClick={() => handleDecreaseQuantity(name, field.value)}
              sx={{
                borderRadius: 0,
                borderRight: 'none',
                borderColor: 'grey.400',
                color: 'grey.800',
                minWidth: 42,
              }}
            >
              -
            </OutLinedButton>

            <OutlinedInput
              {...field}
              size='small'
              type='number'
              label={label}
              disabled={disabled}
              placeholder={placeholder}
              onBlur={handleQuantityBlur}
              onChange={handleQuantityChange}
              error={Boolean(fieldState.error)}
              sx={{
                '&.MuiOutlinedInput-root': { borderRadius: 0 },
                '& input': { fontSize: '0.875rem', py: 0.85 },
              }}
            />

            <OutLinedButton
              onClick={() => handleIncreaseQuantity(name, field.value)}
              sx={{
                borderRadius: 0,
                borderLeft: 'none',
                borderColor: 'grey.400',
                color: 'grey.800',
                minWidth: 42,
              }}
            >
              +
            </OutLinedButton>
          </Stack>
        )}
      />
    </>
  );
}
