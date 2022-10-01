import { ReactNode } from 'react';

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
  login: (data: LoginPayloadData) => void;
  register: (data: RegisterPayloadData) => void;
  logout: () => void;
}
