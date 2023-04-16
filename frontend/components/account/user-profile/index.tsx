import { authApi } from '@/api-client/auth-api';
import { CircularLoader } from '@/components/common/loader';
import { useAuthContext } from '@/contexts';
import { ChangePasswordPayloadData, UserProfilePayloadData } from '@/models';
import { Container, Grid, Stack, Typography } from '@mui/material';
import { useQueries } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ChangePasswordForm } from './change-password-form';
import { UserProfileMenuList } from './menu-list';
import { UserProfileForm } from './user-profile-form';
import { GLOBAL_PATHs } from '@/constant';
import { FavoriteProductList } from './favorite-product-list';

export function UserProfile() {
  const router = useRouter();
  const { user, setAuthInfo, refreshUserProfile, logout } = useAuthContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user?.id) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  const [userProfile, profilePage] = useQueries({
    queries: [
      {
        queryKey: ['getUserProfile'],
        queryFn: async () => await authApi.getProfile(),
        enabled: isAuthenticated,
        onError: () => {
          toast.error('Failed to open your profile. Please try again');
        },
      },
      {
        queryKey: ['getUserProfileContent'],
        queryFn: async () => await authApi.getProfilePageContent(),
      },
    ],
  });
  const { data: userProfileData, isLoading: isUserProfileLoading } = userProfile;
  const { data: profilePageData, isLoading: isProfilePageLoading } = profilePage;
  const toastMsg = {
    updateProfile: {
      success: `${profilePageData?.data?.attributes?.toastMessages[0]?.successMessage}`,
      error: `${profilePageData?.data?.attributes?.toastMessages[0]?.errorMessage}`,
    },
    changePassword: {
      success: `${profilePageData?.data?.attributes?.toastMessages[1]?.successMessage}`,
      error: `${profilePageData?.data?.attributes?.toastMessages[1]?.errorMessage}`,
    },
    deleteAccount: {
      success: `${profilePageData?.data?.attributes?.toastMessages[2]?.successMessage}`,
      error: `${profilePageData?.data?.attributes?.toastMessages[2]?.errorMessage}`,
    },
  };

  const handleProfileFormSubmit = async (values: UserProfilePayloadData) => {
    try {
      const result = await authApi.updateProfile(values);
      if (Boolean(result.id)) {
        toast.success(toastMsg.updateProfile.success);
        await refreshUserProfile();
      }
    } catch (error) {
      console.log(error);
      toast.error(toastMsg.updateProfile.error);
    }
  };

  const handleChangePasswordFormSubmit = async (values: ChangePasswordPayloadData) => {
    try {
      const result = await authApi.changePassword(values);

      if (Boolean(result.user.id)) {
        setAuthInfo(result);
        toast.success(toastMsg.changePassword.success);
      }
    } catch (error) {
      console.log(error);
      toast.error(toastMsg.changePassword.error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user?.id) return;
    try {
      const result = await authApi.deleteUser(user.id);
      if (result?.id) {
        await logout();
        router.push('/');
        toast.success(toastMsg.deleteAccount.success);
      }
    } catch (error) {
      console.log(error);
      toast.error(toastMsg.deleteAccount.error);
    }
  };

  if (isAuthenticated && (isUserProfileLoading || isProfilePageLoading))
    return (
      <Stack minHeight='90vh'>
        <CircularLoader />
      </Stack>
    );

  return (
    <Container maxWidth='md' sx={{ my: { lg: 8, xs: 5 } }}>
      {!isAuthenticated && (
        <Typography textAlign='center'>
          {profilePageData?.data?.attributes?.errorPageMessage}
        </Typography>
      )}

      {isAuthenticated && (
        <>
          <Typography fontSize='1.25rem' fontWeight='bold' lineHeight='32px'>
            {`${userProfileData?.username}'s Profile`}
          </Typography>

          <Typography fontSize='0.875rem' sx={{ color: 'grey.500' }}>
            {router?.asPath === GLOBAL_PATHs.profile &&
              profilePageData?.data?.attributes?.userProfileDescription}

            {router?.asPath === GLOBAL_PATHs.changePassword &&
              profilePageData?.data?.attributes?.changePasswordDescription}

            {router?.asPath === GLOBAL_PATHs.favoriteProducts &&
              profilePageData?.data?.attributes?.favoriteProductDescription}
          </Typography>

          <Grid container spacing={3} mt={{ lg: 5, xs: 3 }}>
            <Grid item lg={3} xs={12}>
              <UserProfileMenuList
                menuList={profilePageData?.data?.attributes?.menuList[0]?.menuItem}
                onDeleteAccount={handleDeleteAccount}
              />
            </Grid>

            <Grid item lg={9} xs={12}>
              {router?.asPath === GLOBAL_PATHs.profile && (
                <UserProfileForm
                  user={userProfileData ?? null}
                  onSubmit={handleProfileFormSubmit}
                />
              )}
              {router?.asPath === GLOBAL_PATHs.changePassword && (
                <ChangePasswordForm onSubmit={handleChangePasswordFormSubmit} />
              )}
              {router?.asPath === GLOBAL_PATHs.favoriteProducts && (
                <FavoriteProductList userData={userProfileData ?? null} />
              )}
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}
