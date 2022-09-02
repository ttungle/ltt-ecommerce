import { TextField, Stack, Button } from '@mui/material';
import * as React from 'react';
import { Controller } from 'react-hook-form';

export interface SubscriptionFormProps {
  form: any;
  name: string;
  label: string;
  onSubmit: (values: { email: string }) => void;
}

export default function SubscriptionForm(props: SubscriptionFormProps) {
  const { form, name, label, onSubmit } = props;
  const { control, handleSubmit } = form;

  const handleFormSubmit = async (values: { email: string }) => {
    if (!onSubmit) return;

    await onSubmit(values);
  };

  return (
    <Stack
      direction='row'
      alignItems='flex-start'
      component='form'
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <TextField
            label={label}
            {...field}
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
            placeholder='Enter your email'
            size='small'
            variant='outlined'
            sx={{
              flex: 1,
              '& .MuiOutlinedInput-root': { borderRadius: 0 },
              '& input': { fontSize: '14px', fontWeight: 300 },
            }}
          />
        )}
      />

      <Button
        type='submit'
        variant='contained'
        size='large'
        sx={{ bgcolor: 'common.black', color: 'common.white', borderRadius: 0 }}
      >
        Submit
      </Button>
    </Stack>
  );
}
