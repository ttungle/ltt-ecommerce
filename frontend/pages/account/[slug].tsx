import { Login, Register, UserProfile } from '@/components/account';
import { Container, Stack } from '@mui/material';
import { useRouter } from 'next/router';

export interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
  const router = useRouter();

  return (
    <Container maxWidth='xl'>
      <Stack direction='row' justifyContent='center' alignItems='center'>
        {router.query.slug === 'register' && <Register />}
        {router.query.slug === 'login' && <Login />}
        {(router.query.slug === 'profile' || router.query.slug === 'password') && <UserProfile />}
      </Stack>
    </Container>
  );
}
