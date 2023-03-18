import { useAuthContext } from '@/contexts';
import { LoginFormValueData } from '@/models';
import { useRouter } from 'next/router';
import * as React from 'react';
import { LoginForm } from '../common/auth';

export interface LoginProps {}

export function Login(props: LoginProps) {
  const router = useRouter();
  const { login } = useAuthContext();

  const handleSubmit = (values: LoginFormValueData) => {
    login(values);
  };

  return (
    <>
      <LoginForm onSubmit={handleSubmit} />
    </>
  );
}
