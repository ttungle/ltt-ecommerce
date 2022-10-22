import { ChangePasswordPayloadData } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ContainedButton } from '../../common/custom-button/contained-button';
import { PasswordField } from '../../common/form-controls';

export interface ChangePasswordFormProps {
  onSubmit: (values: any) => void;
}

export function ChangePasswordForm({ onSubmit }: ChangePasswordFormProps) {
  const schema = yup
    .object({
      currentPassword: yup.string().required('Please enter your current password.'),
      password: yup
        .string()
        .required('Please enter your new password.')
        .min(6, 'Please enter at least 6 characters.'),
      passwordConfirmation: yup
        .string()
        .required('Please re-type your password.')
        .oneOf([yup.ref('password')], 'Password does not match.'),
    })
    .required();

  const form = useForm({
    defaultValues: {
      currentPassword: '',
      password: '',
      passwordConfirmation: '',
    },
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const handleFormSubmit = async (values: ChangePasswordPayloadData) => {
    if (!onSubmit) return;
    await onSubmit(values);
    reset();
  };

  return (
    <>
      <Box component='form' onSubmit={handleSubmit(handleFormSubmit)}>
        <Typography sx={{ mb: 1, fontSize: '1rem', fontWeight: 'bold' }}>
          Current password
        </Typography>
        <PasswordField name='currentPassword' label='' placeholder='' form={form} sx={{ my: 2 }} />

        <Typography sx={{ mt: 2, mb: 1, fontSize: '1rem', fontWeight: 'bold' }}>
          New password
        </Typography>
        <PasswordField name='password' label='' placeholder='' form={form} sx={{ my: 2 }} />

        <Typography sx={{ mt: 2, mb: 1, fontSize: '1rem', fontWeight: 'bold' }}>
          Re-Type password
        </Typography>
        <PasswordField
          name='passwordConfirmation'
          label=''
          placeholder=''
          form={form}
          sx={{ my: 2 }}
        />

        <Stack direction='row' justifyContent='flex-end' alignItems='center'>
          <ContainedButton
            properties={{ type: 'submit' }}
            sx={{
              mt: 5,
              px: 5,
              bgcolor: 'common.black',
              color: 'common.white',
              fontWeight: 'bold',
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={19} sx={{ color: 'common.white' }} />
            ) : (
              'Change'
            )}
          </ContainedButton>
        </Stack>
      </Box>
    </>
  );
}
