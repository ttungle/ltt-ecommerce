import { authApi } from '@/api-client/auth-api';
import {
  AuthContextData,
  AuthenticationResultData,
  LoginPayloadData,
  RegisterPayloadData,
  UserData,
} from '@/models';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function useAuth(): AuthContextData {
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
      Cookies.set('user_info', JSON.stringify(userInfo), {
        expires: expiredDay,
        sameSite: 'lax',
      });

      setUser(userInfo as UserData);
    } catch (error: any) {
      console.log(error);

      toast.error(`${error?.message}`, {
        position: 'top-right',
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
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
      Cookies.set('user_info', JSON.stringify(authResult?.user), {
        expires: expiredDay,
        sameSite: 'lax',
      });

      setUser(authResult?.user);
    } catch (error: any) {
      console.log(error);

      toast.error(`${error?.message}`, {
        position: 'top-right',
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };

  const refreshUserProfile = async () => {
    const userInfo = await getUserInfo();
    if (!userInfo?.id) return;

    Cookies.set('user_info', JSON.stringify(userInfo), {
      expires: expiredDay,
      sameSite: 'lax',
    });

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
