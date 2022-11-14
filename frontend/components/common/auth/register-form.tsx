import { RegisterFormValueData } from '@/models';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { CustomInputField, PasswordField } from '../form-controls';
import Link from 'next/link';

export interface RegisterFormProps {
  onSubmit: (values: RegisterFormValueData) => void;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const schema = yup
    .object({
      firstName: yup.string().required('Please enter your first name.'),
      lastName: yup.string().required('Please enter your last name.'),
      email: yup
        .string()
        .email('Please enter your valid email.')
        .required('Please enter your email address.'),
      password: yup
        .string()
        .required('Please enter your password.')
        .min(6, 'Please enter at least 6 characters.'),
      reEnterPassword: yup
        .string()
        .required('Please re-enter your password.')
        .oneOf([yup.ref('password')], 'Password does not match.'),
    })
    .required();
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      reEnterPassword: '',
    },
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const handleFormSubmit = async (values: RegisterFormValueData) => {
    if (!onSubmit) return;
    await onSubmit(values);
    reset();
  };

  return (
    <Box sx={{ width: 500, margin: 8 }}>
      <Typography fontSize='1.75rem' fontWeight='600' textAlign='center'>
        Welcome to LTT-Ecommerce
      </Typography>

      <Box
        component='form'
        onSubmit={handleSubmit(handleFormSubmit)}
        width='100%'
        sx={{ mt: 3, p: 2 }}
      >
        <CustomInputField name='firstName' label='' placeholder='First Name' form={form} />
        <CustomInputField
          name='lastName'
          label=''
          placeholder='Last Name'
          form={form}
          sx={{ mt: 2 }}
        />
        <CustomInputField name='email' label='' placeholder='Email' form={form} sx={{ mt: 2 }} />
        <PasswordField name='password' label='' placeholder='Password' form={form} sx={{ mt: 2 }} />
        <PasswordField
          name='reEnterPassword'
          label=''
          placeholder='Re-enter password'
          form={form}
          sx={{ my: 2 }}
        />

        <Button
          type='submit'
          variant='outlined'
          fullWidth
          sx={{
            px: 3,
            py: 1.2,
            borderWidth: '1px',
            fontWeight: 500,
            fontSize: '0.688rem',
            letterSpacing: '0.16rem',
            color: 'common.white',
            borderColor: 'text.primary',
            bgcolor: 'common.black',
            '&:hover': {
              bgcolor: 'primary.main',
              color: 'common.white',
            },
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={19} sx={{ color: 'common.white' }} />
          ) : (
            'Create account'
          )}
        </Button>

        <Link href='/account/login'>
          <Box
            component='a'
            color='primary.main'
            sx={{
              display: 'block',
              mt: 2,
              fontSize: '0.875rem',
              cursor: 'pointer',
              '&:hover': { color: 'common.black' },
            }}
          >
            Already has an account
          </Box>
        </Link>
      </Box>
    </Box>
  );
}
