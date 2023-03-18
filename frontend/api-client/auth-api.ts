import {
  AuthenticationResultData,
  ChangePasswordPayloadData,
  LoginPayloadData,
  RegisterPayloadData,
  UserData,
  UserProfilePayloadData,
} from '@/models';
import qs from 'qs';
import axiosClient from './axios-client';

export const authApi = {
  register(payload: RegisterPayloadData): Promise<AuthenticationResultData> {
    const url = '/auth/local/register';
    return axiosClient.post(url, payload);
  },

  login(payload: LoginPayloadData): Promise<AuthenticationResultData> {
    const url = '/auth/local';
    return axiosClient.post(url, payload);
  },

  changePassword(payload: ChangePasswordPayloadData): Promise<AuthenticationResultData> {
    const url = '/auth/change-password';
    return axiosClient.post(url, payload);
  },

  getProfile(): Promise<UserData> {
    const query = qs.stringify(
      {
        populate: ['avatar', 'favoriteProducts.thumbnails'],
      },
      {
        encodeValuesOnly: true,
      }
    );
    const url = `/users/me?${query}`;
    return axiosClient.get(url);
  },

  updateProfile(payload: UserProfilePayloadData): Promise<UserData> {
    const url = `/users/${payload.id}?populate=favoriteProducts`;
    return axiosClient.put(url, payload);
  },

  getProfilePageContent() {
    const query = qs.stringify(
      {
        populate: ['toastMessages', 'menuList.menuItem'],
      },
      {
        encodeValuesOnly: true,
      }
    );
    const url = `/user-information?${query}`;
    return axiosClient.get(url);
  },

  deleteUser(userId: number): Promise<UserData> {
    const url = `/users/${userId}`;
    return axiosClient.delete(url);
  },
};
