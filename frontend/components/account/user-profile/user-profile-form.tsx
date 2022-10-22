import { uploadApi } from '@/api-client';
import { DatePickerField } from '@/components/common/form-controls/date-picker';
import { UserData } from '@/models';
import { getStrapiMedia } from '@/utils';
import { Avatar, Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ContainedButton } from '../../common/custom-button/contained-button';
import { CustomInputField } from '../../common/form-controls';

export interface UserProfileFormProps {
  user: UserData | null;
  onSubmit: (values: any) => void;
}

export function UserProfileForm({ user, onSubmit }: UserProfileFormProps) {
  const [uploadFile, setUploadFile] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState(() => getStrapiMedia(user?.avatar?.url) ?? '');
  const form = useForm({
    defaultValues: {
      username: '',
      birthday: '',
      email: '',
      phone: '',
      address: '',
    },
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    setValue('username', user?.username ?? '');
    setValue('birthday', user?.birthday ?? '');
    setValue('email', user?.email ?? '');
    setValue('phone', user?.phone ?? '');
    setValue('address', user?.address ?? '');
  }, [user]);

  const handleUploadAvatar = (event: any) => {
    if (!Boolean(event.target.files[0])) return;

    setUploadFile(event.target.files[0]);
    setAvatarUrl(URL.createObjectURL(event.target.files[0]));
  };

  const handleDeleteAvatarClick = () => {
    setUploadFile(null);
    setAvatarUrl('');
  };

  const handleFormSubmit = async (values: any) => {
    if (!onSubmit) return;
    try {
      let formValue = {
        ...values,
        birthday: values?.birthday?.$d?.toString() ?? user?.birthday,
        id: user?.id as number,
        email: user?.email as string,
        avatar: user?.avatar?.id,
      };

      // Rename image, upload image and assign to user.
      if (Boolean(uploadFile)) {
        const formData = new FormData();
        formData.append('files', uploadFile, `${user?.email}__avatar__${uploadFile.name}`);
        const uploadFileRes: any = await uploadApi.uploadFile(formData);
        formValue.avatar = uploadFileRes[0]?.id;
      }

      if (uploadFile == null) formValue.avatar = null;
      await onSubmit(formValue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack direction='row' justifyContent='flex-start' alignItems='center' mb={5}>
        <Avatar
          alt={user?.username}
          src={avatarUrl}
          sx={{
            width: 64,
            height: 64,
            fontSize: '2rem',
          }}
        />
        <ContainedButton
          properties={{ component: 'label' }}
          sx={{ ml: 3, bgcolor: 'common.black', color: 'common.white', fontWeight: 'bold' }}
        >
          Upload new picture
          <input hidden accept='image/*' type='file' onChange={handleUploadAvatar} />
        </ContainedButton>
        <ContainedButton
          onClick={handleDeleteAvatarClick}
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

      <Box component='form' onSubmit={handleSubmit(handleFormSubmit)}>
        <Typography sx={{ mb: 1, fontSize: '0.875rem', fontWeight: 'bold' }}>Name</Typography>
        <CustomInputField name='username' label='' placeholder='' form={form} />

        <Typography sx={{ mt: 5, mb: 1, fontSize: '0.875rem', fontWeight: 'bold' }}>
          Birthday
        </Typography>
        <DatePickerField name='birthday' label='' form={form} />

        <Typography sx={{ mt: 5, mb: 1, fontSize: '0.875rem', fontWeight: 'bold' }}>
          Email
        </Typography>
        <CustomInputField name='email' label='' placeholder='' form={form} disabled={true} />

        <Typography sx={{ mt: 5, mb: 1, fontSize: '0.875rem', fontWeight: 'bold' }}>
          Phone
        </Typography>
        <CustomInputField name='phone' label='' placeholder='' form={form} />

        <Typography sx={{ mt: 5, mb: 1, fontSize: '0.875rem', fontWeight: 'bold' }}>
          Address
        </Typography>
        <CustomInputField name='address' label='' placeholder='' form={form} />

        <Stack direction='row' justifyContent='flex-end' alignItems='center'>
          <ContainedButton
            isDisabled={isSubmitting}
            properties={{ type: 'submit' }}
            sx={{
              mt: 5,
              px: 5,
              bgcolor: 'common.black',
              color: 'common.white',
              fontWeight: 'bold',
            }}
          >
            {isSubmitting ? <CircularProgress size={19} sx={{ color: 'common.white' }} /> : ' Save'}
          </ContainedButton>
        </Stack>
      </Box>
    </>
  );
}
