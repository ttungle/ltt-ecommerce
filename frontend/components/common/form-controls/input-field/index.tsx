import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { SxProps, Theme } from '@mui/material/styles';

export interface CustomInputFieldProps {
  name: string;
  label: string;
  form: any;
  disabled?: boolean;
  placeholder: string;
  sx?: SxProps<Theme>;
}

export function CustomInputField(props: CustomInputFieldProps) {
  const { name, label, placeholder, form, disabled = false, sx = {} } = props;
  const { control } = form;
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState, formState }) => (
          <TextField
            {...field}
            error={Boolean(fieldState.error)}
            label={label}
            helperText={fieldState.error?.message}
            size='small'
            fullWidth
            placeholder={placeholder}
            disabled={disabled}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: '2px' },
              '& input': { fontSize: '0.875rem', py: 1.5 },
              ...sx,
            }}
          />
        )}
      />
    </>
  );
}
