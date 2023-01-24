import { FormControl, FormHelperText, Rating, SxProps, Theme, Typography } from '@mui/material';
import * as React from 'react';
import { Controller } from 'react-hook-form';

export interface RatingFieldProps {
  name: string;
  label: string;
  form: any;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

export function RatingField(props: RatingFieldProps) {
  const { name, label, form, disabled = false, sx = {} } = props;
  const { control } = form;
  return (
    <>
      <Typography mb={1} fontWeight={500}>
        {label}
      </Typography>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState, formState }) => (
          <FormControl>
            <Rating {...field} disabled={disabled} size='large' sx={{ ...sx }} />
            <FormHelperText sx={{ color: 'error.main' }}>
              {fieldState.error?.message}
            </FormHelperText>
          </FormControl>
        )}
      />
    </>
  );
}
