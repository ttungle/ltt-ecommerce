import { authApi } from '@/api-client/auth-api';
import {
  AuthContextData,
  AuthenticationResultData,
  LoginPayloadData,
  RegisterPayloadData,
  UserData,
} from '@/models';
import { filterObject } from '@/utils';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function useAuth(): AuthContextData {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(() =>
    JSON.parse(Cookies.get('user_info') || 'null')
  );
  const expiredDay = 1;

  const getUserInfo = async (): Promise<UserData | null> => {
    try {
      const userProfileResult: UserData | null = await authApi.getProfile();

      if (!userProfileResult?.id) return null;
      return userProfileResult;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const login = async (data: LoginPayloadData) => {
    if (!data) return;
    try {
      const authResult: AuthenticationResultData = await authApi.login(data);
      if (authResult?.jwt?.length === 0) return;
      Cookies.set('auth_token', authResult?.jwt, {
        expires: expiredDay,
        sameSite: 'lax',
      });

      const userInfo = await getUserInfo();

      const filteredUserInfo = filterObject(userInfo, 'id', 'username', 'avatar', 'email');
      Cookies.set(
        'user_info',
        JSON.stringify({
          ...filteredUserInfo,
          avatar: { url: filteredUserInfo?.avatar?.formats?.small?.url },
        }),
        {
          expires: expiredDay,
          sameSite: 'lax',
        }
      );

      setUser(userInfo as UserData);
      router.push('/');
    } catch (error: any) {
      console.log(error);
      toast.error(`${error?.message}`);
    }
  };

  const register = async (data: RegisterPayloadData) => {
    if (!data) return;
    try {
      const authResult: AuthenticationResultData = await authApi.register(data);
      if (authResult?.jwt?.length === 0) return;
      Cookies.set('auth_token', authResult?.jwt, {
        expires: expiredDay,
        sameSite: 'lax',
      });
      const filteredUserInfo = filterObject(authResult?.user, 'id', 'username', 'avatar', 'email');
      Cookies.set(
        'user_info',
        JSON.stringify({
          ...filteredUserInfo,
          avatar: { url: filteredUserInfo?.avatar?.formats?.small?.url },
        }),
        {
          expires: expiredDay,
          sameSite: 'lax',
        }
      );

      setUser(authResult?.user);
      router.push('/');
    } catch (error: any) {
      console.log(error);
      toast.error(`${error?.message}`);
    }
  };

  const refreshUserProfile = async () => {
    const userInfo = await getUserInfo();
    if (!userInfo?.id) return;
    const filteredUserInfo = filterObject(userInfo, 'id', 'username', 'avatar', 'email');
    Cookies.set(
      'user_info',
      JSON.stringify({
        ...filteredUserInfo,
        avatar: { url: filteredUserInfo?.avatar?.formats?.small?.url },
      }),
      {
        expires: expiredDay,
        sameSite: 'lax',
      }
    );

    setUser(userInfo);
  };

  const setAuthInfo = async (authData: AuthenticationResultData) => {
    if (authData?.jwt) {
      Cookies.set('auth_token', authData?.jwt, {
        expires: expiredDay,
        sameSite: 'lax',
      });
    }

    await refreshUserProfile();
  };

  const logout = async () => {
    Cookies.remove('auth_token');
    Cookies.remove('user_info');
    setUser(null);
    window.localStorage.setItem('logout', JSON.stringify(Date.now()));
  };

  return { user, login, register, setAuthInfo, refreshUserProfile, logout };
}
