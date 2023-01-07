import { FormControl, MenuItem, Select, SxProps, Theme } from '@mui/material';
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';

export interface SizeSelectFieldProps {
  name: string;
  label: string;
  form: UseFormReturn<FieldValues, object>;
  disabled?: boolean;
  placeholder: string;
  sx?: SxProps<Theme>;
}

export function SizeSelectField(props: SizeSelectFieldProps) {
  const { name, label, placeholder, form, disabled = false, sx = {} } = props;
  const { control } = form;

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState, formState }) => (
          <FormControl sx={{ minWidth: { md: '20vw', xs: '48vw' }, ...sx }} size='small'>
            <Select
              {...field}
              disabled={disabled}
              placeholder={placeholder}
              label={label}
              sx={{
                fontSize: '0.875rem',
              }}
            >
              <MenuItem
                value=''
                sx={{
                  fontSize: '0.875rem',
                }}
              >
                None
              </MenuItem>
              <MenuItem
                value={9}
                sx={{
                  fontSize: '0.875rem',
                }}
              >
                9
              </MenuItem>
              <MenuItem
                value={10}
                sx={{
                  fontSize: '0.875rem',
                }}
              >
                10
              </MenuItem>
              <MenuItem
                value={11}
                sx={{
                  fontSize: '0.875rem',
                }}
              >
                11
              </MenuItem>
            </Select>
          </FormControl>
        )}
      />
    </>
  );
}
