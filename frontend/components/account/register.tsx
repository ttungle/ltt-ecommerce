import { useAuthContext } from '@/contexts';
import { RegisterFormValueData } from '@/models';
import { useRouter } from 'next/router';
import * as React from 'react';
import { RegisterForm } from '../common/auth';

export interface RegisterProps {}

export function Register(props: RegisterProps) {
  const router = useRouter();
  const { register } = useAuthContext();

  const handleSubmit = async (values: RegisterFormValueData) => {
    if (values.password !== values.reEnterPassword) return;
    const registerPayload = {
      username: `${values.firstName} ${values.lastName}`,
      email: values.email,
      password: values.password,
    };

    await register(registerPayload);
  };

  return (
    <>
      <RegisterForm onSubmit={handleSubmit} />
    </>
  );
}
