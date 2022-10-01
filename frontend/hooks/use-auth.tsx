import { authApi } from '@/api-client/auth-api';
import axiosClient from '@/api-client/axios-client';
import { AuthContextData, LoginPayloadData, RegisterPayloadData, UserData } from '@/models';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function useAuth(): AuthContextData {
  const [user, setUser] = useState<UserData | null>(() =>
    JSON.parse(Cookies.get('user_info') || 'null')
  );

  const getUserInfo = async () => {
    try {
      const userProfileResult: any = await authApi.getProfile();
      setUser(userProfileResult?.user);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (data: LoginPayloadData) => {
    try {
      const authResult: any = await authApi.login(data);
      Cookies.set('auth_token', authResult?.jwt, {
        expires: 1,
        sameSite: 'lax',
      });
      Cookies.set('user_info', JSON.stringify(authResult?.user), {
        expires: 1,
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

  const register = async (data: RegisterPayloadData) => {
    try {
      const authResult: any = await authApi.register(data);

      Cookies.set('auth_token', authResult?.jwt, {
        expires: 1,
        sameSite: 'lax',
      });
      Cookies.set('user_info', JSON.stringify(authResult?.user), {
        expires: 1,
        sameSite: 'lax',
      });
      axiosClient.defaults.headers.common['Authorization'] = `Bearer ${authResult?.jwt}`;

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

  const logout = async () => {
    Cookies.remove('auth_token');
    Cookies.remove('user_info');
    setUser(null);
    window.localStorage.setItem('logout', JSON.stringify(Date.now()));
  };

  return { user, login, register, logout };
}
