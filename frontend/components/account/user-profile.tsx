import { useAuthContext } from '@/contexts';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ChangePasswordForm } from '../common/auth';
import { UserProfileForm } from '../common/auth/user-profile-form';

export interface UserProfileProps {}

export function UserProfile(props: UserProfileProps) {
  const { user } = useAuthContext();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user?.id) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  const handleEditProfileClick = () => {
    router.push('/account/profile');
  };

  const handleChangePasswordClick = () => {
    router.push('/account/password');
  };

  return (
    <Container maxWidth='md' sx={{ my: 8 }}>
      {!isAuthenticated && <Box>There is no information to show!</Box>}

      {isAuthenticated && (
        <>
          <Typography fontSize='1.25rem' fontWeight='bold' lineHeight='32px'>
            {`${user?.username}'s Profile`}
          </Typography>
          {router.query.form === 'profile' && (
            <Typography fontSize='0.875rem' sx={{ color: 'grey.500' }}>
              Edit your profile and manage your account
            </Typography>
          )}

          {router.query.form === 'password' && (
            <Typography fontSize='0.875rem' sx={{ color: 'grey.500' }}>
              Manage your password
            </Typography>
          )}

          <Grid container spacing={3} mt={5}>
            <Grid item xs={3}>
              <Typography
                mb={2}
                fontSize='0.938rem'
                onClick={handleEditProfileClick}
                sx={{
                  cursor: 'pointer',
                  color: router.query.form === 'profile' ? 'text.primary' : 'grey.600',
                  fontWeight: router.query.form === 'profile' ? 'bold' : 400,
                  '&:hover': { color: 'text.primary' },
                }}
              >
                Edit Profile
              </Typography>
              <Typography
                mb={2}
                fontSize='0.938rem'
                onClick={handleChangePasswordClick}
                sx={{
                  cursor: 'pointer',
                  color: router.query.form === 'password' ? 'text.primary' : 'grey.600',
                  fontWeight: router.query.form === 'password' ? 'bold' : 400,
                  '&:hover': { color: 'text.primary' },
                }}
              >
                Change Password
              </Typography>

              <Divider />

              <Typography
                my={2}
                fontSize='0.938rem'
                sx={{
                  cursor: 'pointer',
                  color: 'error.main',
                }}
              >
                Delete Account
              </Typography>
            </Grid>

            <Grid item xs={9}>
              {router.query.form === 'profile' && <UserProfileForm user={user} />}

              {router.query.form === 'password' && <ChangePasswordForm />}
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}
