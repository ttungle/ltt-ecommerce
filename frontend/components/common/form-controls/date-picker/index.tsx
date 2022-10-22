import { SxProps, Theme, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as React from 'react';
import { Controller } from 'react-hook-form';

export interface DatePickerFieldProps {
  name: string;
  label: string;
  form: any;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

export function DatePickerField(props: DatePickerFieldProps) {
  const { name, label, form, disabled = false, sx = {} } = props;
  const { control } = form;
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              {...field}
              label={label}
              inputFormat='MM/DD/YYYY'
              disabled={disabled}
              renderInput={(params: any) => <TextField {...params} size='small' sx={{ ...sx }} />}
            />
          </LocalizationProvider>
        )}
      />
    </>
  );
}
