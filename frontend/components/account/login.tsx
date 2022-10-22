import { useAuthContext } from '@/contexts';
import { LoginFormValueData } from '@/models';
import { useRouter } from 'next/router';
import * as React from 'react';
import { LoginForm } from '../common/auth';

export interface LoginProps {}

export function Login(props: LoginProps) {
  const router = useRouter();
  const { login } = useAuthContext();

  const handleSubmit = async (values: LoginFormValueData) => {
    await login(values);
    router.push('/');
  };

  return (
    <>
      <LoginForm onSubmit={handleSubmit} />
    </>
  );
}
