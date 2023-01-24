import { SizeSelectionItemData } from '@/models';
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';

export interface SelectionFieldProps {
  data: Array<SizeSelectionItemData>;
  name: string;
  label: string;
  form: UseFormReturn<FieldValues, object>;
  disabled?: boolean;
  placeholder: string;
  sx?: SxProps<Theme>;
}

export function SelectionField(props: SelectionFieldProps) {
  const { data, name, label, placeholder, form, disabled = false, sx = {} } = props;
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
              label={label}
              error={Boolean(fieldState.error)}
              sx={{
                fontSize: '0.875rem',
              }}
              displayEmpty
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <Typography sx={{ color: 'grey.500' }}>{placeholder}</Typography>;
                }

                return selected;
              }}
            >
              {data.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item.value}
                  sx={{
                    fontSize: '0.875rem',
                  }}
                >
                  {item.title}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: 'error.main' }}>
              {fieldState.error?.message}
            </FormHelperText>
          </FormControl>
        )}
      />
    </>
  );
}
