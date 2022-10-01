import { LoginFormValueData } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Link from 'next/link';
import { CustomInputField, PasswordField } from '../form-controls';

export interface LoginFormProps {
  onSubmit: (values: LoginFormValueData) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const schema = yup
    .object({
      identifier: yup
        .string()
        .email('Please enter your valid email.')
        .required('Please enter your email address.'),
      password: yup
        .string()
        .required('Please enter your password.')
        .min(6, 'Please enter at least 6 characters.'),
    })
    .required();
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const handleFormSubmit = async (values: LoginFormValueData) => {
    if (!onSubmit) return;
    await onSubmit(values);
    reset();
  };

  return (
    <Box sx={{ width: 500, margin: 8 }}>
      <Typography fontSize='1.75rem' fontWeight='600' textAlign='center'>
        Welcome back
      </Typography>

      <Box
        component='form'
        onSubmit={handleSubmit(handleFormSubmit)}
        width='100%'
        sx={{ mt: 2, p: 2 }}
      >
        <CustomInputField name='identifier' label='' placeholder='Email' form={form} />
        <PasswordField name='password' label='' placeholder='Password' form={form} sx={{ my: 2 }} />
        <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
          <FormControlLabel
            control={<Checkbox defaultChecked={false} size='small' />}
            label='Remember me'
            sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
          />
          <Box fontSize='0.875rem'>Forgot password?</Box>
        </Stack>

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
          {isSubmitting ? <CircularProgress size={19} sx={{ color: 'common.white' }} /> : 'Sign in'}
        </Button>

        <Link href='/account/register'>
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
            Create an account
          </Box>
        </Link>
      </Box>
    </Box>
  );
}
