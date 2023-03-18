import { ReactNode } from 'react';
import { ProductData } from './product';

export enum AuthURLList {
  login = '/auth/local',
  register = '/auth/local/register',
}

export interface UserData {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  avatar?: any;
  birthday: string | null;
  gender: string | null;
  phone: string | null;
  address: string | null;
  favoriteProducts: Array<ProductData>;
}

export interface LoginPayloadData {
  identifier: string;
  password: string;
}

export interface RegisterPayloadData {
  username: string;
  email: string;
  password: string;
}

export interface UserProfilePayloadData {
  id: number;
  username: string | null;
  email: string;
  avatar?: any;
  birthday: string | null;
  gender: string | null;
  phone: string | null;
  address: string | null;
  favoriteProducts: Array<number>;
}

export interface ChangePasswordPayloadData {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

export interface AuthenticationResultData {
  jwt: string;
  user: UserData;
}

export interface RegisterFormValueData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  reEnterPassword: string;
}

export interface LoginFormValueData {
  identifier: string;
  password: string;
}

export interface AuthProviderPropsData {
  children: ReactNode;
}

export interface AuthContextData {
  user: UserData | null;
  login: (data: LoginPayloadData) => Promise<void>;
  register: (data: RegisterPayloadData) => Promise<void>;
  setAuthInfo: (authData: AuthenticationResultData) => Promise<void>;
  logout: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

export interface MenuListData {
  id: number;
  name: string;
  path: string;
  color: string;
}
