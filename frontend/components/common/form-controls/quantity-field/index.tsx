import { OutlinedInput, SxProps, Theme } from '@mui/material';
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
  sx?: SxProps<Theme>;
}

export function QuantityField(props: QuantityFieldProps) {
  const { name, label, placeholder, form, disabled = false, sx = {} } = props;
  const { control, getValues, setValue } = form;
  const [displayValue, setDisplayValue] = useState<number | undefined>(
    () => getValues('quantity') * 1
  );

  const handleIncreaseQuantity = (name: string, value: string) => {
    const quantityValue = Number.parseInt(value) ? Number.parseInt(value) + 1 : 1;
    setValue(name, quantityValue);
    setDisplayValue(quantityValue);
  };

  const handleDecreaseQuantity = (name: string, value: string) => {
    const quantityValue = Number.parseInt(value) ? Number.parseInt(value) - 1 : 1;
    if (quantityValue < 1) return;
    setValue(name, quantityValue);
    setDisplayValue(quantityValue);
  };

  const handleQuantityChange = (event: any) => {
    let positiveValue;
    if (Boolean(event.target.value)) {
      positiveValue = Math.abs(Number.parseInt(event.target.value));
    }

    setValue(name, positiveValue ? positiveValue : 1);
    setDisplayValue(positiveValue !== 0 ? positiveValue : 1);
  };

  // Set value to 1 if value in input invalid.
  const handleQuantityBlur = (event: any) => {
    const value = Number.parseInt(event.target.value);
    if (!Boolean(value) || value < 1) {
      setValue(name, 1);
      setDisplayValue(1);
    }
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState, formState }) => (
          <>
            <OutLinedButton
              disabled={Number.parseInt(field.value) <= 1}
              onClick={() => handleDecreaseQuantity(name, field.value)}
              sx={{ borderRight: 'none', borderColor: 'grey.500', color: 'grey.800' }}
            >
              -
            </OutLinedButton>

            <OutlinedInput
              {...field}
              size='small'
              type='number'
              label={label}
              disabled={disabled}
              value={displayValue}
              placeholder={placeholder}
              onBlur={handleQuantityBlur}
              onChange={handleQuantityChange}
              error={Boolean(fieldState.error)}
              sx={{
                '&.MuiOutlinedInput-root': { borderRadius: 0 },
                '& input': { fontSize: '0.875rem', py: 0.85 },
                ...sx,
              }}
            />

            <OutLinedButton
              onClick={() => handleIncreaseQuantity(name, field.value)}
              sx={{ borderLeft: 'none', borderColor: 'grey.500', color: 'grey.800' }}
            >
              +
            </OutLinedButton>
          </>
        )}
      />
    </>
  );
}
