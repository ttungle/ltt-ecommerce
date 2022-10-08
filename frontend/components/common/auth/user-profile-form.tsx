import { UserData } from '@/models';
import { getStrapiMedia } from '@/utils';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ContainedButton } from '../custom-button/contained-button';
import { CustomInputField } from '../form-controls';

export interface UserProfileFormProps {
  user: UserData | null;
}

export function UserProfileForm({ user }: UserProfileFormProps) {
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  return (
    <>
      <Stack direction='row' justifyContent='flex-start' alignItems='center' mb={5}>
        <Avatar
          alt={user?.username}
          src={getStrapiMedia(user?.avatar?.url) ?? ''}
          sx={{
            width: 64,
            height: 64,
            fontSize: '2rem',
          }}
        />
        <ContainedButton
          sx={{ ml: 3, bgcolor: 'common.black', color: 'common.white', fontWeight: 'bold' }}
        >
          Upload new picture
        </ContainedButton>
        <ContainedButton
          sx={{
            ml: 2,
            bgcolor: 'common.white',
            color: 'common.black',
            border: '1px solid',
            borderColor: 'primary.black',
            '&:hover': {
              borderColor: 'primary.main',
            },
          }}
        >
          Delete
        </ContainedButton>
      </Stack>
      <Box component='form'>
        <Typography sx={{ mb: 1, fontSize: '0.875rem', fontWeight: 'bold' }}>Name</Typography>
        <CustomInputField name='identifier' label='' placeholder='' form={form} />

        <Typography sx={{ mt: 5, mb: 1, fontSize: '0.875rem', fontWeight: 'bold' }}>
          Birthday
        </Typography>
        <CustomInputField name='identifier' label='' placeholder='' form={form} />

        <Typography sx={{ mt: 5, mb: 1, fontSize: '0.875rem', fontWeight: 'bold' }}>
          Email
        </Typography>
        <CustomInputField name='identifier' label='' placeholder='' form={form} />

        <Typography sx={{ mt: 5, mb: 1, fontSize: '0.875rem', fontWeight: 'bold' }}>
          Phone
        </Typography>
        <CustomInputField name='identifier' label='' placeholder='' form={form} />

        <Typography sx={{ mt: 5, mb: 1, fontSize: '0.875rem', fontWeight: 'bold' }}>
          Address
        </Typography>
        <CustomInputField name='identifier' label='' placeholder='' form={form} />

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
            Save
          </ContainedButton>
        </Stack>
      </Box>
    </>
  );
}
