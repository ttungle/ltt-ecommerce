import { Login, Register, UserProfile } from '@/components/account';
import { Container, Stack } from '@mui/material';
import { useRouter } from 'next/router';

export interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
  const router = useRouter();

  return (
    <Container maxWidth='xl'>
      <Stack direction='row' justifyContent='center' alignItems='center'>
        {router.query.form === 'register' && <Register />}
        {router.query.form === 'login' && <Login />}
        {(router.query.form === 'profile' || router.query.form === 'password') && <UserProfile />}
      </Stack>
    </Container>
  );
}
