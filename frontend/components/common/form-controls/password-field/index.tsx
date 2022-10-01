import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { SxProps, Theme } from '@mui/material/styles';

export interface PasswordFieldProps {
  name: string;
  label: string;
  form: any;
  disabled?: boolean;
  placeholder: string;
  sx?: SxProps<Theme>;
}

export function PasswordField(props: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { name, label, placeholder, form, disabled = false, sx } = props;
  const {
    control,
    formState: { errors },
  } = form;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <FormControl sx={{ width: '100%', ...sx }} fullWidth variant='outlined' size='small'>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState, formState }) => (
            <OutlinedInput
              label={label}
              placeholder={placeholder}
              error={Boolean(fieldState.error)}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ fontSize: '1.2rem' }} />
                    ) : (
                      <Visibility sx={{ fontSize: '1.2rem' }} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              disabled={disabled}
              {...field}
              sx={{ borderRadius: '2px', fontSize: '0.875rem', py: 0.45 }}
            />
          )}
        />
        {errors[name]?.message && (
          <FormHelperText sx={{ '&.MuiFormHelperText-root': { color: 'error.main' } }}>
            {errors[name]?.message}
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
}
