import { Box, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ContainedButton } from '../custom-button/contained-button';
import { PasswordField } from '../form-controls';

export interface ChangePasswordFormProps {}

export function ChangePasswordForm(props: ChangePasswordFormProps) {
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { handleSubmit } = form;

  const handleFormSubmit = async () => {};

  return (
    <>
      <Box component='form' onSubmit={handleSubmit(handleFormSubmit)}>
        <Typography sx={{ mb: 1, fontSize: '1rem', fontWeight: 'bold' }}>Old password</Typography>
        <PasswordField name='password' label='' placeholder='' form={form} sx={{ my: 2 }} />

        <Typography sx={{ mt: 2, mb: 1, fontSize: '1rem', fontWeight: 'bold' }}>
          Password
        </Typography>
        <PasswordField name='password' label='' placeholder='' form={form} sx={{ my: 2 }} />

        <Typography sx={{ mt: 2, mb: 1, fontSize: '1rem', fontWeight: 'bold' }}>
          Re-Type password
        </Typography>
        <PasswordField name='password' label='' placeholder='' form={form} sx={{ my: 2 }} />

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
            Change
          </ContainedButton>
        </Stack>
      </Box>
    </>
  );
}
